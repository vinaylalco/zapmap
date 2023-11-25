import React, { useState,useEffect,Suspense } from "react"
import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'
import { NavigationContainer } from "@react-navigation/native"
import { GetEvents, connectNDK } from "./api/api"
import {mapstrpublickey,ndk} from './api/constants.js'
import HomeScreen from './screens/home/HomeScreen'
import LocationScreen from './screens/location/LocationScreen'
import ZapFormScreen from './screens/zap/ZapFormScreen'
import SettingsScreen from './screens/settings/SettingsScreen'
import "./styles/App.css"
import { createStackNavigator } from '@react-navigation/stack'

export default function App() {

    const Stack = createStackNavigator()
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="Settings" 
                    component={SettingsScreen} 
                    options={{
                        headerShown: false,
                        presentation: 'transparentModal'
                    }}
                />
                <Stack.Screen 
                    name="LocationScreen" 
                    component={LocationScreen}
                    options={{
                        headerShown: false,
                        presentation: 'transparentModal'
                    }}
                />
                <Stack.Screen 
                    name="ZapFormScreen" 
                    component={ZapFormScreen}
                    options={{
                        headerShown: false,
                        presentation: 'transparentModal'
                    }}
                />
            
          </Stack.Navigator>
        </NavigationContainer>
    )
}
