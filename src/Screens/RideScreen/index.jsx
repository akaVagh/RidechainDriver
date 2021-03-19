import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import RideMap from '../../Components/RideMap';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';

const RideScreen = (props) => {
	const order = useSelector((state) => state.order.order);
	const pathData = useSelector((state) => state.order.pathData);
	const rideStatus = useSelector((state) => state.order.rideStatus);

	const renderBottomTile = () => {
		if (order && rideStatus.isFinished) {
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
							COMPLETE {order.CabType}
						</Text>
					</View>
					<Text style={styles.bottomText}>
						{order.userData.first_name}
					</Text>
				</View>
			);
		}
		if (order && rideStatus.isPickedUp) {
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
							{pathData.distance
								? pathData.distance.toString()
								: '?'}{' '}
							Kms
						</Text>
					</View>
					<Text style={styles.bottomText}>
						Dropping Off {order.userData.first_name}
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
							{pathData.duration
								? pathData.duration.toFixed(1)
								: '?'}{' '}
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
							{pathData.distance
								? pathData.distance.toFixed(1)
								: '?'}{' '}
							Kms
						</Text>
					</View>
					<Text style={styles.bottomText}>
						Picking up {order.userData.first_name}
					</Text>
				</View>
			);
		}
	};
	return (
		<View style={styles.container}>
			<StatusBar barStyle='light-content' backgroundColor='#000' />
			<RideMap />
			<View>{renderBottomTile()}</View>
		</View>
	);
};
export default RideScreen;
