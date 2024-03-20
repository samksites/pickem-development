import React from "react";
import './helper.css'


/**
 * Pass in a list of elements and will allow users to scroll through the elements
 * @param {*} props 
 * @returns scrollable box component
 */
const ScrollableBox = (props) => {



    return(
        <div id="scrollBoxBackground">
            <div className="scrollBoxFixedHead">
                <table>
                    <thead>
                    <tr>
                        {props.headers}
                    </tr>
                    </thead>
                    <tbody>
                        {props.rows}
                    </tbody>
                </table>
            </div>
        </div>
    );

}


export default ScrollableBox;