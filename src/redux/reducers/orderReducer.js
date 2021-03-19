import * as actionTypes from '../actionTypes';

const initialState = {
	uid: '',
	userData: {
		first_name: '',
		last_name: '',
		mobileNo: '',
		email: '',
	},
	orderList: [],
	order: null,
	pathData: {
		distance: 0,
		duration: 0,
	},
	rideStatus: {
		isPickedUp: false,
		isFinished: false,
	},
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_USER_ID:
			return {
				...state,
				uid: action.uid,
			};
		case actionTypes.SET_ORDER_LIST:
			return {
				...state,
				orderList: action.list,
			};
		case actionTypes.SET_USER_DATA:
			return {
				...state,
				userData: {
					...state.userData,
					first_name: action.fname,
					last_name: action.lname,
					mobileNo: action.mobile,
					email: action.email,
					imgUrl: action.imgUrl,
				},
			};
		case actionTypes.SET_ORDER:
			return {
				...state,
				order: action.order,
			};
		case actionTypes.SET_ORDER_DURATION:
			return {
				...state,
				order: action.order,
			};
		case actionTypes.EMPTY_ORDER_LIST:
			return {
				...state,
				orderList: action.list,
			};
		case actionTypes.EMPTY_ORDER_LIST:
			return {
				...state,
				orderList: action.list,
			};
		case actionTypes.RIDE_PATH_INFO:
			return {
				...state,
				pathData: {
					...state.pathData,
					distance: action.distance,
					duration: action.duration,
				},
			};
		case actionTypes.SET_PICKEDUP:
			console.log(`action`, action);
			return {
				...state,
				rideStatus: {
					...state.rideStatus,
					isPickedUp: action.pick,
				},
			};
		case actionTypes.SET_FINISHED:
			return {
				...state,
				rideStatus: {
					...state.rideStatus,
					isFinished: action.finish,
				},
			};

		default:
			return state;
	}
};
export default userReducer;
