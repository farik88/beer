import React from 'react';
import cl from "../styles/components/BeerListItem.module.scss"
import {IBeer} from "../types/IBeer";
import {Card} from "@mui/material";

interface BeerListItemProps {
  beer: IBeer
}

const BeerListItem = ({beer}: BeerListItemProps) => {
  return (
    <Card className={cl.item}>
      <div className={cl.item__imgSection}>
        <img src={beer.image_url !== null ? beer.image_url : '/def_bottle.png'} alt={beer.name + '_image'} />
      </div>
      <div className={cl.item__infoSection}>
        <h2 className={cl.item__beerName}>{beer.name}</h2>
        <div className={cl.item__taglineBlock}>
          <span className={cl.item__taglineText}>
            {beer.tagline}
          </span>
        </div>
        <div className={cl.item__abvBlock}>
          <span className={cl.item__abvText}>
            ABV: {beer.abv}
          </span>
        </div>
      </div>
      <div>
        {beer.description}
      </div>
      <hr/>
      <div>
        {beer.food_pairing.join('. ')}
      </div>
    </Card>
  );
};

export default BeerListItem;