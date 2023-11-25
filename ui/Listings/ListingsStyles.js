import {StyleSheet} from "react-native";
import MapstrColors from '../../styles/MapstrColors'

export const ListingsStyles = StyleSheet.create({
    Logo: {
        height: '2em', 
        width: '2em'
    },
    LocationList: {
    	overflow: 'scroll', 
    	height: '100vh'
	},
	feedButton:{
		width:'50%',
		padding: '1em'
	},
	feedButtonActive:{
		width:'50%',
		padding: '1em',
        borderBottomWidth: '1px',
        borderBottomColor: MapstrColors['primary']
	},
	feedButtonInner:{
		textAlign: 'center'
	}
})