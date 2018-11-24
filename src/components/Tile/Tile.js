import React from "react";
import "./Tile.css";

const Tile = props => (
  <div className="tile" onClick={() => props.handleClick(props.id)}>
    <div className="img-container">
      <img alt={props.name} src={props.image} />
    </div>
  </div>
);

export default Tile;
