import {IBeer} from "./IBeer";

// ACTION TYPES
export enum BeerListActionTypes {
  FETCH_BEER = 'FETCH_BEER',
  FETCH_BEER_SUCCESS = 'FETCH_BEER_SUCCESS',
  FETCH_BEER_ERROR = 'FETCH_BEER_ERROR',
  SET_BEER_PAGE = 'SET_BEER_PAGE'
}

// INTERFACES
export interface BeerListState {
  beers: IBeer[];
  loading: boolean;
  error: null | string;
  page: number;
  per_page: number;
}

interface FetchBeerListAction {
  type: BeerListActionTypes.FETCH_BEER
}

interface FetchBeerListSuccessAction {
  type: BeerListActionTypes.FETCH_BEER_SUCCESS
  payload: IBeer[]
}

interface FetchBeerListErrorAction {
  type: BeerListActionTypes.FETCH_BEER_ERROR
  payload: string
}

interface SetBeerListPageAction {
  type: BeerListActionTypes.SET_BEER_PAGE
  payload: number
}

export type BeerListAction = FetchBeerListAction | FetchBeerListSuccessAction | FetchBeerListErrorAction | SetBeerListPageAction
