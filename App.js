import React, { useState,useEffect,Suspense } from "react"
import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import TabBar from './src/components/TabBar'
import tileLayer from "./src/components/tileLayer"
import { GetEvents, connectNDK } from "./src/functions/usefulFunctions"
import {mapstrpublickey,ndk} from './api/constants.js'
import backButton from './assets/backButton.svg'
import HomeScreen from './screens/Home/HomeScreen'
import LocationScreen from './screens/Location/LocationScreen'
import ZapFormScreen from './screens/Zap/ZapFormScreen'
import SettingsScreen from './screens/Settings/SettingsScreen'

const Tab = createBottomTabNavigator();

export default function App() {
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
