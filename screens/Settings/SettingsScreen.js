import React, { useState,useEffect,Suspense } from "react"
import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'
import MenuButtons from '../../src/components/MenuButtons'
import CreateLocationForm from '../../src/components/CreateLocationForm'
import UserProfile from '../../src/components/UserProfile'
import RelayManagement from '../../src/components/RelayManagement'
import SettingsTabBar from '../../src/components/SettingsTabBar'
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import backButton from '../../assets/backButton.svg'
import {setRelayListArray} from "../../src/functions/usefulFunctions"
import {mapstrpublickey,ndk} from '../../api/constants.js'

const MenuStack = createBottomTabNavigator();

export default function SettingsScreen({route, navigation}) {

    const user = localStorage.getItem("user") // Basically same as npub value for user.
    const nsec = localStorage.getItem("privado")
    const [UserStateSettings, setUserStateSettings] = React.useState(user)
    const [UserStateNecSettings, setUserStateNecSettings] = React.useState(nsec)

    const Menu = () => {
        return (
            <Suspense fallback={<Text  >Loading...</Text>}>
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
                <Suspense fallback={<Text  >Loading...</Text>}>
                    <Pressable
                        onPress={() => navigation.navigate('Menu', {
                                            screen: 'SettingsScreen'
                                        })}
                        
                    >
                        <Image
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
            
            <ScrollView showsVerticalScrollIndicator={false} >
                <Suspense fallback={<Text  >Loading...</Text>}>
                    <Pressable
                        onPress={() => navigation.navigate('Menu', {
                                            screen: 'SettingsScreen'
                                        })}
                        
                    >
                        <Image
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
                <Suspense fallback={<Text  >Loading...</Text>}>
                    <Pressable
                        onPress={() => navigation.navigate('Menu', {
                                            screen: 'SettingsScreen'
                                        })}
                    >
                        <Image
                            source={backButton}
                        />
                    </Pressable>
                    <RelayManagement 
                        RelayList={setRelayListArray} 
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