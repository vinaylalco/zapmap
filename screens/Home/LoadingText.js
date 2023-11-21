import React from "react"
import {Text,FlatList,View, StyleSheet,Image,ActivityIndicator} from "react-native"
import {CommonStyles} from "../../assets/styles/CommonStyles"
import loading from '../../assets/loading.svg'
 import MapstrColors from '../../assets/styles/MapstrColors'

export default function LoadingText(){
	return(
        
        <View style={[LoadingStyles.Outer]} >
        
            <ActivityIndicator size="large" color={MapstrColors['primary']} />

        </View>
	)
}

const LoadingStyles = StyleSheet.create({
    Outer: {
        padding: '1em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
        width: '100%'
    }
})