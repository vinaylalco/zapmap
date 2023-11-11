import React, {useState} from "react";
import {
    Text,
    View,
    Pressable
} from "react-native";
import {CommonStyles} from '../styles/CommonStyles.js'

export default function MenuButtons({navigation, UserStateSettings}){

        return(
            UserStateSettings ?
                <View style={[CommonStyles.contentContainer]}>
                    <Pressable
                        onPress={() => navigation.navigate('Create Location')}
                    >
                        <Text
                            style={[CommonStyles.pressable]}
                        >
                            Create a new location</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => navigation.navigate('User Profile')
                                }
                    >
                        <Text
                            style={[CommonStyles.pressable]}
                        >
                            Login / Profile</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => navigation.navigate('Relays')}
                    >
                        <Text
                            style={[CommonStyles.pressable]}
                        >
                            Manage Relays</Text>
                    </Pressable>
                </View>
            :
                <View style={[CommonStyles.contentContainer]}>
                    <Pressable
                        onPress={() => navigation.navigate('User Profile')}
                    >
                        <Text
                            style={[CommonStyles.pressable]}
                        >
                            Login / Profile</Text>
                    </Pressable>
                </View>
        )
}
