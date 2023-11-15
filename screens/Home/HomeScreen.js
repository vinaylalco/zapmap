import React, { useState,useEffect,Suspense } from "react"
import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'
import {MapContainer,TileLayer,Circle, LayerGroup} from "react-leaflet"
import MapMarkers from './components/MapMarkers' 
import GeolocationSearch from './components/GeolocationSearch'
import GoToCurrentLocationButton from './components/GoToCurrentLocationButton'
import DrawerContent from './components/DrawerContent'
import GlobalFeedContent from './components/GlobalFeedContent'
import {CurrentLocation} from '../../src/functions/mapFunctions'
import {mapstrpublickey,ndk} from '../../api/constants.js'

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
        <>
            <View>
                <MapContainer 
                    center={[MapLatitude,MapLongitude]} 
                    zoom={zoom} 
                    scrollWheelZoom={false}
                    style={{height: "50vh", width: "100%"}}
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

            <Suspense fallback={<Text>Loading...</Text>}>

                <ScrollView 
                    showsVerticalScrollIndicator={false}
                >   
                    <View>
                        <Pressable onPress={PressedGlobalButton}>
                            <Text >Global</Text>
                        </Pressable>
                        <Pressable onPress={PressedLocalButton}>
                            <Text>Local</Text>
                        </Pressable>
                    </View>

                    {
                        GlobalFeed ?
                        <View>
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
                        </View>
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
        </>
    );
}
