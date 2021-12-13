import { Box, Button, Card, Grid } from '@material-ui/core';
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { useRouter } from 'next/router';
import TrackList from '../../components/TrackList';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { fetchTracks } from '../../store/actions-creators/track';
import { NextThunkDispatch, wrapper } from '../../store';

const Index = () => {
  const router = useRouter();
  const { tracks, error } = useTypedSelector(state => state.track);

  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Grid container justifyContent="center">
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Track List</h1>
              <Button onClick={() => router.push('/tracks/create')}>
                Upload
              </Button>
            </Grid>
          </Box>
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
    store => async () =>
    {
        const dispatch = store.dispatch as NextThunkDispatch;
        await dispatch(fetchTracks());

        return { props: {} }
    }
);
