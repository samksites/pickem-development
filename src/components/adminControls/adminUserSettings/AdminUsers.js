import React from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import NavBar from "../../utilityComponents/NavBar"
import GeneralButton from "../../utilityComponents/buttons/GeneralButton";
import "../admin.css"
import "../../general.css"
import { auth } from "../../../firebase";


const AdminUsers = (props) => {


    return (
        <div>
            <NavBar title={"View Users"} />
            <UserArray />
            
        </div>
    )
};

const UserArray = (props) => {

    const [listUsers, setUsers] = useState(null);

    const [user] =  useAuthState(auth);



    const getData = async (data) => {
            
            
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userName: data.target.value, adminID:user.uid})
                
            }

            let users = await fetch('http://localhost:3000/findusers',config);
            let usersMap = await users.json()
            usersMap = <div className="centerColumn">{usersMap.users.map((user) => <div className="editUsers justifyRowSpaceB"><h4>{user.userName}</h4> <GeneralButton content={"Edit"}/> </div> )} </div>
            setUsers(usersMap);
    }

    return (
        <div className="centerColumn">
                <div id="searchContainer">
                    <div className="centerColumn">
                        <div>
                            <input  onChange={getData} placeholder="Search users name" type={"text"}></input>
                        </div>
                        {listUsers}
                    </div>
                </div>
            </div>
    )

}

export default AdminUsers;