import React from 'react';
import './css/homePage.css'
import '../general.css'

const tableData = (table, name) =>(
    
            <div id='compotion'>
            <h2>{name}</h2>
            <table id='table'>
                <tbody>
                <tr>
                    <th className='rowWidth'>Username</th>
                    <th className='rowWidth'>Rank</th>
                    <th className='rowWidth'>Score</th>
                </tr>    
                {table} 
            </tbody>
            </table>    
        </div>
)


const CurrentComp = (props) =>{
            
            var rankings = props.current;
            
            const rankingsTable = rankings.map((rank,i) => (
                <tr key={i}>
                    
                    <td className='rowWidth'>{rank[0]}</td>
                    <td className='rowWidth'>{i + 1}</td>
                    <td className='rowWidth'>{rank[1]}</td>
                </tr>
            ))

            const currentCompPage = tableData(rankingsTable, props.name);
  

    return(
        currentCompPage
    )

}

export default CurrentComp;