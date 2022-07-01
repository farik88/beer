import React, {FC, useEffect, useState} from 'react';
import cl from "../styles/components/BeerList.module.scss"
import BeerListItem from "./BeerListItem";
import {Box, Button, CircularProgress, Divider, Grid} from "@mui/material";
import axios from "axios";
import {IBeer} from "../types/IBeer";
import {PunkAPI} from "../API/PunkAPI";
import BeerListSort from "./BeerListSort";

export enum BeerListSorts {
  ABV = "ABV",
  NAME = "NAME"
}

interface propsBeerList {
  food?: string;
}

export interface ISort {
  sortBy: null|string;
  mode: "ASC"|"DESC";
}

const BeerList:FC<propsBeerList> = ({food}) => {
  const [beers, setBeers] = useState<IBeer[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<null|string>(null)
  const [perPage] = useState<number>(9)
  const [page, setPage] = useState<number>(1)
  const [isHasMore, setIsHasMore] = useState<boolean>(true)
  const [sort, setSort] = useState<ISort>({sortBy: null, mode: 'ASC'})

  const fetchBeers = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const loadedBeers = await PunkAPI.load(page, perPage, food)
      const newBeers = getSortedBeers([...beers, ...loadedBeers])
      setBeers(newBeers)
      if (loadedBeers.length < perPage) {
        setIsHasMore(false)
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e.message)
      } else {
        setError('Loading data error')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const getSortedBeers = (beers: IBeer[]) => {
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

  useEffect(() => {
    setBeers(getSortedBeers(beers))
  }, [sort])

  useEffect(() => {
    fetchBeers()
  },[perPage, page])

  if (error) {
    return (
      <Grid container justifyContent={"center"}>
        <Box py={2}>
          <h2>{error}</h2>
        </Box>
      </Grid>
    )
  }

  return (
    <div className={cl.list}>
      <Grid container justifyContent={"end"}>
        <BeerListSort sort={sort} setSort={setSort}/>
      </Grid>
      <Box my={2}>
        <Divider />
      </Box>
      <div className={cl.list__inner}>
        {beers.map(beer => <BeerListItem key={beer.id} beer={beer}/>)}
      </div>
      {(isHasMore && !isLoading) &&
      <Grid container justifyContent={"center"}>
        <Box pt={4} pb={2}>
          <Button variant={"contained"} color={"primary"} onClick={() => setPage(prev => prev + 1)}>Load more</Button>
        </Box>
      </Grid>
      }
      {isLoading &&
        <Grid container justifyContent={"center"}>
          <Box py={2}>
            <CircularProgress/>
          </Box>
        </Grid>
      }
    </div>
  );
};

export default BeerList;