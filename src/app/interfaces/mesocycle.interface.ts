import { Microcycle } from "./microcycle.interface";

// training plan containing a set of microcycles or week 
export interface Mesocycle {
    microcycle: Array<Microcycle>;
}