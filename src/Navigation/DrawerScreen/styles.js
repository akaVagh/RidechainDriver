import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
	drawerContent: {
		flex: 1,
	},
	image: {
		flexDirection: 'column',
		marginTop: 15,
		alignItems: 'center',
	},
	userInfoSection: {
		alignContent: 'center',
		justifyContent: 'center',
		backgroundColor: '#000',
		height: 200,
		top: -10,
	},
	title: {
		fontSize: 16,
		marginTop: 20,
		fontWeight: 'bold',
		color: '#fff',
	},
	caption: {
		fontSize: 14,
		lineHeight: 14,
	},
	row: {
		marginTop: 20,
		flexDirection: 'row',
		alignItems: 'center',
	},
	section: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 15,
	},
	paragraph: {
		fontWeight: 'bold',
		marginRight: 3,
	},
	drawerSection: {
		marginTop: 15,
	},
	bottomDrawerSection: {
		marginBottom: 15,
		borderTopColor: '#f4f4f4',
		borderTopWidth: 1,
	},
	preference: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
});

export default styles;
