import React,{useState, useMemo} from 'react'
import ShowRecipes from './ShowRecipes'
import './recipe.css'
import {ReactComponent as ArrowSvg} from './icons/arrow.svg'

const GetRecipes = ()=> {

    const APP_ID = '8dae65a5'
    const APP_KEY = 'a3bf488a44759beebde2fab86ed32217'
    const [sortType, setSortType] = useState(null)
    const [input, setInput] = useState('chicken')
    const [recipes, setRecipes] = useState([])
    const [error, setError] = useState(null)
    const [counter, setCounter] = useState(0)

    const getInput = (e) =>{
        setInput(e.target.value.replace(/[^a-zA-Z@]/g, ''))
    }
    
    const getSearch = async (e)=>{
        e.preventDefault();
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
        console.log(sortType)
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
            e.style.transform += "translateX(-800px)"
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
            e.style.transform += "translateX(+800px)"
        })     
    }

    const setFirstRecipe = ()=>{
        const z = (counter * 800)
        const x = document.querySelectorAll('.recipeWrapper')
        console.log(z)
        x.forEach(e=>{
            e.style.transform += `translateX(${z}px)`
        })    
        setCounter(0); 
    }

    const showRecipes = async ()=>{
        const section = await document.querySelector('.hideHelper')
        section.style.display = 'block'
        document.querySelector('.recipesWrapper').scrollIntoView({behavior : "smooth", block: "center", inline: "center"})
    }

    return(
        <div>
            {error && <div>{ error  } {alert(error)} </div>}
            <div className='searchWrapper'>
                <form className='formWrapper' onSubmit={getSearch}>              
                    <input type='text' placeholder='Search...' value={input} onChange={getInput}/>
                    <button onClick={showRecipes} type='submit'></button>
                </form>               
            </div>  
            <div className='hideHelper'>
                <div className='secondSectionWrapper'>   
                    <span className='recipeCounter'>{counter+1}/{recipes.length}</span>
                    <div className='changeButtonWrapper'>
                    <button onClick={()=>{
                        setSortType(!sortType)
                        setFirstRecipe()
                        }} className='sortBtn'>Sort by calories {sortType==null? <b className='setSort'>Random</b> : sortType ? <b className='setSort'>Ascending</b> : <b className='setSort'>Descending</b>}</button>
                        <div>
                            <button className='changeButton previous' onClick={previousRecipe}><ArrowSvg/></button>
                            <button className='changeButton next' onClick={nextRecipe}><ArrowSvg/></button>
                        </div>                     
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