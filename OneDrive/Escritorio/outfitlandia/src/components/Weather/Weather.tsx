import "./Weather.css"
import React from "react"
const Weather = ()=>{

    return(
        <div className="Weather">
            <div className='Weather--info'>
                <img src="/src/images/09d.svg" alt="" />
            </div>
            <div className='Weather--info'>
                <p>14.3 °C</p>
            </div>
            <div className='Weather--info winter'>
                <img src="/src/images/wind.svg" alt="" />
                <span>12km/h</span>
            </div>
        </div>
        
    )
}

export default Weather