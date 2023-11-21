import React, { useState } from "react";
import {
    Text,
    View,
    Pressable,
    ScrollView,
    TextInput,
    StyleSheet
} from "react-native";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import CopyToClipboard from "react-copy-to-clipboard";
import { generateInvoice } from "../../hooks/lightning"
import {CommonStyles} from '../../assets/styles/CommonStyles'

export default function ZapForm({
    id,
    npub,
    RelayList,
    nsecZapForm
}) {

    // LN Invoice
    const [lnInvoice, setLnInvoice] = React.useState('');
    const [lnInvoiceColor, setLnInvoiceColor] = React.useState("green");
    const [lnInvoiceCopyText, setLnInvoiceCopyText] =
        React.useState("Copy LN Invoice");
    const [showInvoiceDetails, setShowInvoiceDetails] = React.useState(false);

    const createValidationSchema = yup.object().shape({
        amount: yup
            .string()
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
                        id="transition-modal-description"
                        sx={{ mt: 2 }}
                        style={[CommonStyles.paragraph]}
                    >
                        {lnInvoice}
                    </Text>

                    <CopyToClipboard
                        text={lnInvoice}
                        onCopy={() => setLnInvoiceCopyText("Copied")}
                        style={[CommonStyles.pressable]}
                    >
                        <button style={[CommonStyles.pressableInner]} >
                            {lnInvoiceCopyText}
                        </button>
                    </CopyToClipboard>
                </>
            );
        } else {
            return (
                <>
                    <Text id="transition-modal-description"
                        sx={{ mt: 2 }}
                    >
                        {lnInvoice}
                    </Text>
                </>
            );
        }
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[zapFormStyles.wrapper]}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[zapFormStyles.inner]}
            >
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
                        generateInvoice(
                            id,
                            npub,
                            values,
                            setLnInvoice,
                            setShowInvoiceDetails,
                            setLnInvoiceColor,
                            RelayList,
                            nsecZapForm
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
                                style={ CommonStyles.inputField}
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

                            <InvoiceDetails />
                        </>
                    )}
                </Formik>
            </ScrollView>
        </ScrollView>
    );
}

const zapFormStyles = StyleSheet.create({
    wrapper:{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(42, 36, 36, 0.5)',
        borderWidth: '1px'
    },
    inner:{
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '1em',
        marginTop: '25%',
        width: '25vw',
        height: '50vh'
    }
})
