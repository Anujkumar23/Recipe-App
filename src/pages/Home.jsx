import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipe } from "../feature/recipe-slice";
import { useTheme } from "@emotion/react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import CardHeader from "@mui/material/CardHeader";

import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";

import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Home() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.recipes);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { value: products } = state ?? {};
  if (!products?.length) {
    dispatch(getRecipe("chicken"));
  }

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid container spacing={4}>
        {products?.length
          ? products.map((product) => {
              const { label, calories, ingredients, image } = product.recipe;

              return (
                <Grid
                  item
                  key={label}
                  xs={12}
                  sm={6}
                  md={3}
                  sx={{ borderRadius: theme.spacing() }}
                >
                  <Card sx={{ maxWidth: 345 }}>
                  <CardContent sx={{pt:"8px",pb:"0",pl:"16px",pr:"16px"}}>
                   <Typography
                        variant="h6"
                        component="h2"
                        gutterBottom
                      
                            sx={{overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "1",
                            WebkitBoxOrient: "vertical",
                           
                        }}
                      >
                        {label}
                      </Typography>
                   </CardContent>
                    <CardMedia
                      component="img"
                      height="194"
                      image={image}
                      alt={label}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun
                        meal to cook together with your guests. Add 1 cup of
                        frozen peas along with the mussels, if you like.
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <Button variant="contained">Save</Button>

                      <Typography sx={{ ml: theme.spacing() }}>
                        Ingredient
                      </Typography>

                      <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        {ingredients.map((ingredient) => (
                          <Typography paragraph>{ingredient.text}</Typography>
                        ))}
                      </CardContent>
                    </Collapse>
                  </Card>

                  {/* <Card sx={{ display: "flex", flexDirection: "column" }}>
          <CardMedia
                    
                    component="img"
                    image={image}
                    sx={{
                      alignSelf: "center",
                      width: theme.spacing(25),
                      height: theme.spacing(25),
                      objectFit: "contain",
                      pt: theme.spacing(),
                    }}
                    alt={label}
                  ></CardMedia>
                   <CardContent sx={{pt:"8px",pb:"0",pl:"16px",pr:"16px"}}>
                   <Typography
                        variant="h6"
                        component="h2"
                        gutterBottom
                      
                            sx={{overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "1",
                            WebkitBoxOrient: "vertical",
                           
                        }}
                      >
                        {label}
                      </Typography>
                   </CardContent>
                 
                      <Typography
                        variant="h5"
                        component="h2"
                        gutterBottom
                      
                            sx={{overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "1",
                            WebkitBoxOrient: "vertical",
                           
                        }}
                      >
                        {ingredients.map((ingredient)=>(<li key={label}>{ingredient.text}</li>)
                          
                        )}
                      </Typography>
            </Card> */}
                </Grid>
              );
            })
          : null}
      </Grid>
    </Container>
  );
}

export default Home;
