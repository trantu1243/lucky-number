import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';


export interface ITelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    photo_url?: string;
}
  
export interface IWebApp {
    initData: string;
    initDataUnsafe: {
        query_id?: string;
        user: ITelegramUser;
        auth_date?: string;
        signature?: string;
        hash?: string;
    };
    version: string;
    platform: string;
    colorScheme: string;
    themeParams: {
        link_color?: string;
        button_color?: string;
        button_text_color?: string;
        secondary_bg_color?: string;
        hint_color?: string;
        bg_color?: string;
        text_color?: string;
    };
    isExpanded: boolean;
    viewportHeight: number;
    viewportStableHeight: number;
    isClosingConfirmationEnabled: boolean;
    headerColor: string;
    backgroundColor: string;
    BackButton: {
        isVisible?: boolean;
    };
    MainButton: {
        text?: string;
        color?: string;
        textColor?: string;
        isVisible?: boolean;
        isProgressVisible?: boolean;
        isActive?: boolean;
    };
    HapticFeedback: any;
}

export interface ITelegramContext {
    webApp?: IWebApp;
    user?: ITelegramUser;
}

const initialState: ITelegramContext =  {};

const webappSlice = createSlice({
    name: 'webapp',
    initialState,
    reducers: {
        setWebApp: (state, action: PayloadAction<IWebApp>) => {
            state.webApp = action.payload;
            state.user = action.payload.initDataUnsafe.user;
        },
    },
});

export const {setWebApp} = webappSlice.actions;

export {webappSlice};

