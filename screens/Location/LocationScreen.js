import React, { useState,useEffect,Suspense } from "react"
import { Text, View, ScrollView, Pressable, Image, StyleSheet } from 'react-native'
import {locationDetails} from '../../hooks/map'
import LocationReviewForm from "./LocationReviewForm"
import LocationReviewList from "./LocationReviewList"
import backButton from '../../assets/backButton.svg'
import {ndk, mapstrpublickey} from '../../api/constants'
import {CommonStyles} from '../../assets/styles/CommonStyles'

export default function LocationScreen({ route, navigation }){

    const user = localStorage.getItem("user")
    const [UserStateLocation, setUserStateLocation] = React.useState(user)
    const nsecLocation = localStorage.getItem("privado")
    const [nsecStateLocation, setnsecStateLocation] = React.useState(nsecLocation)
    
    return(
        <Suspense fallback={<Text  >Loading...</Text>}>
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={[LoadingScreenStyles.wrapper]}
            >
                
                <ScrollView 
                    showsVerticalScrollIndicator={false} 
                    contentContainerStyle={[LoadingScreenStyles.inner]}
                >
                    <Text style={[CommonStyles.heading]} >
                        {route.params.params.title} 
                    </Text>
                    <Text style={[CommonStyles.paragraph]} >
                        {locationDetails(route.params.params.content, route.params.params.tags.subject, route.params.params.tags.amenity)}
                    </Text>
                    <Text style={[CommonStyles.paragraph]} >
                        {route.params.params.tags.subject ? route.params.params.tags.subject : ''}
                    </Text>
                    <Suspense fallback={<Text  >Loading...</Text>}>
                        <LocationReviewForm 
                            ndk={ndk}
                            user={route.params.user}
                            mapstrpublickey={mapstrpublickey}
                            titleProp={route.params.params.title}
                            latProp={route.params.params.lat}
                            lngProp={route.params.params.lng}
                        />
                    </Suspense>

                    <Suspense fallback={<Text  >Loading...</Text>}>
                        <LocationReviewList
                            ScrollId={route.params.params.ScrollId}
                            mapstrpublickey={mapstrpublickey}
                            ndk={ndk}
                            navigation={navigation}
                            lat={route.params.params.lat}
                            lng={route.params.params.lng}
                        />
                    </Suspense>
                </ScrollView>
            </ScrollView>
        </Suspense>
    )    
}

const LoadingScreenStyles = StyleSheet.create({
    wrapper:{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(42, 36, 36, 0.5)'
    },
    inner:{
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '1em',
        marginTop: '25%',
        width: '25vw'
    }
})
