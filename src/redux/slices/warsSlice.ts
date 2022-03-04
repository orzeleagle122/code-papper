import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ITeam } from '../../model/ITeam';

interface IInitialState {
  team1: ITeam;
  team2: ITeam;
}

const initialState = {
  team1: {},
  team2: {},
} as IInitialState;

export const warsSlice = createSlice({
  name: 'battle',
  initialState,
  reducers: {
    getCharacters: (state, action: PayloadAction<IInitialState>) => {
      return { team1: action.payload.team1, team2: action.payload.team2 };
    },
  },
});

export default warsSlice.reducer;
export const { getCharacters } = warsSlice.actions;

//actions

const API = `https://swapi.dev/api/people/`;

export const getTeam1Action = () => async (dispatch: Dispatch) => {
  const rollPeople = () => Math.floor(Math.random() * 83) + 1;
  const requestCharacterOne = axios.get(`${API}${rollPeople()}`);
  const requestCharacterTwo = axios.get(`${API}${rollPeople()}`);

  return await axios
    .all([requestCharacterOne, requestCharacterTwo])
    .then(
      axios.spread((...response) => {
        const people = {
          team1: response[0].data,
          team2: response[1].data,
        };
        dispatch(warsSlice.actions.getCharacters(people));
      })
    )
    .catch((err) => {});
};
