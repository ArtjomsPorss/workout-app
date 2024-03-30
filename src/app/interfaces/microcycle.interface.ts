import { Session } from "./session.interface";

// basically a week of training
export interface Microcycle {
    sessions: Array<Session>;
}