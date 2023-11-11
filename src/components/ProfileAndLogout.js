import React from "react";
import {
    Text,
    View,
    Pressable,
    StyleSheet
} from "react-native";
import {CommonStyles} from '../styles/CommonStyles.js'
import CopyToClipboard from "react-copy-to-clipboard";

export default function ProfileAndLogout({UserStateSettings, setUserStateSettings, UserStateNecSettings, nsec}) {
    
    const handleLogout = () => {
        setUserStateSettings(null); 
        localStorage.clear();
    };
    const [CopyPrivateKeyHex, setCopyPrivateKeyHex] = React.useState("Copy Private Key (Hex)");

    return (
        <View style={[CommonStyles.contentContainer]}>
                <Text
                    style={[CommonStyles.wrappedParagraphText]}
                >
                    You're logged in with Public Key (npub):
                </Text>

                <Text
                    style={[CommonStyles.wrappedParagraphText]}
                >
                    {UserStateSettings}
                </Text>
                
                {
                    nsec == "undefined" ?
                    null :
                    <CopyToClipboard
                            text={UserStateNecSettings}
                            onCopy={() => setCopyPrivateKeyHex("Copied")}
                    >
                        <button
                            style={CommonStyles.pressable}
                        >
                            {CopyPrivateKeyHex}
                        </button>

                    </CopyToClipboard>
                }

                <Pressable
                    onPress={handleLogout}
                >
                    <Text
                        style={[CommonStyles.pressable]}
                    >
                        Logout
                    </Text>
                </Pressable>
        </View>
    );
}
