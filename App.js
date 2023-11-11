import React, { useState,useEffect,Suspense } from "react"
import { StatusBar } from 'expo-status-bar' 
import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import TabBar from './src/components/TabBar'
import SettingsTabBar from './src/components/SettingsTabBar'
import {MapContainer,TileLayer,Circle, LayerGroup} from "react-leaflet"
import DrawerContent from './src/components/DrawerContent'
import GlobalFeedContent from './src/components/GlobalFeedContent'
import MapMarkers from './src/components/MapMarkers' 
import tileLayer from "./src/components/tileLayer"
import {CommonStyles} from './src/styles/CommonStyles'
import {locationDetails,CurrentLocation} from './src/functions/mapFunctions'
import { GetEvents, setRelayListArray, connectNDK } from "./src/functions/usefulFunctions"
import NDK from "@nostr-dev-kit/ndk"
import ZapForm from "./src/components/ZapForm"
import MenuButtons from './src/components/MenuButtons'
import CreateLocationForm from './src/components/CreateLocationForm'
import RelayManagement from './src/components/RelayManagement'
import UserProfile from './src/components/UserProfile'
import GeolocationSearch from './src/components/GeolocationSearch'
import './src/styles/App.css'
import backButton from './assets/backButton.svg'
import GoToCurrentLocationButton from './src/components/GoToCurrentLocationButton'
import btcYellow from "./src/styles/btcYellow.js";
import {HomeScreenStyles} from './src/styles/HomeScreenStyles'

const RelayList = setRelayListArray();
const ndk = new NDK({
    explicitRelayUrls: RelayList
});
connectNDK(ndk)
const Tab = createBottomTabNavigator();
const MenuStack = createBottomTabNavigator();
const mapstrpublickey = "a72863a4abfd79e340f736f3a6b967a0a0d992a6243d8edbebaead1f37586c4a"
window.live = false 

function HomeScreen({route, navigation}) {
    
    const [MapLatitude, setMapLatitude] = React.useState(29.97913478858854)
    const [MapLongitude, setMapLongitude] = React.useState(31.13417616605723)
    const [CurrentLat, setCurrentLat] = React.useState(29.97913478858854)
    const [CurrentLng, setCurrentLng] = React.useState(31.13417616605723)
    const [zoom, setZoom] = React.useState(18)
    const [locations, setLocations] = React.useState(null)
    const [radius, setRadius] = React.useState(104160) // 4*16.18 miles in meters
    const [radiusOSM, setRadiusOSM] = React.useState(800) 
    const [loadSite, setLoadSite] = React.useState(false)
    const [map, setMap] = React.useState()
    const [thirdPartyLink, setThirdPartyLink] = React.useState(null)
    const [HasNoListings, setHasNoListings] = React.useState(null)
    
    return (
        false ?
        <Text>Loading...</Text> :
        <>
            <View style={[styles.mapScreenContainer]}>
                <MapContainer 
                    center={[MapLatitude,MapLongitude]} 
                    zoom={zoom} 
                    scrollWheelZoom={false}
                    style={styles.mapWrapper}
                >
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Suspense fallback={<Text style={CommonStyles.paragraphText} >Loading...</Text>}>
                        <CurrentLocation CurrentLat={CurrentLat} CurrentLng={CurrentLng} />
                    </Suspense>
                    <Suspense fallback={<Text style={CommonStyles.paragraphText} >Loading...</Text>}>
                        <MapMarkers
                            setThirdPartyLink={setThirdPartyLink}
                            thirdPartyLink={thirdPartyLink}
                            navigation={navigation}
                            loading={loadSite}
                            setLoading={setLoadSite}
                            localPoints={locations}
                            mapstrpublickey={mapstrpublickey}
                            zoom={zoom}
                            radius={radius}
                            radiusOSM={radiusOSM}
                            setLocations={setLocations}
                            setLoadSite={setLoadSite}
                            ndk={ndk}
                            setMap={setMap}
                            setCurrentLat={setCurrentLat}
                            setCurrentLng={setCurrentLng}
                        />
                    </Suspense>
                    <Suspense fallback={<Text style={CommonStyles.paragraphText} >Loading...</Text>}>
                        <GeolocationSearch 
                            setLocations={setLocations} 
                            setLoadSite={setLoadSite} 
                            mapstrpublickey={mapstrpublickey}
                            ndk={ndk}
                            radius={radius}
                            radiusOSM={radiusOSM}
                        />
                    </Suspense>

                    <Suspense fallback={<Text style={CommonStyles.paragraphText} >Loading...</Text>}>
                        <GoToCurrentLocationButton 
                            CurrentLat={CurrentLat} 
                            CurrentLng={CurrentLng}
                            zoom={zoom}
                            mapstrpublickey={mapstrpublickey}
                            ndk={ndk}
                            setLocations={setLocations}
                            setLoadSite={setLoadSite}
                            radius={radius}
                            radiusOSM={radiusOSM}
                            HasNoListings={HasNoListings}
                            setHasNoListings={setHasNoListings}
                        />
                    </Suspense>
                </MapContainer>
            </View>

            <Suspense fallback={<Text style={CommonStyles.paragraphText} >Loading...</Text>}>

                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{backgroundColor: "#1d1a1a"}}
                >   
                    <DrawerContent 
                        navigation={navigation}
                        ndk={ndk}
                        mapstrpublickey={mapstrpublickey}
                        loadSite={loadSite}
                        setLoadSite={setLoadSite}
                        locations={locations}
                        map={map}
                        CurrentLat={CurrentLat}
                        CurrentLng={CurrentLng}
                        HasNoListings={HasNoListings}
                        setHasNoListings={setHasNoListings}
                    />
                    
                </ScrollView>
            </Suspense>
        </>
    );
}

