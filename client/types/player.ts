import { ITrack } from "./tracks";

export interface PlayerState {
    active: null | ITrack;
    volume: number;
    duration: number;
    currenTime: number;
    pause: boolean;
}

export enum PlayerActionTypes {
    PLAY = "PLAY",
    PAUSE = "PAUSE",
    SET_ACTIVE = "SET_ACTIVE",
    SET_DURATION = "SET_DURATION",
    SET_CURRENT_TIME = "SET_CURRENT_TIME",
    SET_VOLUME = "SET_VOLUME",
}

interface PlayAction {
    type: PlayerActionTypes.PLAY
}
interface PauseAction {
    type: PlayerActionTypes.PAUSE
}
interface SetActiveAction {
    type: PlayerActionTypes.SET_ACTIVE,
    playload: ITrack;
}
interface SetDurationAction {
    type: PlayerActionTypes.SET_DURATION,
    playload: number;
}
interface SetVolumeAction {
    type: PlayerActionTypes.SET_VOLUME,
    payload: number;
}
interface SetCurretTimeAction {
    type: PlayerActionTypes.SET_CURRENT_TIME,
    payload: number;
}

export type PlayerAction = 
    PlayAction
    | PauseAction
    | SetActiveAction
    | SetDurationAction
    | SetVolumeAction
    | SetCurretTimeAction