import React from 'react';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {List, ListItem, ListItemText} from "@mui/material";


export default function Credit() {
    return (
        <div>
            <Typography variant='h2' gutterBottom mt='5%' ml='10%'>Credits</Typography>
            <hr style={{width: '80%', marginBottom: '3%'}}/>
            <Grid container spacing={6} ml='10%' mb='8%'>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
                        Images
                    </Typography>
                        <List>
                            <ListItem component="a" href="https://unsplash.com/photos/4EZKcKxOlRE">
                                <ListItemText
                                    primary="Image took by Ramon Kagie from www.unsplash.com is
                                    licensed by Unsplash License"
                                />
                            </ListItem>
                            <ListItem component="a" href="https://unsplash.com/photos/zSSMzfQRqI4">
                                <ListItemText
                                    primary="Image took by Wabi Jayme from www.unsplash.com is
                                    licensed by Unsplash License"
                                />
                            </ListItem>
                            <ListItem component="a" href="https://unsplash.com/photos/LPX1BluOE7c">
                                <ListItemText
                                    primary="Image took by Hector Periquin from www.unsplash.com is
                                    licensed by Unsplash License"
                                />
                            </ListItem>
                            <ListItem component="a" href="https://unsplash.com/photos/3T9dDY0WqDI">
                                <ListItemText
                                    primary="Image took by Eibner Saliba from www.unsplash.com is
                                    licensed by Unsplash License"
                                />
                            </ListItem>
                            <ListItem component="a" href="https://unsplash.com/photos/MGUC3WkLkWM">
                                <ListItemText
                                    primary="Image took by Toa Heftiba from www.unsplash.com is
                                    licensed by Unsplash License"
                                />
                            </ListItem>
                            <ListItem component="a" href="https://unsplash.com/photos/xJBgzu3JZnY">
                                <ListItemText
                                    primary="Image took by Bas van Wylick from www.unsplash.com is
                                    licensed by Unsplash License"
                                />
                            </ListItem>
                        </List>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
                        Plugins
                    </Typography>
                    <List>
                        <ListItem component="a" href="https://mui.com/">
                            <ListItemText
                                primary="Material UI"
                            />
                        </ListItem>
                        <ListItem component="a" href="https://react-icons.github.io/react-icons/">
                            <ListItemText
                                primary="React Icon"
                            />
                        </ListItem>
                        <ListItem component="a" href="https://reactrouter.com/">
                            <ListItemText
                                primary="React Router"
                            />
                        </ListItem>
                        <ListItem component="a" href="https://github.com/hibiken/react-places-autocomplete">
                            <ListItemText
                                primary="React-places-autocomplete"
                            />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </div>
    )
}