import React, {useState} from 'react'
import '../styles/MainContent.scss'
import {ReactComponent as CookSvg} from '../icons/cook.svg'
import GetRecipes from './GetRecipes'
import {Link} from 'react-router-dom'

const PreviewContent = ()=>{

    const [query,setQuery] = useState('chicken')

    return(
        <div className='main-wrapper'>            
            <div className='main'>
                <h1 className='main__header'>Magic Recipes</h1>
                <p className = 'main__description main__description--change-width'>Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. </p>
                <form className='formWrapper'>
                    <input className='formWrapper__input' onChange={(e)=>{setQuery(e.target.value)}} type='text' value={query} />
                    <Link className='btn' to={`/showRecipe/${query}`}>Search</Link>                   
                </form>
            </div>          
        </div>
    )
}

export default PreviewContent