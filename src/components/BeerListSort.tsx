import {Button, ButtonGroup, Tooltip} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ClearIcon from '@mui/icons-material/Clear';
import React, {Dispatch, FC, SetStateAction} from 'react';
import {BeerListSorts, ISort} from "./BeerList";

interface BeerListSortProps {
  sort: ISort,
  setSort: Dispatch<SetStateAction<ISort>>
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
