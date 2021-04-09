import React, { useRef, useState, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StatusBar,
} from 'react-native';
import styles from './styles';
import * as Animatable from 'react-native-animatable';
import { AntDesign } from '@expo/vector-icons';
import PhoneInput from 'react-native-phone-number-input';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../../Components/firebase/config';
import * as firebase from 'firebase';

const SignInScreen = ({ navigation }) => {
	const nextInp = useRef();
	const [value, setValue] = useState('');
	const [formattedValue, setFormattedValue] = useState('');
	const [verificationId, setVerificationId] = useState(null);
	const [code, setCode] = useState('');
	const phoneInput = useRef();
	const recaptchaVerifier = useRef(null);

	const sendVerification = () => {
		const phoneProvider = new firebase.auth.PhoneAuthProvider();
		phoneProvider
			.verifyPhoneNumber(formattedValue, recaptchaVerifier.current)
			.then(setVerificationId);
	};

	const confirmCode = () => {
		const credential = firebase.auth.PhoneAuthProvider.credential(
			verificationId,
			code
		);
		firebase
			.auth()
			.signInWithCredential(credential)
			.then((result) => {
				firebase
					.firestore()
					.collection('drivers')
					.doc(firebase.auth().currentUser.uid)
					.set({
						first_name: '',
						last_name: '',
						email: '',
						mobileNo: formattedValue,
						createdAt: firebase.firestore.Timestamp.fromDate(
							new Date()
						),
						userImg: null,
						rating: 0,
					});
				console.log(result);
			});
	};
	return (
		<View style={styles.container}>
			<StatusBar backgroundColor='#000' barStyle='light-content' />

			<FirebaseRecaptchaVerifierModal
				ref={recaptchaVerifier}
				firebaseConfig={firebaseConfig}
			/>
			<View style={styles.header}>
				<Text style={styles.text_header}>Welcome!</Text>
			</View>

			<Animatable.View animation='fadeInUpBig' style={styles.footer}>
				<Text style={styles.text_footer}>Enter your mobile number</Text>
				<View style={styles.action}>
					<PhoneInput
						ref={phoneInput}
						defaultValue={value}
						defaultCode='IN'
						layout='first'
						//onChangeText={(val) => textInputChange(val)}
						onChangeText={(text) => {
							setValue(text);
						}}
						onChangeFormattedText={(text) => {
							setFormattedValue(text);
						}}
						withDarkTheme
						containerStyle={[
							styles.textInput,
							{
								color: '#000',
							},
						]}
					/>
				</View>
				<View>
					<TouchableOpacity
						onPress={() => navigation.navigate('SignUp')}
						style={styles.signIn}
					>
						<View style={{ flexDirection: 'row' }}>
							<Text
								style={[
									styles.textSign,
									{
										color: '#007efd',
									},
								]}
							>
								or connect with Social
							</Text>
							<AntDesign
								name='arrowright'
								size={24}
								color='#007efd'
							/>
						</View>
					</TouchableOpacity>
				</View>
				<View style={styles.button}>
					<TouchableOpacity
						style={[
							styles.signIn,
							{
								width: 200,
								borderColor: '#000',
								borderWidth: 1,
								backgroundColor: '#000',
							},
						]}
						onPress={sendVerification}
					>
						<Text
							style={[
								styles.textSign,
								{
									color: '#fff',
								},
							]}
						>
							Send code
						</Text>
					</TouchableOpacity>
				</View>
				<View style={{ marginTop: 50 }}>
					<Text
						style={[
							styles.otpSign,
							{
								marginBottom: 10,
								marginLeft: 10,
							},
						]}
					>
						Enter otp
					</Text>
					<View style={styles.otpBox}>
						<TextInput
							placeholder='Confirmation Code'
							onChangeText={setCode}
							keyboardType='number-pad'
						/>
					</View>
					<View style={styles.button}>
						<TouchableOpacity
							style={[
								styles.signIn,
								{
									width: 200,
									borderColor: '#000',
									borderWidth: 1,
									marginTop: 15,
									backgroundColor: '#000',
								},
							]}
							onPress={confirmCode}
						>
							<Text
								style={[
									styles.textSign,
									{
										color: '#fff',
									},
								]}
							>
								Confirm
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Animatable.View>
		</View>
	);
};

export default SignInScreen;
