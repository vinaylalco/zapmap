import React, { useEffect } from "react"
import {View, StyleSheet, Text, Pressable, Image, ScrollView, FlatList} from "react-native"
import MapstrListingCard from "./MapstrListingCard.js"
import { GetGlobalEvents } from "../../api/api.js"
import {CommonStyles} from '../../styles/CommonStyles'
import Geohash from "latlon-geohash"
import MapstrColors from '../../styles/MapstrColors'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'
import Listings from '../../ui/Listings'

export default function GlobalFeedContent({ 
	navigation, 
	ndk, 
	mapstrpublickey,
	currrentLat,
	currrentLng,
	map,
	HasNoListings,
	setHasNoListings,
	GlobalFeed,
	setGlobalFeed
}){
	const [ListingsArray, setListingsArray] = React.useState([])
	const [GlobalHasNoListings, setGlobalHasNoListings] = React.useState([])

	GetGlobalEvents(
        mapstrpublickey,
        ndk
    ).then((response) => {
        
        if(response == null || response == undefined || response.length == 0 ){
	    	setGlobalHasNoListings(true)
	    }else{
		    response.forEach((event, index) => {
	        	ListingsArray.unshift(event)
		    });
		    setGlobalHasNoListings(false)
	    }

    }).catch((error) => {
        console.log(error);
    });

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
		/>
    )
}
