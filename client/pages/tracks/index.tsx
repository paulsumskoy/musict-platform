import React, { useState } from 'react';
import MainLayout from "../../layouts/MainLayout";
import {Box, Button, Card, Grid, TextField} from "@material-ui/core";
import {useRouter} from "next/router";
import TrackList from "../../components/TrackList";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {NextThunkDispatch, wrapper} from "../../store";
import { fetchTracks } from '../../store/actions-creators/track';
import { useDispatch } from 'react-redux';

const Index = () => {
    const router = useRouter()
    const {tracks, error} = useTypedSelector(state => state.track)
    //const [querry, setQuerry] = useState<string>('')
    //const dispatch = useDispatch as NextThunkDispatch;
    //const [timer, setTimer] = useState(null)

    /*const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuerry(e.target.value)
        if (timer) {
            clearTimeout(timer)
        }
        setTimer(
            setTimeout(async () = > {
                await dispatch(await searchTracks(e.target.value));
            }, 500)
        )
    }*/

    if (error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }

    return (
        <MainLayout title={"Track list - Music platform"}>
            <Grid container justifyContent='center'>
                <Card style={{width: 900}}>
                    <Box p={3}>
                        <Grid container justifyContent='space-between'>
                            <h1>Track List</h1>
                            <Button onClick={() => router.push('/tracks/create')}>
                                Upload
                            </Button>
                        </Grid>
                    </Box>
                    <TrackList tracks={tracks}/>
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