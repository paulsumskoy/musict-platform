import { Box, Button, Card, Grid } from "@material-ui/core";
import React from "react";
import MainLayout from "../../layouts/MainLayot";
import { useRouter } from "next/router";
import { ITrack } from "../../types/tracks";
import TrackList from "../../components/TrackList";

const Index = () => {
    const router = useRouter()
    const tracks: ITrack[] = [
        {_id: '1', name: "Walking", artist: "Jesper Kyd", text: "lalala", listens: 5, audio: 'http://localhost:5000/audio/first.mp3', picture: "http://localhost:5000/image/first.jpg", comments: []},
        {_id: '2', name: "Touch", artist: "VCRNOT", text: "lololo", listens: 5, audio: 'http://localhost:5000/audio/second.mp3', picture: "http://localhost:5000/image/second.jpg", comments: []},
        {_id: '3', name: "Avenida Atlantica", artist: "The Sura Quintet", text: "lululu", listens: 5, audio: 'http://localhost:5000/audio/third.mp3', picture: "http://localhost:5000/image/third.jpg", comments: []},
    ]

    return (
        <MainLayout>
            <Grid container justifyContent="center">
                <Card style={{width: 900}}> 
                <Box p={3}>
                    <Grid container justifyContent="space-between">
                        <h1> Track List</h1>
                        <Button onClick={() => router.push('/tracks/create')}>
                            Upload
                        </Button>
                    </Grid>
                </Box>
                <TrackList tracks = {tracks}/>
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default Index;
