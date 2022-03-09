import React, {useRef, useEffect, useState}from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { db, auth } from '../../firebase';
import './UploadWorkout.css'
// Added geofire for recording locations and searching nearby
const geofire = require('geofire-common');

// Geofire reference/instructions

// queryHashes takes in lat, lng, dist, and returns docs for 
// workouts within dist of [lat,lng]
function queryHashes(lat=34, lng=-118, dist=10) {
    //js/react goes here

    // CODE from https://firebase.google.com/docs/firestore/solutions/geoqueries
    // TODO: Edit code so it... actually works
    // find workouts within x km of lat, lng
    const center = [lat, lng] // TODO: replace placeholder values with user location
    const radiusInM = dist*1000 // 100 km TODO: Replace with variable distance

    // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
    // a separate query for each pair. There can be up to 9 pairs of bounds
    // depending on overlap, but in most cases there are 4.
    const bounds = geofire.geohashQueryBounds(center, radiusInM);
    const promises = [];
    for (const b of bounds) {
        const q = db.collection('workout')
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
        console.log("docs")
        console.log(matchingDocs[0].get('Description'))
    });
}
function search(type, intensity, calories, lat, lng, dist){
    const workoutsRef = db.collection('workouts');
}

export default function WorkoutSearch(props){
    //return html
    return(
        <body>
            <div className='single-input' id='CoordinateEntryContainer'>
                <div id='LatitudeEntry'>
                    <h1 id="input-question">Latitude</h1>
                    <input
                    className='inputBox'
                    type="text"
                    //value={latitude}
                    //onChange={(e) => setLatitude(e.target.value)}
                    />
                </div>
                <div id='LongitudeEntry'>
                    <h1 id="input-question">Longitude</h1>
                    <input
                    className='inputBox'
                    type="text"
                    // value={longitude}
                    // onChange={(e) => setLongitude(e.target.value)}
                    />
                </div>
            </div>
            <div className='single-input' id='SearchRadiusEntry'>

            </div>
            <div className='single-input' id='WorkoutIntensityEntry'>
            <h1 id="input-question">Calories burned in 1 hour?</h1>
                <input 
                className='inputBox'
                type="number"
                // value={caloriesBurned}
                // onChange={(e) =>setCaloriesBurned(e.target.value)}
                />
            </div>
            <div className='single-input' id='WorkoutTypeEntry'>
                <label id="category-question" for="selectCategory">Select the category for your workout</label>
                {/* <select name="selectCategory" id="category-input" value={category} onChange={(e) =>setCategory(e.target.value)}>
                    <option value="chest">Chest</option>
                    <option value="back">Back</option>
                    <option value="bicep">Bicep</option>
                    <option value="shoulder">Shoulder</option>
                    <option value="tricep">Tricep</option>
                    <option value="leg">Leg</option>
                    <option value="cardio">Cardio</option>
                    <option value="abs">Abs</option>
                    </select> */}
                </div>
            <div className='single-input' id='SearchResults'>

            </div>
            {0? <h1>Uploading your workout, please wait!</h1> : 
            <button id='SubmitButton' onClick={1} >
                Submit Workout
            </button>
            }
        </body>
    )
}
