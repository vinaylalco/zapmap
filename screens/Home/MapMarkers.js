import React, { useEffect } from "react";
import { Marker,Circle,useMap,useMapEvents } from "react-leaflet";
import {preparelocationUniqueIdentifier, GetEvents} from '../../hooks/common'
import Geohash from "latlon-geohash";
const queryOverpass = require('@derhuerst/query-overpass')
import { markerActions, Icon } from "../../hooks/map.js";
import Geolocation from "@react-native-community/geolocation"
 
export default function MapMarkers({ 
    setThirdPartyLink,
    thirdPartyLink, 
    navigation,
    loading, 
    setLoading, 
    localPoints,
    setCurrentLat,
    setCurrentLng,
    mapstrpublickey,
    zoom,
    radius,
    radiusOSM,
    setLocations,
    setLoadSite,
    ndk,
    setMap
}) {
    const map = useMap()
    useEffect(() => {
        
        setMap(map) // convenient to put it here but it could go elsewhere or in its own function
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if (urlParams.has("lat") && urlParams.has("lng") && urlParams.has("id")) {
            
            setThirdPartyLink(urlParams.get("id"))
            const lat = parseFloat(urlParams.get("lat"), 10);
            const lng = parseFloat(urlParams.get("lng"), 10);
            setCurrentLat(lat)
            setCurrentLng(lng)
            map.setView([lat,lng], zoom)
            GetEvents(
                lat,
                lng,
                mapstrpublickey,
                ndk,
                'mapstrLocationEvent'
            ).then((NostrResults) => {
                
                setLocations(NostrResults)
                const overpassLocales = queryOverpass(
                        '[out:json];'+
                        '('+
                            'node["amenity"~"cafe|restaurant|bar"][name](around:'+radiusOSM+','+lat+', '+lng+');'+
                            'node["tourism"~"museum|gallery|artwork|attraction|information|viewpoint"][name](around:'+radiusOSM+','+lat+', '+lng+');'+
                            'node[name]["currency:XBT"="yes"](around:'+radius+','+lat+', '+lng+');'+
                        ')'+
                        ';out center;')
                    .then( (OSMResults) => {
                        const combinedResults = [...OSMResults, ...NostrResults];
                        setLocations(combinedResults)
                        setLoadSite(false) // load the site
                    }
                ).catch((error) => {
                    setLocations(NostrResults)
                    setLoadSite(true) // show loading screen
                    console.log(error);
                });

            }).catch((error) => {
                setLoadSite(true) // show loading screen
                console.log(error);
            });

        }else{

            const geoLocationID = Geolocation.getCurrentPosition((info) => {
                
                setCurrentLat(info.coords.latitude)
                setCurrentLng(info.coords.longitude)
                map.setView([info.coords.latitude,info.coords.longitude], zoom)
                GetEvents(
                    info.coords.latitude,
                    info.coords.longitude,
                    mapstrpublickey,
                    ndk,
                    'mapstrLocationEvent'
                ).then((NostrResults) => {
                    setLocations(NostrResults)
                    const overpassLocales = queryOverpass(
                        '[out:json];'+
                        '('+
                            'node["amenity"~"cafe|restaurant|bar"][name](around:'+radius+','+info.coords.latitude+', '+info.coords.longitude+');'+
                            'node["tourism"~"museum|gallery|artwork|attraction|information|viewpoint"][name](around:'+radius+','+info.coords.latitude+', '+info.coords.longitude+');'+
                            'node[name]["currency:XBT"="yes"](around:'+radius+','+info.coords.latitude+', '+info.coords.longitude+');'+
                        ')'+
                        ';out center;'
                        ).then( (OSMResults) => {
                            const combinedResults = [...OSMResults, ...NostrResults];
                            setLocations(combinedResults)
                            setLoadSite(false) // load the site
                        }
                    ).catch((error) => {
                        setLocations(NostrResults)
                        setLoadSite(true) // show loading screen
                        console.log(error);
                    });

                }).catch((error) => {
                    setLoadSite(true) // show loading screen
                    console.log(error);
                });
            })
        }

    }, [map, setMap, zoom, mapstrpublickey, ndk, radius, radiusOSM, setLocations, setLoadSite, setCurrentLat, setCurrentLng, setThirdPartyLink]);

    const locationPoints = []
    let tempSetLoading = loading
    if(localPoints == null || localPoints == undefined || localPoints.length ===0){
        tempSetLoading=true
    }else{

        localPoints.forEach((event, index) => {

            if(event.type === "nostr"){
                event.tags.map( (tag, index) => {
                    if( tag[1] == "mapstrLocationEvent" ){
                        locationPoints.unshift(event)
                    }
                })
            }else{
                let geohash = Geohash.encode(event.lat, event.lon, 4)
                locationPoints.unshift({
                    type: 'node',
                    lat: event.lat,
                    lng: event.lon,
                    content: null,
                    id: event.id,
                    npub: null,
                    title: event.tags.name,
                    dateCreated: event.timestamp,
                    tags: event.tags,
                    locationUniqueIdentifier: preparelocationUniqueIdentifier(event.tags.name, geohash)
                })
            }
        });
    }

    useEffect(() => {
        setLoading(tempSetLoading)
    }, []);

    return (
        <>
            {
                loading ?
                null :
                locationPoints.map(
                    ({ title, tags, content, lat, lng, id, npub, dateCreated, locationUniqueIdentifier, type}, index ) => {

                        let value = (
                            <Marker
                                icon={Icon(thirdPartyLink, locationUniqueIdentifier, type, tags)}
                                key={index}
                                position={{ lat, lng }}
                                eventHandlers={{
                                    click(e) {
                                        markerActions( id, navigation, lat, lng, title, locationUniqueIdentifier, content, tags, npub, dateCreated, type );
                                    },
                                }}
                            ></Marker>
                        );
                        return value;
                    }
                )
            }
        </>
    )
}
