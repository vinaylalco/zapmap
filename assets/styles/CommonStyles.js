import { StyleSheet } from 'react-native'
import MapstrColors from './MapstrColors'

export const CommonStyles = StyleSheet.create({
	bolded600Text: {
        fontWeight: 600,
        fontSize: '1em',
        padding: '0.168em',
        margin: '0.168em',
        overflowWrap: "break-word"
    },
    list:{
		padding: '0.618em'
	},
	paragraph:{
		fontSize: '1em',
        margin: '0.168em',
		padding: '0.168em',
        overflowWrap: "break-word",
        color: MapstrColors['darkGrey']
	},
	heading:{
		fontSize: '1.2em',
		fontWeight: 600,
		padding: '0.5em',
        margin: '0.168em',
        overflowWrap: "break-word",
        color: MapstrColors['darkGrey']
	},
	pressable:{
		backgroundColor: MapstrColors['lightGrey'],
		borderRadius: '10px',
		padding: '1em',
		marginTop: '1em',
		marginBottom: '1em',
		width: '100%'
	},
	pressableInner:{
		textAlign: 'center'
	},
	submitInner:{
		textAlign: 'center'
	},
	submit:{
		borderColor: MapstrColors['primary'],
		borderWidth: '1px',
		borderRadius: '10px',
		padding: '1em',
		marginBottom: '1em',
		width: '100%'
	},
	inputField:{
		borderWidth: '1px',
		borderColor: MapstrColors['lightGrey'],
		borderRadius: '10px',
		padding: '1em',
		marginBottom: '1em',
		width: '100%',
		textAlign: 'center'
	},
	inputFieldError:{
		borderWidth: '1px',
		borderColor: MapstrColors['error'],
		borderRadius: '10px',
		padding: '1em',
		marginBottom: '1em',
		width: '100%',
		textAlign: 'center'
	},
	TabWrapperDesktop:{
        width: 'fit-content',
        height: '100%',
        backgroundColor: '#fff',
        padding: '0.25em',
        borderRightWidth: '1px',
        borderRightColor: MapstrColors['lightGrey'],
        display: 'flex',
        flexDirection: 'col'
    },
    TabWrapperMobile:{
        height: 'fit-content',
        width: '100%',
        backgroundColor: '#fff',
        padding: '0.25em',
        borderRightWidth: '1px',
        borderRightColor: MapstrColors['lightGrey'],
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    Icon: {
        height: '2em', 
        width: '2em',
        marginTop: '0.5em'
    },
    TabOuterMobile:{
    	display: 'flex', 
		flexDirection: 'column-reverse',
		height: '100%'
    },
    TabOuterDesktop:{
    	display: 'flex', 
		flexDirection: 'row', 
		overflow: 'scroll', 
		height: '100%'
    },
    SettingsTabBarMobile:{
    	width: '96vw'
    },
    SettingsTabBarDesktop:{
    	width: '25vw'
    }
})
