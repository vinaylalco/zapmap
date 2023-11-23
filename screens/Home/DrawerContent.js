import React, { useEffect } from "react";
import {View, Text, ScrollView, StyleSheet, Pressable, Image, FlatList} from "react-native";
import MapstrListingCard from "./MapstrListingCard";
import { preparelocationUniqueIdentifier } from "../../hooks/common.js"
import { GetEvents } from "../../api/api.js"
import Geohash from "latlon-geohash";
import LoadingText from "./LoadingText"
import MapstrColors from '../../assets/styles/MapstrColors'
import world from '../../assets/world.svg'
import menu from '../../assets/menu.svg'
import menuDesktop from '../../assets/menuDesktop.svg'
import moon from '../../assets/moon.svg'
import {CommonStyles} from '../../assets/styles/CommonStyles'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'

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
	route
}){
	const listingsArray = []
	let LocalHasNoListings = false

	function PressedGlobalButton(){
        setGlobalFeed(true)
    }
    function PressedLocalButton(){
        setGlobalFeed(false)
    }

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
		<View 
			style={ 
                isMobile ? 
                [CommonStyles.TabOuterMobile] : 
                [CommonStyles.TabOuterDesktop] 
            }
		>	
			<View
				style={ 
	                isMobile ? 
	                [CommonStyles.TabWrapperMobile] : 
	                [CommonStyles.TabWrapperDesktop] 
	            }
	        >
    			<Pressable
	                onPress={() => {
	                        navigation.navigate('Settings');
	                    }}
	            >
	                <Image
	                    source={isMobile ? menu : menuDesktop}
	                    style={[CommonStyles.Icon]}
	                />   
	            </Pressable>
	        </View>

	        <ScrollView style={[DrawerStyles.LocationList]} showsVerticalScrollIndicator={false} >
		        {
					HasNoListings ? 
						<LoadingText />
					:
					<>
						<View style={{flexDirection: 'row'}} >
		                    
		                    <Pressable 
		                        style={GlobalFeed ? [DrawerStyles.feedButtonActive] : [DrawerStyles.feedButton]}
		                        onPress={PressedGlobalButton}
		                    >
		                        <Text 
		                            style={[DrawerStyles.feedButtonInner]} 
		                        >
		                            Global
		                        </Text>
		                    </Pressable>

		                    <Pressable 
		                        style={GlobalFeed == false ? [DrawerStyles.feedButtonActive] : [DrawerStyles.feedButton]}
		                        onPress={PressedLocalButton}
		                    >
		                        <Text
		                            style={[DrawerStyles.feedButtonInner]} 
		                        >
		                            Local
		                        </Text>
		                    </Pressable>

		                </View>

		                <FlatList
				        	style={[DrawerStyles.LocationList]}
			                data={listingsArray}
			                renderItem={
			                	({item, index}) => <MapstrListingCard
							                    tags={item.tags}
							                    key={index}
							                    title={item.title}
							                    content={item.content}
							                    lat={item.lat}
							                    lng={item.lng}
							                    id={item.id}
							                    npub={item.npub}
							                    dateCreated={item.dateCreated}
							                    ndk={ndk}
							                    ScrollId={item.locationUniqueIdentifier}
							                    navigation={navigation}
							                    showLocationScreenButton={true}
							                    type={item.type}
							                    currrentLat={currrentLat}
							                    currrentLng={currrentLng}
							                    map={map}
							                />
			                }
			                keyExtractor={item => Math.random()}
			            />
					</>
				}
			</ScrollView>
		</View>
    )
}

const DrawerStyles = StyleSheet.create({
    Logo: {
        height: '2em', 
        width: '2em'
    },
    LocationList: {
    	overflow: 'scroll', 
    	height: '100vh'
	},
	feedButton:{
		width:'50%',
		padding: '1em'
	},
	feedButtonActive:{
		width:'50%',
		padding: '1em',
        borderBottomWidth: '1px',
        borderBottomColor: MapstrColors['primary']
	},
	feedButtonInner:{
		textAlign: 'center'
	}
})
