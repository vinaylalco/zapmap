import React, { useState } from "react"
import {Text,FlatList} from "react-native"
import {getUserReviews} from '../api/api'
import {CommonStyles} from '../styles/CommonStyles'
import {ndk, mapstrpublickey} from '../api/constants'
import MapstrListingCard from "../screens/home/MapstrListingCard"

export default function AllReviews({publicKey}){

	const [AllReviews, setAllReviews] = React.useState([])
	getUserReviews(mapstrpublickey, ndk, publicKey).then((response) => {
        setAllReviews(response)
    }).catch((error) => {
        console.log(error);
    })

    return(
        <FlatList
            data={AllReviews}
            renderItem={
                ({item, index}) => <MapstrListingCard
                                tags={item.tags}
                                key={index}
                                title={item.title}
                                content={item.content}
                                lat={item.lat}
                                lng={item.lng}
                                id={item.id}
                                npub={item.npub}
                                dateCreated={item.dateCreated}
                                ndk={ndk}
                                ScrollId={item.locationUniqueIdentifier}
                                navigation={navigation}
                                showLocationScreenButton={true}
                                type={item.type}
                                UserProfile={true}
                            />
            }
            keyExtractor={item => Math.random()}
        />   
	)
}
