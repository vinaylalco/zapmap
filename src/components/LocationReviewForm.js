import React, { useState } from "react";
import { Text, View, Pressable, ScrollView, TextInput, StyleSheet } from "react-native";
import { Formik, Field, Form } from "formik";
import { createReviewEvent } from "../functions/usefulFunctions.js";
import NDK, {
    NDKPrivateKeySigner,
    NDKNip07Signer,
    NDKEvent,
} from "@nostr-dev-kit/ndk";
import * as yup from "yup";
import btcYellow from "../styles/btcYellow.js";
import {CommonStyles} from '../styles/CommonStyles.js'

function LocationReviewForm({
    ndk,
    UserStateLocation,
    mapstrpublickey,
    titleProp,
    latProp,
    lngProp,
    nsecStateLocation
}) {
    
    const [reviewFormMessage, setReviewFormMessage] = React.useState(null);
    const [reviewFormMessageColor, setReviewFormMessageColor] = React.useState(
        btcYellow["BTC"]
    );

    let mapRef = React.useRef();
    const validationSchema = yup.object().shape({
        content: yup
            .string()
            .min(1, "Enter a Description of your experience here")
            .required("true"),
    });

    return (    
        <ScrollView contentContainerStyle={[styles.writeReviewContainer]} >

            <Text style={[CommonStyles.formHeading]}>Write a Review</Text>
            <Formik
                validationSchema={validationSchema}
                initialValues={{
                    content: "",
                }}
                onSubmit={(values, {resetForm}) => {
                    
                    // const privadoLlave = localStorage.getItem("privado")
                    // const signer = new NDKPrivateKeySigner(privadoLlave)
                    let signer = null
                    setReviewFormMessage("Wait please...")
                    if(nsecStateLocation == "undefined"){
                        signer = new NDKNip07Signer()
                    }else{
                        signer = new NDKPrivateKeySigner(nsecStateLocation)
                    }

                    createReviewEvent(
                        ndk,
                        UserStateLocation,
                        values,
                        signer,
                        mapstrpublickey,
                        setReviewFormMessage,
                        setReviewFormMessageColor,
                        titleProp,
                        latProp,
                        lngProp
                    );
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
                    field
                }) => (
                    <View>

                        <TextInput
                            style={ errors.content === "true" ? CommonStyles.inputFieldError : CommonStyles.inputField }
                            multiline="true"
                            rows={5}
                            id="content"
                            name="content"
                            placeholder="Description of the location"
                            value={values.content}
                            onChange={handleChange("content")}
                            onBlur={handleBlur("content")}
                        />

                        <Pressable onPress={handleSubmit} disabled={!isValid}>
                            <Text
                                style={[CommonStyles.pressable]}
                            >
                                Create
                            </Text>
                        </Pressable>

                        <Text
                            style={[CommonStyles.userMessage(reviewFormMessageColor)]}
                        >
                            {reviewFormMessage}
                        </Text>
                    </View>
                )}
            </Formik>
        </ScrollView>
    );
}

export default LocationReviewForm;

const styles = StyleSheet.create({
        writeReviewContainer:{
        paddingTop: '1em'
    }
})
