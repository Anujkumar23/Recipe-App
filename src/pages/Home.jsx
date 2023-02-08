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
import { addToRecipeBook } from "../feature/recipebook-slice";

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

  const  onAddItemTorecipeBook=(product)=>{
        dispatch(addToRecipeBook({product,quantity:1}))
  }

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid container spacing={4}>
        {products?.length
          ? products.map((product) => {
              const { label, ingredients, image ,ingredientLines} = product.recipe;

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
                      <Typography gutterBottom variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun
                        meal to cook together with your guests. Add 1 cup of
                        frozen peas along with the mussels, if you like.
                      </Typography>
                      <Rating  readOnly precision={0.5} value={3}  fontSize="small"/>
                    </CardContent>
                    <CardActions disableSpacing>
                      <Button variant="contained" onClick={()=>onAddItemTorecipeBook({label,ingredients,image,ingredientLines})}>Save</Button>

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
                          <Typography paragraph key={label}>{ingredient.text}</Typography>
                        ))}
                      </CardContent>
                    </Collapse>
                  </Card>

                  
                </Grid>
              );
            })
          : null}
      </Grid>
    </Container>
  );
}

export default Home;
