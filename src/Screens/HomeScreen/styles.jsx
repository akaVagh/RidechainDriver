import { StyleSheet, Dimensions } from 'react-native';
const styles = StyleSheet.create({
	bottomContainer: {
		height: 100,
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 15,
	},
	bottomText: {
		fontSize: 22,
		color: '#4a4a4a',
	},
	roundButton: {
		position: 'absolute',
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 25,
	},
	goButton: {
		position: 'absolute',
		backgroundColor: '#1495ff',
		height: 75,
		width: 75,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
		bottom: 110,
		left: Dimensions.get('window').width / 2 - 37,
	},
	goText: {
		fontSize: 30,
		color: 'white',
		fontWeight: 'bold',
	},
	balanceButton: {
		position: 'absolute',
		backgroundColor: '#1c1c1c',
		height: 50,
		width: 100,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
		top: 20,
		left: Dimensions.get('window').width / 2 - 47,
	},
	balanceText: {
		fontSize: 24,
		color: 'white',
		fontWeight: 'bold',
	},
	userBg: {
		backgroundColor: '#1e9203',
		width: 30,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 20,
		marginHorizontal: 10,
	},
});

export default styles;
