import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Characters } from "../types/Character";

const Character = (characters)=> {

  return (
    {characters.map((character: Characters) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
        <Card>
          <CardMedia
            component="img"
            height="200"
            image={character.image}
            alt={character.name}
          />
          <CardContent>
            <Typography variant="h6" component="div">
              {character.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Status: {character.status}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Gender: {character.gender}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  );
}

export default Character;