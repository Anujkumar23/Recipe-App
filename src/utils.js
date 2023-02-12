export function getRecipeBookItems(recipeBookItems){
    
    return  recipeBookItems.reduce((count,recipeItem)=>{ return count+recipeItem.quantity},0)
 }