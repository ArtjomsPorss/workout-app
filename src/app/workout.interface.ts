import { Exercise } from "./exercise.interface";


// workout within a training plan
export interface Workout {
    exercises: Array<Exercise>;
}