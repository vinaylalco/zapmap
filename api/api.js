import { Pressable, StyleSheet, View } from "react-native"
import { useEffect, useRef } from "react"
import Geohash from "latlon-geohash"
import NDK, { NDKEvent, NDKFilter } from "@nostr-dev-kit/ndk"
import Geolocation from "@react-native-community/geolocation"
import MapstrListingCard from "../screens/home/MapstrListingCard"
import {preparelocationUniqueIdentifier} from '../hooks/common'

export async function GetGlobalEvents(mapstrpublickey, ndk){

    const filter: NDKFilter = {
        kinds: [1],
        "#r": [mapstrpublickey],
        limit: 500,
    };

    const points = [];
    let events = await ndk.fetchEvents(filter).then((response) => {
        {
            Array.from(response).map((event) => {
                let latLngString = "";
                let lat = 0;
                let lng = 0;
                let title = "";
                let contentString = "";
                if (event.tags[0] != undefined) {
                    contentString = event.content.split("||");
                    latLngString = event.tags[0][1].split(",");
                    lat = parseFloat(latLngString[0], 10);
                    lng = parseFloat(latLngString[1], 10);
                    title = event.tags[2][1];

                    if (
                        typeof(lat) === "number" && 
                        lat > 0 &&
                        typeof(lng) === "number" && 
                        lng > 0
                    ) {
                        points.unshift({
                            type: 'nostr',
                            lat: lat,
                            lng: lng,
                            content: contentString[0],
                            id: event.id,
                            npub: event.pubkey,
                            title: title,
                            dateCreated: event.created_at,
                            tags: event.tags
                        });
                    }
                }
            });
        }
    }).catch((error) => {
        console.log(error);
    });
    return points;
}

export async function GetEvents(lat, lng, mapstrpublickey, ndk, mapstrEventType) {

    let geohash = Geohash.encode(lat, lng, 4)
    const filter: NDKFilter = {
        kinds: [1],
        "#r": [mapstrpublickey],
        "#g": [geohash],
        limit: 500,
    };

    const points = [];
    let events = await ndk.fetchEvents(filter).then((response) => {
        {
            Array.from(response).map((event) => {
                let latLngString = "";
                let lat = 0;
                let lng = 0;
                let title = "";
                let contentString = "";
                if (event.tags[0] != undefined) {
                    contentString = event.content.split("||");
                    latLngString = event.tags[0][1].split(",");
                    lat = parseFloat(latLngString[0], 10);
                    lng = parseFloat(latLngString[1], 10);
                    title = event.tags[2][1];

                    if (
                        typeof(lat) === "number" && 
                        lat > 0 &&
                        typeof(lng) === "number" && 
                        lng > 0
                    ) {
                        points.unshift({
                            type: 'nostr',
                            lat: lat,
                            lng: lng,
                            content: contentString[0],
                            id: event.id,
                            npub: event.pubkey,
                            title: title,
                            dateCreated: event.created_at,
                            tags: event.tags,
                            locationUniqueIdentifier: preparelocationUniqueIdentifier(title, geohash)
                        });
                    }
                }
            });
        }
    }).catch((error) => {
        console.log(error);
    });
    return points;
}

export function setRelayListArray(){

    let AlteredRelayListLocal = localStorage.getItem("AlteredRelayListLocal")
    let RelayList = [
            "wss://nostr.wine",
            "wss://nostr.mom",
            "wss://nos.lol",
            "wss://relay.nostr.band",
            "wss://relayable.org",
            "wss://lightningrelay.com",
            "wss://nostr.bongbong.com"
    ]
    if(AlteredRelayListLocal){
        let AlteredRelayListParseLocal = JSON.parse(AlteredRelayListLocal)
        RelayList = AlteredRelayListParseLocal
    }
    return RelayList
}

export function removeRelay(title, RelayList, setRelayList){

    const AlteredRelayList = []
    RelayList.map( (relay,index) => {
        if( relay !== title ){
            AlteredRelayList.push(relay)
        }
    })

    setRelayList(AlteredRelayList)
    let AlteredRelayListLocal = JSON.stringify(AlteredRelayList)
    localStorage.setItem("AlteredRelayListLocal", AlteredRelayListLocal)
}

export function addRelay(title, RelayList, setRelayList){
    
    const AlteredRelayList = []
    RelayList.map( (relay,index) => {
        AlteredRelayList.push(relay)
    })
    AlteredRelayList.push(title)
    setRelayList(AlteredRelayList)
    let AlteredRelayListLocal = JSON.stringify(AlteredRelayList)
    localStorage.setItem("AlteredRelayListLocal", AlteredRelayListLocal)
}

export async function connectNDK(ndk){
    return await ndk.connect();
}

