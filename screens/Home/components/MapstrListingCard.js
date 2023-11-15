import React, { useState } from "react";
import { Pressable, View, Text, Image, StyleSheet } from "react-native";
import { mapstrGetUserProfile, formatNoteContent, randomNumberInRange } from "../../../src/functions/usefulFunctions";
import {locationDetails} from "../../../src/functions/mapFunctions"
import locationPin from '../../../assets/locationPin.svg'
import lightningPayment from '../../../assets/lightningPayment.svg'

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
    const [mediaQueryMaxWidth, setMediaQueryMaxWidth] = React.useState("85%");
    // miscellaneous
    const formatedDate = new Date(dateCreated * 1000).toLocaleDateString();
    const randomNumber = randomNumberInRange(1, 50);

    // console.log(tags.subject)
    // console.log(tags.amenity)

    return (

        <View
            id={id}
            className={ScrollId}
        >
            {
                type === "node" ?
                    <View>
                        <View >
                            <Text >
                                <Text>
                                    {title}
                                </Text>
                            </Text>
                            {
                                tags['currency:XBT'] === "yes" ?
                                <Text>(Accepts BTC)</Text> :
                                null
                            }
                        </View>
                    </View>
                :
                    <View>
                        <Image
                            source={userProfileImage}
                        />
                        <View>
                            <Text>
                                <Text>{userProfileDisplayName}</Text> was at <Text>{title}</Text>
                            </Text>
                            <Text>{formatedDate}</Text>
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
                            <Image
                                source={lightningPayment}
                            />
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
