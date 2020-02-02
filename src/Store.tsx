import React from 'react';
import * as Interfaces from './Interfaces'

const fetchDataAction: Function = async (): Promise<Interfaces.IEpisode[]> => {
    const JSONDATA: Interfaces.IEpisode[] =
        await (await (await (fetch(`https://api.tvmaze.com/singlesearch/shows?q=lost&embed=episodes`))).json())._embedded.episodes
    const cleanupSummaries: Function = async (episodes: Interfaces.IEpisode[]): Promise<Interfaces.IEpisode[]> =>
        episodes.map((episodeToCleanup: Interfaces.IEpisode) => {
            const newSummary = episodeToCleanup.summary.substring(0, episodeToCleanup.summary.length - 1).substring(3, episodeToCleanup.summary.length - 4)
            return {
                ...episodeToCleanup,
                summary: newSummary
            }
        })
    let result = await cleanupSummaries(JSONDATA)
    return result
}


const results = (): Interfaces.IState => {
    let newState: Interfaces.IState = {
        episodes: [],
        favorites: []
    }

    try {
        const output: Interfaces.IEpisode[] = fetchDataAction()
        console.log(output)
        newState = {
            episodes: output,
            favorites: []
        }
        console.log(newState)
        return newState
    } catch (e) {
    }

    return newState
}

console.log(results())

let initialState: Interfaces.IState = {
    episodes: [],
    favorites: []
}

export const Store = React.createContext<Interfaces.IState | any>(results)

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