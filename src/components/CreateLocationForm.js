import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    ScrollView,
    TextInput,
    Pressable
} from "react-native";
import { Formik, Field, Form } from "formik"
import { createEventMarker } from "../functions/usefulFunctions.js"
import NDK, { NDKPrivateKeySigner, NDKNip07Signer } from "@nostr-dev-kit/ndk"
import * as yup from "yup"
import { check_lat_lon } from "../functions/usefulFunctions"
import Geolocation from "@react-native-community/geolocation"

function CreateLocationForm({
    name,
    ndk,
    UserStateSettings,
    mapstrpublickey,
    setMarkersProp,
    setMapstrListingsProp,
    marginsAcrossDevices,
    navigation,
    nsec
}) {
    const [userMessage, setUserMessage] = React.useState(null);
    const [userMessageColor, setUserMessageColor] = React.useState(null);

    let mapRef = React.useRef();
    const [dynamicCoords, setDynamicCoords] = React.useState('');
    const [FindingCoords, setFindingCoords] = React.useState(false);
    const [LocationTitle, setLocationTitle] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [content, setContent] = React.useState('');
    const createValidationSchema = yup.object().shape({

        coords: yup
            .string()
            .min(1, "Enter a Lat and Lng for this location")
            .required("true"),
        title: yup
            .string()
            .min(1, "Enter a Name for this location")
            .required("true"),
        category: yup
            .string()
            .min(1, "Enter a Category for this location")
            .required("true"),
        content: yup
            .string()
            .min(1, "Enter a Description for this location")
            .required("true"),
    });

    function useCurrentCoords(){
        
        setFindingCoords(true)
        Geolocation.getCurrentPosition((info) => {
            setDynamicCoords(info.coords.latitude+","+info.coords.longitude)
            setFindingCoords(false)
        })
    }

    function resetCoords(){
        setDynamicCoords('')
    }

    return (
        <ScrollView>
            <Formik
                enableReinitialize={true}
                validationSchema={createValidationSchema}
                initialValues={{
                    title: LocationTitle,
                    category: category,
                    coords: dynamicCoords,
                    content: content,
                    // UseCurrentCoordsField: false
                }}
                onSubmit={(values, { resetForm }) => {
                    setUserMessage('Wait please...')
                    let signer = null
                    if(nsec == "undefined"){
                        signer = new NDKNip07Signer()
                    }else{
                        signer = new NDKPrivateKeySigner(nsec)
                    }
                    
                    createEventMarker(
                        ndk,
                        UserStateSettings,
                        values,
                        signer,
                        mapstrpublickey,
                        mapRef,
                        setUserMessage,
                        setMarkersProp,
                        setMapstrListingsProp,
                        setUserMessageColor
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
                            // style={ errors.title === "true" ? CommonStyles.inputFieldError : CommonStyles.inputField }
                            name="title"
                            placeholder="Name of the location"
                            value={values.title}
                            onChange={handleChange("title")}
                            onBlur={e => {
                                setLocationTitle(e.nativeEvent.text)
                                handleBlur("title")
                            }}
                        />

                        <select
                            name="category"
                            placeholder="Category of the location"
                            value={values.category}
                            onChange={handleChange("category")}
                            onBlur={e => {
                                setCategory(e.target.value)
                                handleBlur("category")
                            }}
                        > 
                            <option value="" label="Select a primary use">
                                Select a primary use for this location
                            </option>
                            <option value="Food & drink" label="Food & drink">
                                Food & drink
                            </option>
                            <option value="Shopping" label="Shopping">
                                Shopping
                            </option>
                            <option value="Services" label="Services">
                                Services
                            </option>
                            <option value="Hotels & lodging" label="Hotels & lodging">
                                Hotels & lodging
                            </option>
                            <option value="Outdoors & recreation" label="Outdoors & recreation">
                                Outdoors & recreation
                            </option>
                            <option value="Religion" label="Religion">
                                Religion
                            </option>
                            <option value="Office & industrial" label="Office & industrial">
                                Office & industrial
                            </option>
                            <option value="Residential" label="Residential">
                                Residential
                            </option>
                            <option value="Education" label="Education">
                                Education
                            </option>
                        </select>

                        <TextInput
                            multiline="true"
                            rows={5}
                            id="content"
                            name="content"
                            placeholder="Description of the location"
                            value={values.content}
                            onChange={handleChange("content")}
                            onBlur={e => {
                                setContent(e.nativeEvent.text)
                                handleBlur("content")
                            }}
                        />

                        <Pressable onPress={useCurrentCoords}>
                            <Text>
                                Use Current Coordinates
                            </Text>
                        </Pressable>

                        <Pressable onPress={resetCoords}>
                            <Text>
                                Reset Coordinates
                            </Text>
                        </Pressable>

                        <TextInput
                            id="coords"
                            name="coords"
                            placeholder={ FindingCoords ? "Wait please..." : "Coords eg, 16.12345,104.12345" }
                            value={dynamicCoords}
                            onChange={handleChange("coords")}
                            onBlur={e => {
                                setDynamicCoords(e.nativeEvent.text)
                                handleBlur("coords")
                            }}
                        />

                        <Pressable onPress={handleSubmit} disabled={!isValid}>
                            <Text>
                                Create
                            </Text>
                        </Pressable>

                        <Text>
                            {userMessage}
                        </Text>
                    </View>
                )}
            </Formik>
        </ScrollView>
    );
}

export default CreateLocationForm;
