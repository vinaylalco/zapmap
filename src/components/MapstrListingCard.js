import React, { useState } from "react";
import btcYellow from "../styles/btcYellow.js";
import { Pressable, View, Text, Image, StyleSheet } from "react-native";
import { mapstrGetUserProfile, formatNoteContent, randomNumberInRange } from "../functions/usefulFunctions";
import {locationDetails} from "../functions/mapFunctions";
import { CommonStyles} from '../styles/CommonStyles.js'
import locationPin from '../../assets/locationPin.svg'
import lightningPayment from '../../assets/lightningPayment.svg'

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
                    style={[CommonStyles.SVGImageInListing]}
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
            style={ !showLocationScreenButton ? styles.listingCardInListing(mediaQueryWidth, mediaQueryMarginCard) : styles.listingCard(mediaQueryWidth, mediaQueryMarginCard) }
            id={id}
            className={ScrollId}
        >
            {
                type === "node" ?
                    <View style={[styles.profileAreaWrapper]}>
                        <View style={[styles.profileInnerWrapper]}>
                            <Text style={[styles.profileParagraph]} >
                                <Text style={[CommonStyles.bold]}>
                                    {title}
                                </Text>
                            </Text>
                            {
                                tags['currency:XBT'] === "yes" ?
                                <Text style={[styles.acceptBTC]} >(Accepts BTC)</Text> :
                                null
                            }
                        </View>
                    </View>
                :
                    <View style={[styles.profileAreaWrapper]}>
                        <Image
                            style={styles.profileImage}
                            source={userProfileImage}
                        />
                        <View style={[styles.profileInnerWrapper]}>
                            <Text style={[styles.profileParagraph]} >
                                <Text style={[CommonStyles.bold]}>{userProfileDisplayName}</Text> was at <Text style={[CommonStyles.bold]}>{title}</Text>
                            </Text>
                            <Text style={[styles.profileSubHeading]} >{formatedDate}</Text>
                        </View>
                    </View>
            }

            <Text style={[styles.formatNoteContent]} >
                { locationDetails(content, tags.subject, tags.amenity) }
            </Text>
            
            <View style={[styles.iconWrapper]}>
                
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
                                style={[CommonStyles.SVGImageInListing]}
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
                        style={[styles.listingCardPressable('100%')]}
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
                        <Text style={[styles.profileParagraph]} >{title}</Text>
                    </Pressable>
                :
                    null
            }

        </View>
    );
}

const styles = StyleSheet.create({
    iconWrapper:{
        flexDirection:'row-reverse',
    },
    icon:{
        // paddingRight: '1em',
        paddingLeft: '2em'
    },
    listingCardInListing: (mediaQueryWidth,mediaQueryMarginCard) => ({
        boxShadow: "none",
        backgroundColor: "#2a2424",
        color: "#fff",
        padding: '1em',
        marginLeft: '1em',
        marginRight: '1em',
        marginBottom: '1em'
    }),
    listingCard: (mediaQueryWidth,mediaQueryMarginCard) => ({
        boxShadow: "none",
        backgroundColor: "#2a2424",
        color: "#fff",
        padding: '1em',
        marginLeft: '1em',
        marginRight: '1em',
        marginBottom: '1em'
    }),
    profileAreaWrapper:{
        flexDirection:'row', 
        alignItems:'center'
    },
    profileInnerWrapper:{
        flexDirection:'col', 
        alignItems:'left'
    },
    profileImage:{
        width: 50,
        height: 50,
        borderRadius: '50%',
        marginRight: '1em'
    },
    formatNoteContent:{
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        fontSize: "1em",
        color: "#fff",
        textAlign: 'left',
        marginTop: '1em',
        marginBottom: '1em'
    },
    profileParagraph:{
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        fontSize: "1em",
        color: "#fff",
        textAlign: 'left'
    },
    profileSubHeading:{
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        fontSize: "0.618em",
        color: "#fff",
        marginBottom: '1em',
        textAlign: 'left'
    },
    listingCardPressable: mediaQueryWidth => ({
        width: mediaQueryWidth,
        color: "#fff",
        padding: '1em',
        borderWidth: 1,
        borderColor: '#fff',
        textAlign: "center",
        backgroundColor: "#1d1a1a",
        fontFamily:
            '"Roboto","Helvetica","Arial",sans-serif',
        fontWeight: 600,
        fontSize: "1em",
        letterSpacing: "0.01681em",
        marginTop: '1em'
    }),
    navIcon: {
        color: '#fff',
        fontSize: '2em',
        paddingLeft: '1em',

    },
    btcIcon: {
        color: btcYellow['BTC'],
        fontSize: '2em',
        paddingLeft: '1em',
    },
    acceptBTC:{
        color: btcYellow['BTC'],
        fontWeight: 600
    }
})
