import React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import { GAME_TYPE } from '../model/GAME_TYPE';
import { IPerson } from '../model/IPerson';
import { IStarship } from '../model/IStarship';

interface ICardProps {
  gameType: GAME_TYPE;
  opponentProperty: IPerson | IStarship | undefined;
  winner: string;
}

export const OpponentCard = (props: ICardProps) => {
  const getOpponentProperty = () => {
    if (props.gameType === GAME_TYPE.PEOPLE) {
      return props.opponentProperty as IPerson;
    } else {
      return props.opponentProperty as IStarship;
    }
  };

  const displayStats = () => {
    if (props.gameType === GAME_TYPE.PEOPLE) {
      const opponentProperty = props.opponentProperty as IPerson;
      console.log(opponentProperty);
      return (
        <CardContent>
          <p>Birth: {opponentProperty.birth_year}</p>
          <p>Gender: {opponentProperty.gender}</p>
          <p>Height: {opponentProperty.height}</p>
          <p>Mass: {opponentProperty.mass}</p>
        </CardContent>
      );
    } else if (props.gameType === GAME_TYPE.STARSHIP) {
      const opponentProperty = props.opponentProperty as IStarship;
      console.log(opponentProperty);
      return (
        <CardContent>
          <p>Cargo capacity: {opponentProperty.cargo_capacity}</p>
          <p>Crew: {opponentProperty.crew}</p>
          <p>Passengers: {opponentProperty.passengers}</p>
          <p>Hydrodrive rating: {opponentProperty.hyperdrive_rating}</p>
          <p>Model: {opponentProperty.model}</p>
          <p>Cost in credits: {opponentProperty.cost_in_credits}</p>
        </CardContent>
      );
    }
  };

  const winnerColor = () => {
      const { winner, opponentProperty } = props;
    if (!winner) return 'none';
    else if (winner === 'not resolved' || winner === 'draw') return 'grey';
    else if (winner === opponentProperty?.name) return 'green';
    else if (winner !== opponentProperty?.name) return 'red;';
    return 'none';
  };

  return (
    <Card sx={{ border: `1px solid ${winnerColor()}` }}>
      <CardHeader title={getOpponentProperty().name} />
      {displayStats()}
    </Card>
  );
};
