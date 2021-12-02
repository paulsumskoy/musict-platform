import { Grid, IconButton } from "@material-ui/core";
import { Pause, PlayArrow, VolumeUp } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useActions } from "../hooks/useActions";
import { useTypeSelector } from "../hooks/useTypeSelector";
import styles from '../styles/Player.module.scss';
import { ITrack } from "../types/tracks";
import TrackProgress from "./TrackProgress";

let audio;

const Player = () => {
    const track: ITrack = {_id: '1', name: "Walking", artist: "Jesper Kyd", text: "lalala", listens: 5, audio: 'http://localhost:5000/audio/first.mp3', picture: "http://localhost:5000/image/first.jpg", comments: []}
    const {pause, volume, active, duration, currenTime} = useTypeSelector(state => state.player)
    const {pauseTrack, playTrack} = useActions()

    useEffect(() => {
        if(!audio){
            audio = new Audio()
        }
    }), []

    const play = () => {
        if (pause) {
            playTrack()
            audio.play()
        } else {
            pauseTrack()
            audio.pause()
        }
    }

    return(
        <div className={styles.player}>
            <IconButton onClick={play}>
                {pause
                    ? <Pause/>
                    :<PlayArrow/> 
                }
            </IconButton>
            <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
                <div>{track.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{track.artist}</div>
            </Grid>
            <TrackProgress left={0} right={100} onChange={() => ({})}/>
            <VolumeUp style={{marginLeft: 'auto'}}/>
            <TrackProgress left={0} right={100} onChange={() => ({})}/>
        </div>
    );
};

export default Player;