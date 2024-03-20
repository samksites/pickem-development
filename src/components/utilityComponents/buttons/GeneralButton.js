import React from 'react';
import '../../general.css'


const GeneralButton = (props) => {

    let classString = '';

    if(props.clickFalse === true){
        classString = 'generalButtonNoClick';

    } else{
        classString = 'generalButton hover';
    }

    

return (
<div className={classString} onClick={ props.func}>{props.content}</div>
);

}

export default GeneralButton;