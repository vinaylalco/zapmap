import React, { useState } from "react";
import { Pressable, View, Text, Image, StyleSheet } from "react-native";
import { mapstrGetUserProfile, formatNoteContent, randomNumberInRange } from "../../hooks/common";
import {locationDetails} from "../../hooks/map"
import locationPin from '../../assets/locationPin.svg'
import lightningPayment from '../../assets/lightningPayment.svg'
import MapstrColors from '../../assets/styles/MapstrColors'
import {CommonStyles} from '../../assets/styles/CommonStyles'

export default function MapstrListingCard({
    title,
    tags,
    content,
    lat,
    lng,
    id,
    npub,
    dateCreated,
    ndk,
    ScrollId,
    navigation,
    showLocationScreenButton,
    type,
    map,
    currrentLat,
    currrentLng
}) {

    const ShowLocationOnMapButton = ( { map, lat, lng, ScrollId } ) => {
    
        function onClick() {

            var circle = L.circle([lat,lng], {
                  color: "#1d1a1a",
                  fillOpacity: 0.2,
                  radius: 5,
                  weight: 1 
              })
              circle.addTo(map)

            map.setView([lat,lng])
        }
        
        return (
            <Pressable
                onPress={onClick}
            >
                <Image
                    source={locationPin}
                />
            </Pressable>
        )
    }

    // Relates to the modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // User Profile
    const [userProfileImage, setUserProfileImage] = React.useState("");
    const [userProfileDisplayName, setUserProfileDisplayName] =
        React.useState("");
    const userProfile = mapstrGetUserProfile(npub, ndk).then((profile) => {
        if(profile != null){
            setUserProfileImage(profile.image);
            setUserProfileDisplayName(
                profile.displayName ? profile.displayName : profile.username
            );
        }else{
            return null
        }
    });
    // CSS related
    const [mediaQueryWidth, setMediaQueryWidth] = React.useState("100%");
    const [mediaQueryMarginCard, setMediaQueryMarginCard] =
        React.useState('1em');
    const [mediaQueryMarginModal, setMediaQueryMarginModal] =
        React.useState("1em");
    const [mediaQueryTransform, setMediaQueryTransform] = React.useState(
        "translate(-3%, -4%)"
    );
    const [mediaQueryMaxWidth, setMediaQueryMaxWidth] = React.useState("85%")
    // miscellaneous
    const formatedDate = new Date(dateCreated * 1000).toLocaleDateString()
    const randomNumber = randomNumberInRange(1, 50)

    return (

        <View
            id={id}
            className={ScrollId}
            style={[CardStyles.cardOuter]}
        >
            {
                type === "node" ?
                    <View>
                        <Text style={[CommonStyles.bolded600Text]} >
                            {title}
                        </Text>
                        {
                            tags['currency:XBT'] === "yes" ?
                            <Text style={[CommonStyles.bolded600Text]} >(Accepts BTC)</Text> :
                            null
                        }
                    </View>
                :
                    <View style={{flexDirection: 'row'}} >
                        <Image
                            source={userProfileImage}
                            style={[CardStyles.profileImage]}
                        />
                        <View style={[CardStyles.cardUserMeta]} >
                            <Text>
                                <Text style={[CommonStyles.bolded600Text]} >{userProfileDisplayName}</Text> was at <Text style={[CommonStyles.bolded600Text]} >{title}</Text>
                            </Text>
                            <Text style={[CardStyles.date]} >{formatedDate}</Text>
                        </View>
                    </View>
            }

            <Text>
                { locationDetails(content, tags.subject, tags.amenity) }
            </Text>
            
            <View>
                
                {
                    type !== "node" ?
                        <Pressable
                            style={CardStyles.zapButton}
                            onPress={
                                () =>   navigation.navigate('ZapFormScreen', {
                                            screen: 'ZapFormScreen',
                                            params: {
                                                id: id,
                                                npub: npub
                                            }
                                        })
                            }
                        >
                            <Text style={CardStyles.zapButtonInner}>Thanks</Text>
                        </Pressable> 
                    :
                        null
                }
                
                {   showLocationScreenButton ?
                        <ShowLocationOnMapButton 
                            map={map} 
                            lat={lat} 
                            lng={lng} 
                            ScrollId={ScrollId}  
                        />
                    :
                        null
                }

            </View>

            {   showLocationScreenButton ?
                    <Pressable
                        onPress={
                            () =>   navigation.navigate('LocationScreen', {
                                        screen: 'LocationScreen',
                                        params: { 
                                            title: title,
                                            tags: tags,
                                            content: content,
                                            lat: lat,
                                            lng: lng,
                                            id: id,
                                            npub: npub,
                                            dateCreated: dateCreated,
                                            ScrollId: ScrollId
                                        }
                                    })
                        }
                    >
                        <Text>{title}</Text>
                    </Pressable>
                :
                    null
            }

        </View>
    );
}

const CardStyles = StyleSheet.create({
    cardOuter:{
        padding: '1em',
        borderBottomWidth: '1px',
        borderBottomColor: MapstrColors['lightGrey']
    },
    profileImage:{
        height: '3em',
        width: '3em',
        borderRadius: '50%',
        marginRight: '1em',
        marginBottom: '1em'
    },
    cardUserMeta:{
        width: 'fit-content'
    },
    date:{
        fontSize: '0.618em'
    },
    zapButton:{
        marginTop: '0.5em',
        marginBottom: '0.5em',
        padding: '0.5em',
        borderRadius: '10px',
        backgroundColor: MapstrColors['lightGrey']
    },
    zapButtonInner:{
        textAlign: 'center'
    }
})

