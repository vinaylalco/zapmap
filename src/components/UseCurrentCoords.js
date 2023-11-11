import React, { useState, useEffect } from "react"
import Geolocation from "@react-native-community/geolocation"

function UseCurrentCoords({setFindingCoords, setDynamicCoords}){
    
    useEffect(() => {
        setFindingCoords(true)
        Geolocation.getCurrentPosition((info) => {
            setDynamicCoords(info.coords.latitude+","+info.coords.longitude)
            setFindingCoords(false)
        })
    }, []);
}

export default UseCurrentCoords;
