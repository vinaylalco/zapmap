import React, { useEffect } from "react";
import {useMap} from "react-leaflet";
import {OpenStreetMapProvider,GeoSearchControl,SearchControl,} from "leaflet-geosearch";
import Geohash from "latlon-geohash";
import {GetEvents} from '../../api/api'
const queryOverpass = require('@derhuerst/query-overpass')

export default function GeolocationSearch({setLocations, mapstrpublickey, ndk, radius, setGlobalFeed}){

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
		        	setGlobalFeed(false)
		        }).catch((error) => {
		            console.log(error);
		        });

		    });
    }, []);
}
