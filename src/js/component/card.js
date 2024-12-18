import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Card = ({ entity, type }) => {
    const { store, actions } = useContext(Context);
    const isFavorite = store.favorites.some(fav => fav.id === entity.id && fav.type === type);
    const formatEpisodes = (episodes) => {
        if (Array.isArray(episodes)) {
            return episodes
                .map(url => url.split("/").pop()) 
                .slice(0, 5)
                .join(", ");
        }
        return "N/A";
    };

    return (
        <div className="card m-2 shadow-sm" style={{ width: "18rem" }}>
            {entity.image && (
                <img
                    src={entity.image}
                    className="card-img-top"
                    alt={entity.name || "Entity"}
                    style={{ height: "200px", objectFit: "cover" }}
                />
            )}

            <div className="card-body">
                <h5 className="card-title">{entity.name}</h5>
                {entity.status && <p className="card-text"><strong>Status:</strong> {entity.status}</p>}
                {entity.species && <p className="card-text"><strong>Species:</strong> {entity.species}</p>}
                {entity.type && <p className="card-text"><strong>Type:</strong> {entity.type}</p>}
                {entity.dimension && <p className="card-text"><strong>Dimension:</strong> {entity.dimension}</p>}
            
                {entity.episode && (
                    <p className="card-text">
                        <strong>Episodes:</strong> {formatEpisodes(entity.episode)}
                    </p>
                )}

                <Link to={`/${type}/${entity.id}`} className="btn btn-primary btn-sm me-2">
                    Learn More
                </Link>

                <button
                    onClick={() => actions.addToFavorites({ ...entity, type })}
                    className={`btn btn-sm ${isFavorite ? "btn-secondary" : "btn-warning"}`}
                    disabled={isFavorite}
                >
                    {isFavorite ? "❤ In Favorites" : "❤ Add to Favorites"}
                </button>
            </div>
        </div>
    );
};

export default Card;

