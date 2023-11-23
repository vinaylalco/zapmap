import React, { useState } from "react";
import {
    Text,
    View,
    Pressable,
    TextInput,
    FlatList,
    ScrollView,
    Image,
    StyleSheet
} from "react-native";

import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import NDK from "@nostr-dev-kit/ndk";
import {addRelay, removeRelay} from '../../../api/api'
import {CommonStyles} from '../../../assets/styles/CommonStyles'
import backButton from '../../../assets/backButton.svg'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'

export default function RelayManagement({ RelayList, navigation }){

    const [RelayListState, setRelayListState] = React.useState(RelayList)

    type ItemProps = {title: string};
    const Item = ({title}: ItemProps) => (
        
        <View>
            <Text style={[CommonStyles.paragraph]} >{title}</Text>
            <Text 
                style={[CommonStyles.bolded600Text]} 
                onPress={ () => removeRelay(title, RelayListState, setRelayListState) }
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
        <>  
            <Pressable
                onPress={() => navigation.goBack()}
                style={[CommonStyles.backButtonWrapper]}
            >
                <Image
                    source={backButton}
                    style={[CommonStyles.backButtonIcon]}
                />
            </Pressable>
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={ 
                    isMobile ? 
                    [CommonStyles.innerMobile] : 
                    [CommonStyles.inner] 
                }
            >
                <FlatList
                    contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
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
                        <>
                            <TextInput
                                style={ errors.newRelayName === "true" ? CommonStyles.inputFieldError : CommonStyles.inputField }
                                name="newRelayName"
                                placeholder="URL eg wss://relay.address"
                                value={values.newRelayName}
                                onChangeText={handleChange("newRelayName")}
                                onBlur={handleBlur("newRelayName")}
                            />

                            <Pressable 
                                onPress={handleSubmit} 
                                disabled={!isValid}
                                style={[CommonStyles.submit]} 
                            >
                                <Text style={[CommonStyles.submitInner]} >
                                    Add New Relay
                                </Text>
                            </Pressable>
                        </>
                    )}
                </Formik>
            </ScrollView>
        </>
    )
}
