import React, { useState } from "react";
import {
    Text,
    View,
    Pressable,
    TextInput,
    FlatList,
    ScrollView,
    StyleSheet
} from "react-native";

import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import NDK from "@nostr-dev-kit/ndk";
import {addRelay, removeRelay} from '../functions/usefulFunctions'
import {CommonStyles} from '../styles/CommonStyles.js'
import btcYellow from "../styles/btcYellow.js";

async function connectNDK(ndk){
    return await ndk.connect();
}

export default function RelayManagement({ RelayList }){

    const [RelayListState, setRelayListState] = React.useState(RelayList)

    type ItemProps = {title: string};
    const Item = ({title}: ItemProps) => (
        
        <View style={[styles.relayItem]}>
            <Text style={[styles.relayList]}>{title}</Text>
            <Text 
                onPress={ () => removeRelay(title, RelayListState, setRelayListState) }
                style={[styles.relayRemove]}
            >
                Remove
            </Text>
        </View>
    );

    const createValidationSchema = yup.object().shape({
        newRelayName: yup
            .string()
            .min(1, "Enter the URL of the relay")
            .required("true")
            .test({
                name: "is-newRelayName",
                skipAbsent: true,
                test(value, ctx) {
                    return value.includes("wss://");
                },
            })
    });
 
    return(
        <ScrollView contentContainerStyle={[CommonStyles.contentContainer]}>

            <FlatList
                style={[styles.relayList]} 
                data={RelayListState}
                renderItem={({item}) => <Item title={item} />}
                keyExtractor={item => Math.random()}
            />
            
            <Formik
                validationSchema={createValidationSchema}
                initialValues={{
                    newRelayName: "",
                }}
                onSubmit={(values, {resetForm}) => {
                    addRelay(values.newRelayName, RelayListState, setRelayListState)
                    resetForm();
                }}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    isValid,
                }) => (
                    <View>
                        <TextInput
                            style={ errors.newRelayName === "true" ? CommonStyles.inputFieldError : CommonStyles.inputField }
                            name="newRelayName"
                            placeholder="URL eg wss://relay.address"
                            value={values.newRelayName}
                            onChangeText={handleChange("newRelayName")}
                            onBlur={handleBlur("newRelayName")}
                        />

                        <Pressable onPress={handleSubmit} disabled={!isValid}>
                            <Text
                                style={[CommonStyles.pressable]}
                            >
                                Add New Relay
                            </Text>
                        </Pressable>
                    </View>
                )}
            </Formik>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    relayItem: {
        textAlign: 'center',
        padding:'1em'
    },
    relayList: {
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        fontWeight: 600,
        fontSize: "1em",
        letterSpacing: "0.01681em",
        color: '#fff',
        display: 'inline-block',
        textAlign: 'center',
        flexGrow: 0
    },
    relayRemove: {
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        fontWeight: 600,
        fontSize: "1em",
        letterSpacing: "0.01681em",
        color: btcYellow['BTC'],
        display: 'inline-block',
        textAlign: 'center'
    }
})
