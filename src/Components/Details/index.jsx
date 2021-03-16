import React from "react";
import {View , Text , StyleSheet } from "react-native";
import styles from './styles'
import Icon from 'react-native-vector-icons/FontAwesome';

const Details = (props) => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Sheldon Cooper</Text>
            <Text style={styles.text}>Hyundai Creta - GJXXXXXX                4.9 <Icon name="star" size={20} /></Text>
        </View>
    );
};
export default Details;