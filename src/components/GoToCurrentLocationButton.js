import React, { useCallback } from "react";
import { Pressable,Image } from "react-native";
import {GetEvents} from '../functions/usefulFunctions'
const queryOverpass = require('@derhuerst/query-overpass')
import {CommonStyles} from '../styles/CommonStyles'
import goToLocation from '../../assets/goToLocation.svg'
import {useMap,useMapEvents} from "react-leaflet"

export default function GoToCurrentLocationButton({ 
    CurrentLat, 
    CurrentLng,
    zoom,
    mapstrpublickey,
    ndk,
    setLocations,
    HasNoListings,
    setHasNoListings,
    radius,
    radiusOSM
}) {     

    const map = useMap()
    const onClick = useCallback(() => {

        map.setView([CurrentLat,CurrentLng], zoom)

        GetEvents(
            CurrentLat,
            CurrentLng,
            mapstrpublickey,
            ndk,
            'mapstrLocationEvent'
        ).then((NostrResults) => {

            const overpassLocales = queryOverpass(
                        '[out:json];'+
                        '('+
                            'node[name]["currency:XBT"="yes"](around:'+radius+','+CurrentLat+', '+CurrentLng+');'+
                        ')'+
                        ';out center;')
                .then( (OSMResults) => {
                    
                    let tempLocations = [...OSMResults, ...NostrResults]
                    setLocations(tempLocations)
                    if( tempLocations == null || tempLocations == undefined || tempLocations.length == 0 ){
                        setHasNoListings(true)
                    }
                }
            ).catch((error) => {
                setLocations(tempLocations)
                console.log(error);
            });

        }).catch((error) => {
            console.log(error);
        });

    }, [map, CurrentLat, CurrentLng, mapstrpublickey, ndk, radius, radiusOSM, zoom])

    return (
        <div className="locationCrosshairs leaflet-bottom leaflet-right">
            <div className="leaflet-control leaflet-bar">
                <Pressable
                    onPress={onClick}
                >
                <Image
                    style={[CommonStyles.SVGImage]}
                    source={goToLocation}
                />
                </Pressable>
            </div>
        </div>
    )
}
