import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import {getPublicKey} from "nostr-tools";
import {
    Text,
    View,
    Pressable,
    TextInput
} from "react-native";

import NDK from "@nostr-dev-kit/ndk";
import * as yup from "yup"
import {CommonStyles} from '../../../styles/CommonStyles'

function LoginForm({ ndk, mapstrpublickey, setUserStateSettings }) {

    const [userMessage, setUserMessage] = React.useState(null);
    const loginValidationSchema = yup.object().shape({
        privateKey: yup
            .string()
            .min(64, "Enter a valid 64 char Nost Private Key Hex")
            .required("true")
            .test({
                name: "is-privateKey",
                skipAbsent: true,
                test(value, ctx) {
                    var re = /[0-9A-Fa-f]{6}/g; // test for valid hexadecimal string
                    var inputString = value;

                    if (re.test(inputString)) {
                        return true;
                    } else {
                        return false;
                    }

                    re.lastIndex = 0; // be sure to reset the index after using .text()
                },
            }),
    });

    return (
        <>
            <Formik
                validationSchema={loginValidationSchema}
                initialValues={{
                    privateKey: "",
                }}
                onSubmit={ (values, {resetForm} ) => {
                    let privateKey = values.privateKey;
                    let publicKey = getPublicKey(privateKey);
                    setUserStateSettings(publicKey);
                    localStorage.setItem("user", publicKey);
                    localStorage.setItem("privado", values.privateKey);
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
                        <Text style={[CommonStyles.heading, CommonStyles.centerAlignText]} >
                            Login With Private Key
                        </Text>
                        
                        <TextInput
                            style={ errors.privateKey === "true" ? CommonStyles.inputFieldError : CommonStyles.inputField }
                            name="privateKey"
                            placeholder="Private Key HEX"
                            value={values.privateKey}
                            onChangeText={handleChange("privateKey")}
                            onBlur={handleBlur("privateKey")}
                        />
                        
                        <Pressable
                            onPress={handleSubmit}
                            disabled={!isValid}
                            style={[CommonStyles.submit]}
                        >
                            <Text
                                style={[CommonStyles.submitInner]}
                            >
                                Login
                            </Text>
                        </Pressable>
                    </>
                )}
            </Formik>
        </>
    );
}

export default LoginForm;
