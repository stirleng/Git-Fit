import React, {useState} from 'react'
import { useAuth } from '../../contexts/AuthContext'
import "./uploadmeal.css"


export default function UploadMeal() {

  const {setMeal, updateData} = useAuth()

  //variables to set error messages/render
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  //input to db
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isWhiteMeat, setIsWhiteMeat] = useState(false);
  const [recipeLink, setRecipeLink] = useState("");
  const [proteinSource, setProteinSource] = useState("")
  const [dishName, setDishName] = useState("")
  const [gramOfProtein, setGramOfProtein] = useState(0)
  const [calories, setCalories] = useState(0)

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
        //setMeal(dishName, isVegetarian, isWhiteMeat, recipeLink, proteinSource, gramOfProtein, calories)
        await setMeal(dishName, isVegetarian, isWhiteMeat, recipeLink, proteinSource, gramOfProtein, calories )
        await updateData("mealsCount")  //TODO: isn't this out of date? do we still have mealsCount
        setLoading(false)
    }catch(err){
        setError(err.message)
    }

    setLoading(false);

  }
  
  return (
    <div>
        <div id="title-container">
            <h1>Upload your meal!</h1>
        </div>

        <div id="input-container">

            <div id="single-input">
                <h1 id="input-question">Name of your dish!</h1>
                <input 
                className='inputBox'
                type="text"
                value={dishName}
                onChange={(e) =>setDishName(e.target.value)}
                />
            </div>

            <div id="vegetarian-container">
                <input 
                className='inputBox'
                name="isVegetarian"
                type="checkbox"
                value={isVegetarian}
                onChange={() =>setIsVegetarian(!isVegetarian)}
                />
                <label for="isVegetarian">Is this dish vegetarian?</label>
            </div>

            <div id="whitemeat-container">
                <input 
                className='inputBox'
                name="isWhiteMeat"
                type="checkbox"
                value={isWhiteMeat}
                onChange={() =>setIsWhiteMeat(!isWhiteMeat)}
                />
                <label for="isWhiteMeat">Is this dish white-meat-based?</label>
            </div>

            <div id="single-input">
                <h1 id="input-question">Recipe Link? (from allrecipe.com link)</h1>
                <input 
                className='inputBox'
                placeholder='...allrecipes.com'
                type="text"
                value={recipeLink}
                onChange={(e) =>setRecipeLink(e.target.value)}
                />
            </div>

            <div id="single-input">
                <h1 id="input-question">Protein Source?</h1>
                <input 
                className='inputBox'
                placeholder='Beef, Chicken, Tofu, etc'
                type="text"
                value={proteinSource}
                onChange={(e) =>setProteinSource(e.target.value)}
                />
            </div>

            <div id="single-input">
                <h1 id="input-question">How many grams of protein?</h1>
                <input 
                className='inputBox'
                placeholder='How much grams of proteins?'
                type="number"
                value={gramOfProtein}
                onChange={(e) =>setGramOfProtein(e.target.value)}
                />
            </div>
            

            <div id="single-input">
                <h1 id="input-question">How many calories?</h1>
                <input 
                className='inputBox'
                placeholder='How much grams of proteins?'
                type="number"
                value={calories}
                onChange={(e) =>setCalories(e.target.value)}
                />
            </div>

        </div>

        <div id="submit-container">
            {loading? <h1>Uploading your meal, please wait!</h1> : 
            <button id='SubmitButton' onClick={handleSubmit}>
                Submit Meal
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
