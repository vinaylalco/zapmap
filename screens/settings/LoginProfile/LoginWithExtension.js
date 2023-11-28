import React, { useState } from "react";
import {
    View,
    Pressable,
    Text
} from "react-native"
import NDK, { NDKNip07Signer } from "@nostr-dev-kit/ndk"
import {CommonStyles} from '../../../styles/CommonStyles'

export default function LoginWithExtension({ setUserStateSettings, setUserStateNecSettings }) { 

    function loginWithBrowserExtension(){

        const nip07signer = new NDKNip07Signer();
        nip07signer.user().then(async (user) => {
        
            if (!!user.npub) {
                // need to update various states used around the site that rely on user info
                setUserStateSettings(user.npub)
                setUserStateNecSettings(user.nsec)
                // whole login system is based on these being in local storage. User state's are based off of these
                localStorage.setItem("privado", user.nsec)
                localStorage.setItem("user", user.npub)
            }
        });
    }

    return (
        <View>
            <Text style={[CommonStyles.heading, CommonStyles.centerAlignText]} >
                Login With Extension
            </Text>

            <Pressable
                style={[CommonStyles.submit]}
                onPress={loginWithBrowserExtension}
            >
                <Text
                    style={[CommonStyles.submitInner]}
                >
                    Login with Extension
                </Text>
            </Pressable>
        </View>
    );
}
