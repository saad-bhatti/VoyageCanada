import React from 'react';
import cardData from './cardData';
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function Cards() {
    return (
        <Grid container rowSpacing={4} columnSpacing={2} ml={4} mb='2%'>
            {cardData.map((obj) => {
                return (
                    <Grid item key={obj.id} xs={4}>
                        <Card sx={{ maxWidth: 370 }}>
                            <CardActionArea>
                                <CardMedia
                                    key={obj.id}
                                    component="img"
                                    height="140"
                                    image={obj.image}
                                    alt={obj.destination}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {obj.destination}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {obj.msg}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                )
            })}
        </Grid>

    )
}
