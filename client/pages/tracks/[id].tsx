import { Button, Grid, TextField } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { ITrack } from "../../types/track";

const TrackPage = () => {
    const track: ITrack = {_id: '1', name: "Walking", artist: "Jesper Kyd", text: "lalala", listens: 5, audio: 'http://localhost:5000/audio/first.mp3', picture: "http://localhost:5000/image/first.jpg", comments: []}
    const router = useRouter()

    return(
        <MainLayout>
            <Button 
                variant={"outlined"}
                style={{fontSize: 32}}
                onClick={() =>router.push('/tracks')}
            >
                To the list
            </Button>
            <Grid container style={{margin: '20px 0'}}>
                <img src={'http://localhost:5000/' + track.picture} width={200} height={200}/>
                <div style={{marginLeft: '30'}}>
                    <h1>Track name - {track.name}</h1>
                    <h1>Artist - {track.artist}</h1>
                    <h1>Listens - {track.listens}</h1>
                </div>
            </Grid>
            <h1>Lyrics</h1>
            <p>{track.text}</p>
            <h1>Comments</h1>
            <Grid container>
                <TextField
                    label="Your name"
                    fullWidth
                />
                <TextField
                    label="Comment"
                    fullWidth
                    multiline
                    rows={4}
                />
                <Button>Send</Button>
            </Grid>
            <div>
                {track.comments.map(comment =>
                  <div>
                      <div>User Name - {comment.username}</div>
                      <div>Comment - {comment.text}</div>
                  </div>  
                )}
            </div>
        </MainLayout>
    );
};

export default TrackPage;