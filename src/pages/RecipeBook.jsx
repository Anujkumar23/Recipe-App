
import { Button, Card, CardContent, CardMedia, Grid,  Rating,  Typography } from '@mui/material'
import { Box, Container, useTheme,} from '@mui/system'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'




import { useNavigate } from 'react-router-dom'

function RecipeBook() {
    const theme=useTheme();
  const dispatch=useDispatch();
  const navigate=useNavigate();
    const recipeBook=useSelector(state=>state.recipeBook.value);

    const handleHomePageButton=()=>{
        navigate("/")
    }

  return (
    <Container sx={{py:theme.spacing(2)}}>
      <Grid container spacing={2}>
        <Grid item container md={8} spacing={2} > 
           {recipeBook?.length?recipeBook?.map(({product})=>{ 
            const {label,ingredient,image,ingredientLines}=product;
            return (<Grid item key={label} xs={12} >
              <Card   sx={{display:"flex",py:2}}>
                <CardMedia component="img" image={image} sx={
                  {
                    height:theme.spacing(20),
                    width:theme.spacing(20),
                    objectFit:"contain",
                    p:theme.spacing(),
                    ml:theme.spacing(),
                    
                   
                    borderColor: 'secondary.main'
                  }
                }/>
                <CardContent sx={{
                 
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flex: 1,}}>
                  <Box sx={{display:"flex",flexDirection:"column",gap:1}}>
                    <Typography variant="h5" >
                      {label}
                    </Typography>
                    <Rating readOnly precision={0.5} value={3} ></Rating>

                    <Typography>
                      {ingredientLines.map((ingredient)=>{
                        return ingredient
                      })}
                    </Typography>
                    
                        
                     
                  
                  </Box>
                 
                </CardContent>
              </Card>

            </Grid>) 


          }):

             <Container maxWidth="lg" sx={{py:theme.spacing(8),px:theme.spacing(8),display:"flex", flexDirection:"column", alignItems:"center" ,justifyContent:"center" }}>
                <Typography gutterBottom>Nothing in the Book </Typography>
<Button variant='contained' onClick={handleHomePageButton}>Go to Home Page</Button>
             </Container>
            

              
          
         }
         
        </Grid>
        
      </Grid>

    </Container>
  )
}

export default RecipeBook