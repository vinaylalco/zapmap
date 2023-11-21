import React, { useEffect } from "react";
import {View, StyleSheet, Text, Pressable, Image, ScrollView, FlatList} from "react-native";
import MapstrListingCard from "./MapstrListingCard.js";
import { GetGlobalEvents } from "../../api/api.js";
import {CommonStyles} from '../../assets/styles/CommonStyles'
import Geohash from "latlon-geohash";
import LoadingText from "./LoadingText"
import world from '../../assets/world.svg'
import menu from '../../assets/menu.svg'
import MapstrColors from '../../assets/styles/MapstrColors'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'

export default function GlobalFeedContent({ 
	navigation, 
	ndk, 
	mapstrpublickey,
	currrentLat,
	currrentLng,
	map,
	HasNoListings,
	setHasNoListings,
	setGlobalFeed
}){
	const [ListingsArray, setListingsArray] = React.useState([])
	const [GlobalHasNoListings, setGlobalHasNoListings] = React.useState([])

	function PressedGlobalButton(){
        setGlobalFeed(true)
    }
    function PressedLocalButton(){
        setGlobalFeed(false)
    }

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
	                    source={menu}
	                    style={[CommonStyles.Icon]}
	                />   
	            </Pressable>
	            
	            <Pressable
	                onPress={() => {
	                    navigation.navigate('Home');
	                }}
	            >
	                <Image
	                    source={world}
	                    style={[CommonStyles.Icon]}
	                /> 
	            </Pressable>
	        </View>

	        <ScrollView style={[GlobalStyles.LocationList]} showsVerticalScrollIndicator={false} >
				{
					GlobalHasNoListings ? 
					<LoadingText /> :
					<>
						<View style={{flexDirection: 'row'}} >
		                    <Pressable 
		                        style={[GlobalStyles.feedButton]}
		                        onPress={PressedGlobalButton}
		                    >
		                        <Text 
		                            style={[GlobalStyles.feedButtonInner]} 
		                        >
		                            Global
		                        </Text>
		                    </Pressable>
		                    <Pressable 
		                        style={[GlobalStyles.feedButton]}
		                        onPress={PressedLocalButton}
		                    >
		                        <Text
		                            style={[GlobalStyles.feedButtonInner]} 
		                        >
		                            Local
		                        </Text>
		                    </Pressable>
		                </View>

		                <FlatList
				        	style={[GlobalStyles.LocationList]}
			                data={ListingsArray}
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

const GlobalStyles = StyleSheet.create({
    LocationList: {
    	overflow: 'scroll', 
    	height: '100vh'
	},
	feedButton:{
		width:'50%',
		padding: '1em',
        borderBottomWidth: '1px',
        borderBottomColor: MapstrColors['lightGrey']
	},
	feedButtonInner:{
		textAlign: 'center'
	}
})