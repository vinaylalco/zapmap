import React, {useState, Suspense} from "react"
import {Text,View,Pressable,StyleSheet,ScrollView,Image} from "react-native"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import CreateLocationForm from './CreateNewLocation/CreateLocationForm'
import UserProfile from './LoginProfile/UserProfile'
import RelayManagement from './RelayManagement/RelayManagement.js'
import SettingsTabBar from './SettingsTabBar'
import backButton from '../../assets/backButton.svg'
import {setRelayListArray} from "../../api/api"
import {mapstrpublickey,ndk} from '../../api/constants'
import {CommonStyles} from '../../assets/styles/CommonStyles'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'

const MenuStack = createBottomTabNavigator()

export default function MenuButtons({navigation}){

    const user = localStorage.getItem("user")
    const nsec = localStorage.getItem("privado")
    const [UserStateSettings, setUserStateSettings] = React.useState(user)
    const [UserStateNecSettings, setUserStateNecSettings] = React.useState(nsec)

    const Menu = ({navigation}) => {
        return (
            <>
                {
                    UserStateSettings ?
                    <View style={[MenuScreenStyles.inner]}>
                        <Pressable
                            onPress={
                                () => navigation.navigate('Home', {
                                    screen: 'HomeScreen'
                                })
                            }
                            style={[CommonStyles.backButtonWrapper]}
                        >
                            <Image
                                source={backButton}
                                style={[CommonStyles.backButtonIcon]}
                            />
                        </Pressable>
                        <Pressable
                            style={[CommonStyles.pressable]}
                            onPress={() => navigation.navigate('Create Location')}
                        >
                            <Text
                                style={[CommonStyles.pressableInner]}
                            >
                                Create a new location
                            </Text>
                        </Pressable>
                        
                        <Pressable
                            style={[CommonStyles.pressable]}
                            onPress={() => navigation.navigate('User Profile')
                                    }
                        >
                            <Text
                                style={[CommonStyles.pressableInner]}
                            >
                                Login / Profile
                            </Text>
                        </Pressable>
                        
                        <Pressable
                            style={[CommonStyles.pressable]}
                            onPress={() => navigation.navigate('Relays')}
                        >
                            <Text
                                style={[CommonStyles.pressableInner]}
                            >
                                Manage Relays
                            </Text>
                        </Pressable>

                    </View>
                    :
                    <View style={[MenuScreenStyles.inner]}>
                        <Pressable
                            onPress={() => navigation.goBack()}
                            style={[CommonStyles.backButtonWrapper]}
                        >
                            <Image
                                source={backButton}
                                style={[CommonStyles.backButtonIcon]}
                            />
                        </Pressable>
                        <Pressable
                            style={[CommonStyles.pressable]}
                            onPress={() => navigation.navigate('User Profile')}
                        >
                            <Text
                                style={[CommonStyles.pressableInner]}
                            >
                                Login / Profile
                            </Text>
                        </Pressable>
                    </View>
                }
            </>
        )
    }

    function NewLocationForm({navigation}){

        return(
            <>
                <Suspense fallback={<Text  >Loading...</Text>}>

                    <CreateLocationForm
                        name="CreateLocationForm"
                        ndk={ndk}
                        UserStateSettings={UserStateSettings}
                        mapstrpublickey={mapstrpublickey}
                        navigation={navigation}
                        nsec={nsec}
                    />

                </Suspense>
            </>
        )
    }

    const UserProfileScreen = ({navigation}) => {

        return(
            
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={ 
                        isMobile ? 
                        [CommonStyles.innerMobile] : 
                        [CommonStyles.inner] 
                    }
            >
                <Suspense fallback={<Text  >Loading...</Text>}>
                    <UserProfile 
                        UserStateSettings={UserStateSettings}
                        setUserStateSettings={setUserStateSettings}
                        setUserStateNecSettings={setUserStateNecSettings}
                        ndk={ndk}
                        mapstrpublickey={mapstrpublickey}
                        UserStateNecSettings={UserStateNecSettings}
                        nsec={nsec}
                        navigation={navigation}
                    />
                </Suspense>
            </ScrollView>
        )
    }

    const MapstrRelays = ({navigation}) => {
        return(
            <>
                <Suspense fallback={<Text  >Loading...</Text>}>
                    <Pressable
                        onPress={() => navigation.navigate('Menu', {
                                            screen: 'SettingsScreen'
                                        })}
                    >
                        <Image
                            source={backButton}
                        />
                    </Pressable>
                    <RelayManagement 
                        RelayList={setRelayListArray}
                        navigation={navigation}
                    />
                </Suspense>
            </>
        )
    }

    return (
        <MenuStack.Navigator 
            tabBar={props => <SettingsTabBar {...props} />}
        >
            <MenuStack.Screen
                name="Menu"
                component={Menu}
                options={{ 
                    tabBarLabel: '',
                    headerShown: false
                }}
            />
            <MenuStack.Screen
                name="Create Location"
                component={NewLocationForm}
                options={{ 
                    title: '',
                    headerShown: false  
                }}
            />
            <MenuStack.Screen
                name="User Profile"
                component={UserProfileScreen}
                options={{ 
                    title: '',
                    headerShown: false  
                }}
            />
            <MenuStack.Screen
                name="Relays"
                component={MapstrRelays}
                options={{ 
                    title: '',
                    headerShown: false  
                }}
            />
        </MenuStack.Navigator>
    );
}

const MenuScreenStyles = StyleSheet.create({
    inner:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: '1em',
        height: '100%',
        width: '100%'
    }
})
 