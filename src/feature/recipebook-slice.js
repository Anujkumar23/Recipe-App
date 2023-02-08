import { createSlice } from "@reduxjs/toolkit";

   

   const recipeBookSlice=createSlice({
    name:"recipesBook",
    initialState:{
        value:[],
       
    },
    reducers:{
        addToRecipeBook(state,action){
            // const {product}=action.payload;
            // const existingItem=state.value.find(({product:prod})=>{ return prod.id===product.id})
            // console.log(existingItem)
            // if(existingItem){
            //     existingItem.quantity +=1;
               
            // }
          
                state.value.push(action.payload)
        
        }
   }
   
}
   )


   export default recipeBookSlice.reducer;
   export const {addToRecipeBook} =recipeBookSlice.actions;