const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            favorites: JSON.parse(localStorage.getItem("favorites")) || [],
            characters: [],
            locations: [],
            episodes: [],
        },
        actions: {
            loadEntities: async () => {
                try {
                    const response = await fetch("https://rickandmortyapi.com/api/character");
                    if (!response.ok) throw new Error("Failed to fetch characters");
                    const data = await response.json();
                    setStore({ characters: data.results });
                } catch (error) {
                    console.error("Error loading characters:", error.message);
                }
            },

            loadLocations: async () => {
                try {
                    const response = await fetch("https://rickandmortyapi.com/api/location");
                    if (!response.ok) throw new Error("Failed to fetch locations");
                    const data = await response.json();
                    setStore({ locations: data.results });
                } catch (error) {
                    console.error("Error loading locations:", error.message);
                }
            },

            loadEpisodes: async () => {
                try {
                    const response = await fetch("https://rickandmortyapi.com/api/episode");
                    if (!response.ok) throw new Error("Failed to fetch episodes");
                    const data = await response.json();
                    setStore({ episodes: data.results });
                } catch (error) {
                    console.error("Error loading episodes:", error.message);
                }
            },

            addToFavorites: (entity) => {
                const store = getStore();
                const alreadyExists = store.favorites.some(
                    fav => fav.id === entity.id && fav.type === entity.type
                );
            
                if (!alreadyExists) {
                    const updatedFavorites = [...store.favorites, entity];
                    setStore({ favorites: updatedFavorites });
                    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
                } else {
                    console.log(`${entity.name} is already in your favorites.`);
                    alert(`${entity.name} is already in your favorites!`);
                }
            },

            removeFromFavorites: (id) => {
                const store = getStore();
                const updatedFavorites = store.favorites.filter(fav => fav.id !== id);
                setStore({ favorites: updatedFavorites });
                localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            },
        },
    };
};

export default getState;
