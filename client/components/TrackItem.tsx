import { Card, Grid, IconButton } from '@material-ui/core';
import React from 'react';
import { ITrack } from '../types/track';
import styles from '../styles/TrackItem.module.scss';
import { Delete, Pause, PlayArrow } from '@material-ui/icons';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useActions } from "../hooks/useActions";

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
  const router = useRouter();
  const {playTrack, pauseTrack, setActiveTrack} = useActions()

  const play = (e) => {
      e.stopPropagation()
      setActiveTrack(track)
      playTrack()
  }

  return (
    <Card
      className={styles.track}
      onClick={() => router.push('/tracks/' + track._id)}
    >
      <IconButton onClick={play}>
        {active ? <Pause /> : <PlayArrow />}
      </IconButton>
      <Image src={track.picture} alt="Track picture" width={70} height={70} />
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: '0 20px' }}
      >
        <div>{track.name}</div>
        <div style={{ fontSize: 12, color: 'gray' }}>{track.artist}</div>
      </Grid>
      {active && <div>00:00 / 05:47</div>}
      <IconButton
        onClick={e => e.stopPropagation()}
        style={{ marginLeft: 'auto' }}
      >
        <Delete />
      </IconButton>
    </Card>
  );
};

export default TrackItem;
