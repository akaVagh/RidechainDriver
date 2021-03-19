import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
	container: {
		backgroundColor: '#3b3b3b',
		borderBottomWidth: 0.5,
		borderBottomColor: '#262626',
		borderRadius: 15,
	},
	first_row: {
		flexDirection: 'row',
	},
	second_row: {
		flexDirection: 'column',
	},
	third_row: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	image: {
		flexDirection: 'row',
		margin: 10,
		marginRight: 20,
		alignItems: 'center',
	},
	name: {
		fontSize: 30,
		fontWeight: '300',
		color: '#fff',
		margin: 10,
	},
	rating: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	name_Container: {
		flexDirection: 'column',
	},
	rate: {
		fontSize: 20,
		color: '#fff',
		margin: 10,
		marginRight: 5,
	},
	place_heading: {
		fontSize: 18,
		color: '#fff',
		margin: 10,
		marginRight: 5,
		fontWeight: '600',
	},
	place_name: {
		fontSize: 16,
		color: '#fff',
		margin: 10,
		marginLeft: 5,
	},
	place: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	button_container: {
		alignItems: 'center',
		marginBottom: 30,
	},
	button: {
		width: 170,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
		flexDirection: 'row',
		backgroundColor: '#0080ff',
		borderRadius: 30,
	},
	btnText: {
		fontSize: 25,
		fontWeight: '500',
		color: '#fff',
		margin: 10,
	},
});

export default styles;
