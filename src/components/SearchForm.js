import React from "react";

export default function SearchForm({ setSearchTerm }) {
    const searchValue = React.useRef("");

    React.useEffect(() => {
        searchValue.current.focus();
    }, []);

    function searchDrink(){
        setSearchTerm(searchValue.current.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div className="row justify-content-center mb-3">
            <div className="col-md-6">
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Search your favorite drink</label>
                    <input
                        className="form-control"
                        type="text"
                        name="name"
                        id="name"
                        ref={searchValue}
                        onChange={searchDrink}
                    />
                </div>
            </form>
            </div>
        </div>
    );
}