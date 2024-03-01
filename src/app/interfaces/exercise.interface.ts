import { MuscleEmphasis } from "./muscle-emphasis.interface.";


export interface Exercise {
    // id: number;
    name: string;
    // emphasis: Array<MuscleEmphasis> | any
    additionalInfo: string | any;
}