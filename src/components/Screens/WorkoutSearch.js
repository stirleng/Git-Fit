import React, {useState} from 'react'
import {useAuth} from '../../contexts/AuthContext'
import {db} from '../../contexts/firebase';
import '../styles/WorkoutSearch.css'
// Added geofire for recording locations and searching nearby
const geofire = require('geofire-common');

export default function WorkoutSearch() {


    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    //input to db
    const [category, setCategory] = useState("cardio");
    const [caloriesBurned, setCaloriesBurned] = useState(1); // Default search cal > 1
    const [intensity, setIntensity] = useState("low");
    const [searchRadius, setSearchRadius] = useState(null); // Default search radius 1km
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState(""); // Default location is in la
    const distFiltered = [];
    const [searchResults, setSearchResults] = useState([]);

    // queryHashes takes in lat, lng, dist, and returns docs for 
    // workouts within dist of [lat,lng]
    async function queryHashes(lat, lng, dist) {
        // CODE from https://firebase.google.com/docs/firestore/solutions/geoqueries
        // TODO: Edit code so it... actually works
        // find workouts within x km of lat, lng
        const center = [parseInt(lat), parseInt(lng)]; // TODO: replace placeholder values with user location
        const radiusInM = parseInt(dist) * 1000; // 100 km TODO: Replace with variable distance
        dist = 20000000;
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
        await Promise.all(promises).then((snapshots) => {
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
            if (matchingDocs) {
                matchingDocs.forEach(documentSnapshot => {
                    distFiltered.push(documentSnapshot.data())
                })
            }
        })
    }

    async function search(type, intensity, calories, lat, lng, dist) {
        // query document snapshot array
        let filteredDocs = [];
        if (lat !== "" && lng !== "") {
            await queryHashes(lat, lng, dist).then(() => {
                // Wait for query hash function to finish
            });
            for (let i = 0; i < distFiltered.length; i++) {
                let doc = distFiltered[i];
                if (doc.Category === type && doc.Intensity === intensity && doc.Calories_Burned >= calories) {
                    filteredDocs.push(doc);
                }
            }
        } else {
            await db.collection("workout")
                .where('Category', '==', type)
                .where('Intensity', '==', intensity)
                .get().then((snapshot) => {
                    if (snapshot) {
                        const tempSearch = [];
                        snapshot.forEach(documentSnapshot => {
                            tempSearch.push(documentSnapshot.data())
                        });
                        //saving the original copy of all the workout
                        filteredDocs = tempSearch;
                    }
                })
        }
        return filteredDocs
    }

    function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (caloriesBurned <= 0) {
            setError("Calories burned can't be 0 or a negative number");
            setLoading(false);
            return
        }
        try {
            search(category, intensity, caloriesBurned, latitude, longitude, searchRadius).then((results) => {
                setSearchResults(results);
            })
        } catch (err) {
            setError(err.message);
            setLoading(false);
            return
        }
        setLoading(false)
    }

    return (
        <div id='WorkoutSearchPage'>
            <div id='search-container'>
                <div id="upload-screen-header">
                    <h1>Search Workouts</h1>
                </div>
                <div id="input-container">

                    <div id="select-container">
                        <label id="category-question" for="selectCategory">Select the category for your workout</label>
                        <select name="selectCategory" id="category-input" value={category}
                                onChange={(e) => setCategory(e.target.value)}>
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
                        <select name="selectCategory" id="category-input" value={intensity}
                                onChange={(e) => setIntensity(e.target.value)}>
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
                            onChange={(e) => setCaloriesBurned(e.target.value)}
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
                    {loading ? <h1>Searching, please wait!</h1> :
                        <button id='SubmitButton' onClick={(e) => handleSubmit(e)}>
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
            <div id='search-results-container'>
                    <div id='search-results-header'>
                        Search Results:
                    </div>
                    <div id='search-results'>
                        {searchResults[0] != null &&
                            <div id='display-single-workout'>
                                <div id='workout-text-elt'>Name: <br></br>{searchResults[0].Name}</div>
                                <div id='workout-text-elt'>Type:<br></br>{searchResults[0].Category}</div>
                                <div id='workout-text-elt'>Intensity:<br></br>{searchResults[0].Intensity}</div>
                                <div id='workout-text-elt'>Calories:<br></br>{searchResults[0].Calories_Burned}</div>
                                {searchResults[0].Description != null && searchResults[0].Description !== "" &&
                                    <div id='workout-text-elt'>Description:<br></br>{searchResults[0].Description}</div>
                                    }
                                {searchResults[0].Link != null && 
                                    <div id='workout-text-elt'>Link:<br></br>{searchResults[0].Link}</div>
                                    }
                            </div>
                        }
                        {searchResults[1] != null &&
                            <div id='display-single-workout'>
                                <div id='workout-text-elt'>Name: <br></br>{searchResults[1].Name}</div>
                                <div id='workout-text-elt'>Type:<br></br>{searchResults[1].Category}</div>
                                <div id='workout-text-elt'>Intensity:<br></br>{searchResults[1].Intensity}</div>
                                <div id='workout-text-elt'>Calories:<br></br>{searchResults[1].Calories_Burned}</div>
                                {searchResults[1].Description != null && searchResults[1].Description !== "" &&
                                    <div id='workout-text-elt'>Description:<br></br>{searchResults[1].Description}</div>
                                    }
                                {searchResults[1].Link != null && 
                                    <div id='workout-text-elt'>Link:<br></br>{searchResults[1].Link}</div>
                                    }
                            </div>
                        }
                        {searchResults[2] != null &&
                            <div id='display-single-workout'>
                                <div id='workout-text-elt'>Name: <br></br>{searchResults[2].Name}</div>
                                <div id='workout-text-elt'>Type:<br></br>{searchResults[2].Category}</div>
                                <div id='workout-text-elt'>Intensity:<br></br>{searchResults[2].Intensity}</div>
                                <div id='workout-text-elt'>Calories:<br></br>{searchResults[2].Calories_Burned}</div>
                                {searchResults[2].Description != null && searchResults[2].Description !== "" &&
                                    <div id='workout-text-elt'>Description:<br></br>{searchResults[2].Description}</div>
                                    }
                                {searchResults[2].Link != null && 
                                    <div id='workout-text-elt'>Link:<br></br>{searchResults[2].Link}</div>
                                    }
                            </div>
                        }
                        {searchResults[3] != null &&
                            <div id='display-single-workout'>
                                <div id='workout-text-elt'>Name: <br></br>{searchResults[3].Name}</div>
                                <div id='workout-text-elt'>Type:<br></br>{searchResults[3].Category}</div>
                                <div id='workout-text-elt'>Intensity:<br></br>{searchResults[3].Intensity}</div>
                                <div id='workout-text-elt'>Calories:<br></br>{searchResults[3].Calories_Burned}</div>
                                {searchResults[3].Description != null && searchResults[3].Description !== "" &&
                                    <div id='workout-text-elt'>Description:<br></br>{searchResults[3].Description}</div>
                                    }
                                {searchResults[3].Link != null && 
                                    <div id='workout-text-elt'>Link:<br></br>{searchResults[3].Link}</div>
                                    }
                            </div>
                        }
                        {searchResults[4] != null &&
                            <div id='display-single-workout'>
                                <div id='workout-text-elt'>Name: <br></br>{searchResults[4].Name}</div>
                                <div id='workout-text-elt'>Type:<br></br>{searchResults[4].Category}</div>
                                <div id='workout-text-elt'>Intensity:<br></br>{searchResults[4].Intensity}</div>
                                <div id='workout-text-elt'>Calories:<br></br>{searchResults[4].Calories_Burned}</div>
                                {searchResults[4].Description != null && searchResults[4].Description !== "" &&
                                    <div id='workout-text-elt'>Description:<br></br>{searchResults[4].Description}</div>
                                    }
                                {searchResults[4].Link != null && 
                                    <div id='workout-text-elt'>Link:<br></br>{searchResults[4].Link}</div>
                                    }
                            </div>
                        }
                        {searchResults[5] != null &&
                            <div id='display-single-workout'>
                                <div id='workout-text-elt'>Name: <br></br>{searchResults[5].Name}</div>
                                <div id='workout-text-elt'>Type:<br></br>{searchResults[5].Category}</div>
                                <div id='workout-text-elt'>Intensity:<br></br>{searchResults[5].Intensity}</div>
                                <div id='workout-text-elt'>Calories:<br></br>{searchResults[5].Calories_Burned}</div>
                                {searchResults[5].Description != null && searchResults[5].Description !== "" &&
                                    <div id='workout-text-elt'>Description:<br></br>{searchResults[5].Description}</div>
                                    }
                                {searchResults[5].Link != null && 
                                    <div id='workout-text-elt'>Link:<br></br>{searchResults[5].Link}</div>
                                    }
                            </div>
                        }
                        {searchResults[6] != null &&
                            <div id='display-single-workout'>
                                <div id='workout-text-elt'>Name: <br></br>{searchResults[6].Name}</div>
                                <div id='workout-text-elt'>Type:<br></br>{searchResults[6].Category}</div>
                                <div id='workout-text-elt'>Intensity:<br></br>{searchResults[6].Intensity}</div>
                                <div id='workout-text-elt'>Calories:<br></br>{searchResults[6].Calories_Burned}</div>
                                {searchResults[6].Description != null && searchResults[6].Description !== "" &&
                                    <div id='workout-text-elt'>Description:<br></br>{searchResults[6].Description}</div>
                                    }
                                {searchResults[6].Link != null && 
                                    <div id='workout-text-elt'>Link:<br></br>{searchResults[6].Link}</div>
                                    }
                            </div>
                        }
                        {searchResults[7] != null &&
                            <div id='display-single-workout'>
                                <div id='workout-text-elt'>Name: <br></br>{searchResults[7].Name}</div>
                                <div id='workout-text-elt'>Type:<br></br>{searchResults[7].Category}</div>
                                <div id='workout-text-elt'>Intensity:<br></br>{searchResults[7].Intensity}</div>
                                <div id='workout-text-elt'>Calories:<br></br>{searchResults[7].Calories_Burned}</div>
                                {searchResults[7].Description != null && searchResults[7].Description !== "" &&
                                    <div id='workout-text-elt'>Description:<br></br>{searchResults[7].Description}</div>
                                    }
                                {searchResults[7].Link != null && 
                                    <div id='workout-text-elt'>Link:<br></br>{searchResults[7].Link}</div>
                                    }
                            </div>
                        }
                        {searchResults[8] != null &&
                            <div id='display-single-workout'>
                                <div id='workout-text-elt'>Name: <br></br>{searchResults[8].Name}</div>
                                <div id='workout-text-elt'>Type:<br></br>{searchResults[8].Category}</div>
                                <div id='workout-text-elt'>Intensity:<br></br>{searchResults[8].Intensity}</div>
                                <div id='workout-text-elt'>Calories:<br></br>{searchResults[8].Calories_Burned}</div>
                                {searchResults[8].Description != null && searchResults[8].Description !== "" &&
                                    <div id='workout-text-elt'>Description:<br></br>{searchResults[8].Description}</div>
                                    }
                                {searchResults[8].Link != null &&
                                    <div id='workout-text-elt'>Link:<br></br>{searchResults[8].Link}</div>
                                    }
                            </div>
                        }
                        {searchResults[9] != null &&
                            <div id='display-single-workout'>
                                <div id='workout-text-elt'>Name: <br></br>{searchResults[9].Name}</div>
                                <div id='workout-text-elt'>Type:<br></br>{searchResults[9].Category}</div>
                                <div id='workout-text-elt'>Intensity:<br></br>{searchResults[9].Intensity}</div>
                                <div id='workout-text-elt'>Calories:<br></br>{searchResults[9].Calories_Burned}</div>
                                {searchResults[9].Description != null && searchResults[9].Description !== "" &&
                                    <div id='workout-text-elt'>Description:<br></br>{searchResults[9].Description}</div>
                                    }
                                {searchResults[9].Link != null && 
                                    <div id='workout-text-elt'>Link:<br></br>{searchResults[9].Link}</div>
                                    }
                            </div>
                        }
                    </div>
                </div>
        </div>
    )
}