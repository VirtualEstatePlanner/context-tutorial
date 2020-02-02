import React from 'react';
import * as Interfaces from './Interfaces';
import { Store } from './Store';
import { Episode } from './Episode';
import { Favorites } from './Favorites';

export const App: React.FC = (): React.ReactElement => {
    const { state, dispatch }: { state: Interfaces.IState, dispatch: React.Dispatch<Interfaces.IAction> } = React.useContext(Store)

    React.useEffect(() => {

        const fetchDataAction = async () => {
            const JSONDATA: Interfaces.IEpisode[] =
                (await (await (fetch(
                    `https://api.tvmaze.com/singlesearch/shows?q=lost&embed=episodes`)))
                    .json())._embedded.episodes
            const cleanupSummaries: Function = (episodes: Interfaces.IEpisode[]): Interfaces.IEpisode[] =>
                episodes.map((episodeToCleanup: Interfaces.IEpisode) => {
                    return {
                        ...episodeToCleanup,
                        summary: episodeToCleanup.summary
                            .substring(0, episodeToCleanup.summary.length - 1)
                            .substring(3, episodeToCleanup.summary.length - 4)
                    }
                })

            const cleanedEpisodes: Interfaces.IEpisode[] = cleanupSummaries(JSONDATA)
            dispatch({
                type: 'FETCH_DATA',
                payload: cleanedEpisodes
            })
            console.log(`reduced state: fetched state.episodes`)
        }
        fetchDataAction()
        console.log(`ran useEffect`)
    }, [dispatch])

    return (
        <React.Fragment>
            <header className='header'>
                <h1>LOST</h1>
                <div> </div>
                {Favorites({})}
                <div> </div>
            </header>
            <section className='episode-layout'>
                {state.episodes.map((episode: Interfaces.IEpisode) =>
                    <React.Fragment key={episode.id}>{Episode({}, episode)}</React.Fragment>)}
            </section>
        </React.Fragment >
    );
}