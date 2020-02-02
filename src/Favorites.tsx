import React from 'react';
import * as Interfaces from './Interfaces'
import { Store } from './Store'

export const Favorites: React.FC = (props: any): React.ReactElement => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { state, dispatch }: { state: Interfaces.IState, dispatch: React.Dispatch<Interfaces.IAction> } = React.useContext(Store)
    return (
        <React.Fragment>
            <div className='favorites'>
                <p>Number of Favorites: {state.favorites.length}</p>
                <p>Favorite Episodes: {state.favorites.map((episode: Interfaces.IEpisode) => (`"${episode.name}"`)).join(`, `)}</p>
            </div>
        </React.Fragment>
    )
}