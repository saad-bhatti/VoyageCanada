import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import cardData from "../components/cardData";
import Card from "@mui/material/Card";
import {CardActionArea} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";

export default function SuccessPurchase(){
    return(
        <div>
            <Typography variant='h2' gutterBottom mt='5%' ml='10%'>Purchase Complete</Typography>
            <hr style={{width: '80%', marginBottom: '3%'}}/>
            <Grid container direction="column" rowSpacing={2} mb='2%'>
                <Grid item>
                    <Typography variant='h7' mt='5%' ml='10%'>
                        Thanks for your purchase! The receipt will be sent to your email account soon.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='h7' mt='5%' ml='10%'>
                        Have a great trip!
                    </Typography>
                </Grid>
            </Grid>

            <Typography variant='h5' gutterBottom ml='10%'>You may also want to check:</Typography>
            <hr style={{width: '80%', marginBottom: '2%'}}/>
            <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: '20px'}} ml='11%' mb='2%'>
                {/*use suggestion data passed in to replace the cardData*/}
                {cardData.map((obj) => {
                    return (
                        <Card sx={{ maxWidth: 370, flexBasis: '35%' }}>
                            <CardActionArea>
                                <CardMedia
                                    key={obj.id}
                                    component="img"
                                    height="110"
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
                    )
                })}
            </Box>
        </div>
    );
}