import React, { useEffect } from "react"
import {View, Text, ScrollView, StyleSheet, Pressable, Image, FlatList} from "react-native"
import MapstrListingCard from "./MapstrListingCard"
import { preparelocationUniqueIdentifier } from "../../hooks/common.js"
import { GetEvents } from "../../api/api.js"
import Geohash from "latlon-geohash"
import MapstrColors from '../../styles/MapstrColors'
import {CommonStyles} from '../../styles/CommonStyles'
import Listings from '../../ui/Listings/Listings'

export default function DrawerContent({ 
	navigation, 
	ndk, 
	mapstrpublickey,
	locations,
	currrentLat,
	currrentLng,
	map,
	HasNoListings,
	setHasNoListings,
	GlobalFeed,
	setGlobalFeed,
	route,
	zoom,
	setLocations
}){
	const ListingsArray = []
	let LocalHasNoListings = false

    if(locations == null || locations == undefined || locations.length == 0 ){
    	LocalHasNoListings = true
    }else{

	    locations.forEach((event, index) => {
	    	if(event.type === "nostr"){
	    		event.tags.map( (tag, index) => {
	                if( tag[1] == "mapstrReviewEvent" ){
	                    ListingsArray.unshift(event)
	                }
	            })
	    	}else if(event.type === 'node'){
                let geohash = Geohash.encode(event.lat, event.lon, 4)
                ListingsArray.unshift({
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
    	setHasNoListings(LocalHasNoListings)
    }, [LocalHasNoListings, setHasNoListings]);

    return(
		<Listings 
			navigation={navigation} 
			HasNoListings={HasNoListings} 
			GlobalFeed={GlobalFeed}
			ListingsArray={ListingsArray}
			ndk={ndk}
			currrentLat={currrentLat}
			currrentLng={currrentLng}
			map={map}
			setGlobalFeed={setGlobalFeed}
			zoom={zoom}
			setLocations={setLocations}
		/>
    )
}
