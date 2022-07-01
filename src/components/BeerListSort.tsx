import {Button, ButtonGroup, Tooltip} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ClearIcon from '@mui/icons-material/Clear';
import React, {Dispatch, FC, SetStateAction} from 'react';
import {IBeer} from "../types/IBeer";

interface BeerListSortProps {
  sort: ISort,
  setSort: Dispatch<SetStateAction<ISort>>
}

export interface ISort {
  sortBy: null|string;
  mode: "ASC"|"DESC";
}

export enum BeerListSorts {
  ABV = "ABV",
  NAME = "NAME"
}

export const getSortedBeers = (beers: IBeer[], sort:ISort) => {
  switch (sort.sortBy) {
    case BeerListSorts.NAME:
      // Sort by beer name
      return [...beers].sort((a, b) => {
        let nameA = a.name.toLowerCase()
        let nameB = b.name.toLowerCase()

        if (sort.mode === "ASC") {
          if (nameA < nameB) {return -1}
          if (nameA > nameB) {return 1}
        }

        if (sort.mode === "DESC") {
          if (nameA < nameB) {return 1}
          if (nameA > nameB) {return -1}
        }

        return 0
      })
    case BeerListSorts.ABV:
      // Sort by beer ABV
      return [...beers].sort((a, b) => {
        if (sort.mode === "ASC") {
          if (a.abv < b.abv) {return -1}
          if (a.abv > b.abv) {return 1}
        }

        if (sort.mode === "DESC") {
          if (a.abv < b.abv) {return 1}
          if (a.abv > b.abv) {return -1}
        }

        return 0
      })
    default:
      // Sort by id (default sort)
      return [...beers].sort((a, b) => {
        return a.id > b.id ? 1 : (b.id > a.id ? -1 : 0)
      })
  }
}

const BeerListSort:FC<BeerListSortProps> = ({sort, setSort}) => {
  const sortByABVHandler = () => {
    setSort({
      sortBy: BeerListSorts.ABV,
      mode: sort.sortBy !== BeerListSorts.ABV ? 'DESC': (sort.mode === 'ASC' ? 'DESC' : 'ASC')
    })
  }

  const sortByNameHandler = () => {
    setSort({
      sortBy: BeerListSorts.NAME,
      mode: sort.sortBy !== BeerListSorts.NAME ? 'DESC': (sort.mode === 'ASC' ? 'DESC' : 'ASC')
    })
  }

  const clearSortHandler = () => {
    setSort({
      sortBy: null,
      mode: 'ASC'
    })
  }

  return (
    <div>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button onClick={sortByNameHandler} size={"small"} variant={sort.sortBy === BeerListSorts.NAME ? "contained" : "outlined"}>
          Name {sort.sortBy === BeerListSorts.NAME && sort.mode === 'DESC' ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
        </Button>
        <Button onClick={sortByABVHandler} size={"small"} variant={sort.sortBy === BeerListSorts.ABV ? "contained" : "outlined"}>
          ABV {sort.sortBy === BeerListSorts.ABV && sort.mode === 'DESC' ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
        </Button>
        <Tooltip title="Reset sort" >
          <Button onClick={clearSortHandler} size={"small"} variant={"text"} color={"inherit"}>
            <ClearIcon/>
          </Button>
        </Tooltip>
      </ButtonGroup>
    </div>
  );
};

export default BeerListSort;
