import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import {
	Entypo,
	Ionicons,
	Fontisto,
	MaterialCommunityIcons,
} from '@expo/vector-icons';
import styles from './styles';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import * as firebase from 'firebase';
import * as orderActions from '../../redux/actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import HomeMap from '../../Components/HomeMap';

const HomeScreen = (props) => {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const uid = useSelector((state) => state.order.uid);
	const getUser = async () => {
		await firebase
			.firestore()
			.collection('drivers')
			.doc(uid)
			.get()
			.then((userSnapshot) => {
				if (userSnapshot.exists) {
					//console.log('userSnapshot.data()----', userSnapshot.data());
					dispatch(orderActions.setUserData(userSnapshot.data()));
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
	//console.log(`orderData`, orderData);

	const navigation = useNavigation();
	const [isOnline, setIsOnline] = useState(false);

	const onGoPress = () => {
		setIsOnline(!isOnline);
		navigation.navigate('Order Screen');
	};

	const [region, setRegion] = useState({
		latitudeDelta: 0.0222,
		longitudeDelta: 0.0121,
		latitude: 21.209934,
		longitude: 72.873976,
	});
	const mapRef = useRef(null);
	useEffect(() => {
		userCurrentLocation();
	}, []);

	const userCurrentLocation = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			mapRef.current.animateToRegion({
				...region,
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			});

			setRegion({
				...region,
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			});
			setMyPosition({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			});
		});
	};
	const renderBottomTitle = () => {
		if (isOnline) {
			return <Text style={styles.bottomText}>You're online</Text>;
		}
		return <Text style={styles.bottomText}>You're offline</Text>;
	};

	return (
		<View>
			<HomeMap />
			<Pressable
				onPress={() => console.warn({ data: 'Balance' })}
				style={styles.balanceButton}
			>
				<Text style={styles.balanceText}>
					<Text style={{ color: 'green' }}>$</Text> 0.00
				</Text>
			</Pressable>

			<Pressable
				onPress={() => navigation.openDrawer()}
				style={[styles.roundButton, { top: 20, left: 10 }]}
			>
				<Entypo name={'menu'} size={24} color='#4a4a4a' />
			</Pressable>

			<Pressable style={[styles.roundButton, { top: 20, right: 10 }]}>
				<Fontisto name={'search'} size={24} color='#4a4a4a' />
			</Pressable>

			<Pressable onPress={onGoPress} style={styles.goButton}>
				<Text style={styles.goText}>{isOnline ? 'END' : 'GO'}</Text>
			</Pressable>

			<View style={styles.bottomContainer}>
				<Ionicons name={'options'} size={30} color='#4a4a4a' />
				{renderBottomTitle()}
				<MaterialCommunityIcons
					name={'dots-vertical'}
					size={30}
					color='#4a4a4a'
				/>
			</View>
		</View>
	);
};
export default HomeScreen;
