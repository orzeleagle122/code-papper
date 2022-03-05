import React, { useEffect, useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './redux/store';
import { getPeopleAction } from './redux/slices/peopleSlice';
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { theme } from './theme';
import { GAME_TYPE } from './model/GAME_TYPE';
import GameSettings from './components/GameSettings';
import { PEOPLE_WIN_CONDITION } from './model/PEOPLE_WIN_CONDITION';
import { STARSHIP_WIN_CONDITION } from './model/STARSHIP_WIN_CONDITION';
import { getStarshipsAction } from './redux/slices/starshipsSlice';
import { IWarOpponents } from './model/IWarOpponents';
import { OpponentCard } from './components/OpponentCard';
import { IPerson } from './model/IPerson';
import { IStarship } from './model/IStarship';

function App() {
  const person1 = useAppSelector((state) => state.people.person1);
  const person2 = useAppSelector((state) => state.people.person2);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [winner, setWinner] = useState<string>('');
  const [gameType, setGameType] = useState<GAME_TYPE>(GAME_TYPE.PEOPLE);
  const [winCondition, setWinCondition] = useState<
    PEOPLE_WIN_CONDITION | STARSHIP_WIN_CONDITION
  >(PEOPLE_WIN_CONDITION.MASS);
  const [warOpponents, setWarOpponents] = useState<IWarOpponents>({
    opponent1: person1,
    opponent2: person2,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    setWarOpponentsByGameType();
  }, [gameType]);

  const processGame = () => {
    if (winner) {
      setIsLoading(true);
      setWinner('');
      setWarOpponentsByGameType();
      return;
    }
    determineWinner();
  };

  const determineWinner = () => {
    let choosenWinCondition: PEOPLE_WIN_CONDITION | STARSHIP_WIN_CONDITION;
    let opponentProperty1;
    let opponentProperty2;
    let opponentProperty1Value: number;
    let opponentProperty2Value: number;
    if (gameType === GAME_TYPE.PEOPLE) {
      choosenWinCondition = winCondition as PEOPLE_WIN_CONDITION;
      opponentProperty1 = warOpponents.opponent1 as IPerson;
      opponentProperty2 = warOpponents.opponent2 as IPerson;
      opponentProperty1Value = parseFloat(
        opponentProperty1[choosenWinCondition]
      );
      opponentProperty2Value = parseFloat(
        opponentProperty2[choosenWinCondition]
      );
    } else {
      choosenWinCondition = winCondition as STARSHIP_WIN_CONDITION;
      opponentProperty1 = warOpponents.opponent1 as IStarship;
      opponentProperty2 = warOpponents.opponent2 as IStarship;
      opponentProperty1Value = parseFloat(
        opponentProperty1[choosenWinCondition]
      );
      opponentProperty2Value = parseFloat(
        opponentProperty2[choosenWinCondition]
      );
    }

    if (isNaN(opponentProperty1Value) && isNaN(opponentProperty2Value))
      setWinner('not resolved');
    else if (isNaN(opponentProperty1Value) && !isNaN(opponentProperty2Value))
      setWinner(opponentProperty2.name);
    else if (!isNaN(opponentProperty1Value) && isNaN(opponentProperty2Value))
      setWinner(opponentProperty1.name);
    else if (opponentProperty1Value > opponentProperty2Value)
      setWinner(opponentProperty1.name);
    else if (opponentProperty1Value < opponentProperty2Value)
      setWinner(opponentProperty2.name);
    else setWinner('draw');
  };

  const handleGameTypeChange = (gameType: GAME_TYPE) => {
    if (gameType === GAME_TYPE.PEOPLE) {
      setWinCondition(PEOPLE_WIN_CONDITION.MASS);
    } else if (gameType === GAME_TYPE.STARSHIP) {
      setWinCondition(STARSHIP_WIN_CONDITION.CREW);
    }
    setGameType(gameType);
    setWinner('');
  };

  const setWarOpponentsByGameType = async () => {
    let breakLoop = false;
    // niektóre id statków zwracają 404, ponawiam request dopóki nie dostanę wyników
    while (!breakLoop) {
      if (gameType === GAME_TYPE.PEOPLE) {
        await dispatch(getPeopleAction())
          .then((opponents) => {
            setWarOpponents({
              opponent1: opponents.opponent1,
              opponent2: opponents.opponent2,
            });
            breakLoop = true;
          })
          .catch((err) => {});
      } else if (gameType === GAME_TYPE.STARSHIP) {
        await dispatch(getStarshipsAction())
          .then((opponents) => {
            setWarOpponents({
              opponent1: opponents.opponent1,
              opponent2: opponents.opponent2,
            });
            breakLoop = true;
          })
          .catch((err) => {});
      }
    }
    setIsLoading(false);
  };

  const handleWinConditionChange = (
    winCondition: PEOPLE_WIN_CONDITION | STARSHIP_WIN_CONDITION
  ) => {
    setWinCondition(winCondition);
    setWinner('');
  };

  const winnerColor = (teamName: string) => {
    if (!winner) return 'none';
    else if (winner === 'not resolved' || winner === 'draw') return 'grey';
    else if (winner === teamName) return 'green';
    else if (winner !== teamName) return 'red;';
    return 'none';
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Typography gutterBottom variant="h1">
          Star Wars
        </Typography>
        <GameSettings
          handleGameTypeChange={handleGameTypeChange}
          gameType={gameType}
          handleWinConditionChange={handleWinConditionChange}
          winCondition={winCondition}
        />
        <Grid container spacing={2}>
          <Grid item lg={5} xs={12} sm={5}>
            <OpponentCard
              gameType={gameType}
              opponentProperty={warOpponents.opponent1}
              winner={winner}
            />
          </Grid>
          <Grid
            item
            lg={2}
            xs={12}
            sm={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h1">VS.</Typography>
          </Grid>
          <Grid item lg={5} xs={12} sm={5}>
            <OpponentCard
              gameType={gameType}
              opponentProperty={warOpponents.opponent2}
              winner={winner}
            />
          </Grid>
        </Grid>
        The winner is: {winner}
        <br />
        <Button variant="outlined" disabled={isLoading} onClick={processGame}>
          {winner ? 'New game' : 'start Game'}
        </Button>
      </Container>
    </ThemeProvider>
  );
}

export default App;
