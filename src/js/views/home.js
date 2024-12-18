import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Card from "../component/card";

function Home() {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadEntities();
        actions.loadLocations();
        actions.loadEpisodes();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Characters</h2>
            <div className="scroll-container">
                {store.characters.map((character) => (
                    <Card key={character.id} entity={character} type="characters" />
                ))}
            </div>

            <h2 className="mb-3 mt-5">Locations</h2>
            <div className="scroll-container">
                {store.locations.map((location) => (
                    <Card key={location.id} entity={location} type="locations" />
                ))}
            </div>

            <h2 className="mb-3 mt-5">Episodes</h2>
            <div className="scroll-container">
                {store.episodes.map((episode) => (
                    <Card key={episode.id} entity={episode} type="episodes" />
                ))}
            </div>
        </div>
    );
}

export default Home;
