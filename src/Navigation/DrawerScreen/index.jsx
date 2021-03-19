import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import SettingScreen from '../../Screens/SettingScreen';
import Router from '../Router';
import DrawerContent from './DrawerContent';
import ProfileScreen from '../../Screens/ProfileScreen';
import * as orderActions from '../../redux/actions/orderActions';

const Drawer = createDrawerNavigator();

const DrawerNav = (props) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(orderActions.setUserId(props.uid));
	}, [props]);

	return (
		<NavigationContainer>
			<Drawer.Navigator
				initialRouteName='Home'
				drawerContent={(pops) => <DrawerContent {...pops} />}
			>
				<Drawer.Screen name='Home' component={Router} />
				<Drawer.Screen name='Profile' component={ProfileScreen} />
				<Drawer.Screen name='Setting' component={SettingScreen} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
};
export default DrawerNav;

const styles = StyleSheet.create({});
