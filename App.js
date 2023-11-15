import React, { useState,useEffect,Suspense } from "react"
// import { StatusBar } from 'expo-status-bar' 
import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import TabBar from './src/components/TabBar'
import SettingsTabBar from './src/components/SettingsTabBar'
import tileLayer from "./src/components/tileLayer"
import LocationReviewForm from "./src/components/LocationReviewForm"
import LocationReviewList from "./src/components/LocationReviewList"
import {locationDetails} from './src/functions/mapFunctions'
import { GetEvents, setRelayListArray, connectNDK } from "./src/functions/usefulFunctions"
import ZapForm from "./src/components/ZapForm"
import MenuButtons from './src/components/MenuButtons'
import CreateLocationForm from './src/components/CreateLocationForm'
import RelayManagement from './src/components/RelayManagement'
import UserProfile from './src/components/UserProfile'
import {mapstrpublickey,ndk} from './api/constants.js'
import backButton from './assets/backButton.svg'
import HomeScreen from './screens/Home/HomeScreen.js'
const Tab = createBottomTabNavigator();
const MenuStack = createBottomTabNavigator();
window.live = true

function LocationScreen({ route, navigation }){

    const user = localStorage.getItem("user")  // Basically same as npub value for user.
    const [UserStateLocation, setUserStateLocation] = React.useState(user)
    const nsecLocation = localStorage.getItem("privado")
    const [nsecStateLocation, setnsecStateLocation] = React.useState(nsecLocation)
    console.log(route)
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
                    <Suspense fallback={<Text style={CommonStyles.paragraphText} >Loading...</Text>}>
                        <LocationReviewForm 
                            ndk={ndk}
                            user={route.params.user}
                            mapstrpublickey={mapstrpublickey}
                            titleProp={route.params.params.title}
                            latProp={route.params.params.lat}
                            lngProp={route.params.params.lng}
                        />
                    </Suspense>

                    <Suspense fallback={<Text style={CommonStyles.paragraphText} >Loading...</Text>}>
                        <LocationReviewList
                            ScrollId={route.params.params.ScrollId}
                            mapstrpublickey={mapstrpublickey}
                            ndk={ndk}
                            navigation={navigation}
                            lat={route.params.params.lat}
                            lng={route.params.params.lng}
                        />
                    </Suspense>
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
    // tabBar={props => <TabBar {...props} />}
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
