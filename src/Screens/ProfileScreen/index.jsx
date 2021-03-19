import * as firebase from 'firebase';
import React, { useEffect, useRef, useState } from 'react';
import {
	View,
	Text,
	SafeAreaView,
	StatusBar,
	Alert,
	ActivityIndicator,
} from 'react-native';
import {
	ScrollView,
	TextInput,
	TouchableOpacity,
} from 'react-native-gesture-handler';
import { Avatar, Title } from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import * as orderActions from '../../redux/actions/orderActions';
const ProfileScreen = (props) => {
	const user = useSelector((state) => state.order.userData);

	const [image, setImage] = useState(
		'https://api.adorable.io/avatars/80/abott@adorable.png'
	);
	const sheet = useRef();
	const dispatch = useDispatch();
	const fall = new Animated.Value();
	const uid = useSelector((state) => state.order.uid);
	const [uploading, setUploading] = useState(false);
	const [transferred, settransferred] = useState(0);
	const [userData, setuserData] = useState(user);
	const getUser = async () => {
		await firebase
			.firestore()
			.collection('drivers')
			.doc(uid)
			.get()
			.then((userSnapshot) => {
				if (userSnapshot.exists) {
					setuserData(userSnapshot.data());
					//console.log('userSnapshot.data()', userSnapshot.data());
					dispatch(orderActions.setUserData(userSnapshot.data()));
				}
			});
	};
	useEffect(() => {
		getUser();
	}, []);
	useEffect(() => {
		(async () => {
			if (Platform.OS !== 'web') {
				const {
					status,
				} = await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== 'granted') {
					alert(
						'Sorry, we need camera roll permissions to make this work!'
					);
				}
			}
		})();
	}, []);
	const renderInner = () => (
		<View style={styles.panel}>
			<View style={{ alignItems: 'center' }}>
				<Text style={styles.panelTitle}>Upload Photo</Text>
				<Text style={styles.panelSubtitle}>
					Choose Your Profile Picture
				</Text>
			</View>
			<TouchableOpacity
				style={styles.panelButton}
				onPress={takePhotoFromCamera}
			>
				<Text style={styles.panelButtonTitle}>Take Photo</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.panelButton}
				onPress={choosePhotoFromLibrary}
			>
				<Text style={styles.panelButtonTitle}>Choose From Library</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.panelButton}
				onPress={() => sheet.current.snapTo(1)}
			>
				<Text style={styles.panelButtonTitle}>Cancel</Text>
			</TouchableOpacity>
		</View>
	);
	const renderHeader = () => (
		<View style={styles.header}>
			<View style={styles.panelHeader}>
				<View style={styles.panelHandle} />
			</View>
		</View>
	);

	const choosePhotoFromLibrary = async () => {
		await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1,
		}).then((result) => {
			//console.log('result', result);
			setImage(result);
			setuserData({ ...userData, imgUrl: result.uri });
			sheet.current.snapTo(1);
		});
	};
	const takePhotoFromCamera = async () => {
		await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1,
		}).then((result) => {
			setImage(result);
			sheet.current.snapTo(1);
		});
	};

	const uploadImage = async () => {
		if (image == null) {
			return null;
		}
		const imgUri = image.uri;
		const res = await fetch(imgUri);
		const file = await res.blob();
		let filename = imgUri.substring(imgUri.lastIndexOf('/') + 1);
		const extension = filename.split('.').pop();
		const name = filename.split('.').slice(0, -1).join('.');
		filename = name + Date.now() + '.' + extension;
		//console.log('filename', filename);
		setUploading(true);
		settransferred(0);
		const storeRef = firebase.storage().ref(`profile_image/${filename}`);
		const uploadTask = storeRef.put(file);
		uploadTask.on('state_changed', (takeSnapshot) => {
			settransferred(
				Math.round(
					(takeSnapshot.bytesTransferred / takeSnapshot.totalBytes) *
						100
				)
			);
		});
		try {
			await uploadTask;
			const url = await storeRef.getDownloadURL();
			setUploading(false);

			return url;
		} catch (error) {
			console.log('error at uploadImage', error);
			return null;
		}
	};

	const handleUpdate = async () => {
		let imgUrl = await uploadImage();
		if (imgUrl == null && userData.i) {
			imgUrl = userData.userImg;
		}
		firebase
			.firestore()
			.collection('drivers')
			.doc(uid)
			.update({
				first_name: userData.first_name,
				last_name: userData.last_name,
				email: userData.email,
				createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
				mobileNo: userData.mobileNo,
				userImg: imgUrl,
			})
			.then(() => {
				//console.log('User updated!');
				Alert.alert(
					'Profile updated!',
					'Your profile has updated successfully '
				);
			})
			.catch((error) => console.log('error at update', error));
	};

	return (
		<SafeAreaView>
			<ScrollView>
				<StatusBar backgroundColor='#000' barStyle='light-content' />
				<View
					style={{
						flex: 1,
						marginBottom: 150,
					}}
				>
					<View style={styles.userInfoSection}>
						<Text style={styles.title}>Edit Profile</Text>
					</View>
					<View style={styles.image}>
						<TouchableOpacity
							onPress={() => sheet.current.snapTo(0)}
						>
							<Avatar.Image
								source={{
									uri: image.uri,
								}}
								size={125}
							/>
						</TouchableOpacity>
						{uploading ? (
							<View
								style={{
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Text>{transferred} % completed!</Text>
								<ActivityIndicator
									size='large'
									color='#000000'
								/>
							</View>
						) : (
							<View />
						)}
					</View>
					<View style={styles.separator} />
					<Text style={styles.heading}>First Name</Text>
					<TextInput
						style={styles.input}
						value={userData ? userData.first_name : ''}
						onChangeText={(first_name) =>
							setuserData({ ...userData, first_name })
						}
					/>
					<Text style={styles.heading}>Last Name</Text>
					<TextInput
						style={styles.input}
						value={userData ? userData.last_name : ''}
						onChangeText={(last_name) =>
							setuserData({ ...userData, last_name })
						}
					/>
					<Text style={styles.heading}>Mobile Number</Text>
					<TextInput
						style={styles.input}
						value={userData ? userData.mobileNo : ''}
						onChangeText={(mobileNo) =>
							setuserData({ ...userData, mobileNo })
						}
					/>
					<Text style={styles.heading}>Email</Text>
					<TextInput
						style={styles.input}
						value={userData ? userData.email : ''}
						onChangeText={(email) =>
							setuserData({ ...userData, email })
						}
					/>

					<TouchableOpacity
						onPress={handleUpdate}
						style={styles.button}
					>
						<View style={styles.submit}>
							<Text style={styles.btnText}>Update</Text>
						</View>
					</TouchableOpacity>
				</View>
				<BottomSheet
					ref={sheet}
					snapPoints={[330, 0]}
					initialSnap={1}
					callbackNode={fall}
					renderContent={renderInner}
					renderHeader={renderHeader}
					enabledGestureInteraction={true}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};
export default ProfileScreen;
