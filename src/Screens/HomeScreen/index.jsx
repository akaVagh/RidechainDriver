import React, { useCallback, useEffect, useState } from 'react';
import {
	Text,
	View,
	Dimensions,
	Pressable,
	PermissionsAndroid,
} from 'react-native';
import {
	Entypo,
	Ionicons,
	Fontisto,
	MaterialCommunityIcons,
} from '@expo/vector-icons';
import styles from './styles';
import NewOrderPopup from '../../Components/NewOrderPopup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import * as firebase from 'firebase';
import * as orderActions from '../../redux/actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';

const origin = { latitude: 23.055028, longitude: 72.486222 };
const destination = { latitude: 23.054928, longitude: 72.480822 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyAFcNY6a_668CtawRFZsw4xizaTX2ttt0Q';
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
	// useFocusEffect(
	// 	useCallback(() => {
	// 		getUser();
	// 	})
	// );

	const getOrder = async () => {
		await firebase
			.firestore()
			.collection('orders')
			.get()
			.then((querySnapshot) => {
				const tempDoc = querySnapshot.docs.map((doc) => {
					return { id: doc.id, ...doc.data() };
				});
				setNewOrder({
					...newOrder,
					id: tempDoc[0].id,
					type: tempDoc[0].cabType,
					originLatitude: tempDoc[0].origin.latitude,
					originLongitude: tempDoc[0].origin.longitude,
					destLatitude: tempDoc[0].destination.latitude,
					destLongitude: tempDoc[0].destination.longitude,
					user: {
						rating: 4.8,
						name: 'Elon',
					},
				});
				dispatch(orderActions.setOrder(tempDoc[0]));
			});
	};
	const orderData = useSelector((state) => state.order.orderData);
	useEffect(() => {
		getOrder();
	}, []);
	//console.log(`orderData`, orderData);

	const navigation = useNavigation();
	const [isOnline, setIsOnline] = useState(false);
	const [myPosition, setMyPosition] = useState(null);
	const [order, setOrder] = useState(null);
	const [newOrder, setNewOrder] = useState({
		id: '1',
		type: 'UberX',

		originLatitude: 23.054228,
		originLongitude: 72.487822,

		destLatitude: 23.054928,
		destLongitude: 72.489822,

		user: {
			rating: 4.8,
			name: 'Elon',
		},
	});

	const onDecline = () => {
		setNewOrder(null);
	};

	const onAccept = (newOrder) => {
		setOrder(newOrder);
		setNewOrder(null);
	};

	const onGoPress = () => {
		setIsOnline(!isOnline);
	};

	const onUserLocationChange = (event) => {
		setMyPosition(event.nativeEvent.coordinate);
	};

	const onDirectionFound = (event) => {
		//console.log(`event`, event);
		if (order) {
			setOrder({
				...order,
				distance: event.distance,
				duration: event.duration,
				pickedUp: order.pickedUp || event.distance < 1,
				isFinished: order.pickedUp && event.distance < 0.2,
			});
		}
	};

	const getDestination = () => {
		if (order && order.pickedUp) {
			return {
				latitude: order.destLatitude,
				longitude: order.destLongitude,
			};
		}
		return {
			latitude: order.originLatitude,
			longitude: order.originLongitude,
		};
	};

	const renderBottomTitle = () => {
		if (order && order.isFinished) {
			return (
				<View style={{ alignItems: 'center' }}>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: '#cb1a1a',
							width: 200,
							padding: 10,
						}}
					>
						<Text style={{ color: 'white', fontWeight: 'bold' }}>
							COMPLETE {order.type}
						</Text>
					</View>
					<Text style={styles.bottomText}>{order.user.name}</Text>
				</View>
			);
		}
		if (order && order.pickedUp) {
			return (
				<View style={{ alignItems: 'center' }}>
					<View
						style={{ flexDirection: 'row', alignItems: 'center' }}
					>
						<Text>
							{order.duration ? order.duration.toFixed(1) : '?'}{' '}
							min
						</Text>
						<View
							style={{
								backgroundColor: '#d41212',
								width: 30,
								height: 30,
								alignItems: 'center',
								justifyContent: 'center',
								borderRadius: 20,
								marginHorizontal: 10,
							}}
						>
							<FontAwesome
								name={'user'}
								color={'white'}
								size={20}
							/>
						</View>
						<Text>
							{order.distance ? order.distance.toFixed(1) : '?'}{' '}
							Kms
						</Text>
					</View>
					<Text style={styles.bottomText}>
						Dropping Off {order.user.name}
					</Text>
				</View>
			);
		}

		if (order) {
			return (
				<View style={{ alignItems: 'center' }}>
					<View
						style={{ flexDirection: 'row', alignItems: 'center' }}
					>
						<Text>
							{order.duration ? order.duration.toFixed(1) : '?'}{' '}
							min
						</Text>
						<View style={styles.userBg}>
							<FontAwesome
								name={'user'}
								color={'white'}
								size={20}
							/>
						</View>
						<Text>
							{order.distance ? order.distance.toFixed(1) : '?'}{' '}
							Kms
						</Text>
					</View>
					<Text style={styles.bottomText}>
						Picking up {order.user.name}
					</Text>
				</View>
			);
		}

		if (isOnline) {
			return <Text style={styles.bottomText}>You're online</Text>;
		}
		return <Text style={styles.bottomText}>You're offline</Text>;
	};

	return (
		<View>
			<MapView
				style={{
					width: '100%',
					height: Dimensions.get('window').height - 100,
				}}
				provider={PROVIDER_GOOGLE}
				showsUserLocation={true}
				onMapReady={() => {
					PermissionsAndroid.request(
						PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
					);
				}}
				onUserLocationChange={onUserLocationChange}
				//customMapStyle={require('../../assets/mapStyle.json')}
				initialRegion={{
					latitude: 23.054028,
					longitude: 72.487222,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
			>
				{order && (
					<MapViewDirections
						origin={origin /*myPosition */}
						onReady={onDirectionFound}
						destination={getDestination()}
						apikey={GOOGLE_MAPS_APIKEY}
						strokeWidth={5}
						strokeColor='black'
					/>
				)}
			</MapView>

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

			<Pressable style={[styles.roundButton, { bottom: 110, left: 10 }]}>
				<MaterialCommunityIcons
					name={'shield-car'}
					size={24}
					color='#87ceeb'
				/>
			</Pressable>

			<Pressable style={[styles.roundButton, { bottom: 110, right: 10 }]}>
				<MaterialCommunityIcons
					name={'message-alert'}
					size={24}
					color='#4a4a4a'
				/>
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
			{newOrder && (
				<NewOrderPopup
					newOrder={newOrder}
					duration={7}
					distance={1.5}
					onDecline={onDecline}
					onAccept={() => onAccept(newOrder)}
				/>
			)}
		</View>
	);
};
export default HomeScreen;
