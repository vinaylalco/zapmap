import NDK, {
    NDKPrivateKeySigner,
    NDKNip07Signer,
    NDKEvent,
} from "@nostr-dev-kit/ndk";

export function convertToMilliSats(amount) {
    // console.log( Number(amount)*1000 + ' in milliSatoshis' )
    return Number(amount) * 1000;
}

export function getPaymentNote(notes, id) {
    if (notes === "") {
        return "Congrats! Payment from ZapMap for Location ID" + id;
    } else {
        return notes;
    }
}

export async function generateInvoice(
    id,
    npub,
    formValues,
    setLnInvoice,
    setShowInvoiceDetails,
    setLnInvoiceColor,
    RelayList,
    nsecZapForm,
    setSubmitMessage
) {

    let signer = null
    if(nsecZapForm == "undefined"){
        signer = new NDKNip07Signer()
    }else{
        signer = new NDKPrivateKeySigner(nsecZapForm)
    }

    const ndk2 = new NDK({
        explicitRelayUrls: RelayList,
        signer: signer
    });
    await ndk2.connect();
    const user = ndk2.getUser(npub);

    let event = await ndk2.fetchEvent({ ids: [id] }).then((signedEvent) => {
        signedEvent
            .sign(signer)
            .then((signerInstance) => {
                const amountinMilliSats = convertToMilliSats(formValues.amount);
                const paymentNote = getPaymentNote(formValues.notes, id);
                signedEvent
                    .zap(amountinMilliSats, paymentNote)
                    .then((result) => {
                        setSubmitMessage(null)
                        setShowInvoiceDetails(true)
                        setLnInvoice(result)
                    })
                    .catch((error) => {
                        console.log(error)
                        setSubmitMessage('There was an error creating the invoice.')
                    });
            })
    });
}
