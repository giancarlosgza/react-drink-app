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
            <div className="row">
                <div className="col-md-4">
                    <Link to="/" className="btn btn-primary">
                        back home
                    </Link> 
                </div>
                <div className="col-md-12">
                    <img src={image} alt={name}></img>
                    <h3>{name}</h3>
                    <p>name : {name}</p>
                    <p>category: {category}</p>
                    <p>info: {info}</p>
                    <p>glass : {glass}</p>
                    <p>instructions : {instructions}</p>
                    <p>
                    ingredients :{" "}
                    {ingredients.map((item, index) => {
                        return item ? <span key={index}>{item}</span> : null;
                    })}
                    </p> 
                </div>
            </div>
        );
    }
}