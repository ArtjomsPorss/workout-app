import { Exercise } from "./exercise.interface";

// session within a training plan
export interface Session {
    exercises: Array<Exercise>;
}