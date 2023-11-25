import React, { useEffect } from "react";
import {View, Text, ScrollView, StyleSheet, Pressable, Image, FlatList} from "react-native";
import MapstrListingCard from "../../screens/home/MapstrListingCard"
import {CommonStyles} from '../../styles/CommonStyles'
import {ListingsStyles} from './ListingsStyles'
import {BrowserView, MobileView, isBrowser, isMobile} from 'react-device-detect'
import menu from '../../assets/menu.svg'
import menuDesktop from '../../assets/menuDesktop.svg'
import LoadingText from "../../screens/home/LoadingText"

export default function Listings ({ navigation, HasNoListings, GlobalFeed, ListingsArray, ndk, currrentLat, currrentLng, map, setGlobalFeed }){

	function PressedGlobalButton(){
        setGlobalFeed(true)
    }

    function PressedLocalButton(){
        setGlobalFeed(false)
    }

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

	        <ScrollView style={[ListingsStyles.LocationList]} showsVerticalScrollIndicator={false} >
		        {
					HasNoListings ? 
						<LoadingText />
					:
					<>
						<View style={{flexDirection: 'row'}} >
		                    
		                    <Pressable 
		                        style={GlobalFeed ? [ListingsStyles.feedButtonActive] : [ListingsStyles.feedButton]}
		                        onPress={PressedGlobalButton}
		                    >
		                        <Text 
		                            style={[ListingsStyles.feedButtonInner]} 
		                        >
		                            Global
		                        </Text>
		                    </Pressable>

		                    <Pressable 
		                        style={GlobalFeed == false ? [ListingsStyles.feedButtonActive] : [ListingsStyles.feedButton]}
		                        onPress={PressedLocalButton}
		                    >
		                        <Text
		                            style={[ListingsStyles.feedButtonInner]} 
		                        >
		                            Local
		                        </Text>
		                    </Pressable>

		                </View>

		                <FlatList
				        	style={[ListingsStyles.LocationList]}
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