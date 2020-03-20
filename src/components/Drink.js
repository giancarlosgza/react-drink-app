import React from "react";
import { Link } from "react-router-dom";

export default function Drink({ image, name, id, info, glass }){
    return (
        <div className="col-md-3">
            <div className="card mb-3">
                <img className="card-img-top" src={image} alt={name}></img>
                <div className="card-body">
                    <h6 className="font-weight-bold">{name}</h6>
                    <p className="text-muted">{glass}</p>
                    <p className="text-secondary">{info}</p>
                    <Link to={`/drink/${id}`} className="btn btn-block btn-primary">
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
}