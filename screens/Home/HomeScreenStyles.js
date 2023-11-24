import { StyleSheet } from 'react-native'
import MapstrColors from '../../assets/styles/MapstrColors'

export const HomeScreenStyles = StyleSheet.create({
	HomeWrapperDesktop:{
		flexDirection: 'row', 
		backgroundColor: '#fff',
		// flexDirection: 'flex-start'
	},
	HomeWrapperMobile:{
		flexDirection: 'col', 
		backgroundColor: '#fff',
		flexDirection: 'column-reverse'
	},
	mapOuterDesktop: {
		width: "75%"
	},
	mapOuterMobile: {
		width: "100%"
	},
	mapInnerMobile: {
		height: "50vh"
	},
	mapInnerDesktop: {
		height: "100vh"
	},
	drawerDesktop:{
		width: "25%"	
	},
	drawerMobile:{
		width: "100%",
		height: "50vh"	
	}
})
