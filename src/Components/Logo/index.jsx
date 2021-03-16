import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

const Logo = (props) => {
	return (
		<Animated.View style={{ ...styles.logo }}>
			<Text style={{ fontWeight: 'bold', fontSize: 50, color: '#fff' }}>
				RideChain
			</Text>
			<Text
				style={{
					fontWeight: 'bold',
					fontSize: 50,
					color: '#fff',
				}}
			>
				Driver
			</Text>
		</Animated.View>
	);
};
export default Logo;

const styles = StyleSheet.create({
	logo: {
		//backgroundColor: '#b8d2ae',
		// height: 200,
		// width: 200,
		// padding: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
