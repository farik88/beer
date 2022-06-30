import React, {FC, useEffect, useState} from 'react';
import cl from "../styles/components/BeerList.module.scss"
import BeerListItem from "./BeerListItem";
import {Box, Button, CircularProgress, Grid, Pagination} from "@mui/material";
import axios from "axios";
import {IBeer} from "../types/IBeer";
import {PunkAPI} from "../API/PunkAPI";

interface propsBeerList {
  food?: string;
}

const BeerList:FC<propsBeerList> = ({food}) => {
  const [beers, setBeers] = useState<IBeer[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<null|string>(null)
  const [perPage] = useState<number>(9)
  const [page, setPage] = useState<number>(1)
  const [isHasMore, setIsHasMore] = useState<boolean>(true)

  const fetchBeers = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const loadedBeers = await PunkAPI.load(page, perPage, food)
      setBeers([...beers, ...loadedBeers])

      console.log(loadedBeers.length)
      console.log(perPage)
      console.log(loadedBeers.length < perPage)
      console.log('************')
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

  useEffect(() => {
    fetchBeers() // eslint-disable-next-line
  },[perPage, page])

  const paginationHandler = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log('paginationHandler')
    console.log(event)
    console.log(page)
  }

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