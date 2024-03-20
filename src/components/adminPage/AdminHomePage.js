import React from "react";
import NavBar from "../utilityComponents/displays/NavBar";
import '../general.css'
import './css/adminPage.css'

const AdminHomePage = (props) => {


    return(
        <div>
            <NavBar page={'admin'} user={true} />
            <div className="flex-column-start-center">
                <div className="optionsBox wrapCenterRow hover">
                    <div onClick={() => props.changePage(2)} className="adminOptions flex-super-center">
                        <p className="alighnTextCenter">Create competition </p>
                    </div>
                    <div onClick={() => props.changePage(1)} className="adminOptions flex-super-center">
                        <p className="alighnTextCenter">User management </p>
                    </div>
                    <div  className="adminOptions flex-super-center">
                        <p className="alighnTextCenter">Site settings </p>
                    </div>

                </div>

            </div>         
        </div>
    );
}


export default AdminHomePage;