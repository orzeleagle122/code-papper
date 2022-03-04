import React from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { GameType } from '../model/GameType';
import { CharacterWinCondition } from '../model/CharacterWinCondition';
import { StarshipWinCondition } from '../model/StarshipWinCondition';

interface GameSettingsProps {
  handleGameTypeChange: (gameType: GameType) => void;
  gameType: GameType;
  handleWinConditionChange: (winCondition: CharacterWinCondition) => void;
  winCondition: CharacterWinCondition | StarshipWinCondition;
}

const GameSettings = (props: GameSettingsProps) => {
  const selectMenuItems = () => {
    if (props.gameType === GameType.CHARACTER) {
      return Object.values(CharacterWinCondition).map((key) => (
        <MenuItem value={key}>{key}</MenuItem>
      ));
    } else if (props.gameType === GameType.STARSHIP) {
      return Object.values(StarshipWinCondition).map((key) => (
        <MenuItem value={key}>{key}</MenuItem>
      ));
    }
  };

  return (
    <Grid container spacing={2} sx={{ padding: '20px 0' }}>
      <Grid item>
        <FormControl>
          <InputLabel id="gameType">Game type</InputLabel>
          <Select
            defaultValue={GameType.CHARACTER}
            labelId="gameType"
            id="gameType"
            value={props.gameType}
            label="Game type"
            onChange={(e) =>
              props.handleGameTypeChange(e.target.value as GameType)
            }
          >
            <MenuItem value={GameType.CHARACTER}>Character</MenuItem>
            <MenuItem value={GameType.STARSHIP}>Starship</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <InputLabel id="winCondition">Win condition</InputLabel>
          <Select
            defaultValue={CharacterWinCondition.MASS}
            labelId="winCondition"
            id="winCondition"
            value={props.winCondition}
            label="Win condition"
            onChange={(e) =>
              props.handleWinConditionChange(
                // @ts-ignore
                e.target.value as CharacterWinCondition | StarshipWinCondition
              )
            }
          >
            {selectMenuItems()}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default GameSettings;
