import React, {useState, Suspense} from "react";
import { View, Text } from "react-native"
import {CommonStyles} from '../../assets/styles/CommonStyles'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'

export default function SettingsTabBar({ navigation }) {
    return(
        <View 
            style={ 
                isMobile ? 
                [CommonStyles.SettingsTabBarMobile] : 
                [CommonStyles.SettingsTabBarDesktop] 
            }
        >
        </View>
    )
}