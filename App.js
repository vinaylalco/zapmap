import React, { useState,useEffect,Suspense } from "react"
import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import TabBar from './screens/home/TabBar'
import tileLayer from "./screens/home/tileLayer"
import { GetEvents, connectNDK } from "./hooks/common"
import {mapstrpublickey,ndk} from './api/constants.js'
import backButton from './assets/backButton.svg'
import HomeScreen from './screens/home/HomeScreen'
import LocationScreen from './screens/location/LocationScreen'
import ZapFormScreen from './screens/zap/ZapFormScreen'
import SettingsScreen from './screens/settings/SettingsScreen'

export default function App() {

    const Tab = createBottomTabNavigator();
    // tabBar={props => <TabBar {...props} />}
    return (
        <NavigationContainer>
            <Tab.Navigator >
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
