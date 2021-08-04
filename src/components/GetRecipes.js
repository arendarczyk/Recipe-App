import React,{useState, useMemo, useEffect} from 'react'
import ShowRecipes from './ShowRecipes'
import '../styles/GetRecipes.scss'
import {ReactComponent as ArrowSvg} from '../icons/arrow.svg'

const GetRecipes = ({ match })=> {

    const APP_ID = '8dae65a5'
    const APP_KEY = 'a3bf488a44759beebde2fab86ed32217'
    const [sortType, setSortType] = useState(null)
    const [input, setInput] = useState(match.params.id ? match.params.id : 'chicken')
    const [recipes, setRecipes] = useState([])
    const [error, setError] = useState(null)
    const [counter, setCounter] = useState(0)

    useEffect(()=>{
        getSearch()
    },[])

    const getInput = (e) =>{
        setInput(e.target.value.replace(/[^a-zA-Z@]/g, ''))
    }
    
    const getSearch = async (e)=>{
        try{          
            const query = await fetch(`https://api.edamam.com/search?q=${input}&app_id=${APP_ID}&app_key=${APP_KEY}`)
            const queryJson = await query.json()
            setRecipes(queryJson.hits)
            setError(null)
        }catch(err){
            setError(err.message)
        }      
    }

    const sortByCalories = useMemo(()=>{
        let arrayOfRecipes = [...recipes]
        let sortedArray = arrayOfRecipes.sort((a,b)=>{
                const recipeA = a.recipe.calories
                const recipeB = b.recipe.calories
                let comparison = 0;
                if(sortType){
                    if(recipeA>recipeB){
                        comparison =1
                    }else if(recipeA<recipeB){
                        comparison = -1
                    }
                }else if(!sortType){
                    if(recipeA<recipeB){
                        comparison =1
                    }else if(recipeA>recipeB){
                        comparison = -1
                    }
                }            
                return comparison
            })
        setRecipes(sortedArray)
    },[sortType])

    
    const nextRecipe = ()=>{       
        if(counter==(recipes.length-1)){
            return
        }
        setCounter(counter+1)
        const x = document.querySelectorAll('.recipeWrapper')
        //x[counter].classList.add('animation')       
        //x[counter].classList.contains('animation')?x[counter].classList.remove('animation') : x[counter].classList.add('animation')
        
        x.forEach(e=>{
            e.style.transform += "translateY(-350px)"
            // e.classList.add('animation')
        })
       
      
    }
    const previousRecipe = ()=>{
        if(counter==0){
            return
        }
        setCounter(counter-1)
        const x = document.querySelectorAll('.recipeWrapper')
        x.forEach(e=>{
            e.style.transform += "translateY(+350px)"
        })     
    }

    const setFirstRecipe = ()=>{
        const z = (counter * 350)
        const x = document.querySelectorAll('.recipeWrapper')
        x.forEach(e=>{
            e.style.transform += `translateY(${z}px)`
        })    
        setCounter(0); 
    }

    return(
        <div className='showRecipeWrapper'>
            {error && <div>{ error  } {alert(error)} </div>}
            <div className='searchWrapper'>
                <form className='formWrapper' onSubmit={(e)=>{
                    e.preventDefault()
                    getSearch(e)
                    }}>              
                    <input type='text' className='formWrapper__input' placeholder='Search...' value={input} onChange={getInput}/>
                    <button className='btn' type='submit'>Search</button>
                </form>               
            </div>  
            <div className='hideHelper'>
                <div className='secondSectionWrapper'>   
                    <span className='recipeCounter'>{counter+1}/{recipes.length}</span>
                    <div className='changeButtonWrapper'></div>
                    <button onClick={()=>{
                        setSortType(!sortType)
                        setFirstRecipe()
                        }} className='sortBtn'>Sort by calories {sortType==null? <b className='setSort'>Random</b> : sortType ? <b className='setSort'>Ascending</b> : <b className='setSort'>Descending</b>}</button>
                            <div className='switchBtns'>
                                <button className='changeButton previous' onClick={previousRecipe}><ArrowSvg/></button>
                                <button className='changeButton next' onClick={nextRecipe}><ArrowSvg/></button>
                            </div>                     
                       
                    <div className='recipesWrapper'>                
                        {recipes.map((recipe, index)=>(
                            <ShowRecipes key={index} title={recipe.recipe.label} mealType={recipe.recipe.mealType} dietLabel={recipe.recipe.dietLabels} image={recipe.recipe.image} time={recipe.recipe.totalTime} ingredients={recipe.recipe.ingredients} calories={recipe.recipe.calories}/>
                        ))}
                    </div>
                </div>
            </div>       
        </div>
    )
}

export default GetRecipes