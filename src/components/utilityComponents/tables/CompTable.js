import React from "react";
import './pickemTable.css'
import '../../general.css'


const CompTable = (props) => {

    var tableHover = 'hover';

    var compPage = 'compTable';

    if(props.cssValue === true){
        compPage = 'compsCSS';
    }
    
    if(props.noHover === true){
      tableHover = '';
    }
  
    const tableRows = props.table.rankings.map((value, index) => 
      <tr className="compTableRows" key={index}>
        <th className="place"> <span className="index"> {index + 1 + '.'}</span></th>
        <th className="username"><a href="value.userName" className="hover">{value.userName} </a> </th>
        <th className="points ">{value.points}</th>
      </tr> 
    )


    return (
        <div className="centerColumn">
          <h2 className="compTitles">{props.table.compDetails.name}</h2>
          <table className={compPage + " tableBorder "}>
            <tbody >
              <tr className={"compTableHeader " + tableHover}>
                <th className="place"><span>Place</span></th>
                <th className="username">Username</th>
                <th className="points">points</th>
              </tr>
              {tableRows}
            </tbody>
          </table>
        </div>
       

        );
}



export default CompTable;