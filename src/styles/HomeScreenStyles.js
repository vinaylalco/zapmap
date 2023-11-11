import {StyleSheet} from "react-native";
import btcYellow from "./btcYellow.js";

export const HomeScreenStyles = StyleSheet.create({
    GlobalButton: GlobalButtonBck => ({
        width: '30%',
        borderRadius: '16.18px',
        color: "#fff",
        borderWidth: 1,
        borderColor: btcYellow["BTC"],
        textAlign: "center",
        backgroundColor: GlobalButtonBck,
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        fontWeight: 600,
        fontSize: "0.618em",
        letterSpacing: "0.01681em"
    }),
    LocalButton: LocalButtonBck => ({
        width: '30%',
        borderRadius: '16.18px',
        color: "#fff",
        borderWidth: 1,
        borderColor: btcYellow["BTC"],
        textAlign: "center",
        backgroundColor: LocalButtonBck,
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        fontWeight: 600,
        fontSize: "0.618em",
        letterSpacing: "0.01681em"
    })
})
