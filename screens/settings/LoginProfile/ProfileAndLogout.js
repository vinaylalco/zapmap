import React from "react";
import {
    Text,
    View,
    Pressable,
    StyleSheet
} from "react-native"
import CopyToClipboard from "react-copy-to-clipboard";
import {CommonStyles} from '../../../styles/CommonStyles'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'
import UserInfo from '../../../ui/UserInfo/UserInfo'

export default function ProfileAndLogout({UserStateSettings, setUserStateSettings, UserStateNecSettings, nsec}) {
    
    const handleLogout = () => {
        setUserStateSettings(null); 
        localStorage.clear();
    };
    const [CopyPrivateKeyHex, setCopyPrivateKeyHex] = React.useState("Copy Private Key (Hex)");

    return (
        <View>
            <UserInfo publicKey={UserStateSettings} />
            <Text style={[CommonStyles.paragraph, CommonStyles.centerAlignText]} >
                You're logged in with Public Key (npub):
            </Text>

            <Text style={[CommonStyles.paragraph, CommonStyles.centerAlignText]} >
                {UserStateSettings}
            </Text>
            
            {
                nsec == "undefined" ?
                null :
                <CopyToClipboard
                    text={UserStateNecSettings}
                    onCopy={() => setCopyPrivateKeyHex("Copied")}
                    style={[CommonStyles.pressable]}
                >
                    <Text
                        style={[CommonStyles.pressableInner]}
                    >
                        {CopyPrivateKeyHex}
                    </Text>

                </CopyToClipboard>
            }

            <Pressable
                onPress={handleLogout}
                style={[CommonStyles.submit]}
            >
                <Text
                    style={[CommonStyles.submitInner]}
                >
                    Logout
                </Text>
            </Pressable>
        </View>
    );
}
