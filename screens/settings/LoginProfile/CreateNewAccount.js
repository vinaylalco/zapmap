import React, { useState } from "react";
import {
    View,
    Pressable,
    Text
} from "react-native"
import { generatePrivateKey, getPublicKey } from "nostr-tools";
import {CommonStyles} from '../../../styles/CommonStyles'

export default function CreateNewAccount({ setUserStateSettings , setUserStateNecSettings}) { 

    function createNewUserKeys(){
        let nsec = generatePrivateKey() // hex version
        let npub = getPublicKey(nsec) // hex version 
        // need to update various states used around the site that rely on user info
        setUserStateSettings(npub)
        setUserStateNecSettings(nsec)
        // whole login system is based on these being in local storage. User state's are based off of these
        localStorage.setItem("privado", nsec);
        localStorage.setItem("user", npub);
    }

    return (
        <>

            <Text style={[CommonStyles.heading]} >
                Create a New Account
            </Text>
            <Pressable
                style={[CommonStyles.submit]}
                onPress={createNewUserKeys}
            >
                <Text
                    style={[CommonStyles.submitInner]}
                >
                    Create a New Account
                </Text>
            </Pressable>
        </>
    );
}
