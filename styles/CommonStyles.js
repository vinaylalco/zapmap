import { StyleSheet } from 'react-native'
import MapstrColors from './MapstrColors'

export const CommonStyles = StyleSheet.create({
	bolded600Text: {
        fontWeight: 600,
        fontSize: '1em',
        padding: '0.168em',
        margin: '0.168em',
        overflowWrap: "anywhere"
    },
    list:{
		padding: '0.618em'
	},
	paragraph:{
		fontSize: '1em',
        margin: '0.168em',
		padding: '0.168em',
        overflowWrap: "anywhere",
        color: MapstrColors['darkGrey']
	},
	heading:{
		fontSize: '1.2em',
		fontWeight: 600,
		padding: '0.5em',
        margin: '0.168em',
        overflowWrap: "anywhere",
        color: MapstrColors['darkGrey']
	},
	pressable:{
		backgroundColor: MapstrColors['lightGrey'],
		borderRadius: '10px',
		padding: '1em',
		marginTop: '1em',
		marginBottom: '1em',
		width: '100%',
		textAlign: 'center',
        borderWidth: 0
	},
	pressableInner:{
		textAlign: 'center'
	},
	submitInner:{
		textAlign: 'center',
        color: '#fff'
	},
	submit:{
		backgroundColor: MapstrColors['primary'],
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
    	display: 'none'
    },
    TabWrapperMobileShown:{
    	position: 'absolute',
    	top: '12px',
    	right: '12px',
        backgroundColor: MapstrColors['darkGrey'],
        borderRadius: '50%',
        zIndex: 10000000000
    },
    backButtonWrapper:{
    	position: 'absolute',
    	top: '24px',
    	right: '24px',
        borderRadius: '50%',
        zIndex: 1000
    },
    backButtonIcon:{
    	height: '40px',
    	width: '40px'
    },
    Icon: {
        height: '1.818em', 
        width: '1.818em',
        margin: '4px'
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
    	width: '97vw'
    },
    SettingsTabBarDesktop:{
    	width: '25vw'
    },
    wrapper:{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(42, 36, 36, 0.5)',
        padding: '1em'
    },
    inner:{
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '1em',
        // height: '50vh',
        width: '25vw',
        flexGrow: 1, 
        justifyContent: 'center'
    },
    innerMobile:{
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '1em',
        // height: '97vh',
        // width: '100%',
        flexGrow: 1, 
        justifyContent: 'center'
    },
    goToLocationButton:{
    	position: 'absolute',
    	zIndex: 10000000000000000,
    	right: '1em',
    	bottom: '8em',
    	height: '35px',
    	width: '35px',
    },
    goToLocationButtonMobile:{
        position: 'absolute',
        zIndex: 10000000000000000,
        right: 0,
        bottom: '2em',
        height: '35px',
        width: '35px',
    },
    acceptBTC:{
    	fontWeight: 600,
    	color: MapstrColors['btc']
    },
    UserMessage:{
        fontSize: '1em',
        margin: '0.168em',
        padding: '0.168em',
        overflowWrap: "anywhere",
        color: MapstrColors['darkGrey'],
        textAlign: 'center'
    },
    centerAlignText:{
        textAlign: 'center'
    }
})
