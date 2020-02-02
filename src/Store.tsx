import React from 'react';
import * as Interfaces from './Interfaces'

const initialState: Interfaces.IState = {
    episodes: [],
    favorites: []
}

export const Store = React.createContext<Interfaces.IState | any>(initialState)

const throwNever: Function = (errorMessage: string): never => {
    throw new Error(errorMessage)
};

const reducer = (state: Interfaces.IState, action: Interfaces.IAction): Interfaces.IState => {
    switch (action.type) {
        case 'FETCH_DATA':
            return { ...state, episodes: action.payload }
        case 'TOGGLE_FAVORITE':
            return { ...state, favorites: action.payload }
        default:
            throwNever(`hit code that should be unreachable in reducer function's default case`)
    }
    return throwNever()
}

export const StoreProvider: React.FC = (props: any): React.ReactElement => {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    return (<Store.Provider value={{ state, dispatch }}> {props.children}</Store.Provider >)
}

export const StoreConsumer: React.FC = (props: any): React.ReactElement => {
    return <Store.Consumer>{props.children}</Store.Consumer>
}