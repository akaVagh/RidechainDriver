import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import styles from './styles';
import Logo from '../../Components/Logo';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = (props) => {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor='#000' barStyle='light-content' />
			<Animatable.View style={styles.header} animation='bounceIn'>
				<Logo />
			</Animatable.View>
			<Animatable.View style={styles.footer} animation='fadeInUpBig'>
				<Text style={styles.title}>
					Thank you for choosing RideChain!
				</Text>
				<Text style={styles.text}>Sign in with account</Text>
				<TouchableOpacity
					onPress={() => navigation.navigate('SignIn')}
					style={styles.button}
				>
					<View style={styles.signIn}>
						<Text style={styles.textSign}>Sign In</Text>
						<Ionicons name='log-in' size={25} color='white' />
					</View>
				</TouchableOpacity>
			</Animatable.View>
		</View>
	);
};
export default SplashScreen;
