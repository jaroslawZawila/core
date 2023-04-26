// import {MoodLevel} from 'mood-shared';

export enum MoodLevel {
    Depressed = "Depressed",
    Down = "Down",
    Normal = "Normal",
    Up = "Up",
    Excited = "Excited"
}

export interface MoodItem  {
    id: string,
    userId: string,
    mood: MoodLevel,
    createdAt: string
}
