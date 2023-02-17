import React from "react";
import "./admin.css"
import "../general.css"
import NavBar from "../utilityComponents/NavBar";
import { useNavigate } from "react-router-dom";

const AdminControl = (props) => {


    return(
    <div>
        <NavBar title={"Admin contrls"} />
        <div className="justifyRowSpaceA op">
            <Options dest={"/AdminContrls/AdminComp"} title={"Create and edit compotions"}/>
            <Options dest={"/AdminContrls/AdminUsers"} title={"Manage users"}/>
            
        </div>
        
    </div>
    
    );
}


export default AdminControl;


const Options = (props) => {

    const navigate = useNavigate()

    return(
    <div onClick={() => navigate(props.dest) } className="options">
        <h3>{props.title}</h3>
    </div>
    );
}