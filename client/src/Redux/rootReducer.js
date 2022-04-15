import {combineReducers} from 'redux'
import userReducer from './auth/authReducer'



const rootReducer = combineReducers({

    user:userReducer,

  
})

export default rootReducer