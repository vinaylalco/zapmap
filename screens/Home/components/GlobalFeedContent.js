import React, { useEffect } from "react";
import {View, Text, ScrollView} from "react-native";
import MapstrListingCard from "./MapstrListingCard.js";
import { preparelocationUniqueIdentifier,GetGlobalEvents } from "../../../src/functions/usefulFunctions.js";
import Geohash from "latlon-geohash";
import LoadingText from "./LoadingText"

export default function GlobalFeedContent({ 
	navigation, 
	ndk, 
	mapstrpublickey,
	// locations,
	currrentLat,
	currrentLng,
	map,
	HasNoListings,
	setHasNoListings
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
		<View>	
			{
				GlobalHasNoListings ? 
				<LoadingText /> :
				ListingsArray.map((card, index) => (
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
