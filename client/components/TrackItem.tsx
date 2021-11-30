import { Card } from "@material-ui/core";
import React from "react";
import { ITrack } from "../types/tracks";

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({track, active = false}) => {
    return (
        <Card>
            {track.name}
        </Card>
    );
};

export default TrackItem;