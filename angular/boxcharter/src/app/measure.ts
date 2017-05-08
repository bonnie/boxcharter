import { Chord } from './chord'
import { Lyric } from './lyric'

export class Measure {
    beatCount: number;
    chords: Chord[];
    lyrics: Lyric[];
};