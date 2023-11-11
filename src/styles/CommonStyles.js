import {StyleSheet} from "react-native";
import btcYellow from "./btcYellow.js";

export const CommonStyles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: "#1d1a1a",
        padding: '1em',
        flexWrap: "flex-wrap",
        justifyContent: "center",
        height: '100%'
    },
    paragraphText:{
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        fontSize: "1em",
        color: "#fff",
        marginTop: '1em',
        marginBottom: '1em',
        textAlign: 'center'
    },
    inputFieldError: {
        width: '100%',
        color: "#fff",
        padding: '1em',
        borderWidth: 1,
        borderColor: "red",
        backgroundColor: '#1d1a1a',
        marginTop: '1em',
        marginBottom: '1em',
        textAlign: "center",
        letterSpacing: "0.01681em",
        fontSize: '1em'
    },
    inputField: {
        width: '100%',
        color: "#fff",
        padding: '1em',
        borderWidth: 1,
        borderColor: "#fff",
        backgroundColor: '#1d1a1a',
        marginTop: '1em',
        marginBottom: '1em',
        textAlign: "center",
        letterSpacing: "0.01681em",
        fontSize: '1em'
    },
    pressable: {
        width: '100%',
        color: "#fff",
        padding: '1em',
        borderWidth: 1,
        borderColor: btcYellow["BTC"],
        textAlign: "center",
        backgroundColor: "#1d1a1a",
        fontFamily:
            '"Roboto","Helvetica","Arial",sans-serif',
        fontWeight: 600,
        fontSize: "1em",
        letterSpacing: "0.01681em",
        marginBottom: '1em'
    },
    userMessage: userMessageColor => ({
        textAlign: "center",
        fontFamily:
            '"Roboto","Helvetica","Arial",sans-serif',
        color: userMessageColor,
        // fontWeight: 600,
        fontSize: "1em",
        letterSpacing: "0.01681em",
        paddingBottom: '1em'
    }),
    formHeading: {
        textAlign: "center",
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        fontWeight: 600,
        fontSize: "1.309em",
        letterSpacing: "0.01681em",
        marginBottom: '1em',
        marginTop: '1em',
        alignSelf: "center",
        color: "#fff"
    },
    link: {
        overflowWrap: "break-word",
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        fontWeight: 600,
        fontSize: "1em",
        letterSpacing: "0.01681em",
        color: btcYellow["BTC"],
        textAlign: "center",
        alignSelf: "center",
        marginTop: '1em',
        marginBottom: '1em',
    },
    backButton:{
        position: 'absolute',
        right:'10px',
        top: '15%',
        borderRadius: '50%',
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        zIndex: 1000,
        paddingLeft: '0.618em',
        paddingRight: '0.618em'
    },
    SVGImage:{
        height: 30,
        width: 30,
        marginTop: '0.618em',
        marginBottom: '0.618em'
    },
    SVGImageInListing:{
        height: 40,
        width: 40,
        margin: '0.618em'
    },
    wrappedParagraphText: {
        overflowWrap: "anywhere",
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        // fontWeight: 600,
        fontSize: "1em",
        letterSpacing: "0.01681em",
        color: "#fff",
        textAlign: "center",
        alignSelf: "center",
        marginTop: '1em',
        marginBottom: '1em',
    },
    bold:{
        fontWeight: 600,
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        fontSize: "1em",
        color: "#fff",
        marginTop: '1em',
        marginBottom: '1em',
        textAlign: 'center'
    },
});
