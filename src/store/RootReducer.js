import { combineReducers } from "redux";
import {loginReducer} from "./reducers/LoginReducer";


//tüm state lerin toplandığı yer
//redux ta hazır olan bir fonksiyon var bunun için "combineReducers"
const rootReducer = combineReducers({    
    login: loginReducer,  
    //user : userReducer   -> gibi mesela
})
export default rootReducer;