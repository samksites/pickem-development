import React from "react"
import './css/header.css'

const Header = (props) => {

return (
    <div className="header centerColumn" style={ {width: props.width, marginTop: props.top}}>
        <h2>{props.text}</h2>
    </div>
)
}



export default Header