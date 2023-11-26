import React, { useState } from "react"
import { Pressable, View, Text, Image, StyleSheet } from "react-native"
import backButton from '../assets/backButton.svg'
import {CommonStyles} from '../styles/CommonStyles'

export default function BackButton({navigation}){
	return(
		<Pressable
            onPress={() => navigation.goBack()}
            style={[CommonStyles.backButtonWrapper]}
        >
            <Image
                source={backButton}
                style={[CommonStyles.backButtonIcon]}
            />
        </Pressable>
	)
}
