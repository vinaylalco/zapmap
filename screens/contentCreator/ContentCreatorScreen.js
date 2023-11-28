import React, { useState,useEffect,Suspense } from 'react'
import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'
import {CommonStyles} from '../../styles/CommonStyles'
import {isMobile } from 'react-device-detect'
import BackButton from '../../ui/BackButton'
import { mapstrGetUserProfile, randomNumberInRange } from '../../hooks/common'
import {ndk} from '../../api/constants'
import UserInfo from '../../ui/UserInfo/UserInfo'

export default function ContentCreatorScreen( { route, navigation } ){

    const [UserProfileDisplayName, setUserProfileDisplayName] = React.useState(null)
    const [userProfileImage, setUserProfileImage] = React.useState("https://robohash.org/"+randomNumberInRange(1, 50)+".png?size=96x96")
    const userProfile = mapstrGetUserProfile(route.params.params.contentCreatorNpub, ndk).then((profile) => {
        if(profile != null){
            setUserProfileImage(profile.image)
            setUserProfileDisplayName(
                profile.displayName ? profile.displayName : profile.username
            )
        }else{
            return null
        }
    })

    return(
        <Suspense fallback={<Text  >Loading...</Text>}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[CommonStyles.wrapper]}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle=
                        { 
                            isMobile ? 
                            [ContentCreatorStyles.innerMobile] : 
                            [ContentCreatorStyles.inner] 
                        }
                >
                    <BackButton navigation={navigation} />
                    <UserInfo 
                        CreatorPublicKey={route.params.params.contentCreatorNpub}
                        UserProfileDisplayName={UserProfileDisplayName} 
                        setUserProfileDisplayName={setUserProfileDisplayName}
                        ShowExtra={true}
                    />
                </ScrollView>
            </ScrollView>
        </Suspense>
    )
}

const ContentCreatorStyles = StyleSheet.create({
    inner:{
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '1em',
        height: '50vh',
        width: '25vw',
        flexGrow: 1, 
        justifyContent: 'center'
    },
    innerMobile:{
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '1em',
        height: '97vh',
        width: '97vw',
        flexGrow: 1, 
        justifyContent: 'center'
    },
})
 