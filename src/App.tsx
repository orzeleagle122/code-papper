import React, { useEffect, useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './redux/store';
import { getTeam1Action } from './redux/slices/warsSlice';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  CssBaseline,
  Grid,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { theme } from './theme';
import { GameType } from './model/GameType';
import GameSettings from './components/GameSettings';
import { CharacterWinCondition } from './model/CharacterWinCondition';
import { StarshipWinCondition } from './model/StarshipWinCondition';

function App() {
  const team1 = useAppSelector((state) => state.wars.team1);
  const team2 = useAppSelector((state) => state.wars.team2);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [winner, setWinner] = useState<string>();
  const [gameType, setGameType] = useState<GameType>(GameType.CHARACTER);
  const [winCondition, setWinCondition] = useState<
    CharacterWinCondition | StarshipWinCondition
  >(CharacterWinCondition.MASS);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTeam1Action()).finally(() => setIsLoading(false));
  }, []);

  const processGame = () => {
    if (winner) {
      setIsLoading(true);
      setWinner('');
      dispatch(getTeam1Action()).finally(() => setIsLoading(false));
      return;
    }

    const characterOneMass: number | string = parseFloat(team1.mass);
    const characterTwoMass: number | string = parseFloat(team2.mass);

    if (isNaN(characterOneMass) && isNaN(characterTwoMass))
      setWinner('not resolved');
    else if (isNaN(characterOneMass) && !isNaN(characterTwoMass))
      setWinner(team2.name);
    else if (!isNaN(characterOneMass) && isNaN(characterTwoMass))
      setWinner(team1.name);
    else if (characterOneMass > characterTwoMass) setWinner(team1.name);
    else if (characterOneMass < characterTwoMass) setWinner(team2.name);
    else setWinner('draw');
  };

  const handleGameTypeChange = (gameType: GameType) => {
    if (gameType === GameType.CHARACTER)
      setWinCondition(CharacterWinCondition.MASS);
    else if (gameType === GameType.STARSHIP)
      setWinCondition(StarshipWinCondition.CREW);
    setGameType(gameType);
  };
  const handleWinConditionChange = (
    winCondition: CharacterWinCondition | StarshipWinCondition
  ) => setWinCondition(winCondition);

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
          Tytuł
        </Typography>
        <GameSettings
          handleGameTypeChange={handleGameTypeChange}
          gameType={gameType}
          handleWinConditionChange={handleWinConditionChange}
          winCondition={winCondition}
        />
        <Grid container spacing={2}>
          <Grid item lg={5} xs={12} sm={5}>
            <Card sx={{ border: `1px solid ${winnerColor(team1.name)}` }}>
              <CardHeader title={team1.name} />
              <CardContent>
                <p>Birth: {team1.birth_year}</p>
                <p>Gender: {team1.gender}</p>
                <p>Height: {team1.height}</p>
                <b>Mass: {team1.mass}</b>
              </CardContent>
            </Card>
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
            <Card sx={{ border: `1px solid ${winnerColor(team2.name)}` }}>
              <CardHeader title={team2.name} />
              <CardContent>
                <p>Birth: {team2.birth_year}</p>
                <p>Gender: {team2.gender}</p>
                <p>Height: {team2.height}</p>
                <b>Mass: {team2.mass}</b>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {winner}
        <br />
        <Button variant="outlined" disabled={isLoading} onClick={processGame}>
          {winner ? 'New game' : 'start Game'}
        </Button>
      </Container>
    </ThemeProvider>
  );
}

export default App;
