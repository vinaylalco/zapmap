import React from "react";
import {Text,View} from "react-native"

export default function LoadingSite({setLoadSite, mapstrpublickey, watchID, ndk, radius, setWatchID, setLocations, setDefaultLat, setDefaultLng}){

    return (
        <View>
            <Text>ZapMap</Text>
            <Text>
                Loading...    
            </Text>
        </View>
    )
}
