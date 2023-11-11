import React, { useState } from "react";
import {
    View,
    Pressable,
    Text
} from "react-native";
import {CommonStyles} from '../styles/CommonStyles.js'
import NDK, { NDKNip07Signer } from "@nostr-dev-kit/ndk"

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
            <Text style={[CommonStyles.formHeading]} >
                Login With Extension
            </Text>

            <Text style={[CommonStyles.paragraphText]} >
                <Text style={[CommonStyles.bold]} >NB:</Text> Logging in with a browser extension is the safest way to login to ZapMap or any NOSTR client. If you don't already have an extension this option won't work for you yet. Install Alby or Nostr2x before attempting to login with this method.
            </Text>

            <Pressable
                onPress={loginWithBrowserExtension}
            >
                <Text style={[CommonStyles.pressable]} >
                    Login with Extension
                </Text>
            </Pressable>
        </View>
    );
}
