import React, { useEffect } from "react";
import {View, StyleSheet, Text, ScrollView} from "react-native";
import { CommonStyles} from '../styles/CommonStyles.js'
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet";
import btcYellow from "../styles/btcYellow.js";
import btcPin from '../../assets/btcPin.svg'
import nostrPin from '../../assets/nostrPin.svg'
import osmPin from '../../assets/osmPin.svg'

export function locationDetails(content, subject, amenity){
    if( amenity ){
        return <Text style={[CommonStyles.paragraphText]} >Categorised as <Text style={[CommonStyles.bold]}>{amenity}</Text> by Open Street Maps</Text>
    }else if(subject){
        return <Text style={[CommonStyles.paragraphText]} >Categorised as <Text style={[CommonStyles.bold]}>{subject}</Text> by ZapMap</Text>
    }else if(content ){
        return <Text style={[CommonStyles.paragraphText]} >{content}</Text>
    }
}

export function markerActions(id, navigation, lat, lng, title, locationUniqueIdentifier, content, tags, npub, dateCreated, type) {

    navigation.navigate('LocationScreen', {
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
            ScrollId: locationUniqueIdentifier,
            type: type
        }
    })
}

export function Icon(thirdPartyLinkParam, locationUniqueIdentifier, type, tags) {
    // bit ugly returning return statements like this but conditionally altering jus the image url didnt work. shrug.
    if (type === "node" ) {
        if(tags['currency:XBT'] === "yes"){
            return new L.Icon({
                iconUrl: btcPin,
                iconSize: [37, 62],
                shadowSize: [50, 82],
            });

        }else{
            return new L.Icon({
                iconUrl: osmPin,
                iconSize: [37, 62],
                shadowSize: [50, 82],
            });
        }

    }else{
        return new L.Icon({
            iconUrl: nostrPin,
            iconSize: [37, 62],
            shadowSize: [50, 82],
        });
    }
}

export function CurrentLocation({ CurrentLat, CurrentLng }) {
    return (
        <Circle
            center={[CurrentLat, CurrentLng]}
            weight={0}
            color={"#1d1a1a"}
            fillColor={"#0096FF"}
            fillOpacity={1}
            radius={5}
        ></Circle>
    );
}