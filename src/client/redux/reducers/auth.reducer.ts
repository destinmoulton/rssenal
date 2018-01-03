import { IAuthAction, IReducerStateAuth } from "../../interfaces";

const INITIAL_STATE: IReducerStateAuth = {
    isAuthorized: false,
    jwtSecret: ""
};

const authReducer = (state = INITIAL_STATE, action: IAuthAction) => {
    switch (action.type) {
        default:
            return { ...state };
    }
};

export default authReducer;
