import { View, Text, Pressable, StyleSheet, Image} from 'react-native'
import { CommonStyles} from '../styles/CommonStyles.js'
import world from '../../assets/world.svg'
import menu from '../../assets/menu.svg'
import Supercell from '../../assets/Supercell.svg'

export default function MapstrTabBar({ route, navigation }) {

    return (
        <View style={[styles.mapstrTabBar]} >

            <Pressable
                onPress={() => {
                        // Navigate using the `navigation` prop that you received
                        navigation.navigate('Settings');
                    }}
            >
                <Image
                    style={[CommonStyles.SVGImage]}
                    source={menu}
                />
            </Pressable>
            <Pressable
                onPress={() => {
                    // Navigate using the `navigation` prop that you received
                    navigation.navigate('Home');
                }}
            >
                <Image
                    style={[CommonStyles.SVGImage]}
                    source={world}
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    mapstrTabBar: {
        position: "absolute",
        right: 10,
        top: '25%',
        display: "block",
        backgroundColor: "rgba(255, 153, 0, 0.5)",
        borderRadius: 61.8,
        padding: '0.618em'
    },
    MenuIcon: {
        fontSize: '1.5em'
    },
    MenuIconSecond:{
        marginTop: '0.618em',
        fontSize: '1.5em'
    },
    navIcon: {
        color: '#fff',
        fontSize: '2em'
    }
})
