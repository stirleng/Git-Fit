import React, {useRef, useEffect, useState}from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './UploadWorkout.css'
// Added geofire for recording locations and searching nearby
const geofire = require('geofire-common');

// Geofire reference/instructions

// TODO: Is this how i name a function even if multiple search functions defined?
export default function queryHashes(props) {
    //js/react goes here

    // CODE from https://firebase.google.com/docs/firestore/solutions/geoqueries
    // TODO: Edit code so it... actually works
    // find workouts within x km of lat, lng
    const center = [34, 118] // TODO: replace placeholder values with user location
    const radiusInM = 10*1000 //10 km

    // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
    // a separate query for each pair. There can be up to 9 pairs of bounds
    // depending on overlap, but in most cases there are 4.
    const bounds = geofire.geohashQueryBounds(center, radiusInM);
    const promises = [];
    for (const b of bounds) {
        const q = db.collection('workout')
            .orderBy('geohash')
            .startAt(b[0])
            .endAt(b[1]);

        promises.push(q.get());
    }

    // Collect all the query results together into a single list
    Promise.all(promises).then((snapshots) => {
    const matchingDocs = [];

    for (const snap of snapshots) {
        for (const doc of snap.docs) {
        const lat = doc.get('latitude');
        const lng = doc.get('longitude');

        // We have to filter out a few false positives due to GeoHash
        // accuracy, but most will match
        const distanceInKm = geofire.distanceBetween([lat, lng], center);
        const distanceInM = distanceInKm * 1000;
        if (distanceInM <= radiusInM) {
            matchingDocs.push(doc);
        }
        }
    }
    
    return matchingDocs;
    }).then((matchingDocs) => {
    // Process the matching documents
        matchingDocs[0].then((snapshot) =>{
            if (snapshot){
                var a = snapshot.data()
                console.log(a)
            }
        });

    //return html
    return(
        <body>

        </body>
    )
}
