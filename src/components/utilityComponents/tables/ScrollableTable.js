import React from "react";
import './pickemTable.css'
import BannedNotBanned from "../visuals/BannedNotBanned";

/**
 * 
 * @param {object} props object that contains the following keys Header - is the tile 
 * @returns 
 */

const ScrollableTable = (props) => {

    const headers = props.header.map((value,index) => <th className="restWidth" key={index}>{value}</th> );
    var users = props.users.map((value,index) => <tr onClick={'temp'} className="hover tableRow" key={value + toString(index)}> <td className="userNameWidth">{value.userName}</td> <td className="restWidth" >{<BannedNotBanned banned={value.banned}/>}</td> <td className="restWidth"><BannedNotBanned banned={value.userNameBan}/></td><td className="restWidth"><BannedNotBanned banned={value.chatBan}/></td> </tr>)
    
    return(
        <div id="tableBackground">
            <div className="tableFixHead">
                <table>
                    <thead>
                    <tr>
                        <th key={'userName'}>Username</th>
                        {headers}
                    </tr>
                    </thead>
                    <tbody>
                        {users}
                    </tbody>
                </table>
            </div>
        </div>

    );
}





export default ScrollableTable;