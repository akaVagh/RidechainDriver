import * as firebase from 'firebase';
import * as actionTypes from '../actionTypes';

export const setUserId = (userId) => {
	return {
		type: actionTypes.SET_USER_ID,
		uid: userId,
	};
};

export const setUserData = (data) => {
	return {
		type: actionTypes.SET_USER_DATA,
		fname: data.first_name,
		lname: data.last_name,
		mobile: data.mobileNo,
		email: data.email,
		imgUrl: data.userImg,
	};
};

export const getOrderList = () => {
	return (dispatch) => {
		firebase
			.firestore()
			.collection('orders')
			.get()
			.then((querySnapshot) => {
				const orderDocs = querySnapshot.docs.map((doc) => {
					return { id: doc.id, ...doc.data() };
				});
				dispatch({
					type: actionTypes.SET_ORDER_LIST,
					list: orderDocs,
				});
			});
	};
};

export const setOrder = (order) => {
	return {
		type: actionTypes.SET_ORDER,
		order: order,
	};
};

export const setPickedUP = (pick) => {
	return {
		type: actionTypes.SET_PICKEDUP,
		pick: pick,
	};
};
export const setFinished = (finish) => {
	return {
		type: actionTypes.SET_FINISHED,
		finish: finish,
	};
};

export const setRidePath = (path) => {
	return {
		type: actionTypes.RIDE_PATH_INFO,
		distance: path.distance,
		duration: path.duration,
	};
};

export const emptyOrderList = () => {
	return {
		type: actionTypes.EMPTY_ORDER_LIST,
		list: [],
	};
};
