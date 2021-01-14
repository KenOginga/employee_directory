import React from "react";
import "./style.css"

function Header(props){
    return (
    <div className="jumbotron text-center">
        <h1 className="display-4">Employee Directory</h1>
        <div className="container text-center">
                <div className="searchInput">
                    <input
                        type="text"
                        onChange={props.handleInputChange}
                        value={props.value}
                        name="search"
                        className="inputBox input-group"
                        placeholder="Search by name"
                    />
                </div>
            <div className="mt-2">
                <button
                className="button"
                value=""
                onClick={props.handleSearch}
                >Search</button>
            </div>
        </div> 
    </div>
    );
};

export default Header