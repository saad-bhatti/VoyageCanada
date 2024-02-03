import React from 'react';
import Slider from "../components/Slider";
import Cards from "../components/Cards";
import Typography from "@mui/material/Typography";

function Homepage() {
  return (
    <div className="Homepage">
        <Slider />
        <Typography gutterBottom variant="h4" mt={'5%'} ml={'3%'}>Suggestions</Typography>
        <hr style={{width: '94%', marginBottom: '2%'}}/>
        <Cards />
    </div>
  );
}

export default Homepage;
