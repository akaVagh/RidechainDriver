import * as actionTypes from '../actionTypes';

const initialState = {
	uid: '',
	userData: {
		first_name: '',
		last_name: '',
		mobileNo: '',
		email: '',
	},
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_USER_ID:
			return {
				...state,
				uid: action.uid,
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

		default:
			return state;
	}
};
export default userReducer;
