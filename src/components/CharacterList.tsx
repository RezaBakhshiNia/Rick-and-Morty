import { useLazyQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../graphql/queries";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Pagination,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useState, useEffect } from "react";
import { Characters } from "../types/Character";

function CharacterList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [getCharacters, { data }] = useLazyQuery(GET_CHARACTERS);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = () => {
    getCharacters({ variables: { page: currentPage } });
    setTimeout(() => setDataLoaded(true), 1500);
  };

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setDataLoaded(false);
    setCurrentPage(value);
  };

  const characters = data?.characters.results || [];
  const pages = data?.characters.info.pages || 1;

  return (
    <>
      <Grid container spacing={2}>
        {dataLoaded ? (
          characters.map((character: Characters) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
              <Card
                sx={{
                  cursor: "pointer",
                  transition: "0.3s ease",
                  "&:hover": {
                    boxShadow:
                      "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
                    scale: "1.03",
                  },
                }}
              >
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
          ))
        ) : (
          <>
            {[...Array(20)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Skeleton
                  sx={{ bgcolor: "grey.600" }}
                  animation="wave"
                  variant="rectangular"
                  width="100%"
                  height={200}
                />
                <Skeleton
                  sx={{ bgcolor: "grey.600" }}
                  animation="wave"
                  variant="text"
                  width="80%"
                />
                <Skeleton
                  sx={{ bgcolor: "grey.600" }}
                  animation="wave"
                  variant="text"
                  width="60%"
                />
              </Grid>
            ))}
          </>
        )}
      </Grid>

      {/* Render pagination buttons */}
      <Pagination
        count={pages}
        color="secondary"
        variant="outlined"
        shape="rounded"
        onChange={handlePagination}
      />
    </>
  );
}

export default CharacterList;
