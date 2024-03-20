import React from "react";
import {useState, useEffect } from 'react';
import BackArrow from "../../utilityComponents/buttons/BackArrow";
import Loading from "../../utilityComponents/visuals/Loading";
import {auth} from '../../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import CompForm from '../../utilityComponents/forms/createCompForm/CompForm'
import '../css/adminPage.css'


/**
 * This component is called when editing a comp. It can either be passed in a reference ID and make a fetch for that comp info or make a
 * call to create a new comp and get the info about that comp and pass it to the CompForm component 
 * @param {object} props 
 * @returns Create comp component
 */

const CreateComp = (props) => {
    
    // sets if the page is loading or not.
    const [createCompForm, setCreateCompForm] = useState(<Loading />);

    useEffect(() => {

        // gets auth state meta data
        onAuthStateChanged(auth, async (data) => {
            
            // if user is logged in
            if(data){
                
                // if the reference id is undefined or a empty string make a new comp.
                if(props.referenceID === '' || props.referenceID === undefined){

                    // sets the post request parameters 
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ uid: data.uid })
                    }

                    // make a request to backed to create a new comp
                    let response = await fetch('http://localhost:3000/admin/editComp',requestOptions);
                    
                    // gets the comp details.
                    response = await response.json();

                    // if we received a comp back set the CompForm component 
                    if(response.newObject !== undefined){
                        setCreateCompForm(<CompForm uid={data.uid} referenceID={response.newObject[0].referenceID} compDetails={response.newObject[0].compDetails} />)
                    }
                
                // if reference id was passed in
                } else{
                    let refID = props.referenceID;
                    // makes a get request passing in the reference id and asking for a detailed response of the comp
                    var response = await fetch(`http://localhost:3000/general/getCompInfo?refID=${props.referenceID}&detailed=${false}`);
                    response = await response.json();
                    // if we received a comp back set the CompForm component 
                    setCreateCompForm(<CompForm uid={data.uid} referenceID={props.referenceID} compDetails={response.compDetails} />)
                    
                }
            }

    });
    

    }, [])

    

    return (

        <div >
            <div>
                <BackArrow />
                {createCompForm}
            </div>

        </div>


    );
}


export default CreateComp;