import React from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { GAME_TYPE } from '../model/GAME_TYPE';
import { PEOPLE_WIN_CONDITION } from '../model/PEOPLE_WIN_CONDITION';
import { STARSHIP_WIN_CONDITION } from '../model/STARSHIP_WIN_CONDITION';

interface GameSettingsProps {
  handleGameTypeChange: (gameType: GAME_TYPE) => void;
  gameType: GAME_TYPE;
  handleWinConditionChange: (winCondition: PEOPLE_WIN_CONDITION) => void;
  winCondition: PEOPLE_WIN_CONDITION | STARSHIP_WIN_CONDITION;
}

const GameSettings = (props: GameSettingsProps) => {
  const selectMenuItems = () => {
    if (props.gameType === GAME_TYPE.PEOPLE) {
      return Object.values(PEOPLE_WIN_CONDITION).map((key) => (
        <MenuItem key={key} value={key}>{key}</MenuItem>
      ));
    } else if (props.gameType === GAME_TYPE.STARSHIP) {
      return Object.values(STARSHIP_WIN_CONDITION).map((key) => (
        <MenuItem key={key} value={key}>{key}</MenuItem>
      ));
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <FormControl>
          <InputLabel id="gameType">Game type</InputLabel>
          <Select
            defaultValue={GAME_TYPE.PEOPLE}
            labelId="gameType"
            id="gameType"
            value={props.gameType}
            label="Game type"
            onChange={(e) =>
              props.handleGameTypeChange(e.target.value as GAME_TYPE)
            }
          >
            <MenuItem value={GAME_TYPE.PEOPLE}>People</MenuItem>
            <MenuItem value={GAME_TYPE.STARSHIP}>Starships</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <InputLabel id="winCondition">Win condition</InputLabel>
          <Select
            defaultValue={PEOPLE_WIN_CONDITION.MASS}
            labelId="winCondition"
            id="winCondition"
            value={props.winCondition}
            label="Win condition"
            onChange={(e) =>
              props.handleWinConditionChange(
                // @ts-ignore
                e.target.value as PEOPLE_WIN_CONDITION | STARSHIP_WIN_CONDITION
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
