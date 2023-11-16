import React, { useState } from "react";
import {
    Text,
    View,
    Pressable,
    TextInput,
    FlatList,
    ScrollView
} from "react-native";

import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import NDK from "@nostr-dev-kit/ndk";
import {addRelay, removeRelay} from '../../../api/api'

export default function RelayManagement({ RelayList }){

    const [RelayListState, setRelayListState] = React.useState(RelayList)

    type ItemProps = {title: string};
    const Item = ({title}: ItemProps) => (
        
        <View>
            <Text>{title}</Text>
            <Text 
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
        <ScrollView>

            <FlatList
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
                            // style={ errors.newRelayName === "true" ? CommonStyles.inputFieldError : CommonStyles.inputField }
                            name="newRelayName"
                            placeholder="URL eg wss://relay.address"
                            value={values.newRelayName}
                            onChangeText={handleChange("newRelayName")}
                            onBlur={handleBlur("newRelayName")}
                        />

                        <Pressable onPress={handleSubmit} disabled={!isValid}>
                            <Text>
                                Add New Relay
                            </Text>
                        </Pressable>
                    </View>
                )}
            </Formik>
        </ScrollView>
    )
}
