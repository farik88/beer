import React, {FC, useEffect, useState} from 'react';
import cl from "../styles/components/BeerList.module.scss"
import BeerListItem from "./BeerListItem";
import {Box, CircularProgress, Grid} from "@mui/material";
import axios, {AxiosError} from "axios";
import {IBeer} from "../types/IBeer";

interface propsBeerList {
  food?: string;
}

const BeerList:FC<propsBeerList> = ({food}) => {
  const [beers, setBeers] = useState<IBeer[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<null|string>(null)
  const [perPage, setPerPage] = useState<number>(10)
  const [page, setPage] = useState<number>(1)

  const fetchBeers = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.get('https://api.punkapi.com/v2/beers', {
        params: {
          page: page,
          per_page: perPage,
          food: food ? food : null,
        }
      })
      setBeers(response.data)
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
    fetchBeers()
  },[perPage, page])


  // const {beers, loading, error, per_page, page} = useTypedSelector(state => state.beerList)

  // console.log('beers')
  // console.log(beers)
  // console.log('loading')
  // console.log(loading)
  // console.log('error')
  // console.log(error)
  // console.log('per_page')
  // console.log(per_page)
  // console.log('page')
  // console.log(page)
  // console.log('****************')

  // useEffect(() => {
  //   console.log(food)
  //   console.log(error)
  //   console.log('***********')
  //   fetchBeerList(page, per_page, (food ? food : ''))
  // }, [page, per_page])

  if (isLoading) {
    return (
      <Grid container justifyContent={"center"}>
        <Box py={2}>
          <CircularProgress/>
        </Box>
      </Grid>
    )
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
    </div>
  );
};

export default BeerList;