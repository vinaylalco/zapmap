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
import btcYellow from "../styles/btcYellow.js"
import { check_lat_lon } from "../functions/usefulFunctions"
import {CommonStyles} from '../styles/CommonStyles.js'
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
    const [userMessageColor, setUserMessageColor] = React.useState(
        btcYellow["BTC"]
    );

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

    // <Field type="checkbox" name="UseCurrentCoordsField" />

    return (
        <ScrollView contentContainerStyle={[CommonStyles.contentContainer]}>
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
                            style={ errors.title === "true" ? CommonStyles.inputFieldError : CommonStyles.inputField }
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
                            style={ errors.category === "true" ? CommonStyles.inputFieldError : CommonStyles.inputField }
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
                            style={ errors.content === "true" ? CommonStyles.inputFieldError : CommonStyles.inputField }
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
                            <Text
                                style={[CommonStyles.pressable]}
                            >
                                Use Current Coordinates
                            </Text>
                        </Pressable>

                        <Pressable onPress={resetCoords}>
                            <Text
                                style={[CommonStyles.pressable]}
                            >
                                Reset Coordinates
                            </Text>
                        </Pressable>

                        <TextInput
                            style={ errors.coords === "true" ? CommonStyles.inputFieldError : CommonStyles.inputField }
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
                            <Text
                                style={[CommonStyles.pressable]}
                            >
                                Create
                            </Text>
                        </Pressable>

                        <Text
                            style={[CommonStyles.userMessage(userMessageColor)]}
                        >
                            {userMessage}
                        </Text>
                    </View>
                )}
            </Formik>
        </ScrollView>
    );
}

export default CreateLocationForm;
