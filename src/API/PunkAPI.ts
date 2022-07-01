import axios from "axios";
import {IBeer} from "../types/IBeer";

const punkApiUrl = 'https://api.punkapi.com/v2'

export class PunkAPI {
  static async load(page: number, perPage: number, food: string|undefined):Promise<IBeer[]> {
    const response = await axios.get(punkApiUrl + '/beers', {
      params: {
        page: page,
        per_page: perPage,
        food: food ? food : null,
      }
    })
    return response.data
  }
}
