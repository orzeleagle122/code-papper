import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IStarship } from '../../model/IStarship';
import { IWarOpponents } from '../../model/IWarOpponents';

interface IInitialState {
  starship1: IStarship;
  starship2: IStarship;
}

const initialState = {
  starship1: {},
  starship2: {},
} as IInitialState;

export const starshipSlice = createSlice({
  name: 'starships',
  initialState,
  reducers: {
    getStarships: (state, action: PayloadAction<IInitialState>) => {
      return {
        starship1: action.payload.starship1,
        starship2: action.payload.starship2,
      };
    },
  },
});

export default starshipSlice.reducer;
export const { getStarships } = starshipSlice.actions;

//actions

const API = `https://swapi.dev/api/starships/`;

export const getStarshipsAction = () => async (dispatch: Dispatch) => {
  const rollStarships = () => Math.floor(Math.random() * 49) + 2;
  const requestCharacterOne = axios.get(`${API}${rollStarships()}`);
  const requestCharacterTwo = axios.get(`${API}${rollStarships()}`);

  return await axios.all([requestCharacterOne, requestCharacterTwo]).then(
    axios.spread((...response) => {
      const starships = {
        starship1: response[0].data,
        starship2: response[1].data,
      };
      dispatch(starshipSlice.actions.getStarships(starships));
      return {
        opponent1: response[0].data,
        opponent2: response[1].data,
      } as IWarOpponents;
    })
  );
};
