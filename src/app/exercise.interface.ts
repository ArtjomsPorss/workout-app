import { MuscleEmphasis } from "./muscle-emphasis.interface.";


export interface Exercise {
    name: string;
    emphasis: Array<MuscleEmphasis> | any
    additionalInfo: string | any;
}