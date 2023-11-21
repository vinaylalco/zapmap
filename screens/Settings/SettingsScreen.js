import React, { useState,useEffect,Suspense } from "react"
import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'
// import { NavigationContainer } from "@react-navigation/native"
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import MenuButtons from './MenuButtons'
import CreateLocationForm from './CreateNewLocation/CreateLocationForm'
import UserProfile from './LoginProfile/UserProfile'
import RelayManagement from './RelayManagement/RelayManagement.js'
// import SettingsTabBar from './SettingsTabBar'
import backButton from '../../assets/backButton.svg'
import {setRelayListArray} from "../../api/api"
import {mapstrpublickey,ndk} from '../../api/constants'
import { createStackNavigator } from '@react-navigation/stack';

// const MenuStack = createBottomTabNavigator();
// const MenuStack = createStackNavigator()

export default function SettingsScreen({route, navigation}) {

    const user = localStorage.getItem("user") // Basically same as npub value for user.
    const [UserStateSettings, setUserStateSettings] = React.useState(user)

    return (
        <Suspense fallback={<Text  >Loading...</Text>}>
            <View 
                style={[SettingsStyles.wrapper]}
            >
                <MenuButtons 
                    navigation={navigation}
                    UserStateSettings={UserStateSettings}
                />
            </View>
        </Suspense>
    )
}

const SettingsStyles = StyleSheet.create({
    wrapper:{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(42, 36, 36, 0.5)',
        padding: '0.618em'
    },
})
