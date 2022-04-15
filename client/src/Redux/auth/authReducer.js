import * as actionTypes from "./authActionTypes";

const initialState = {
  loading: false,
  user:null,
  currentUser:localStorage.getItem('currentUser'),
  error: null,
  token: localStorage.getItem('token'),

};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_START:
    case actionTypes.LOGIN_START:
      return {
        ...state,
        loading: true,
        user:null
      };

    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
    
localStorage.setItem('token',action.payload.token )
localStorage.setItem('currentUser',JSON.stringify(action.payload) )
      return {
        ...state,
        loading: false,
        user:action.payload,
        token:action.payload.token,
        error:null
 
      };
  
    case actionTypes.LOGOUT_SUCCESS:
      localStorage.setItem("currentUser", "")
      return {
        ...state,
        loading: false,
        token:localStorage.setItem("token", ""),
        currentUser:null,
        user:null,
        error:null
     
      };
      case actionTypes.REGISTER_FAIL:
        case actionTypes.LOGOUT_FAIL:
        case actionTypes.LOGIN_FAIL:
        return {
          ...state,
          loading: false,
       error: action.payload,
        };
   
        
    default:
      return state;
  }
};

export default userReducer;
