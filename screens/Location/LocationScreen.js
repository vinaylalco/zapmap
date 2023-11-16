import React, { useState,useEffect,Suspense } from "react"
import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'
import {locationDetails} from '../../hooks/map'
import LocationReviewForm from "./LocationReviewForm"
import LocationReviewList from "./LocationReviewList"
import backButton from '../../assets/backButton.svg'

export default function LocationScreen({ route, navigation }){

    const user = localStorage.getItem("user")  // Basically same as npub value for user.
    const [UserStateLocation, setUserStateLocation] = React.useState(user)
    const nsecLocation = localStorage.getItem("privado")
    const [nsecStateLocation, setnsecStateLocation] = React.useState(nsecLocation)
    return(
        <Suspense fallback={<Text  >Loading...</Text>}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.LocationListingContainer]} >
                
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.LocationListingInner]} >
                    <Text  >
                        {route.params.params.title} 
                    </Text>
                    <Text  >
                        {locationDetails(route.params.params.content, route.params.params.tags.subject, route.params.params.tags.amenity)}
                    </Text>
                    <Text  >
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