function LocationScreen({ route, navigation }){

    const user = localStorage.getItem("user")  // Basically same as npub value for user.
    const [UserStateLocation, setUserStateLocation] = React.useState(user)
    const nsecLocation = localStorage.getItem("privado")
    const [nsecStateLocation, setnsecStateLocation] = React.useState(nsecLocation)

    return(
        <Suspense fallback={<Text style={CommonStyles.paragraphText} >Loading...</Text>}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.LocationListingContainer]} >
                
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.LocationListingInner]} >
                    <Text style={[CommonStyles.formHeading]} >
                        {route.params.params.title} 
                    </Text>
                    <Text style={[CommonStyles.paragraphText]} >
                        {locationDetails(route.params.params.content, route.params.params.tags.subject, route.params.params.tags.amenity)}
                    </Text>
                    <Text style={[CommonStyles.paragraphText]} >
                        {route.params.params.tags.subject ? route.params.params.tags.subject : ''}
                    </Text>
                </ScrollView>
            </ScrollView>
        </Suspense>
    )    
}

function ZapFormScreen( { route, navigation } ){

    const user = localStorage.getItem("user")  // Basically same as npub value for user.
    const [UserStateZapForm, setUserStateZapForm] = React.useState(user)
    const nsecZapForm = localStorage.getItem("privado")
    const [nsecStateZapForm, setnnsecStateZapForm] = React.useState(nsecZapForm)

    return(
        <Suspense fallback={<Text style={CommonStyles.paragraphText} >Loading...</Text>}>
            <ZapForm
                id={route.params.params.id}
                npub={route.params.params.npub}
                RelayList={RelayList}
                nsecZapForm={nsecZapForm}
            />
        </Suspense>
    )
}

