import React, { useState } from "react"
import { Pressable, View, Text, Image, StyleSheet } from "react-native"
import ReviewCount from '../ReviewCount'
import {CommonStyles} from '../../styles/CommonStyles'
import { mapstrGetUserProfile, randomNumberInRange } from '../../hooks/common'
import {ndk} from '../../api/constants'

export default function UserInfo({
    publicKey, 
    userProfileDisplayName, 
    setuserProfileDisplayName,
    IsZapForm
}){

    function Follow(){
        ndk.subscribe({ kinds: [1], authors: [publicKey] }).then( (response) => {
            console.log(response)
        })
    }

    // function UnFollow(){
        // ndk.subscribe({ kinds: [1], authors: ["..."] }, { closeOnEose: false })
    // }

    const [userProfileImage, setUserProfileImage] = React.useState("https://robohash.org/"+randomNumberInRange(1, 50)+".png")
    const userProfile = mapstrGetUserProfile(publicKey, ndk).then((profile) => {
        if(profile != null){
            setUserProfileImage(profile.image);
            setUserProfileDisplayName(
                profile.displayName ? profile.displayName : profile.username
            );
        }else{
            return null
        }
    })

    return (
        <View style={[UserInfoStyles.userWrapper]} >
            <Image
                source={userProfileImage}
                style={[UserInfoStyles.profileImage]}
            />
            <ReviewCount publicKey={publicKey} />
        </View>
    )
}

const UserInfoStyles = StyleSheet.create({
    userWrapper:{
        display: 'flex',
        alignItems: 'center'
    },
    profileImage:{
        height: '6em',
        width: '6em',
        borderRadius: '50%',
        marginBottom: '2em'
    }
})
