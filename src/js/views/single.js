import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const Single = ({ type }) => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const { actions } = useContext(Context);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://www.swapi.tech/api/${type}/${id}`);
            const data = await response.json();
            setItem(data.result);
        };

        fetchData();
    }, [type, id]);

    return (
        <div className="container mt-5">
            {item ? (
                <div>
                    <h1>{item.properties.name}</h1>
                    <p><strong>Description:</strong> {item.description}</p>
                    <ul>
                        {Object.entries(item.properties).map(([key, value]) => (
                            <li key={key}><strong>{key}:</strong> {value}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Single;
