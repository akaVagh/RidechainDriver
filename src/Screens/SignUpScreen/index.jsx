import React, { useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Platform,
	StyleSheet,
	StatusBar,
	Alert,
} from 'react-native';
import styles from './styles';
import * as Animatable from 'react-native-animatable';
import * as Google from 'expo-google-app-auth';
import * as firebase from 'firebase';
import { AntDesign } from '@expo/vector-icons';

const SignUpScreen = ({ navigation }) => {
	const isUserEqual = (googleUser, firebaseUser) => {
		if (firebaseUser) {
			var providerData = firebaseUser.providerData;
			for (var i = 0; i < providerData.length; i++) {
				if (
					providerData[i].providerId ===
						firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
					providerData[i].uid === googleUser.getBasicProfile().getId()
				) {
					return true;
				}
			}
		}
		return false;
	};
	const onSignIn = (googleUser) => {
		//console.log('Google Auth Response', googleUser);
		var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
			unsubscribe();
			if (!isUserEqual(googleUser, firebaseUser)) {
				var credential = firebase.auth.GoogleAuthProvider.credential(
					googleUser.idToken,
					googleUser.accessToken
				);

				firebase
					.auth()
					.signInWithCredential(credential)
					.then((result) => {
						//console.log('result from firebase.then', result);
						firebase
							.firestore()
							.collection('drivers')
							.doc(firebase.auth().currentUser.uid)
							.set({
								first_name:
									result.additionalUserInfo.profile
										.given_name,
								last_name:
									result.additionalUserInfo.profile
										.family_name,
								email: result.additionalUserInfo.profile.email,
								createdAt: firebase.firestore.Timestamp.fromDate(
									new Date()
								),
								mobileNo: '',

								userImg: null,
							});
					})
					.catch((error) => {
						console.log('error from onsignin', error);
						var errorCode = error.code;
						var errorMessage = error.message;
						var email = error.email;
						var credential = error.credential;
					});
			} else {
				console.log('User already signed-in Firebase.');
			}
		});
	};
	const signInWithGoogleAsync = async () => {
		try {
			const result = await Google.logInAsync({
				androidClientId:
					'809377894867-514mg0njggcq94uo4ncsdlfs0tvj959p.apps.googleusercontent.com',
				scopes: ['profile', 'email'],
			});

			if (result.type === 'success') {
				onSignIn(result);
				return result.accessToken;
			} else {
				return { cancelled: true };
			}
		} catch (e) {
			return { error: true };
		}
	};
	return (
		<View style={styles.container}>
			<StatusBar backgroundColor='#000' barStyle='light-content' />
			<View style={styles.header}>
				<Text style={styles.text_header}>Register with social</Text>
			</View>

			<Animatable.View animation='fadeInUpBig' style={styles.footer}>
				<View>
					<TouchableOpacity
						style={[styles.button]}
						onPress={() => {
							signInWithGoogleAsync();
						}}
					>
						<View style={styles.buttonContent}>
							<AntDesign
								style={{ marginRight: 20 }}
								name='google'
								size={24}
								color='#fff'
							/>
							<Text
								style={[
									styles.textSign,
									{
										color: '#fff',
									},
								]}
							>
								Sign in with Google
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button]}
						onPress={() => {
							signInWithGoogleAsync();
						}}
					>
						<View style={styles.buttonContent}>
							<AntDesign
								style={{ marginRight: 20 }}
								name='facebook-square'
								size={24}
								color='#fff'
							/>
							<Text
								style={[
									styles.textSign,
									{
										color: '#fff',
									},
								]}
							>
								Sign in with Facebook
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</Animatable.View>
		</View>
	);
};

export default SignUpScreen;
