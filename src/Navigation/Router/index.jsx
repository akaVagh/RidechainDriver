import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../Screens/HomeScreen';

const Stack = createStackNavigator();

const Router = (props) => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name={'Home Screen'}
				component={HomeScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
};
export default Router;

const styles = StyleSheet.create({});
