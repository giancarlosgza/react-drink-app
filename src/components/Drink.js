import React from "react";
import { Link } from "react-router-dom";

export default function Drink({ image, name, id, info, glass }){
    return (
        <div className="col-md-3">
            <div className="card mb-3">
                <img className="card-img-top" src={image} alt={name}></img>
                <div className="card-body">
                    <h6>{name}</h6>
                    <h6>{glass}</h6>
                    <p className="text-primary">{info}</p>
                    <Link to={`/drink/${id}`} className="btn btn-primary">
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
}