import React, { useEffect } from "react";
import {useMap} from "react-leaflet";
import {OpenStreetMapProvider,GeoSearchControl,SearchControl,} from "leaflet-geosearch";
import Geohash from "latlon-geohash";
import {GetEvents} from '../../../src/functions/usefulFunctions'
const queryOverpass = require('@derhuerst/query-overpass')

// todo: this shouldn't be resetting setLoadSite as that would pop the black screen. Should pop the HasNoListings state that affects the drawer contents.
export default function GeolocationSearch({setLocations, setLoadSite, mapstrpublickey, ndk, radius, radiusOSM}){

	const map = useMap()
    useEffect(() => {

		    const provider = new OpenStreetMapProvider();
		    const searchControl = new GeoSearchControl({ 
		        retainZoomLevel: true,
		        notFoundMessage: 'Sorry, that location could not be found.',
		        provider: new OpenStreetMapProvider(),
		        style: 'bar',
		        showMarker: false,
		        showPopup: false,
		        searchLabel: 'Search location',
		    });

		    // const map = useMap();
		    map.addControl(searchControl);
		    map.on("geosearch/showlocation", (e) => {

		        GetEvents(
		            e.location.raw.lat,
		            e.location.raw.lon,
		            mapstrpublickey,
		            ndk,
		            'mapstrLocationEvent'
		        ).then((NostrResults) => {

		        	setLocations(NostrResults)
		            const overpassLocales = queryOverpass(
                        '[out:json];'+
                        '('+
							'node["amenity"~"cafe|restaurant|bar"][name](around:'+radiusOSM+','+e.location.raw.lat+', '+e.location.raw.lon+');'+
                        	'node["tourism"~"museum|gallery|artwork|attraction|information|viewpoint"][name](around:'+radiusOSM+','+e.location.raw.lat+', '+e.location.raw.lon+');'+
                            'node[name]["currency:XBT"="yes"](around:'+radius+','+e.location.raw.lat+', '+e.location.raw.lon+');'+
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

		    });
    }, []);
}
