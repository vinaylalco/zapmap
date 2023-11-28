import React, { useState } from "react"
import { Pressable, View, Text, Image, StyleSheet,ScrollView } from "react-native"
import ReviewCount from '../ReviewCount'
import {CommonStyles} from '../../styles/CommonStyles'
import { mapstrGetUserProfile, randomNumberInRange } from '../../hooks/common'
import {ndk} from '../../api/constants'
import AllReviews from '../AllReviews'

export default function UserInfo({
    CreatorPublicKey, 
    UserProfileDisplayName, 
    setUserProfileDisplayName,
    ShowExtra
}){

    const [Followed, setFollowed] = React.useState(false)
    const [userProfileImage, setUserProfileImage] = React.useState("https://robohash.org/"+randomNumberInRange(1, 50)+".png")
    const userProfile = mapstrGetUserProfile(CreatorPublicKey, ndk).then((profile) => {
        if(profile != null){
            setUserProfileImage(profile.image);
            setUserProfileDisplayName(
                profile.displayName ? profile.displayName : profile.username
            );
        }else{
            return null
        }
    })

    function Follow(){
        const Follow = ndk.subscribe({ kinds: [1], authors: [CreatorPublicKey] })
        setFollowed(true)
    }

    function UnFollow(){
        const UnFollow = ndk.subscribe({ kinds: [1], authors: [CreatorPublicKey] }, { closeOnEose: false })
        setFollowed(false)
    }

    return (
        <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={UserInfoStyles.userWrapper}
        >
            <Image
                source={userProfileImage}
                style={[UserInfoStyles.profileImage]}
            />
            
            <ReviewCount publicKey={CreatorPublicKey} />
            
            {
                ShowExtra ?
                <>
                    <AllReviews publicKey={CreatorPublicKey} />
                </>
                :
                null
            }
            
        </ScrollView>
    )
}

const UserInfoStyles = StyleSheet.create({
    userWrapper:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileImage:{
        height: '6em',
        width: '6em',
        borderRadius: '50%',
        marginBottom: '2em'
    }
})

// {
// Followed ?
// <Pressable 
//     onPress={UnFollow} 
//     style={[CommonStyles.pressable]}
// >
//     <Text style={[CommonStyles.pressableInner]} >
//         Unfollow <Text style={[CommonStyles.bolded600Text]} >{UserProfileDisplayName}</Text>
//     </Text>
// </Pressable>
// :
// <Pressable 
//     onPress={Follow} 
//     style={[CommonStyles.pressable]}
// >
//     <Text style={[CommonStyles.pressableInner]} >
//         Follow <Text style={[CommonStyles.bolded600Text]} >{UserProfileDisplayName}</Text>
//     </Text>
// </Pressable>
// }