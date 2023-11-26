import React, {useState, Suspense} from "react"
import {Text,Pressable} from "react-native"
import {CommonStyles} from '../styles/CommonStyles'

export default function PrivacyButton({navigation}){
    return (
        <Pressable
            style={[CommonStyles.pressable]}
            onPress={() => navigation.navigate('Privacy')}
        >
            <Text
                style={[CommonStyles.pressableInner]}
            >
                Privacy Information
            </Text>
        </Pressable>
    )
}