function SettingsScreen({route, navigation}) {

    const user = localStorage.getItem("user") // Basically same as npub value for user.
    const nsec = localStorage.getItem("privado")
    const [UserStateSettings, setUserStateSettings] = React.useState(user)
    const [UserStateNecSettings, setUserStateNecSettings] = React.useState(nsec)

    const Menu = () => {
        return (
            <Suspense fallback={<Text style={CommonStyles.paragraphText} >Loading...</Text>}>
                <MenuButtons 
                    navigation={navigation}
                    UserStateSettings={UserStateSettings}
                />
            </Suspense>
        )
    }

    function NewLocationForm({navigation}){

        return(
            <>
                <Suspense fallback={<Text style={CommonStyles.paragraphText} >Loading...</Text>}>
                    <Pressable
                        onPress={() => navigation.navigate('Menu', {
                                            screen: 'SettingsScreen'
                                        })}
                        style={[CommonStyles.backButton]}
                    >
                        <Image
                            style={[CommonStyles.SVGImage]}
                            source={backButton}
                        />
                    </Pressable>
                    <CreateLocationForm
                        name="CreateLocationForm"
                        ndk={ndk}
                        UserStateSettings={UserStateSettings}
                        mapstrpublickey={mapstrpublickey}
                        navigation={navigation}
                        nsec={nsec}
                    />
                </Suspense>
            </>
        )
    }

    const UserProfileScreen = () => {

        return(
            
            <ScrollView contentContainerStyle={[CommonStyles.contentContainer]} showsVerticalScrollIndicator={false} >
                <Suspense fallback={<Text style={CommonStyles.paragraphText} >Loading...</Text>}>
                    <Pressable
                        onPress={() => navigation.navigate('Menu', {
                                            screen: 'SettingsScreen'
                                        })}
                        style={[CommonStyles.backButton]}
                    >
                        <Image
                            style={[CommonStyles.SVGImage]}
                            source={backButton}
                        />
                    </Pressable>
                        
                    <UserProfile 
                        UserStateSettings={UserStateSettings}
                        setUserStateSettings={setUserStateSettings}
                        setUserStateNecSettings={setUserStateNecSettings}
                        ndk={ndk}
                        mapstrpublickey={mapstrpublickey}
                        UserStateNecSettings={UserStateNecSettings}
                        nsec={nsec}
                    />
                </Suspense>
            </ScrollView>
        )
    }

    const MapstrRelays = () => {
        return(
            <>
                <Suspense fallback={<Text style={CommonStyles.paragraphText} >Loading...</Text>}>
                    <Pressable
                        onPress={() => navigation.navigate('Menu', {
                                            screen: 'SettingsScreen'
                                        })}
                        style={[CommonStyles.backButton]}
                    >
                        <Image
                            style={[CommonStyles.SVGImage]}
                            source={backButton}
                        />
                    </Pressable>
                    <RelayManagement 
                        RelayList={RelayList} 
                    />
                </Suspense>
            </>
        )
    }

    return (
        <MenuStack.Navigator tabBar={props => <SettingsTabBar {...props} />} >
            <MenuStack.Screen
                name="Menu"
                component={Menu}
                options={{ 
                    tabBarLabel: '',
                    headerShown: false  
                }}
            />
            <MenuStack.Screen
                name="Create Location"
                component={NewLocationForm}
                options={{ 
                    title: '',
                    headerShown: false  
                }}
            />
            <MenuStack.Screen
                name="User Profile"
                component={UserProfileScreen}
                options={{ 
                    title: '',
                    headerShown: false  
                }}
            />
            <MenuStack.Screen
                name="Relays"
                component={MapstrRelays}
                options={{ 
                    title: '',
                    headerShown: false  
                }}
            />
        </MenuStack.Navigator>
    );
}

export default function App() {

    return (
        <NavigationContainer>
            <Tab.Navigator tabBar={props => <TabBar {...props} />} >
                <Tab.Screen 
                    name="Home" 
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Tab.Screen 
                    name="Settings" 
                    component={SettingsScreen} 
                    options={{ headerShown: false }}
                />
                <Tab.Screen 
                    name="LocationScreen" 
                    component={LocationScreen} 
                    options={{ headerShown: false }}
                />
                <Tab.Screen 
                    name="ZapFormScreen" 
                    component={ZapFormScreen}
                    options={{ headerShown: false }}
                />
            
          </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    mapWrapper: {
        height: "50vh", 
        width: "100%"
    },
    drawerWrapper: {
        flex: 1,
        background: "#1d1a1a"
    },
    LocationListingContainer: {
        flex: 1,
        backgroundColor: "#1d1a1a",
        padding: '1em',
        flexWrap: "flex-wrap",
        justifyContent: "center"
    },
    LocationListingInner: {
        width:'100%'
    },
    feedControl:{
        paddingTop: '1em', 
        paddingLeft: '1em', 
        paddingRight: '1em', 
        flexDirection:"row", 
        justifyContent: "space-evenly"
    }
})
