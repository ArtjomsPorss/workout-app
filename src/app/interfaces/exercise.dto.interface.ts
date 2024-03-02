import { Exercise } from "./exercise.interface";
import { MuscleEmphasis } from "./muscle-emphasis.interface.";


export interface ExerciseDto extends Exercise {
    id: number
}