import React from "react";
import {Text,View,StyleSheet} from "react-native"
import { CommonStyles } from '../styles/CommonStyles.js'

export default function LoadingSite({setLoadSite, mapstrpublickey, watchID, ndk, radius, setWatchID, setLocations, setDefaultLat, setDefaultLng}){

    return (
        <View style={CommonStyles.contentContainer}>
            <Text style={styles.SplashScreenHeading} >ZapMap</Text>
            <Text style={styles.SplashScreenText} >
                Loading...    
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    SplashScreenActivityMonitor: {
        paddingTop: '1em'
    },
    SplashScreenHeading: {
        textAlign: "center",
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        fontWeight: 800,
        fontSize: "1.618em",
        letterSpacing: "0.01681em",
        alignSelf: "center",
        color: btcYellow['BTC'],
        fontStyle: 'italic'
    }
})
