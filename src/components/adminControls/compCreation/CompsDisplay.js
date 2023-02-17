import React from 'react';
import './css/createComps.css'
import '../../general.css'
import GeneralButton from '../../utilityComponents/buttons/GeneralButton';
import CloseWarning from '../../utilityComponents/displays/CloseWarning';
import {useState} from 'react';

const headerTextNoSave =  <h2 className="alighnTextCenter">Warning you are attempting to dealeat a compotition this action can't be undone</h2>
const bodyTextNoSave = <p className="alighnTextCenter">If you wish to continue with out saving please click confirm. <br/> 
If you would like to save your work or continue editing click on the button in the top left.</p>


const CompsDisplay = (props) => {
    
    const [displayWarning, setDisplayWarning] = useState(null); 

    return (
        <div className='comps'>
            <h4 style={{marginBottom: '20px'}}>{props.title}</h4>
            <div className='justifyRow'> <GeneralButton content={'Edit'} func={props.edit} /> <GeneralButton content={"Deleate"} func={() => setDisplayWarning(<CloseWarning headerText={headerTextNoSave} bodyText={bodyTextNoSave} classN={'compWarning'} path={''} exitFunc={() => setDisplayWarning(null)} confirmFunc={() => {setDisplayWarning(null); props.removeComp(props.index, props.id)}} />)}/>  </div>
            {displayWarning}
        </div>
    );

}


export default CompsDisplay;