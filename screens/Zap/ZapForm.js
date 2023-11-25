import React, { useState } from "react";
import {
    Text,
    View,
    Pressable,
    ScrollView,
    TextInput,
    StyleSheet,
    ActivityIndicator,
    Image
} from "react-native";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import CopyToClipboard from "react-copy-to-clipboard";
import { generateInvoice } from "../../hooks/lightning"
import {CommonStyles} from '../../styles/CommonStyles'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'
import MapstrColors from '../../styles/MapstrColors'
import BackButton from '../../ui/BackButton'

export default function ZapForm({
    id,
    UserStateZapForm,
    RelayList,
    nsecZapForm,
    navigation
}) {
    // LN Invoice
    const [lnInvoice, setLnInvoice] = React.useState('');
    const [lnInvoiceColor, setLnInvoiceColor] = React.useState("green");
    const [lnInvoiceCopyText, setLnInvoiceCopyText] =
        React.useState("Copy LN Invoice");
    const [showInvoiceDetails, setShowInvoiceDetails] = React.useState(false)
    const [SubmitMessage, setSubmitMessage] = React.useState(null)
    const [RelayListInState, setRelayListInState] = React.useState(RelayList);
    const createValidationSchema = yup.object().shape({
        amount: yup
            .number()
            .min(1, "Enter an amount in Sats")
            .required("true")
            .test({
                name: "is-amount",
                skipAbsent: true,
                test(value, ctx) {
                    if (isNaN(value)) {
                        return false;
                    } else {
                        return true;
                    }
                },
            }),
    });

    function InvoiceDetails() {
        if (showInvoiceDetails) {
            return (
                <>
                    <Text
                        style={[CommonStyles.paragraph]}
                    >
                        {lnInvoice}
                    </Text>

                    <CopyToClipboard
                        text={lnInvoice}
                        onCopy={() => setLnInvoiceCopyText("Copied")}
                        style={CommonStyles.pressable}
                    >
                        <button style={CommonStyles.pressableInner} >
                            {lnInvoiceCopyText}
                        </button>
                    </CopyToClipboard>
                </>
            )
        } else {
            return (
                <>
                    <Text>
                        {lnInvoice}
                    </Text>
                </>
            );
        }
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[CommonStyles.wrapper]}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle=
                    { 
                        isMobile ? 
                        [CommonStyles.innerMobile] : 
                        [CommonStyles.inner] 
                    }
            >
                <BackButton navigation={navigation} />
                
                {
                    UserStateZapForm ?
                    <>
                        <Text style={[CommonStyles.heading]}>Send BTC</Text>
                        <Text style={[CommonStyles.paragraph]} >Send BTC to the user who created this review or location directly.</Text>
                        <Text style={[CommonStyles.paragraph]} >Once you have created the invoice, copy it and use it in your Lightning wallet of choice to send Sats to the content creator.</Text>
                        <Formik
                            validationSchema={createValidationSchema}
                            initialValues={{
                                amount: "",
                                notes: "",
                            }}
                            onSubmit={(values, { resetForm }) => {
                                setShowInvoiceDetails(false);
                                setSubmitMessage(<ActivityIndicator size="small" color={MapstrColors['primary']} />)
                                generateInvoice(
                                    id,
                                    UserStateZapForm,
                                    values,
                                    setLnInvoice,
                                    setShowInvoiceDetails,
                                    setLnInvoiceColor,
                                    RelayListInState,
                                    nsecZapForm,
                                    setSubmitMessage

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
                                resetForm
                            }) => (
                                <>
                                    <TextInput
                                        keyboardType="numeric"
                                        style={ errors.amount === "true" ? CommonStyles.inputFieldError : CommonStyles.inputField }
                                        name="amount"
                                        placeholder="Amount (Sats)"
                                        value={values.amount}
                                        onChangeText={handleChange("amount")}
                                        onBlur={handleBlur("amount")}
                                    />

                                    <TextInput
                                        style={CommonStyles.inputField}
                                        multiline="true"
                                        rows={5}
                                        id="note"
                                        name="note"
                                        placeholder="Notes (optional)"
                                        value={values.note}
                                        onChangeText={handleChange("note")}
                                        onBlur={handleBlur("note")}
                                    />

                                    <Pressable 
                                        onPress={handleSubmit} 
                                        disabled={!isValid}
                                        style={[CommonStyles.submit]}
                                    >
                                        <Text style={[CommonStyles.submitInner]} >
                                            Get Lightning Invoice
                                        </Text>
                                    </Pressable>

                                    <Text style={[CommonStyles.UserMessage]} >
                                        {SubmitMessage}
                                    </Text>

                                    <InvoiceDetails />
                                </>
                            )}
                        </Formik>
                    </> 
                    :
                    <Text style={[CommonStyles.paragraph]} >You must login or create an account first before being able to send BTC to someone.</Text>
                }
                
            </ScrollView>
        </ScrollView>
    );
}