export async function GetReviewEventsByLocation(mapstrpublickey, ndk, mapstrEventType, ScrollId, lat, lng) {

    let geohash = Geohash.encode(lat, lng, 4)
    const filter: NDKFilter = {
        kinds: [1],
        "#r": [mapstrpublickey],
        "#r": [ScrollId],
        "#l": [mapstrEventType],
        limit: 50,
    };

    const points = [];
    let events = await ndk.fetchEvents(filter).then((response) => {
        {
            Array.from(response).map((event) => {
                let latLngString = "";
                let lat = 0;
                let lng = 0;
                let title = "";
                let contentString = "";
                if (event.tags[0] != undefined) {
                    contentString = event.content.split("||");
                    latLngString = event.tags[0][1].split(",");
                    lat = parseFloat(latLngString[0], 10);
                    lng = parseFloat(latLngString[1], 10);
                    title = event.tags[2][1];

                    if (
                        typeof(lat) === "number" && 
                        lat > 0 &&
                        typeof(lng) === "number" && 
                        lng > 0
                    ) {
                        points.push({
                            type: 'nostr',
                            lat: lat,
                            lng: lng,
                            content: contentString[0],
                            id: event.id,
                            npub: event.pubkey,
                            title: title,
                            dateCreated: event.created_at,
                            tags: event.tags,
                            locationUniqueIdentifier: preparelocationUniqueIdentifier(title, geohash)
                        });
                    }
                }
            });
        }
    }).catch((error) => {
        console.log(error);
    });
    return points;
}

export async function createReviewEvent(
    ndk,
    npub,
    formValues,
    signer,
    mapstrpublickey,
    setReviewFormMessage,
    titleProp,
    latProp,
    lngProp
) {
    const ndkEvent = new NDKEvent(ndk);
    let eventGeoHash = "";
    let lat = parseFloat(latProp, 10);
    let lng = parseFloat(lngProp, 10);
    eventGeoHash = Geohash.encode(lat,lng, 4);
    let ScrollId = preparelocationUniqueIdentifier(
        titleProp,
        eventGeoHash
    );
    ndkEvent.kind = 1;

    ndkEvent.content =
        titleProp +
        ": " +
        formValues.content +
        "       ||       Earn Sats by creating your own locations and reviews of your favorite local spots at https://mapstr.xyz/. View this location at https://mapstr.xyz/?lat=" +
        lat +
        "&lng=" +
        lng +
        "&id=" +
        ScrollId;

    ndkEvent.pubkey = npub;
    ndkEvent.created_at = Math.floor(Date.now() / 1000);
    ndkEvent.tags = [
        ["a", latProp + ',' + lngProp],
        ["g", eventGeoHash],
        ["title", titleProp],
        ["r", mapstrpublickey],
        ["t", "mapstr"],
        ["l", "mapstrReviewEvent"],
        ["r", ScrollId]
    ];

    ndkEvent.sign(signer).then((signingResult) => {
        if (window.live) {
            ndkEvent
                .publish()
                .then((publishingResult) => {
                    setReviewFormMessage(null);
                    Geolocation.getCurrentPosition((info) => {
                        GetEvents(
                            info.coords.latitude,
                            info.coords.longitude,
                            mapstrpublickey,
                            ndk,
                            "mapstrReviewEvent"
                        ).then((results) => {

                            let ListingsArray = results.map(
                                (
                                    {
                                        title,
                                        tags,
                                        content,
                                        lat,
                                        lng,
                                        id,
                                        npub,
                                        dateCreated,
                                    },
                                    index
                                ) => {
                                    let value = (
                                        <MapstrListingCard
                                            tags={tags}
                                            key={index}
                                            title={title}
                                            content={content}
                                            lat={lat}
                                            lng={lng}
                                            id={id}
                                            npub={npub}
                                            dateCreated={dateCreated}
                                            ndk={ndk}
                                            ScrollId={ScrollId}
                                        />
                                    );
                                    return value;
                                }
                            );
                        });
                    });
                    return true;
                })
                .catch((error) => {
                    console.log(error)
                    setReviewFormMessage("Review creation failed")
                    return false;
                });
        } else {
            console.log("Dev Mode");
            console.log(ndkEvent.content)
        }
    })
}

export async function createEventMarker(
    ndk,
    npub,
    formValues,
    signer,
    mapstrpublickey,
    mapRef,
    setUserMessage,
    setMarkersProp,
    setMapstrListingsProp
) {

    const ndkEvent = new NDKEvent(ndk);
    let eventGeoHash = "";
    let latLngString = formValues.coords.split(",");
    let lat = parseFloat(latLngString[0], 10);
    let lng = parseFloat(latLngString[1], 10);
    eventGeoHash = Geohash.encode(lat, lng, 4);
    let ScrollId = preparelocationUniqueIdentifier(
        formValues.title,
        eventGeoHash
    );
    ndkEvent.kind = 1;
    ndkEvent.content =
        formValues.title +
        ": " +
        formValues.content +
        "       ||       Earn Sats by creating your own locations and reviews of your favorite local spots at https://mapstr.xyz/. View this location at https://mapstr.xyz/?lat=" +
        lat +
        "&lng=" +
        lng +
        "&id=" +
        ScrollId;

    ndkEvent.pubkey = npub;
    ndkEvent.created_at = Math.floor(Date.now() / 1000);
    ndkEvent.tags = [
        ["a", formValues.coords],
        ["g", eventGeoHash],
        ["title", formValues.title],
        ["r", mapstrpublickey],
        ["subject", formValues.category],
        ["t", "mapstr"],
        ["l", "mapstrLocationEvent"],
        ["r", ScrollId]
    ];

    ndkEvent.sign(signer).then((signingResult) => {
        
        if (window.live) {
            ndkEvent
                .publish()
                .then((publishingResult) => {
                    setUserMessage(null)
                    return true;
                })
                .catch((error) => {
                    console.log(error)
                    setUserMessage("There was an error while creating the location.")
                    return false;
                });
        } else {
            console.log("Dev Mode")
            console.log(ndkEvent)
        }
    })
}
