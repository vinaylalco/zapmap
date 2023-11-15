import React, { useEffect } from "react";
import {View, Text, ScrollView} from "react-native";
import MapstrListingCard from "./MapstrListingCard";
import { preparelocationUniqueIdentifier, GetEvents } from "../../../src/functions/usefulFunctions.js"
import Geohash from "latlon-geohash";
import LoadingText from "./LoadingText"

export default function DrawerContent({ 
	navigation, 
	ndk, 
	mapstrpublickey,
	locations,
	currrentLat,
	currrentLng,
	map,
	HasNoListings,
	setHasNoListings
}){
	const listingsArray = []
	let LocalHasNoListings = false

    if(locations == null || locations == undefined || locations.length == 0 ){
    	LocalHasNoListings = true
    }else{

	    locations.forEach((event, index) => {
	    	if(event.type === "nostr"){
	    		event.tags.map( (tag, index) => {
	                if( tag[1] == "mapstrReviewEvent" ){
	                    listingsArray.unshift(event)
	                }
	            })
	    	}else if(event.type === 'node'){
                let geohash = Geohash.encode(event.lat, event.lon, 4)
                listingsArray.unshift({
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
		<View>	
			{
				HasNoListings ? 
					<LoadingText />
				:
				listingsArray.map((card, index) => (
					<MapstrListingCard
	                    tags={card.tags}
	                    key={index}
	                    title={card.title}
	                    content={card.content}
	                    lat={card.lat}
	                    lng={card.lng}
	                    id={card.id}
	                    npub={card.npub}
	                    dateCreated={card.dateCreated}
	                    ndk={ndk}
	                    ScrollId={card.locationUniqueIdentifier}
	                    navigation={navigation}
	                    showLocationScreenButton={true}
	                    type={card.type}
	                    currrentLat={currrentLat}
	                    currrentLng={currrentLng}
	                    map={map}
	                />
			    )) 
			}
		</View>
    )
}
