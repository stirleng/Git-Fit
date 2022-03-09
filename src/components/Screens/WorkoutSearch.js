import React, {useRef, useEffect, useState}from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { db, auth } from '../../firebase';
import './UploadWorkout.css'
// Added geofire for recording locations and searching nearby
const geofire = require('geofire-common');

export default function WorkoutSearch(props) {
    const {setWorkout} = useAuth();
    
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
  
    //input to db
    const [category, setCategory] = useState("cardio");
    const [caloriesBurned, setCaloriesBurned] = useState(1); // Default search cal > 1
    const [intensity, setIntensity] = useState("low");
    const [searchRadius, setSearchRadius] = useState(1); // Default search radius 1km
    const [latitude, setLatitude] = useState(34);
    const [longitude, setLongitude] = useState(-118); // Default location is in la
    const [distFiltered, setDistFiltered] = useState([])
    const [searchResults, setSearchResults] = useState([]);

    // queryHashes takes in lat, lng, dist, and returns docs for 
    // workouts within dist of [lat,lng]
    async function queryHashes(lat, lng, dist) {
        //js/react goes here

        // CODE from https://firebase.google.com/docs/firestore/solutions/geoqueries
        // TODO: Edit code so it... actually works
        // find workouts within x km of lat, lng
        const center = [parseInt(lat), parseInt(lng)] // TODO: replace placeholder values with user location
        const radiusInM = parseInt(dist)*1000 // 100 km TODO: Replace with variable distance
        dist = 20000000
        // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
        // a separate query for each pair. There can be up to 9 pairs of bounds
        // depending on overlap, but in most cases there are 4.
        const bounds = geofire.geohashQueryBounds(center, radiusInM);
        const promises = [];
        for (const b of bounds) {
            const q = await db.collection('workout')
                .orderBy('LocationHash')
                .startAt(b[0])
                .endAt(b[1]);
            promises.push(q.get());
        }

        // Collect all the query results together into a single list
        Promise.all(promises).then((snapshots) => {
            const matchingDocs = [];

            for (const snap of snapshots) {
                for (const doc of snap.docs) {
                    const lat = doc.get('Latitude');
                    const lng = doc.get('Longitude');

                    // We have to filter out a few false positives due to GeoHash
                    // accuracy, but most will match
                    const distanceInKm = geofire.distanceBetween([parseInt(lat), parseInt(lng)], center);
                    const distanceInM = distanceInKm * 1000;
                    if (distanceInM <= radiusInM) {
                        matchingDocs.push(doc);
                    }
                }
            }
            return matchingDocs;
        }).then((matchingDocs) => {
            // Process the matching documents
            if (matchingDocs){
                const tempDocs = [];
                matchingDocs.forEach(documentSnapshot =>{
                    tempDocs.push(documentSnapshot.data())      
                })
                setDistFiltered(tempDocs)
            }
        });
    }

    async function search(type, intensity, calories, lat, lng, dist){
        // query document snapshot array
        const filteredDocs = []
        if (lat != null && lng !=null){
            queryHashes(lat, lng, dist)
            distFiltered.forEach(doc =>{
                if (doc.Category === type && doc.Intensity === intensity && doc.Calories_Burned >= calories){
                    filteredDocs.push(doc);
                }
            })
        }
        else{
            await db.collection("workout").where('Category', '==', type)
            .where('Intensity', '==', intensity)
            .get().then((snapshot) =>{
                if (snapshot){
                  const tempSearch = [];
                  snapshot.forEach(documentSnapshot =>{
                    tempSearch.push(documentSnapshot.data())      
                  })
                  //saving the original copy of all the workout
                  filteredDocs = tempSearch;
                }
            })
        }
        console.log("filtered")
        console.log(filteredDocs)
        setSearchResults(filteredDocs)
    }

    async function handleSubmit(e){
        e.preventDefault()
        setError("")
        setLoading(true)

        if(caloriesBurned <= 0){
            setError("Calories burned can't be 0 or a negative number")
            setLoading(false)
            return
        }
        try{
            search(category, intensity, caloriesBurned, latitude, longitude, searchRadius)
        }
        catch(err){
            setError(err.message)
            setLoading(false)
            return
        }
        setLoading(false)
        console.log("search Results")
        console.log(searchResults)
    }

    return (
        <div>
        <div id="title-container">
            <h1>Search for your favorite workout!</h1>
        </div>
        <div id="input-container">

           <div id="select-container">
               <label id="category-question" for="selectCategory">Select the category for your workout</label>
               <select name="selectCategory" id="category-input" value={category} onChange={(e) =>setCategory(e.target.value)}>
                   <option value="chest">Chest</option>
                   <option value="back">Back</option>
                   <option value="bicep">Bicep</option>
                   <option value="shoulder">Shoulder</option>
                   <option value="tricep">Tricep</option>
                   <option value="leg">Leg</option>
                   <option value="cardio">Cardio</option>
                   <option value="abs">Abs</option>
                </select>
           </div>

           <div id="select-container">
               <label id="category-question" for="selectCategory">Intensity Level?</label>
               <select name="selectCategory" id="category-input" value={intensity} onChange={(e) =>setIntensity(e.target.value)}>
                   <option value="low">Low</option>
                   <option value="medium">Medium</option>
                   <option value="high">High</option>
                </select>
           </div>

           <div id="single-input">
                <h1 id="input-question">Calories burned in 1 hour?</h1>
                <input 
                className='inputBox'
                type="number"
                value={caloriesBurned}
                onChange={(e) =>setCaloriesBurned(e.target.value)}
                />
            </div>

            <div id="single-input">
                <h1 id="input-question">Latitude</h1>
                <input
                className='inputBox'
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                />
            </div>
            <div id="single-input">
                <h1 id="input-question">Longitude</h1>
                <input
                className='inputBox'
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                />
            </div>
            <div id="single-input">
                <h1 id="input-question">Search Radius</h1>
                <input
                className='inputBox'
                type="text"
                value={searchRadius}
                onChange={(e) => setSearchRadius(e.target.value)}
                />
            </div>
        </div>

        <div id="submit-container">
            {loading? <h1>Searching, please wait!</h1> : 
            <button id='SubmitButton' onClick={handleSubmit} >
                Search
            </button>
            }
        </div>

        {error && 
        <div id="error-container">
            <h1>{error}</h1>    
        </div>
        }
        <div>
        </div>
    </div>
    )
}