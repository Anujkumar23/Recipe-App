const APP_ID="88f2091a";
const APP_KEY="58211bdb8119794a47afb44e7b2d00e3	"
import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"

export const getRecipe=createAsyncThunk("recipes/getRecipes",async(searchTerm)=>{
    try{const response= await axios.get(`https://api.edamam.com/search?q=${searchTerm}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    return response.data.hits;
}catch(error){
    console.log(error)

}
  
}) 
const recipeSlice=createSlice({
    name:"recipes",
    initialState:{
        value:[],
        loading:false
    },
    extraReducers:(builder)=>{
        builder.addCase(getRecipe.pending,(state)=>{state.loading=true})
         builder.addCase(getRecipe.fulfilled,(state,action)=>{
            state.value=action.payload;
            state.loading=false; 
           
         })
         
        
    }
})


    

export default recipeSlice.reducer;
