import React from 'react';
import './css/homePage.css'
import '../general.css'


const NextComp = (props) =>{

    return(
        
        <div id='nextComp'>
            <h2 className='nextCompHeader'>{props.title}</h2>
            <div id='spacer'></div>
            <h2 className='nextCompHeader'>{props.timeTill}</h2>
        </div>
        

    )

}

export default NextComp;