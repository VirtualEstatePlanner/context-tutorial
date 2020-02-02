import React from 'react';
import * as Interfaces from './Interfaces';
import { Store } from './Store';

/**
 * creates an episode box functional component
 * @param props any props passed through the component tree
 * @param episode an IEpisode to populate the component's data
 */
export const Episode: React.FC = (props: any, episode: Interfaces.IEpisode): React.ReactElement => {
    const { state, dispatch }: { state: Interfaces.IState, dispatch: React.Dispatch<Interfaces.IAction> } = React.useContext(Store)

    /**
     * toggles an episode to generate a new favorites Interfaces.IEpisode[]
     * @param episode the IEpisode to be toggled
     */
    const toggleFavAction: Function = (episode: Interfaces.IEpisode): void => {

        const episodeInFav: boolean = state.favorites.includes(episode)

        if (episodeInFav) {
            const favoritesWithoutEpisode: Interfaces.IEpisode[] = state.favorites.filter((favEp: Interfaces.IEpisode) => favEp.id !== episode.id)
            console.log(`reduced state: toggled "${episode.name}" into Favorites`)
            return dispatch({
                type: 'TOGGLE_FAVORITE',
                payload: favoritesWithoutEpisode
            })
        } else {
            console.log(`reduced state: toggled "${episode.name}" out of Favorites`)
            return dispatch({
                type: 'TOGGLE_FAVORITE',
                payload: [...state.favorites, episode]
            })
        }
    }

    return (
        <React.Fragment>
            <section className='episode-box'>
                <img src={episode.image.medium} alt={`LOST ${episode.name}`} />
                <section className='getcentered'>
                    <p>{episode.name}</p>
                    <p />
                    <p>S: {episode.season} E: {episode.number}</p>
                    <button className='toggler' type='button' onClick={() => toggleFavAction(episode)}>
                        {
                            state.favorites.find(
                                (fav: Interfaces.IEpisode) => fav.id === episode.id
                            ) ? 'Remove' : 'Add'
                        }
                    </button>
                    <p />
                </section>
                <section className='summary'>
                    <div><p>{episode.summary}</p></div>
                </section>
            </section>
        </React.Fragment >
    )
}