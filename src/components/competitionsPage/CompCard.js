import React from "react";
import './css/competionsPage.css'
import '../general.css'

const CompCard = (props) => {


    var compTxt = ''
    var compColor = ''
    if(props.status === '1'){
        compTxt = 'Live Comp'
        compColor = 'current'
    } else if(props.status === '-1'){
        compTxt = 'Past Comp'
        compColor = 'past'

    } else{
        compTxt = 'Upcoming Comp'
        compColor = 'upcoming'

    }

    const compStatus = 
    <div className="compCard hover" onClick={props.action}>
        <div className="centerSpace">
            <h4 className="alighnTextCenter">{props.name}</h4>
            <div className={"statusBackground centerColumn " + compColor} > 
                <p className="alighnTextCenter">{compTxt}</p>
            </div>
        </div>
    

    </div>


    return( <div >
        {compStatus}

    </div>
       
    )
}



export default CompCard;