import {View, Text, Pressable, Image, StyleSheet} from 'react-native'
import menu from '../../assets/menu.svg'
import MapstrColors from '../../styles/MapstrColors'

export default function MapstrTabBar({ route, navigation }) {
    return (
        <View 
            style={[TabStyles.TabWrapper]}
        >
            <Image
                source={moon}
                style={[TabStyles.Logo]}
            />

            <Pressable
                onPress={() => {
                        navigation.navigate('Settings');
                    }}
            >
                <Image
                    source={menu}
                    style={[TabStyles.Icon]}
                />   
            </Pressable>
            
            <Pressable
                onPress={() => {
                    navigation.navigate('Home');
                }}
            >
                <Image
                    source={world}
                    style={[TabStyles.Icon]}
                /> 
            </Pressable>
        </View>
    );
}

const TabStyles = StyleSheet.create({
    Logo: {
        height: '2em', 
        width: '2em'
    },
    TabWrapper:{    
        position: 'absolute',
        left: 0,
        zIndex: 1000000,
        height: '100vh',
        backgroundColor: '#fff',
        padding: '0.5em',
        borderRightWidth: '1px',
        borderRightColor: MapstrColors['lightGrey']
    },
    Icon: {
        height: '2em', 
        width: '2em',
        marginTop: '0.5em'
    }
})
