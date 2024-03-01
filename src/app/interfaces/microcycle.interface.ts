import { Workout } from "./workout.interface";

// basically a week of training
export interface Microcycle {
    workouts: Array<Workout>;
}