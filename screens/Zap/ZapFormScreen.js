import React, { useState,useEffect,Suspense } from "react"
import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'
import ZapForm from "./ZapForm"

export default function ZapFormScreen( { route, navigation } ){

    const user = localStorage.getItem("user")  // Basically same as npub value for user.
    const [UserStateZapForm, setUserStateZapForm] = React.useState(user)
    const nsecZapForm = localStorage.getItem("privado")
    const [nsecStateZapForm, setnnsecStateZapForm] = React.useState(nsecZapForm)

    return(
        <Suspense fallback={<Text  >Loading...</Text>}>
            <ZapForm
                id={route.params.params.id}
                npub={route.params.params.npub}
                RelayList={RelayList}
                nsecZapForm={nsecZapForm}
            />
        </Suspense>
    )
}