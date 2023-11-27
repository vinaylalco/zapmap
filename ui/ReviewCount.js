import React, { useState } from "react"
import {Text} from "react-native"
import {getUserReviewCount} from '../api/api'
import {CommonStyles} from '../styles/CommonStyles'
import {ndk, mapstrpublickey} from '../api/constants'

export default function ReviewCount({publicKey}){

	const [Count, setCount] = React.useState(0)
	getUserReviewCount(mapstrpublickey, ndk, publicKey).then((response) => {
        setCount(response)
    }).catch((error) => {
        console.log(error);
    })

    return(
        <Text style={[CommonStyles.paragraph]} >
            {Count} reviews
        </Text>
	)
}