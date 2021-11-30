import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import MainLayout from "../../layouts/MainLayot";
import { ITrack } from "../../types/tracks";

const TrackPage = () => {
    const track: ITrack = {_id: '1', name: "Walking", artist: "Jesper Kyd", text: "lalala", listens: 5, audio: 'http://localhost:5000/audio/first.mp3', picture: "http://localhost:5000/image/first.jpg", comments: []},
    const router = useRouter()

    return(
        <MainLayout>
            <Button onClick={router.push('/tracks')}>
                To the list
            </Button>
        </MainLayout>
    );
};

export default TrackPage;