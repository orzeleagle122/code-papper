import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./redux/store";
import {getTeam1Action} from "./redux/slices/warsSlice";

function App() {

    const team1 = useAppSelector(state => state.wars.team1);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTeam1Action());
    }, [])

    return (
        <div className="App">
            Lorem ipsum
        </div>
    );
}

export default App;
