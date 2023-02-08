
import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./feature/recipe-slice"
import recipeBookReducer from "./feature/recipebook-slice"
export const store =configureStore({
    reducer:{
        recipes:recipeReducer,
        recipeBook:recipeBookReducer,
    }
})

