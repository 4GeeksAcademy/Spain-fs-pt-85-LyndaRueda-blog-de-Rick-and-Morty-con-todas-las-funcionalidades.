import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const CharacterDetail = ({ type }) => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadDetail(type, id); // Cargar de flux
    }, [id, type]);

    const data = store.currentDetail;

    return (
        <div className="container mt-5">
            {data ? (
                <div className="text-center">
                    <h1 className="mb-3">{data.name}</h1>
                    {type === "characters" && (
                        <>
                            <img
                                src={data.image}
                                alt={data.name}
                                className="img-fluid mb-4 rounded-circle"
                                style={{ width: "200px", height: "200px", objectFit: "cover" }}
                            />
                            <p><strong>Status:</strong> {data.status}</p>
                            <p><strong>Species:</strong> {data.species}</p>
                            <p><strong>Gender:</strong> {data.gender}</p>
                            <p><strong>Origin:</strong> {data.origin?.name || "Unknown"}</p>
                        </>
                    )}
                    {type === "locations" && (
                        <>
                            <p><strong>Type:</strong> {data.type}</p>
                            <p><strong>Dimension:</strong> {data.dimension}</p>
                            <p><strong>Residents:</strong> {data.residents.length} residents</p>
                        </>
                    )}
                    {type === "episodes" && (
                        <>
                            <p><strong>Episode:</strong> {data.episode}</p>
                            <p><strong>Air Date:</strong> {data.air_date}</p>
                            <p><strong>Characters in Episode:</strong> {data.characters.length}</p>
                        </>
                    )}
                </div>
            ) : (
                <p className="text-center">Loading...</p>
            )}
        </div>
    );
};

export default CharacterDetail;
