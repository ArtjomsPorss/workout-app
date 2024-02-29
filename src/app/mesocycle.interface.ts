import { Microcycle } from "./microcycle.interface";
import { Workout } from "./workout.interface";

// training plan containing a set of microcycles or week 
export interface Mesocycle {
    microcycle: Array<Microcycle>;
}