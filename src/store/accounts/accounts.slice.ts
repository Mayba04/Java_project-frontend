import {AnyAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';
import {RejectedAction} from "../../utils/types/redux";
import {IAccountState, IUser} from "../../interfaces/account";
import {addLocalStorage, deleteLocalStorage} from "../../utils/storage/lacalStorageUtlis.ts";
import {Status} from "../../utils/enums";
import {login} from "./accounts.actions.ts";
import http_common from "../../http_common.ts";

function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith('/rejected');
}
const updateUserState = (state: IAccountState, token: string): void => {
    const { name, email, image } = jwtDecode<IUser>(token);
    state.user = {
        name,
        email,
        image,
    };
    state.token = token;
    state.isLogin = true;

    addLocalStorage('authToken', token);
    http_common.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

//state - нашого редюсера
const initialState: IAccountState = {
    user: null,
    token: null,
    isLogin: false,
    status: Status.IDLE,
};

export const accountsSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        //Залогінити користувача
        autoLogin: (state, action: PayloadAction<string>) => {
            updateUserState(state, action.payload);
        },
        //провести вихід із системи
        logout: (state) => {
            deleteLocalStorage('authToken');
            state.user = null;
            state.token = null;
            state.isLogin = false;
        },
    },
    extraReducers: (builder) => {
        builder
            //команда завершена - логінимо користувача
            .addCase(login.fulfilled, (state, action) => {
                const {token} = action.payload;
                updateUserState(state, token);
                state.status = Status.SUCCESS;
            })
            //режим очікування
            .addCase(login.pending, (state) => {
                state.status = Status.LOADING;
            })
            //якщо щось пішло не так
            .addMatcher(isRejectedAction, (state) => {
                state.status = Status.ERROR;
            });
    },
});

export const { autoLogin, logout } = accountsSlice.actions;
export default accountsSlice.reducer;