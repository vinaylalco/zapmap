import React, { useState,useEffect,Suspense } from "react"
import { Text, View, ScrollView, Pressable, Image, StyleSheet } from 'react-native'
import {locationDetails} from '../../hooks/map'
import LocationReviewForm from "./LocationReviewForm"
import LocationReviewList from "./LocationReviewList"
import {ndk, mapstrpublickey} from '../../api/constants'
import {CommonStyles} from '../../styles/CommonStyles'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'
import BackButton from '../../ui/BackButton'

export default function LocationScreen({ route, navigation }){

    const user = localStorage.getItem("user")
    const [UserStateLocation, setUserStateLocation] = React.useState(user)
    const nsecLocation = localStorage.getItem("privado")
    const [nsecStateLocation, setnsecStateLocation] = React.useState(nsecLocation)
    
    return(
        <Suspense fallback={<Text>Loading...</Text>}>
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={[CommonStyles.wrapper]}
            >
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle=
                    { 
                        isMobile ? 
                        [CommonStyles.LocationInnerMobile] : 
                        [CommonStyles.inner] 
                    }
                >
                    <BackButton navigation={navigation} />
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
                            UserStateLocation={UserStateLocation}
                            mapstrpublickey={mapstrpublickey}
                            titleProp={route.params.params.title}
                            latProp={route.params.params.lat}
                            lngProp={route.params.params.lng}
                            nsecStateLocation={nsecStateLocation}
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
