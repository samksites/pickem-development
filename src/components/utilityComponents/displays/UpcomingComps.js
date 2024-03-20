import React from "react";
import GeneralButton from '../buttons/GeneralButton'
import './css/upComing.css';
import '../tables/pickemTable.css'
import '../../general.css'

const UpcomingComps = (props) => {

    const d = new Date(props.upComing.compDetails.entriesClose);

    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };


    const hour = parseInt(d.getHours()) > 12 ?  parseInt(d.getHours() - 12).toString() + ' PM' : d.getHours() + ' AM';

        
    return (
        <div className="centerColumn">
            <h2 className="compTitles" style={{height:'15px', marginBottom:'10px'}}>{props.upComing.compDetails.name}</h2>
        
            <div className="comingSoon centerSpace">

                
                <div className="centerSpace">
                    <h3 style={{height:'10px',marginBottom:'0px'}}>Last day to enter</h3>
                    <h4 className="alighnTextCenter" style={{marginBottom:'8px'}}>{d.toLocaleDateString('en-us', options) + ' at ' + hour + ' ET.'}</h4>
                </div>
                
                <div className="centerSpace">
                    <GeneralButton content={'Enter competition'}/>
                </div>
                
                
            </div>
        </div>
    );
}


export default UpcomingComps;