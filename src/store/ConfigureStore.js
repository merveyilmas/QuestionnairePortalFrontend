import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk" 
import rootReducer from "./RootReducer";
//import { devToolsEnhancer } from "redux-devtools-extension";

export function configureStore(){

    return createStore(rootReducer, applyMiddleware(thunk))

    //devToolsEnhancer() chrome da redux devtool eklentisini kullanmayı sağlar.
}