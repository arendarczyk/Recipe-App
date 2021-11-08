import React from 'react'
import '../styles/ShowRecipes.scss'
import {ReactComponent as CutlerySvg} from '../icons/cutlery.svg'
import {ReactComponent as SmileySvg} from '../icons/smiley.svg'
import {ReactComponent as TimerSvg} from '../icons/timer.svg'

const toggleIngredients = (e) =>{
    //const currentIngredientsList = e.target.nextSibling;
    //currentIngredientsList.style.display == 'none' ? currentIngredientsList.style.display = 'block' : currentIngredientsList.style.display = 'none'
}

const displayNone = {
    display: 'none'
}

const ShowRecipes = ({title, mealType, dietLabel, image, time, ingredients, calories}) =>{
    return(
        <div className='recipeWrapper'>
            <img className='image' src ={image}/>
            <div className='infoAboutRecipe'>
                <div className='title'>{title}</div>
                <div className='mealType'><CutlerySvg /> {typeof mealType == 'undefined' ? <span className='type'> - </span> : <span className='type'> {mealType} </span>}</div>
                <div className='infoWrapper'>
                    <p className='recipeDescription'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum, mollitia.</p>
                    <div className='infoWrapperHelper'>
                        <div className='tdWrapper'>
                            <div className='recipeInfo'><SmileySvg /> {dietLabel.length==0 ? <span className='type'> - </span> : <span className='type'> {dietLabel} </span>}</div>
                            <div className='recipeInfo'><TimerSvg /> {time==0 ? <span className='type'> - </span> : <span className='type'> {time} min </span>}</div>
                        </div>
                        <button className='showIngredientsBtn' onClick={()=>{ window.alert(`Ingredients: ${ingredients.map(e=> "\n" + e.text )}`)}}>Show Ingredients</button>
                    </div>
                </div>
            </div>                              
                    <div style={displayNone} className='ingredientsWrapper'>
                        Ingredients: <ul>{ingredients.map((e, key)=>(<li key={key}>{e.text} 
                        <div>
                            <img /*src={e.image}*//>
                        </div></li>))}</ul>
                        {/* <div>
                        V   itamins +
                            <div> </div>
                        </div> */}
                    </div>                    
                <div className='calories'>Calories: {Math.round(calories)}</div>           
        </div>
    )
}

export default ShowRecipes