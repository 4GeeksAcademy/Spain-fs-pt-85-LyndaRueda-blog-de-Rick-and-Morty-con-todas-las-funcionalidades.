import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { store, actions } = useContext(Context);
    const [search, setSearch] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearch(query);

        if (query.trim() === "") {
            setFilteredResults([]);
        } else {
            const results = store.characters.filter((character) =>
                character.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredResults(results);
        }
    };

    const handleSelectCharacter = (id) => {
        navigate(`/characters/${id}`);
        setSearch("");
        setFilteredResults([]);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar navbar-dark bg-dark p-3">
            <div className="container d-flex justify-content-between align-items-center">
                <a className="navbar-brand" href="/">
                    <img
                        src="https://cdn-images.dzcdn.net/images/cover/38a217cfce1bfafa00bec80dcbc5d8cb/500x500.jpg"
                        alt="Logo"
                        width="120"
                        className="d-inline-block align-top"
                    />
                </a>

                <div className="position-relative w-50">
                    <input
                        type="text"
                        className="form-control rounded-pill px-3"
                        placeholder="Search characters..."
                        value={search}
                        onChange={handleSearch}
                    />
                    {filteredResults.length > 0 && (
                        <ul
                            className="list-group position-absolute w-100 mt-1"
                            style={{
                                zIndex: 1000,
                                maxHeight: "200px",
                                overflowY: "auto",
                                backgroundColor: "#fff",
                            }}
                        >
                            {filteredResults.map((character) => (
                                <li
                                    key={character.id}
                                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                                    onClick={() => handleSelectCharacter(character.id)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {character.name}
                                    <span className="badge bg-primary rounded-pill">Details</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="dropdown ml-3">
                    <button
                        className="btn btn-warning dropdown-toggle"
                        type="button"
                        onClick={toggleDropdown}
                        aria-expanded={isOpen}
                    >
                        Favorites ({store.favorites.length})
                    </button>

                    {isOpen && (
                        <ul
                            className="dropdown-menu dropdown-menu-end show mt-2"
                            style={{ right: 0, left: "auto" }}
                        >

                            {store.favorites.length > 0 ? (
                                store.favorites.map((item, index) => (
                                    <li
                                        key={index}
                                        className="dropdown-item d-flex justify-content-between align-items-center"
                                    >
                                        <span className="text-truncate" style={{ maxWidth: "150px" }}>
                                            {item.name}
                                        </span>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => actions.removeFromFavorites(item.id)}
                                        >
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <li className="dropdown-item text-muted">No favorites added yet</li>
                            )}
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
