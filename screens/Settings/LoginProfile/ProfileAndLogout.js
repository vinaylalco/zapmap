import React from "react";
import {
    Text,
    View,
    Pressable,
    StyleSheet
} from "react-native"
import CopyToClipboard from "react-copy-to-clipboard";
import {CommonStyles} from '../../../assets/styles/CommonStyles'

export default function ProfileAndLogout({UserStateSettings, setUserStateSettings, UserStateNecSettings, nsec}) {
    
    const handleLogout = () => {
        setUserStateSettings(null); 
        localStorage.clear();
    };
    const [CopyPrivateKeyHex, setCopyPrivateKeyHex] = React.useState("Copy Private Key (Hex)");

    return (
        <View style={[ProfileStyles.inner]}>
                <Text style={[CommonStyles.paragraph]} >
                    You're logged in with Public Key (npub):
                </Text>

                <Text style={[CommonStyles.paragraph]} >
                    {UserStateSettings}
                </Text>
                
                {
                    nsec == "undefined" ?
                    null :
                    <CopyToClipboard
                        text={UserStateNecSettings}
                        onCopy={() => setCopyPrivateKeyHex("Copied")}
                    >
                        <button>
                            {CopyPrivateKeyHex}
                        </button>

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

const ProfileStyles = StyleSheet.create({
    inner:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: '1em',
        height: '100vh',
        width: '100%'
    }
})
