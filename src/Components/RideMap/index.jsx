import React, { useState, useEffect, useRef } from 'react';
import { Image, View, Pressable, Dimensions, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as orderActions from '../../redux/actions/orderActions';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import * as firebase from 'firebase';
import GOOGLE_MAPS_APIKEY from '../GoogleApi';

const RideMap = (props) => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const [region, setRegion] = useState({
		latitudeDelta: 0.0222,
		longitudeDelta: 0.0121,
		latitude: 21.209934,
		longitude: 72.873976,
	});
	const [myPosition, setMyPosition] = useState(null);
	const mapRef = useRef(null);
	const order = useSelector((state) => state.order.order);
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

	const onUserLocationChange = (event) => {
		setMyPosition(event.nativeEvent.coordinate);
	};
	const isPickedUp = useSelector(
		(state) => state.order.rideStatus.isPickedUp
	);
	const isFinished = useSelector(
		(state) => state.order.rideStatus.isFinished
	);
	const onDirectionFound = (event) => {
		dispatch(orderActions.setRidePath(event));
	};
	const getDestination = () => {
		if (order && isPickedUp) {
			return {
				latitude: order.destination.latitude,
				longitude: order.destination.longitude,
			};
		}
		return {
			latitude: order.origin.latitude,
			longitude: order.origin.longitude,
		};
	};
	const handleFinish = () => {
		navigation.navigate('Home Screen');
		try {
			firebase
				.firestore()
				.collection('History')
				.doc(order.id)
				.collection('Past Orders')
				.doc(order.createdAt.toDate().toString())
				.set(order);

			firebase
				.firestore()
				.collection('Running Orders')
				.doc(order.id)
				.delete();
		} catch (error) {
			console.log('error', error);
		}
	};

	return (
		<View>
			<MapView
				style={{
					width: '100%',
					height: Dimensions.get('window').height - 100,
				}}
				provider={PROVIDER_GOOGLE}
				customMapStyle={require('../../assets/mapStyle.json')}
				initialRegion={region}
				showsUserLocation={true}
				showsMyLocationButton={false}
				ref={mapRef}
				onUserLocationChange={onUserLocationChange}
			>
				<MapViewDirections
					origin={myPosition}
					onReady={onDirectionFound}
					destination={getDestination()}
					apikey={GOOGLE_MAPS_APIKEY}
					strokeWidth={5}
					strokeColor='black'
				/>

				<Marker coordinate={getDestination()} title={'Drop off'} />
			</MapView>

			<View style={styles.drawerBtn}>
				<Pressable onPress={() => navigation.openDrawer()}>
					<Entypo name={'menu'} size={30} color='black' />
				</Pressable>
			</View>
			{isPickedUp === false && (
				<View style={styles.pickUpBtn}>
					<Pressable
						onPress={() => {
							dispatch(orderActions.setPickedUP(true));
						}}
					>
						<Text style={styles.btnText}>Pick Up</Text>
					</Pressable>
				</View>
			)}
			{isPickedUp && isFinished === false && (
				<View style={{ ...styles.pickUpBtn, backgroundColor: 'red' }}>
					<Pressable
						onPress={() => {
							dispatch(orderActions.setFinished(true));
						}}
					>
						<Text style={styles.btnText}>Drop Rider</Text>
					</Pressable>
				</View>
			)}
			{isPickedUp && isFinished && (
				<View style={styles.finishBtn}>
					<Pressable onPress={handleFinish}>
						<Text style={styles.btnText}>Finish Ride</Text>
					</Pressable>
				</View>
			)}
		</View>
	);
};
export default RideMap;
