import React, { useState, useRef } from "react";
import { View, Pressable, Text, ScrollView, ScrollIntoView, FlatList } from "react-native";
import LoginForm from "./LoginForm";
import LoginWithExtension from "./LoginWithExtension";
import CreateNewAccount from "./CreateNewAccount";
import ProfileAndLogout from "./ProfileAndLogout.js";
import {CommonStyles} from '../styles/CommonStyles.js'

export default function UserProfile({ 
    UserStateSettings, 
    setUserStateSettings, 
    setUserStateNecSettings,
    ndk, 
    mapstrpublickey,
    UserStateNecSettings,
    nsec
}) {
    const dataPolicy = useRef(null)
    const scrollToDataPolicy = () => {
        dataPolicy.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    };

    if (UserStateSettings) {
        
        return (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[CommonStyles.contentContainer]}>
                <ProfileAndLogout 
                    UserStateSettings={UserStateSettings}
                    setUserStateSettings={setUserStateSettings}
                    UserStateNecSettings={UserStateNecSettings}
                    nsec={nsec}
                />
            </ScrollView>
        );

    } else {

        return (
            <ScrollView showsVerticalScrollIndicator={false} >
                <Text style={CommonStyles.paragraphText} >
                    What does ZapMap do with your data? <Text onClick={scrollToDataPolicy} style={CommonStyles.link} >Read before logging in.</Text>
                </Text>
                <LoginWithExtension 
                    setUserStateSettings={setUserStateSettings}
                    setUserStateNecSettings={setUserStateNecSettings}
                />
                <CreateNewAccount 
                    setUserStateSettings={setUserStateSettings}
                    setUserStateNecSettings={setUserStateNecSettings}
                />
                <LoginForm 
                    ndk={ndk}
                    mapstrpublickey={mapstrpublickey}
                    setUserStateSettings={setUserStateSettings}
                />

                <Text ref={dataPolicy} style={CommonStyles.formHeading} >
                    What do does ZapMap with location data?
                </Text>

                <FlatList
                    data={[
                        "ZapMap uses your latitiude and longitude as below to allow its functionality.",
                        "1. When you create a new location or review an existing location your latitude and logitude is saved to the NOSTR note (aka event) which is produced by ZapMap and saved to the various relays your account is connected to. You can manage the relays you are connected to from 'Manage Relays' once logged in.",
                        "2. Your latitude and longitude is not saved locally or sent to any third party and is only stored on relays as described in point 1. At this point the code is not public but at some point it may be appropriate to release the code so that the descriptions above can be confirmed.",
                        "3. While NOSTR can be used anonymously if you are concerned with associating location data with your public and private keys then ZapMap is potentially not for you. One way around this is to create a new and different set of keys that you use only with ZapMap and not with any of your other sets of keys used with other NOSTR clients.",
                        "4. Your public key (npub) is also saved to the NOSTR note for any new location or review you make. Your private key (nSec) is not saved to these notes. See more below."
                    ]}
                    renderItem={({item, index}) => <Text key={index} style={CommonStyles.paragraphText} >{item}</Text>}
                />

                <Text style={CommonStyles.formHeading} >
                    What does ZapMap do with your keys?
                </Text>

                <Text
                    style={CommonStyles.paragraphText}>
                    Best Practice login procedure with any NOSTR client, for eg ZapMap, 
                    is to login with a Broswer Extension (like Alby or Nos2x). These extensions 
                    mean that your public and private keys are not required to be saved to local 
                    storage to interact with a NOSTR client. If you login with these there will 
                    be no public or private key saved to the browser in local storage. If you haven't 
                    already installed a browser extension then do so and then come back to this site 
                    and login using that method.
                </Text>

                <Text
                    style={CommonStyles.paragraphText}>
                    Public Key: Your Public Key (nPub) is, as stated above, saved to each new 
                    location and review note (event) created via ZapMap. This is how you are 
                    able to 'own' them and receive Zaps for your efforts. If you login with your 
                    Private Key (as oppossed to Browser Extension) or create 
                    a new NOSTR account via ZapMap then your Public Key is saved within the 
                    browser in 'local storage'. When you logout this storage is cleared and 
                    will only be added again if you choose to login again with your private 
                    key or you create a new account.
                </Text>

                <Text
                    style={CommonStyles.paragraphText}>
                    Private key: Your Private Key (nSec) is treated in a similar way as your 
                    Public Key except it IS NOT saved to the note (event) when you create a new 
                    location or review. It IS saved to local storage if you login with your 
                    private key or create a new account. If you logout the private key is 
                    cleared from local storage and will only be saved again if you choose to 
                    login with your private key again.
                </Text>
            </ScrollView>
        );
    }
}
