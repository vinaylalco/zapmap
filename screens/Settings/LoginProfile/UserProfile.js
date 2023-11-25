import React, { useState, useRef } from "react";
import { View, Pressable, Text, ScrollView, ScrollIntoView, FlatList, StyleSheet,Image} from "react-native";
import LoginForm from "./LoginForm";
import LoginWithExtension from "./LoginWithExtension";
import CreateNewAccount from "./CreateNewAccount";
import ProfileAndLogout from "./ProfileAndLogout.js"
import {CommonStyles} from '../../../styles/CommonStyles'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'
import BackButton from '../../../ui/BackButton'

export default function UserProfile({ 
    UserStateSettings, 
    setUserStateSettings, 
    setUserStateNecSettings,
    ndk, 
    mapstrpublickey,
    UserStateNecSettings,
    nsec,
    navigation
}) {
    const dataPolicy = useRef(null)
    const scrollToDataPolicy = () => {
        dataPolicy.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    };

    if (UserStateSettings) {
        
        return (
            <>
                <BackButton navigation={navigation} />
                <ProfileAndLogout 
                    UserStateSettings={UserStateSettings}
                    setUserStateSettings={setUserStateSettings}
                    UserStateNecSettings={UserStateNecSettings}
                    nsec={nsec}
                />
            </>
        );

    } else {
        return (
            <>
                <BackButton navigation={navigation} />
                
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
            </>
        );
    }
}
