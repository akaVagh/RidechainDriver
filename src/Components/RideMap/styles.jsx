import { Dimensions, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#bdd3fd',
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		top: '44%',
		left: '44.5%',
		position: 'absolute',
	},
	position: {
		position: 'absolute',
		top: '5%',
		right: '5%',
		backgroundColor: '#fff',
		borderRadius: 30,
		padding: 5,
	},
	pickUpBtn: {
		position: 'absolute',
		top: '90%',
		backgroundColor: '#2ec126',
		padding: 10,
		width: 150,
		alignItems: 'center',
		borderRadius: 5,
		right: Dimensions.get('window').width / 2 - 75,
		borderColor: '#000',
		borderWidth: 2,
	},
	finishBtn: {
		position: 'absolute',
		top: '90%',
		backgroundColor: 'red',
		padding: 10,
		width: 200,
		alignItems: 'center',
		borderRadius: 5,
		right: Dimensions.get('window').width / 2 - 100,
		borderColor: '#000',
		borderWidth: 2,
	},
	btnText: {
		fontWeight: 'bold',
		fontSize: 22,
		color: '#000',
	},
});

export default styles;
