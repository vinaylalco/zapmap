import React from "react";
import {Text,FlatList,StyleSheet,View} from "react-native";
import {CommonStyles} from '../styles/CommonStyles.js'

export default function LoadingText(){
	return(
		<>
            <View style={styles.contentContainer} >
                <Text style={CommonStyles.paragraphText} >
                    LOADING...
                </Text>
                <Text style={CommonStyles.paragraphText} >
                    If you don't see anything in a few seconds...
                </Text>
                <FlatList
                    contentContainerStyle={[styles.LoadingMessageListWrapper]} 
                    data={[
                        "1. There may not be any markers near this location. In this case, you can create one by going to the Menu and selecting 'Create New Location'",
                        "2. Check your internet connection", 
                        "3. Refresh the page", 
                        "4. Consider adding or changing relays by selecting 'Relay Management' in the Menu",
                    ]}
                    renderItem={({item, index}) => <Text key={index} style={styles.LoadingMessageList} >{item}</Text>}
                />

            </View>
		</>
	)
}

const styles = StyleSheet.create({
    contentContainer:{
        height: '100vh'
    },
    LoadingMessageListWrapper: {
        display: 'flex',
        alignSelf: 'center',
        width: '80%'
    },
    LoadingMessageList: {
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        fontSize: "1em",
        letterSpacing: "0.01681em",
        color: '#fff',
        display: 'block',
        textAlign: 'left',
        paddingTop: '1em',
        paddingBottom: '1em'
    }
})
