import React, { useState } from "react"
import {Text,View } from "react-native"
import MapstrListingCard from "./MapstrListingCard.js"
import {CommonStyles} from '../styles/CommonStyles.js'
import { GetReviewEventsByLocation } from "../functions/usefulFunctions";

// todo: hook rules 
export default function LocationReviewList({ 
    ScrollId,
    mapstrpublickey,
    ndk,
    navigation,
    lat,
    lng
}){
    const [reviewListLoading, setReviewListLoading] = React.useState(false)
    const [SpecificReviews, setSpecificReviews] = React.useState([])
    const mapstrEventsInTheArea = GetReviewEventsByLocation(
        mapstrpublickey,
        ndk,
        'mapstrReviewEvent',
        ScrollId,
        lat,
        lng
    ).then((NostrResults) => {
        
        if(NostrResults != null || NostrResults != undefined){
                const reviewsArray = []
                NostrResults.forEach((event, index) => {
                    if( event.type == 'nostr' ){

                        event.tags.map( (tag, index) => {

                            if( tag[1] == ScrollId ){
                                reviewsArray.push(event)
                            }
                        })
                    }
                    
                });
                setSpecificReviews(reviewsArray)
                if(reviewsArray.length === 0){
                    
                    setReviewListLoading(true)
                }
        }else{
            setReviewListLoading(true)
        }

    }).catch((error) => {
        console.log(error);
    });

    return(
        <View>
            {
                reviewListLoading ? 
                <Text style={CommonStyles.paragraphText}>Be the first to review this place!</Text> :
                SpecificReviews.map((card, index) => (
                    <MapstrListingCard
                        title={card.title}
                        tags={card.tags}
                        content={card.content}
                        lat={card.lat}
                        lng={card.lng}
                        id={card.id}
                        npub={card.npub}
                        dateCreated={card.dateCreated}
                        ndk={ndk}
                        ScrollId={card.locationUniqueIdentifier}
                        navigation={navigation}
                        showLocationScreenButton={false}
                    />
                ))
            }
        </View>
    )
}
