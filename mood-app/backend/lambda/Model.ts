import {MoodLevel} from 'mood-shared';

export interface MoodItem  {
    id: string,
    userId: string,
    mood: MoodLevel,
    createdAt: string
}
