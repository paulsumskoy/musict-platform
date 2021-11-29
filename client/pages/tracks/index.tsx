import { Button, Card, Grid } from "@material-ui/core";
import React from "react";
import MainLayout from "../../layouts/MainLayot";

const Index = () => {
    return (
        <MainLayout>
            <Grid container justifyContent="center">
                <Card style={{width: 900}}> 
                    <Grid container justifyContent="space-between">
                        <h1> Track List</h1>
                        <Button>Upload</Button>
                    </Grid>
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default Index;