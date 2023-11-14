import React, { useState } from "react";
import {
    Text,
    View,
    Pressable,
    ScrollView,
    TextInput
} from "react-native";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import CopyToClipboard from "react-copy-to-clipboard";
import { generateInvoice } from "../functions/LightningFunctions"
 
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
                    >
                        {lnInvoice}
                    </Text>

                    <CopyToClipboard
                        text={lnInvoice}
                        onCopy={() => setLnInvoiceCopyText("Copied")}
                    >
                        <button>
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
        <ScrollView>
            <ScrollView>
                <Text>Send BTC to the user who created this review or location directly.</Text>
                <Text>Once you have created the invoice, copy it and use it in your Lightning wallet of choice to send Sats to the content creator.</Text>
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
                        <View>
                            <TextInput
                                keyboardType="numeric"
                                // style={ errors.amount === "true" ? CommonStyles.inputFieldError : CommonStyles.inputField }
                                name="amount"
                                placeholder="Amount (Sats)"
                                value={values.amount}
                                onChangeText={handleChange("amount")}
                                onBlur={handleBlur("amount")}
                            />

                            <TextInput
                                multiline="true"
                                rows={5}
                                id="note"
                                name="note"
                                placeholder="Notes (optional)"
                                value={values.note}
                                onChangeText={handleChange("note")}
                                onBlur={handleBlur("note")}
                            />

                            <Pressable onPress={handleSubmit} disabled={!isValid}>
                                <Text>
                                    Get Lightning Invoice
                                </Text>
                            </Pressable>

                            <InvoiceDetails />
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </ScrollView>
    );
}
