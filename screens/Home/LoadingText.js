import React from "react"
import {Text,FlatList,View, StyleSheet,Image} from "react-native"
import {CommonStyles} from "../../assets/styles/CommonStyles"
import loading from '../../assets/loading.svg'
 
export default function LoadingText(){
	return(
        
        <View style={[LoadingStyles.Outer]} >
        
            <Image
                source={loading}
                style={[LoadingStyles.loadingIcon]}
            />

            <Text style={[CommonStyles.paragraph]}>
                If you don't see anything in a few seconds...
            </Text>

            <FlatList
                data={[
                    <Text><Text style={[CommonStyles.bolded600Text]} > 1. </Text>There may not be any markers near this location. In this case, you can create one by going to the Menu and selecting 'Create New Location'</Text>,
                    <Text><Text style={[CommonStyles.bolded600Text]} > 2. </Text>Check your internet connection</Text>, 
                    <Text><Text style={[CommonStyles.bolded600Text]} > 3. </Text>Refresh the page</Text>, 
                    <Text><Text style={[CommonStyles.bolded600Text]} > 4. </Text>Consider adding or changing relays by selecting 'Relay Management' in the Menu</Text>,
                ]}
                renderItem={({item, index}) => <Text style={[CommonStyles.list]} key={index} >{item}</Text>}
            />

        </View>
	)
}

const LoadingStyles = StyleSheet.create({
    Outer: {
        padding: '1em',
        display: 'flex',
        alignItems: 'center'
    },
    loadingIcon: {
        height: '3em',
        width: '3em',
        marginBottom: '1em'
    }
})
 