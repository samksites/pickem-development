import React from "react";
import {useState, useEffect } from 'react';
import SearchBar from '../../utilityComponents/buttons/SearchBar';
import NavBar from "../../utilityComponents/displays/NavBar";
import Loading from "../../utilityComponents/visuals/Loading";
import ScrollableTable from "../../utilityComponents/tables/ScrollableTable";
import BackArrow from "../../utilityComponents/buttons/BackArrow";
import {onAuthStateChanged } from 'firebase/auth';
import {auth} from '../../../firebase';
import '../css/adminPage.css';


const SearchUser = (props) => {
    const [searchText, setText] = useState({name:''});
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState([]);


    useEffect(() => {

        const findUsers = async (uid) => {
            let listUsers = await fetch(`http://localhost:3000/admin/getUsers?name=${searchText.name}&id=${uid}`);
            var users = await listUsers.json();
            setUserData(users);
            setLoading(false);
            
        }

        onAuthStateChanged(auth, async (data) => {
        
            if(data){
                
                findUsers(data.uid)
            }else{
            }
            
        })

        
    

  }, [searchText]);
    if(loading){
        return <Loading />
    }
    return (
    <div>
        <NavBar page={'admin'} user={true} />
        <div id="userPlacement" className="flex-column-start-center">
            <div id="useBackground" className="flex-column-start-center">
                <div id="arrowPlacement" className="flex-super-center">
                    <BackArrow size={30} func={() => props.returnHome(0)} />
                </div>
                
                <div id="searchBarPlacement">
                    <SearchBar obj={searchText}  setSearch={setText} tempText={'Search for competitions'} />
                </div>
                <ScrollableTable header={['Banned','Username ban','Chat ban']} users={userData} />
            </div>
        </div>
    </div>
    );
}


export default SearchUser;