import { setStatusBarBackgroundColor } from "expo-status-bar";
import React from "react";
import { StyleSheet, Image } from 'react-native';
import {View , Text} from "react-native";
import MapView, { PROVIDER_GOOGLE }  from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const origin = {latitude: 23.054228, longitude: 72.487822};
const destination = {latitude: 23.054928, longitude: 72.489822 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyAFcNY6a_668CtawRFZsw4xizaTX2ttt0Q';


const HomeMap = (props) => {
    return(
        <MapView
            style={{ width: '100%', height: '100%' }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            //customMapStyle={require('../../assets/mapStyle.json')}
            initialRegion={{
                latitude: 23.054028,
                longitude: 72.487222,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={GOOGLE_MAPS_APIKEY}
            />
        </MapView>
    );
};
export default HomeMap;