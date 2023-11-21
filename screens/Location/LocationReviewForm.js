import React, { useState } from "react";
import { Text, View, Pressable, ScrollView, TextInput, StyleSheet } from "react-native";
import { Formik, Field, Form } from "formik";
import { createReviewEvent } from "../../api/api";
import NDK, { NDKPrivateKeySigner,NDKNip07Signer,NDKEvent } from "@nostr-dev-kit/ndk";
import * as yup from "yup"
import {CommonStyles} from '../../assets/styles/CommonStyles'
import MapstrColors from '../../assets/styles/MapstrColors'
 
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
    const [reviewFormMessageColor, setReviewFormMessageColor] = React.useState(null);

    let mapRef = React.useRef();
    const validationSchema = yup.object().shape({
        content: yup
            .string()
            .min(1, "Enter a Description of your experience here")
            .required("true"),
    });

    return (    
        <ScrollView showsVerticalScrollIndicator={false} >

            <Text style={[reviewStyles.heading]} >Write a Review</Text>
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

                        <Pressable 
                            onPress={handleSubmit} 
                            disabled={!isValid}
                            style={[CommonStyles.submit]}
                        >
                            <Text style={[CommonStyles.submitInner]} >
                                Create
                            </Text>
                        </Pressable>

                        <Text style={[reviewStyles.paragraph]} >
                            {reviewFormMessage}
                        </Text>
                    </View>
                )}
            </Formik>
        </ScrollView>
    );
}

export default LocationReviewForm;

const reviewStyles = StyleSheet.create({
    paragraph:{
        fontSize: '1em',
        margin: '0.168em',
        padding: '0.168em',
        overflowWrap: "break-word",
        color: MapstrColors['darkGrey'],
        textAlign: 'center'
    },
    heading:{
        fontSize: '1.2em',
        fontWeight: 600,
        padding: '0.5em',
        margin: '0.168em',
        overflowWrap: "break-word",
        color: MapstrColors['darkGrey'],
        textAlign: 'center'
    },
})

