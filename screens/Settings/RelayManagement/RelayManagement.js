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
} from "react-native"
import { Formik, Field, Form } from "formik"
import * as yup from "yup"
import NDK from "@nostr-dev-kit/ndk"
import {addRelay, removeRelay} from '../../../api/api'
import {CommonStyles} from '../../../styles/CommonStyles'
import { isMobile } from 'react-device-detect'
import BackButton from '../../../ui/BackButton'

export default function RelayManagement({ RelayList, navigation }){

    const [RelayListState, setRelayListState] = React.useState(RelayList)

    type ItemProps = {title: string};
    const Item = ({title}: ItemProps) => (
        
        <View style={{display: 'flex', alignItems: 'center'}}>
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
            <BackButton navigation={navigation} />

            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={ 
                    isMobile ? 
                    [CommonStyles.innerMobile] : 
                    [CommonStyles.inner] 
                }
            >
                <FlatList
                    contentContainerStyle={{
                        flexGrow: 1, 
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
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
