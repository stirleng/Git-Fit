import React, {useState, useEffect} from 'react'
import {useAuth} from '../../contexts/AuthContext'
import {db} from '../../contexts/firebase';
import '../styles/Stats.css'

export default function Stats() {

    const [protein, setProtein] = useState(0);
    const {currentUser} = useAuth();
    const [name, setName] = useState('');
    const [userSeconds, setUserSeconds] = useState(0);
    const [activeDays, setActiveDays] = useState(0);
    const [feet, setFeet] = useState(0);
    const [inches, setInches] = useState(0);
    const [weight, setWeight] = useState(0);
    const [sex, setSex] = useState('');
    const [age, setAge] = useState(0);
    const [newVal, setNewVal] = useState(0)
    const [toChange, setToChange] = useState('')

    async function getUserSeconds() {
        await db.collection("users").doc(currentUser.uid).get().then((snapshot) => {
            if (snapshot) {
                setUserSeconds(snapshot.data().Start_Date.seconds)
            }
        })
    }

    const currentDate = new Date().getTime() / 1000;
    const diffSecond = currentDate - userSeconds;
    const daySinceStart = Math.floor(diffSecond / (3600 * 24)) + 1;

    useEffect(() => {
        getUserSeconds()
        onRender()
    }, []);

    // await db.collection("users").doc(currentUser.uid).get().then((snapshot) =>{
    //access data
    //})
    let uid = currentUser.uid;

    async function changeInfo(tag, val) {
        switch (tag) {
            case '':
                alert("Please select a field to edit")
                return

            case "Sex":
                 await db.collection("users").doc(uid).update({
                        Sex: val
                        });
                  break;

            default:
                await db.collection("users").doc(uid).update({
                    [tag]: parseFloat(val)
                    });
                break;
            
        }

        if (tag === "Age"){
            setAge(val)
        }else if (tag === "Height_ft"){
            setFeet(val)
        }else if (tag === "Height_in"){
            setInches(val)
        }else if (tag === "Weight"){
            setWeight(val)
        }
    }
    //access user info in the backend
    async function onRender() {
        await db.collection("users").doc(uid).get().then((snapshot) => {
            let data = snapshot.data()

            setAge(data.Age);
            setFeet(data.Height_ft);
            setInches(data.Height_in);
            setWeight(data.Weight);
            setSex(data.Sex);
            setProtein(data.Proteins_Consumed)
            let name = data.Name;
            setActiveDays(data.Chest_Days + data.Arms_Days + data.Leg_Days);
            setName(name)
        })
    }



    // //runs whenever page loads
    // useEffect(() => {
        
    // }, []);

    let cal = 0
    let prot = protein
    let projected = weight - 5
    if (sex === 'm')
    {
        cal = (1.55 * (88.362 + (13.397 * 0.453592 * weight) + (4.799 * 2.54 * (12 * feet + inches)) - (5.677 * age)) - 500).toFixed(2)
    }
    else {
        cal = (1.55 * (447.593 + (9.247 * 0.453592 * weight) + (3.098 * 2.54 * (12 * feet + inches)) - (4.330 * age)) - 500).toFixed(2)
    }

    let cr = (daySinceStart === 0) ? activeDays : activeDays / daySinceStart;
    return (
        <div id='header'>
            <h1>
                {name}'s Fitness Numbers
            </h1>
            {cal && age && weight ? <body>
            If you eat about <b>{cal}</b> calories a day and follow your plan, you will weigh less
            than <b>{projected}</b> lbs in just 5 weeks! <br></br>Keep it up
            <br></br><br></br>

            It's been <b>{daySinceStart}</b> days since you joined, and you've completed <b>{activeDays}</b> workouts.
            <br></br><br></br>
            Average Workouts Per Day: {cr}
            <br></br><br></br>
            Over the course of your time here, you've
            consumed {prot.toFixed(2)} grams of proteins! Eating a high-protein <br></br>
            diet is the best way to build muscle while burning fat!
            <br></br><br></br>

            Your Physique Info:
            <div id='info'>
                {age}{sex}: {feet}'{inches}" and {weight} lbs
            </div>

            </body> : <body>
            Loading
            </body>}
            <div id='dualField'>
                <div id="select">
                    <select onClick={(e) => {
                        setToChange(e.target.value)
                    }}>
                        Workout Preference
                        <option value=''>Need to update some info?</option>
                        <option value="Age">Age</option>
                        <option value="Height_ft">Height (feet)</option>
                        <option value="Height_in">Height (inches)</option>
                        <option value="Weight">Weight</option>
                    </select>

                    <div>
                        <input
                            className='inputBox'
                            placeholder=' New Value'
                            type="text"
                            value={newVal}
                            onChange={(e) => {
                                setNewVal(e.target.value)
                            }
                            }
                        />
                    </div>

                    <button type="button" onClick={() => {
                        changeInfo(toChange, newVal)
                    }}>
                        Update Info
                    </button>
                </div>
            </div>
        </div>
    )
}