import { combineReducers } from "redux";

const initialState = {
    message: "",
    checkLoggedIn: false
};

function ModuleReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case "MESSAGE":
            return { ...state, message: payload }
        case "CHECKLOGGEDIN":
            return { ...state, checkLoggedIn: payload }

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    moduleData: ModuleReducer
});

export default rootReducer;