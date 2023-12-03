import React from "react"
import {Text,FlatList,View, StyleSheet,Image,ActivityIndicator} from "react-native"
import {CommonStyles} from "../../styles/CommonStyles"
import MapstrColors from '../../styles/MapstrColors'

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