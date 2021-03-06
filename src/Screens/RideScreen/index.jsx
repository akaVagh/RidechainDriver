import React from 'react';
import { View, Text, StyleSheet, StatusBar, Pressable } from 'react-native';
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
				<View style={styles.bottomContainer}>
					<View style={styles.complete}>
						<Text style={{ color: 'white', fontWeight: 'bold' }}>
							COMPLETE {order.CabType}
						</Text>
					</View>
					<Text style={styles.bottomText}>
						{order.riderData.first_name}
					</Text>
				</View>
			);
		}
		if (order && rideStatus.isPickedUp) {
			return (
				<View style={styles.bottomContainer}>
					<View
						style={{ flexDirection: 'row', alignItems: 'center' }}
					>
						<Text style={styles.distText}>
							{order.duration ? order.duration.toFixed(1) : '?'}{' '}
							min
						</Text>
						<View
							style={{ ...styles.userBg, backgroundColor: 'red' }}
						>
							<FontAwesome
								name={'user'}
								color={'black'}
								size={20}
							/>
						</View>
						<Text style={styles.distText}>
							{pathData.distance
								? pathData.distance.toFixed(1)
								: '?'}{' '}
							Kms
						</Text>
					</View>
					<Text style={{ ...styles.bottomText, color: 'red' }}>
						Dropping Off {order.riderData.first_name}
					</Text>
				</View>
			);
		}

		if (order) {
			return (
				<View style={styles.bottomContainer}>
					<View
						style={{ flexDirection: 'row', alignItems: 'center' }}
					>
						<Text style={styles.distText}>
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
						<Text style={styles.distText}>
							{pathData.distance
								? pathData.distance.toFixed(1)
								: '?'}{' '}
							Kms
						</Text>
					</View>
					<Text style={styles.bottomText}>
						Picking up {order.riderData.first_name}
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
