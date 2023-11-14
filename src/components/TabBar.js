import { View, Text, Pressable, Image} from 'react-native'
import world from '../../assets/world.svg'
import menu from '../../assets/menu.svg'
import Supercell from '../../assets/Supercell.svg'

export default function MapstrTabBar({ route, navigation }) {

    return (
        <View >

            <Pressable
                onPress={() => {
                        // Navigate using the `navigation` prop that you received
                        navigation.navigate('Settings');
                    }}
            >
                <Image
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
                    source={world}
                />
            </Pressable>
        </View>
    );
}
