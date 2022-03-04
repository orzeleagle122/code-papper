import {Action, createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {DispatchProp} from "react-redux";
import axios from "axios";


interface ITeam {
    birth_year: string,
    eye_color: string,
    films: string[],
    gender: string,
    hair_color: string,
    height: string,
    homeworld: string,
    mass: string,
    name: string,
    skin_color: string,
    created: string,
    edited: string,
    species: string[],
    starships: string[],
    url: string,
    vehicles: string[],
}

interface IGetTeam {
    type: string,
    payload: ITeam,
}

interface IInitialState {
    team1: ITeam,
    team2: ITeam,
}

const initialState = {
    team1: {},
    team2: {}
} as IInitialState;

export const warsSlice = createSlice({
    name: 'battle',
    initialState,
    reducers: {
        getTeam1: (state, action: PayloadAction<IInitialState>) => {
            return {team1: action.payload.team1, team2:action.payload.team2}
        },

    }
});

export default warsSlice.reducer;
export const {getTeam1} = warsSlice.actions;

//actions

const API = `https://swapi.dev/api/people/`;

export const getTeam1Action = () => async (dispatch: Dispatch) => {

    const rollPeople = () => Math.floor(Math.random() * 83) + 1;

    const people1 = await axios.get(`${API}${rollPeople()}`);
    const people2 = await axios.get(`${API}${rollPeople()}`);

    const people = {
        team1: await people1.data,
        team2: await people2.data
    }

    dispatch(warsSlice.actions.getTeam1(people))
}

