import {View, Text, Pressable, Image} from 'react-native'
import world from '../../assets/world.svg'
import menu from '../../assets/menu.svg'
// import Supercell from '../../assets/Supercell.svg'

// <Image
// source={world}
// />   

export default function MapstrTabBar({ route, navigation }) {

    return (
        <View >

            <Pressable
                style={{    
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    zIndex: 1000000000000000000000,
                    width: '100px',
                    height: '40px'
                }}
                onPress={() => {
                        navigation.navigate('Settings');
                    }}
            >
                <Text>Settings</Text>
            </Pressable>
            
            <Pressable
                style={{    
                    position: 'absolute',
                    bottom: '0',
                    right: 0,
                    zIndex: 1000000000000000000000,
                    width: '100px',
                    height: '40px'
                }}
                onPress={() => {
                    navigation.navigate('Home');
                }}
            >
                <Text>Menu</Text>
            </Pressable>
        </View>
    );
}
