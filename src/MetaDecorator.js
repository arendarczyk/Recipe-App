import {Helmet} from 'react-helmet'

const MetaDecorator = ({title, description})=>{
    return(
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description}/>
            <meta property="og:description" content={`og:${description}`}/>
        </Helmet>
    )
}

export default MetaDecorator