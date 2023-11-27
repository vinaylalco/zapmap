import { Pressable, StyleSheet, View } from "react-native"
import { useEffect, useRef } from "react"
import Geohash from "latlon-geohash"
import NDK, { NDKEvent, NDKFilter } from "@nostr-dev-kit/ndk"
import Geolocation from "@react-native-community/geolocation"
import MapstrListingCard from "../screens/home/MapstrListingCard"

export function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

export async function mapstrGetUserProfile(publicKey, ndk) {

    if(publicKey == null){return null}
    const user = ndk.getUser({
        hexpubkey: publicKey,
    })
    await user.fetchProfile()
    const userFullProfile = user.profile
    return userFullProfile
}

export const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function formatNoteContent(content) {

    if(content == null){return null}
    const prepareContentOne = content.split(": ");
    const prepareContentTwo = prepareContentOne[1].split("||");
    return prepareContentTwo[0]
}

export function preparelocationUniqueIdentifier(title, geohash) {
    if(!title)return null
    return title.replace(/ /g, "").replace(/[^\w ]/g, "") + "_" + geohash;
}

export function check_lat_lon(lat, lon) {
    const regexLat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
    const regexLon =
        /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;
    let validLat = regexLat.test(lat);
    let validLon = regexLon.test(lon);
    if (validLat && validLon) {
        console.log('true')
        return true;
    } else {
        console.log('false')
        return false;
    }
}
