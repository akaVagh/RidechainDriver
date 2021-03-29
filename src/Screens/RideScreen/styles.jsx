import { Dimensions, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bottomContainer: {
		height: 100,
		alignItems: 'center',
		backgroundColor: '#000000',
	},
	bottomText: {
		fontSize: 25,
		color: '#00ff40',
		fontWeight: '900',
	},
	distText: {
		fontSize: 15,
		color: '#fff',
		fontWeight: '700',
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
	complete: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#cb1a1a',
		width: 200,
		padding: 10,
	},
});

export default styles;
