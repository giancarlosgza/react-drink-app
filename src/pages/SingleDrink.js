import React from "react";
import { useParams, Link } from "react-router-dom";

export default function SingleDrink() {
    const { id } = useParams();
    const [loading, setLoading] = React.useState(false);
    const [drink, setDrink] = React.useState(null);

    React.useEffect(() => {
        setLoading(true);
        async function getDrink(){
            try {
                const response = await fetch(
                    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
                );
                const data = await response.json();
                if (data.drinks) {
                    const {
                        strDrink: name,
                        strDrinkThumb: image,
                        strAlcoholic: info,
                        strCategory: category,
                        strGlass: glass,
                        strInstructions: instructions,
                        strIngredient1,
                        strIngredient2,
                        strIngredient3,
                        strIngredient4,
                        strIngredient5
                    } = data.drinks[0];
                    const ingredients = [
                        strIngredient1,
                        strIngredient2,
                        strIngredient3,
                        strIngredient4,
                        strIngredient5
                    ];
                    const newDrink = {
                        name,
                        image,
                        info,
                        category,
                        glass,
                        instructions,
                        ingredients
                    };
                    setDrink(newDrink);
                } else {
                    setDrink(null);
                }
            } catch (error) {
                console.log(error)
            }
            setLoading(false);
        }
        getDrink();
    }, [id]);
    if(loading) {
        return <h4>Loading</h4>;
    }
    if(!drink) {
        return <h4>No drink to display</h4>;
    } else {
        const {
            name,
            image,
            category,
            info,
            glass,
            instructions,
            ingredients
        } = drink;
        return (
            <div>
                <section className="drink-background" style={{backgroundImage: `url(${image})`}}>
                    <div className="container"> 
                        <div className="row">
                            <div className="col-md-4 pt-3">
                                <Link to="/" className="btn btn-secondary">
                                    <i className="material-icons">chevron_left</i>
                                </Link> 
                            </div>
                            {/* <div className="col-md-12">
                                <img src={image} alt={name} className="img-fluid"></img>
                            </div> */}
                        </div>
                    </div>
                </section>
                <section className="drink-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h4 className="font-weight-bold text-center text-primary mb-5">{name}</h4>
                                <h5 className="font-weight-bold text-left">Overview</h5>
                                <div className="card card-outline my-3">
                                    <div className="card-body">
                                        <p><span className="font-weight-bold body-1">Name:</span> {name}</p>
                                        <p><span className="font-weight-bold body-1">Category:</span> {category}</p>
                                        <p><span className="font-weight-bold body-1">Info:</span> {info}</p>
                                        <p><span className="font-weight-bold body-1">Glass:</span> {glass}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                            <h5 className="font-weight-bold text-left">Instructions</h5>
                                <div className="card card-outline my-3">
                                    <div className="card-body">
                                        <p className="body-1">{instructions}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                            <h5 className="font-weight-bold text-left">Ingredients</h5>
                                <div className="card card-outline my-3">
                                    <div className="card-body">
                                        <p>
                                            {/* List: {" "} */}
                                            {ingredients.map((item, index) => {
                                                return item ? <span key={index}> <br/> <li><a target="_blank" rel="noopener noreferrer" className="body-1 text-capitalize text-secondary"
                                                href={"https://www.google.com/search?q=" + item }>{item}</a></li></span> : null;
                                            })}
                                        </p> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}