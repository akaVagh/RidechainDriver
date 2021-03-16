import { useFocusEffect, useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as userActions from '../../redux/actions/userActions';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';

const HomeScreen = (props) => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const [loading, setLoading] = useState(true);
	const uid = useSelector((state) => state.user.uid);

	const getUser = async () => {
		await firebase
			.firestore()
			.collection('drivers')
			.doc(uid)
			.get()
			.then((userSnapshot) => {
				if (userSnapshot.exists) {
					//console.log('userSnapshot.data()----', userSnapshot.data());
					dispatch(userActions.setUserData(userSnapshot.data()));
				}
			});
		if (loading) {
			setLoading(false);
		}
	};
	useFocusEffect(
		useCallback(() => {
			getUser();
		})
	);
	return (
		<View>
			<Text> This is Home Screen</Text>
		</View>
	);
};
export default HomeScreen;
