import React, { useState, useEffect, useRef } from 'react';
import { Image, View, Pressable, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as orderActions from '../../redux/actions/orderActions';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
const GOOGLE_MAPS_APIKEY = 'AIzaSyAFcNY6a_668CtawRFZsw4xizaTX2ttt0Q';

const RideMap = (props) => {
	const dispatch = useDispatch();
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
	const onDirectionFound = (event) => {
		dispatch(orderActions.setRidePath(event));
		dispatch(orderActions.setPickedUP(event.distance < 0.1));
		dispatch(orderActions.setFinished(isPickedUp && event.distance < 0.1));
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
		</View>
	);
};
export default RideMap;
