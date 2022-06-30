import React from 'react';
import cl from "../styles/components/BeerListItem.module.scss"
import {IBeer} from "../types/IBeer";
import {Card} from "@mui/material";
import ClampLines from 'react-clamp-lines';

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
        <h2 className={cl.item__title}>{beer.name}</h2>
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
      <div className={cl.item__descSection}>
        <ClampLines
          text={beer.description}
          id={"clamp_beer_desc_" + beer.id}
          lines={1.9}
          ellipsis="..."
          moreText="More"
          lessText="Less"
          className={cl.clampContent}
          innerElement="p"
        />
      </div>
      <div className={cl.item__foodSection}>
        <h3 className={cl.item__subTitle}>
          Taste with:
        </h3>
        <ClampLines
          text={beer.food_pairing.join('. ')}
          id={"clamp_beer_food_" + beer.id}
          lines={1}
          ellipsis="..."
          moreText="More"
          lessText="Less"
          className={cl.clampContent}
          innerElement="p"
        />
      </div>
    </Card>
  );
};

export default BeerListItem;