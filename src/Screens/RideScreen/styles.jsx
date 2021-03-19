import { Dimensions, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bottomContainer: {
		height: 100,
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 15,
	},
	bottomText: {
		fontSize: 25,
		color: '#4a4a4a',
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
