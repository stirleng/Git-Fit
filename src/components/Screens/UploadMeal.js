import React, {useState} from 'react'
import { useAuth } from '../../contexts/AuthContext'
import "./uploadmeal.css"

export default function UploadMeal() {

  const {setMeal} = useAuth()

  //variables to set error messages/render
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  //input to db
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isWhiteMeat, setIsWhiteMeat] = useState(false);
  const [recipeLink, setRecipeLink] = useState("");
  const [proteinSource, setProteinSource] = useState("")
  const [dishName, setDishName] = useState("")

  async function handleSubmit(e) {
   
    e.preventDefault()
    setError("")
    setLoading(true);

    if (dishName === ''){
        setError("need a name for the dish")
        setLoading(false)
        return
    }
    if (proteinSource === ''){
        setError("need a name for the protein")
        setLoading(false)
        return
    }
    //basic link checking
    if (!recipeLink.includes("allrecipes")){
        setError("invalid link")
        setLoading(false)
        return
    }


    try{
        //setMeal(dishName, isVegetarian, isWhiteMeat, recipeLink, proteinSource)
        await setMeal(dishName, isVegetarian, isWhiteMeat, recipeLink, proteinSource)
        setLoading(false)
        console.log("Success")
    }catch(err){
        setError(err.message)
    }

    setLoading(false);

  }
  
  return (
    <div>
        <div>UploadMeal</div>

        <div id="input-container">
            <input 
            className='inputBox'
            placeholder='Name of your Dish!'
            type="text"
            value={dishName}
            onChange={(e) =>setDishName(e.target.value)}
            />

            <div id="vegetarian-container">
                <input 
                className='inputBox'
                name="isVegetarian"
                type="checkbox"
                value={isVegetarian}
                onChange={() =>setIsVegetarian(!isVegetarian)}
                />
                <label for="isVegetarian">Is this dish Vegetarian?</label>
            </div>

            <div id="whitemeat-container">
                <input 
                className='inputBox'
                name="isWhiteMeat"
                type="checkbox"
                value={isWhiteMeat}
                onChange={() =>setIsWhiteMeat(!isWhiteMeat)}
                />
                <label for="isWhiteMeat">Is this dish Whitemeat based?</label>
            </div>

            <input 
            className='inputBox'
            placeholder='Recipe Link? (accept allrecipe.com link)'
            type="text"
            value={recipeLink}
            onChange={(e) =>setRecipeLink(e.target.value)}
            />

             <input 
            className='inputBox'
            placeholder='Protein Source?'
            type="text"
            value={proteinSource}
            onChange={(e) =>setProteinSource(e.target.value)}
            />

        </div>

        <div id="submit-container">
            {loading? <h1>Uploading your meal, please wait!</h1> : 
            <button onClick={handleSubmit}>
                submit
            </button>
            }
        </div>

        {error && 
        <div id="error-container">
            <h1>{error}</h1>    
        </div>
        }
        

    </div>
    
  )
}
