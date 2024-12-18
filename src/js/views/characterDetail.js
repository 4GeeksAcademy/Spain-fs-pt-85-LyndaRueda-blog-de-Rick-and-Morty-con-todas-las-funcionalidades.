import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CharacterDetail = ({ type }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getApiUrl = (type, id) => {
        switch (type) {
            case "characters":
                return `https://rickandmortyapi.com/api/character/${id}`;
            case "locations":
                return `https://rickandmortyapi.com/api/location/${id}`;
            case "episodes":
                return `https://rickandmortyapi.com/api/episode/${id}`;
            default:
                throw new Error("Invalid type");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const url = getApiUrl(type, id);
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, type]);

    return (
        <div className="container mt-5">
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : error ? (
                <p className="text-center text-danger">{error}</p>
            ) : data ? (
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
                <p className="text-center">No data found.</p>
            )}
        </div>
    );
};

export default CharacterDetail;
