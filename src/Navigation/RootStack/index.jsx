import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SignInScreen from '../../Screens/SignInScreen';
import SignUpScreen from '../../Screens/SignUpScreen';
import SplashScreen from '../../Screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Root = createStackNavigator();

const RootStack = (props) => {
	return (
		<NavigationContainer>
			<Root.Navigator>
				<Root.Screen
					name='Splash'
					component={SplashScreen}
					options={{ headerShown: false }}
				/>
				<Root.Screen
					name='SignIn'
					component={SignInScreen}
					options={{ headerShown: false }}
				/>
				<Root.Screen
					name='SignUp'
					component={SignUpScreen}
					options={{ headerShown: false }}
				/>
			</Root.Navigator>
		</NavigationContainer>
	);
};
export default RootStack;

const styles = StyleSheet.create({});
