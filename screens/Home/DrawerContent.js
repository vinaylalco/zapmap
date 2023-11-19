import React, { useEffect } from "react";
import {View, Text, ScrollView, StyleSheet, Pressable, Image} from "react-native";
import MapstrListingCard from "./MapstrListingCard";
import { preparelocationUniqueIdentifier } from "../../hooks/common.js"
import { GetEvents } from "../../api/api.js"
import Geohash from "latlon-geohash";
import LoadingText from "./LoadingText"
import MapstrColors from '../../assets/styles/MapstrColors'
import world from '../../assets/world.svg'
import menu from '../../assets/menu.svg'
import moon from '../../assets/moon.svg'

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
		<ScrollView 
			contentContainerStyle={{display: 'flex', flexDirection: 'row'}}
		>	

			<View 
	            style={[DrawerStyles.TabWrapper]}
	        >
	            <Pressable
	                onPress={() => {
	                        navigation.navigate('Settings');
	                    }}
	            >
	                <Image
	                    source={menu}
	                    style={[DrawerStyles.Icon]}
	                />   
	            </Pressable>
	            
	            <Pressable
	                onPress={() => {
	                    navigation.navigate('Home');
	                }}
	            >
	                <Image
	                    source={world}
	                    style={[DrawerStyles.Icon]}
	                /> 
	            </Pressable>
	        </View>

	        <View style={{width: '88%'}}>
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
		</ScrollView>
    )
}

const DrawerStyles = StyleSheet.create({
    Logo: {
        height: '2em', 
        width: '2em'
    },
    TabWrapper:{
        width: 'fit-content',
        height: '100vh',
        backgroundColor: '#fff',
        padding: '0.25em',
        borderRightWidth: '1px',
        borderRightColor: MapstrColors['lightGrey']
    },
    Icon: {
        height: '2em', 
        width: '2em',
        marginTop: '0.5em'
    }
})
