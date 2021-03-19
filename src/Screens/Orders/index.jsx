import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Button } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import * as orderActions from '../../redux/actions/orderActions';
import styles from './styles';

const Orders = (props) => {
	const dispatch = useDispatch();
	const orderList = useSelector((state) => state.order.orderList);
	//console.log(`orderList`, orderList);
	const handleList = (item) => {
		dispatch(orderActions.setOrder(item));
		dispatch(orderActions.emptyOrderList());
	};
	const renderItem = ({ item }) => (
		<View>
			<TouchableOpacity
				style={styles.container}
				onPress={() => handleList(item)}
			>
				<View style={styles.first_row}>
					<View style={styles.image}>
						<Avatar.Image
							source={{
								uri: item.userData.imgUrl,
							}}
							size={75}
						/>
					</View>
					<View style={styles.name_Container}>
						<Text style={styles.name}>
							{item.userData.first_name} {item.userData.last_name}
						</Text>
						<View style={styles.rating}>
							<Text style={styles.rate}>4.5 </Text>
							<Ionicons name='star' size={20} color='gold' />
						</View>
					</View>
				</View>
				<View style={styles.second_row}>
					<View style={styles.place}>
						<Text style={styles.place_heading}>Origin:</Text>
						<Text style={styles.place_name}>
							{item.originName}{' '}
						</Text>
					</View>
					<View style={styles.place}>
						<Text style={styles.place_heading}>Destination:</Text>
						<Text style={styles.place_name}>
							{item.destinationName}
						</Text>
					</View>
				</View>
				{/* <View style={styles.third_row}>
					<Text style={styles.place_heading}>Duration: </Text>
					<Text style={styles.place_heading}>Distance: </Text>
				</View> */}
			</TouchableOpacity>
		</View>
	);

	return (
		<View style={{ flex: 1 }}>
			<StatusBar barStyle='light-content' backgroundColor='#000' />
			<FlatList
				data={orderList}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
			<TouchableOpacity
				style={styles.button_container}
				onPress={() => dispatch(orderActions.getOrderList())}
			>
				<View style={styles.button}>
					<Text style={styles.btnText}>Refresh</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default Orders;