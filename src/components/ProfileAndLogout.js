import React from "react";
import {
    Text,
    View,
    Pressable
} from "react-native"
import CopyToClipboard from "react-copy-to-clipboard";

export default function ProfileAndLogout({UserStateSettings, setUserStateSettings, UserStateNecSettings, nsec}) {
    
    const handleLogout = () => {
        setUserStateSettings(null); 
        localStorage.clear();
    };
    const [CopyPrivateKeyHex, setCopyPrivateKeyHex] = React.useState("Copy Private Key (Hex)");

    return (
        <View>
                <Text>
                    You're logged in with Public Key (npub):
                </Text>

                <Text>
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
                >
                    <Text>
                        Logout
                    </Text>
                </Pressable>
        </View>
    );
}
