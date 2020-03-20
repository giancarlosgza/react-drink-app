import React from "react";
import Drink from "./Drink";

export default function DrinkList({ drinks, loading }) {
    if (loading) {
        return <h4 className="text-primary text-center">Loading...</h4>;
    }
    if (drinks.length < 1) {
        return (
            <h5 className="text-muted text-center">
                No drinks matched with your search criteria
            </h5>
        );
    }
    return (
        <div className="row">
            {drinks.map(item => {
                return <Drink key={item.id} {...item} />;
            })}
        </div>
    );
}