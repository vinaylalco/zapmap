import React, { useCallback } from "react";
import { Pressable,Image } from "react-native";
import {GetEvents} from '../../api/api'
const queryOverpass = require('@derhuerst/query-overpass')
import goToLocation from '../../assets/goToLocation.svg'
import {useMap,useMapEvents} from "react-leaflet"
import {CommonStyles} from '../../styles/CommonStyles'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'

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
    radiusOSM,
    setGlobalFeed
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
                    'node["amenity"~"cafe|restaurant|bar"][name](around:'+radius+','+info.coords.latitude+', '+info.coords.longitude+');'+
                    'node["tourism"~"museum|gallery|artwork|attraction|information|viewpoint"][name](around:'+radius+','+info.coords.latitude+', '+info.coords.longitude+');'+
                    'node[name]["currency:XBT"="yes"](around:'+radiusOSM+','+info.coords.latitude+', '+info.coords.longitude+');'+
                ')'+
                ';out center;'
                ).then( (OSMResults) => {
                    const combinedResults = [...OSMResults, ...NostrResults];
                    setLocations(combinedResults)
                    setGlobalFeed(false)
                }
            ).catch((error) => {
                setLocations(NostrResults)
                setGlobalFeed(true)
                console.log(error);
            });
                                
        }).catch((error) => {
            // setLoadSite(true)
            console.log(error);
        });

        // GetEvents(
        //     CurrentLat,
        //     CurrentLng,
        //     mapstrpublickey,
        //     ndk,
        //     'mapstrLocationEvent'
        // ).then((NostrResults) => {
        //     setLocations(NostrResults)
        //     setGlobalFeed(false)
        // }).catch((error) => {
        //     console.log(error);
        // });

    }, [map, CurrentLat, CurrentLng, mapstrpublickey, ndk, radius, radiusOSM, zoom])

    return (
        <div className="locationCrosshairs leaflet-bottom leaflet-right">
            <div className="leaflet-control leaflet-bar">
                <Pressable
                    onPress={onClick}
                >
                <Image
                    style={isMobile ? [CommonStyles.goToLocationButtonMobile] : [CommonStyles.goToLocationButton]}
                    source={goToLocation}
                />
                </Pressable>
            </div>
        </div>
    )
}
