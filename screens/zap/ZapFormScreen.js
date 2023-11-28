import React, { useState,useEffect,Suspense } from 'react'
import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'
import ZapForm from './ZapForm'
import {setRelayListArray} from '../../api/api'
import {CommonStyles} from '../../styles/CommonStyles'

export default function ZapFormScreen( { route, navigation } ){

    const user = localStorage.getItem("user")
    const [UserStateZapForm, setUserStateZapForm] = React.useState(user)
    const nsecZapForm = localStorage.getItem("privado")
    const [nsecStateZapForm, setnnsecStateZapForm] = React.useState(nsecZapForm)
 
    return(
        <Suspense fallback={<Text  >Loading...</Text>}>
            <ZapForm
                id={route.params.params.id}
                UserStateZapForm={UserStateZapForm}
                RelayList={setRelayListArray}
                nsecZapForm={nsecZapForm}
                navigation={navigation}
            />
        </Suspense>
    )
}
 