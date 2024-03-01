import { Emphasis } from "./emphasis.enum";
import { Muscle } from "./muscle.interface";

// used in exercises 
export interface MuscleEmphasis {
    id: number;
    muscle: Muscle;
    emphasis: Emphasis;
}