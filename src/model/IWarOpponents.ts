import { IPerson } from './IPerson';
import { IStarship } from './IStarship';

export interface IWarOpponents {
  opponent1?: IPerson | IStarship;
  opponent2?: IPerson | IStarship;
}
