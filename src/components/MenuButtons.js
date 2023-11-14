import React, {useState} from "react";
import {
    Text,
    View,
    Pressable
} from "react-native"

export default function MenuButtons({navigation, UserStateSettings}){

        return(
            UserStateSettings ?
                <View>
                    <Pressable
                        onPress={() => navigation.navigate('Create Location')}
                    >
                        <Text>
                            Create a new location</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => navigation.navigate('User Profile')
                                }
                    >
                        <Text>
                            Login / Profile</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => navigation.navigate('Relays')}
                    >
                        <Text>
                            Manage Relays</Text>
                    </Pressable>
                </View>
            :
                <View>
                    <Pressable
                        onPress={() => navigation.navigate('User Profile')}
                    >
                        <Text>
                            Login / Profile</Text>
                    </Pressable>
                </View>
        )
}
