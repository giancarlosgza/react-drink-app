import React from "react";
import DrinkList from "../components/DrinkList";
import SearchForm from "../components/SearchForm";

export default function Home() {
    const [loading, setLoading] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("a");
    const [drinks, setDrinks] = React.useState([]);

    React.useEffect(() => {
        setLoading(true);
        async function getDrinks() {
            try {
                const response = await fetch(
                    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
                );
                const data = await response.json();
                const { drinks } = data;

                if(drinks) {
                    const newDrinks = drinks.map(item => {
                        const {
                            idDrink,
                            strDrink,
                            strDrinkThumb,
                            strAlcoholic,
                            strGlass
                        } = item;

                        return {
                            id: idDrink,
                            name: strDrink,
                            image: strDrinkThumb,
                            info: strAlcoholic,
                            glass: strGlass
                        };
                    });

                    setDrinks(newDrinks);
                } else {
                    setDrinks([]);
                }
            } catch(error) {
                console.log(error);
            }
            setLoading(false);
        }

        getDrinks();
    }, [searchTerm]);
    return (
        <main className="container">
            <SearchForm setSearchTerm={setSearchTerm} />
            <DrinkList drinks={drinks} loading={loading} /> 
        </main>
    );
}