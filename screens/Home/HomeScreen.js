import React, { useState,useEffect,Suspense } from "react"
import { Text, View, ScrollView, Pressable, Image } from 'react-native'
import {MapContainer,TileLayer,Circle, LayerGroup} from "react-leaflet"
import MapMarkers from './MapMarkers' 
import GeolocationSearch from './GeolocationSearch'
import GoToCurrentLocationButton from './GoToCurrentLocationButton'
import DrawerContent from './DrawerContent'
import GlobalFeedContent from './GlobalFeedContent'
import {CurrentLocation} from '../../hooks/map'
import {mapstrpublickey,ndk} from '../../api/constants.js'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'
import {HomeScreenStyles} from './HomeScreenStyles'

export default function HomeScreen({route, navigation}) {
    
    const [MapLatitude, setMapLatitude] = React.useState(29.97913478858854)
    const [MapLongitude, setMapLongitude] = React.useState(31.13417616605723)
    const [CurrentLat, setCurrentLat] = React.useState(29.97913478858854)
    const [CurrentLng, setCurrentLng] = React.useState(31.13417616605723)
    const [zoom, setZoom] = React.useState(18)
    const [locations, setLocations] = React.useState(null)
    const [radius, setRadius] = React.useState(104160) // 4*16.18 miles in meters
    const [radiusOSM, setRadiusOSM] = React.useState(800) 
    const [loadSite, setLoadSite] = React.useState(false)
    const [map, setMap] = React.useState()
    const [thirdPartyLink, setThirdPartyLink] = React.useState(null)
    const [HasNoListings, setHasNoListings] = React.useState(null)
    const [GlobalFeed, setGlobalFeed] = React.useState(false)
    const [GlobalButtonBck, setGlobalButtonBck] = React.useState('#1d1a1a')
    const [LocalButtonBck, setLocalButtonBck] = React.useState(null)

    function PressedGlobalButton(){
        setGlobalFeed(true)
        setGlobalButtonBck(null)
        setLocalButtonBck('#1d1a1a')
    }
    function PressedLocalButton(){
        setGlobalFeed(false)
        setGlobalButtonBck('#1d1a1a')
        setLocalButtonBck(null)
    }

    return (
        false ?
        <Text>Loading...</Text> :
        <View 
            style={[HomeScreenStyles.HomeScreenWrapper]} 
        >
            <Suspense 
                fallback={<Text>Loading...</Text>}
            >
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    style={[HomeScreenStyles.drawer]}
                >   
                    <View style={{flexDirection: 'row'}} >
                        <Pressable 
                            style={[HomeScreenStyles.feedButton]}
                            onPress={PressedGlobalButton}
                        >
                            <Text 
                                style={[HomeScreenStyles.feedButtonInner]} 
                            >
                                Global
                            </Text>
                        </Pressable>
                        <Pressable 
                            style={[HomeScreenStyles.feedButton]}
                            onPress={PressedLocalButton}
                        >
                            <Text
                                style={[HomeScreenStyles.feedButtonInner]} 
                            >
                                Local
                            </Text>
                        </Pressable>
                    </View>

                    {
                        GlobalFeed ?
                        <GlobalFeedContent
                            navigation={navigation}
                            ndk={ndk}
                            mapstrpublickey={mapstrpublickey}
                            loadSite={loadSite}
                            setLoadSite={setLoadSite}
                            locations={locations}
                            map={map}
                            CurrentLat={CurrentLat}
                            CurrentLng={CurrentLng}
                            HasNoListings={HasNoListings}
                            setHasNoListings={setHasNoListings}
                        />
                         :
                        <DrawerContent 
                            navigation={navigation}
                            ndk={ndk}
                            mapstrpublickey={mapstrpublickey}
                            loadSite={loadSite}
                            setLoadSite={setLoadSite}
                            locations={locations}
                            map={map}
                            CurrentLat={CurrentLat}
                            CurrentLng={CurrentLng}
                            HasNoListings={HasNoListings}
                            setHasNoListings={setHasNoListings}
                        />
                    }
                    
                </ScrollView>
            </Suspense>

            <View style={[HomeScreenStyles.mapOuter]} >
                <MapContainer 
                    center={[MapLatitude,MapLongitude]} 
                    zoom={zoom} 
                    scrollWheelZoom={false}
                    style={HomeScreenStyles.mapInner}
                >
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Suspense fallback={<Text>Loading...</Text>}>
                        <CurrentLocation CurrentLat={CurrentLat} CurrentLng={CurrentLng} />
                    </Suspense>
                    <Suspense fallback={<Text>Loading...</Text>}>
                        <MapMarkers
                            setThirdPartyLink={setThirdPartyLink}
                            thirdPartyLink={thirdPartyLink}
                            navigation={navigation}
                            loading={loadSite}
                            setLoading={setLoadSite}
                            localPoints={locations}
                            mapstrpublickey={mapstrpublickey}
                            zoom={zoom}
                            radius={radius}
                            radiusOSM={radiusOSM}
                            setLocations={setLocations}
                            setLoadSite={setLoadSite}
                            ndk={ndk}
                            setMap={setMap}
                            setCurrentLat={setCurrentLat}
                            setCurrentLng={setCurrentLng}
                        />
                    </Suspense>
                    <Suspense fallback={<Text>Loading...</Text>}>
                        <GeolocationSearch 
                            setLocations={setLocations} 
                            setLoadSite={setLoadSite} 
                            mapstrpublickey={mapstrpublickey}
                            ndk={ndk}
                            radius={radius}
                            radiusOSM={radiusOSM}
                        />
                    </Suspense>

                    <Suspense fallback={<Text>Loading...</Text>}>
                        <GoToCurrentLocationButton 
                            CurrentLat={CurrentLat} 
                            CurrentLng={CurrentLng}
                            zoom={zoom}
                            mapstrpublickey={mapstrpublickey}
                            ndk={ndk}
                            setLocations={setLocations}
                            setLoadSite={setLoadSite}
                            radius={radius}
                            radiusOSM={radiusOSM}
                            HasNoListings={HasNoListings}
                            setHasNoListings={setHasNoListings}
                        />
                    </Suspense>
                </MapContainer>
            </View>
        </View>
    );
}
