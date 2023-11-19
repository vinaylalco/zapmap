import { StyleSheet } from 'react-native'
import MapstrColors from '../../assets/styles/MapstrColors'

export const HomeScreenStyles = StyleSheet.create({
	HomeScreenWrapper:{
		flexDirection: 'row', 
		backgroundColor: '#fff'
	},
	mapOuter: {
		width: "75%"
	},
	mapInner: {
		height: "100vh"
	},
	drawer:{
		width: "25%"
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
