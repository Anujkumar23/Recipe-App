
import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./feature/recipe-slice"

export const store =configureStore({
    reducer:{
        recipes:recipeReducer,
    }
})

