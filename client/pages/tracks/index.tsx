import { Box, Button, Card, Grid } from "@material-ui/core";
import React from "react";
import MainLayout from "../../layouts/MainLayot";
import { useRouter } from "next/router";

const Index = () => {
    const router = useRouter()
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
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default Index;
