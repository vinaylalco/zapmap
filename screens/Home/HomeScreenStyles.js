import { StyleSheet } from 'react-native'
import MapstrColors from '../../assets/styles/MapstrColors'

export const HomeScreenStyles = StyleSheet.create({
	mapOuter: {
		width: "70%"
	},
	mapInner: {
		height: "100vh"
	},
	drawer:{
		width: "26.5%",
		paddingLeft: '3.5%'
	},
	feedButton:{
		width:'50%',
		padding: '1em',
        borderBottomWidth: '1px',
        borderBottomColor: MapstrColors['lightGrey']
	},
	feedButtonInner:{
		textAlign: 'center'
	}
})
