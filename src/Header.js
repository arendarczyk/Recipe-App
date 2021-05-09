import React from 'react'
import './header.css'
import {ReactComponent as CookSvg} from './icons/cook.svg'

const Header = ()=>{
    return(
        <div>
            <div className='header'>
                <span className='mainLogo'><CookSvg/></span>
            </div>
        </div>
    )
}

export default Header