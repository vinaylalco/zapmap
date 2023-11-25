import React, { useState,useEffect,Suspense } from "react"
import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'
import MenuButtons from './MenuButtons'
import CreateLocationForm from './CreateNewLocation/CreateLocationForm'
import UserProfile from './LoginProfile/UserProfile'
import RelayManagement from './RelayManagement/RelayManagement.js'
import {setRelayListArray} from "../../api/api"
import {mapstrpublickey,ndk} from '../../api/constants'
import { createStackNavigator } from '@react-navigation/stack'
import {CommonStyles} from '../../styles/CommonStyles'

export default function SettingsScreen({route, navigation}) {

    const user = localStorage.getItem("user")
    const [UserStateSettings, setUserStateSettings] = React.useState(user)

    return (
        <Suspense fallback={<Text>Loading...</Text>}>
            <View 
                style={[CommonStyles.wrapper]}
            >
                <MenuButtons 
                    navigation={navigation}
                    UserStateSettings={UserStateSettings}
                />
            </View>
        </Suspense>
    )
}
