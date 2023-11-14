import React, { useState } from "react";
import {
    View,
    Pressable,
    Text
} from "react-native"
import { generatePrivateKey, getPublicKey } from "nostr-tools";

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

            <Text  >
                Create a New Account
            </Text>
            <Text  >
                If you are new to NOSTR you can create an account by hitting the button below which will also log you in to ZapMap.
            </Text>
            <Text  >
                <Text >IMPORTANT:</Text> The key pair (public and private key) created in this process should be kept someplace safe as the same pair of keys can be used in all NOSTR apps. One key pair, access to many apps. Once logged in you can see your public and private keys in the Login/Profile page.
            </Text>
            <Pressable
                onPress={createNewUserKeys}
            >
                <Text>
                    Create a New Account
                </Text>
            </Pressable>
        </>
    );
}
