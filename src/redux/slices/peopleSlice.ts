import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPerson } from '../../model/IPerson';
import {IWarOpponents} from "../../model/IWarOpponents";

interface IInitialState {
  person1: IPerson;
  person2: IPerson;
}

const initialState = {
  person1: {},
  person2: {},
} as IInitialState;

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    getPeople: (state, action: PayloadAction<IInitialState>) => {
      return { person1: action.payload.person1, person2: action.payload.person2 };
    },
  },
});

export default peopleSlice.reducer;
export const { getPeople } = peopleSlice.actions;

//actions

const API = `https://swapi.dev/api/people/`;

export const getPeopleAction = () => async (dispatch: Dispatch) => {
  const rollPeople = () => Math.floor(Math.random() * 83) + 1;
  const requestCharacterOne = axios.get(`${API}${rollPeople()}`);
  const requestCharacterTwo = axios.get(`${API}${rollPeople()}`);

  return await axios
    .all([requestCharacterOne, requestCharacterTwo])
    .then(axios.spread((...response) => {
        const people = {
          person1: response[0].data,
          person2: response[1].data,
        };
        dispatch(peopleSlice.actions.getPeople(people));
        return {
          opponent1: response[0].data,
          opponent2: response[1].data
        } as IWarOpponents;
      })
    )
};
