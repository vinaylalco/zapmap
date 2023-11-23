import React, { useCallback } from "react";
import { Pressable,Image } from "react-native";
import {GetEvents} from '../../api/api'
const queryOverpass = require('@derhuerst/query-overpass')
import goToLocation from '../../assets/goToLocation.svg'
import {useMap,useMapEvents} from "react-leaflet"
import {CommonStyles} from '../../assets/styles/CommonStyles'

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
                            'node["amenity"~"cafe|restaurant|bar"][name](around:'+radiusOSM+','+CurrentLat+', '+CurrentLng+');'+
                            'node["tourism"~"museum|gallery|artwork|attraction|information|viewpoint"][name](around:'+radiusOSM+','+CurrentLat+', '+CurrentLng+');'+
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
                    style={[CommonStyles.goToLocationButton]}
                    source={goToLocation}
                />
                </Pressable>
            </div>
        </div>
    )
}
