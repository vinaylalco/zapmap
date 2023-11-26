import React, { useState } from "react";
import {
    Text,
    View,
    Pressable,
    TextInput,
    FlatList,
    ScrollView,
    Image,
    StyleSheet
} from "react-native"
import {CommonStyles} from '../../../styles/CommonStyles'
import { isMobile } from 'react-device-detect'
import BackButton from '../../../ui/BackButton'

export default function PrivacyInfo({navigation }){
 
    return(
        <>
            <BackButton navigation={navigation} />
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={ 
                    isMobile ? 
                    [CommonStyles.innerMobile] : 
                    [CommonStyles.inner] 
                }
            >
                
                <Text style={[CommonStyles.heading]} >What does this App do with your data?</Text>
                <Text style={[CommonStyles.bolded600Text]} >Location Data:</Text>
                    <Text style={[CommonStyles.paragraph]} >
                        <Text style={[CommonStyles.bolded600Text]} >1.</Text> When the app loads it will ask you to share your location data which basically 
                        means your latitude and longitude coordinates.
                    </Text>
                    <Text style={[CommonStyles.paragraph]} >
                        <Text style={[CommonStyles.bolded600Text]} >2.</Text> The App uses this data to position the map to your current location. The App will then 
                        present reviews and location markers from nearby your location so you can find places of 
                        interest and make reviews.
                    </Text>
                    <Text style={[CommonStyles.paragraph]} >
                        <Text style={[CommonStyles.bolded600Text]} >3.</Text> This information is not shared with third parties or stored any place except on Relays as described below.
                    </Text>
                    <Text style={[CommonStyles.paragraph]} >
                        <Text style={[CommonStyles.bolded600Text]} >a)</Text> When you create a new location to be mapped we require the coordinates of the location so it can be mapped for other users.
                        These coorinates are then saved to the Nostr event (aka Note) which has copies of it made to each and every 
                        Relay that your account is connected to. You can view the list of ocnnected Relays, once logged in, by going to Menu -> Relay Management.
                    </Text>
                    <Text style={[CommonStyles.paragraph]} >
                        <Text style={[CommonStyles.bolded600Text]} >b)</Text> Your location data is not used or saved at any other time while using this App. You can view the source code which 
                        is open to verify this if you so desire. The code is maintained at, https://github.com/vinaylalco/zapmap
                    </Text>

                <Text style={[CommonStyles.bolded600Text]} >Your Keys:</Text>
                    <Text style={[CommonStyles.paragraph]} >
                        <Text style={[CommonStyles.bolded600Text]} >1.</Text> This App uses Nostr Public and Private keys as account details. Instead of using 
                        an email and password Nostr uses public and private keys. This makes is relatively anonymous and allows you to post 
                        locations without fear of the App having your personal details to associate with your identity.
                    </Text>
                    <Text style={[CommonStyles.paragraph]} >
                        <Text style={[CommonStyles.bolded600Text]} >2.</Text> As your keys are used to Login and use the App it's important to understand the various login methods.
                    </Text>
                    <Text style={[CommonStyles.paragraph]} >
                        <Text style={[CommonStyles.bolded600Text]} >a)</Text> Best practice to login to this or any Nostr based App is to use a Browser Extension like Alby or Nos2x. 
                        You can search them in order to install them before logging into this App. Once logged in using one of these Nostr
                        Browser Extensions will mean that your keys are not shared with this App so you don't have to worry about 
                        this or any Nostr App using your keys in ways you wouldn't agree with.
                    </Text>
                    <Text style={[CommonStyles.paragraph]} >
                        <Text style={[CommonStyles.bolded600Text]} >b)</Text> If you login with your private key then the key is used to sign various events around the App like creating a new location or review. 
                        In doing so the App saves the private key as 'local storage' to your browser. This local storage is cleared of your keys if you logout using the logout button in
                        the Login/Profile area.
                    </Text>
                    <Text style={[CommonStyles.paragraph]} >
                        <Text style={[CommonStyles.bolded600Text]} >c)</Text> If you are a new user and create an account then a set of keys (ie public and private) will be created for you.
                        With this method your keys they are also stored in local storage and are cleared when you logout.
                        At this point you could copy the private and public password from your Login/Profile area and set up a Browser Extension as per above
                        or continue to use the App while logged in with your private key - as you wish.
                    </Text>
                    <Text style={[CommonStyles.paragraph]} >
                        <Text style={[CommonStyles.bolded600Text]} >d)</Text> Nostr is an eco system of social media apps and because of this the same private keys you use to login here can be used to login to
                        any Nostr based app. As such you dont need to create a new account (set of keys) to use other Nostr apps.
                    </Text>
            </ScrollView>
        </>
    )
}
