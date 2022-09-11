function filterCategory(filterSelection, filterBy, filterButton){
    let recipeCards = Array.from(document.getElementsByClassName("RecipeCardWrapper"));
    //console.log(recipeCard);
    for(let listItem of recipeCards){
        //console.log(listItem.dataset.author)
        if(listItem.dataset[filterBy] === filterSelection){
            listItem.style.display ="flex";
        }else{
            listItem.style.display ="none";
        }
    }
    //find all filter selection buttons 
    var FilterSelector = Array.from(document.getElementsByClassName("FilterSelector"));
    //iterate thourgh each secletion button and make sure non have the "Active Catergory" class
    for(var selector of FilterSelector){
        selector.classList.remove("ActiveCategory");
    }
    //then add the "Active Category" class onto the clicked button
        filterButton.classList.add("ActiveCategory");
        
}
//all category 
function allCategory(filterButton){
    let recipeCards = Array.from(document.getElementsByClassName("RecipeCardWrapper"));
    for(let listItem of recipeCards){
            listItem.style.display ="flex";
    }
    var FilterSelector = Array.from(document.getElementsByClassName("FilterSelector"));
    //iterate thourgh each secletion button and make sure non have the "Active Catergory" class
    for(var selector of FilterSelector){
        selector.classList.remove("ActiveCategory");
    }
    //then add the "Active Category" class onto the clicked button
        filterButton.classList.add("ActiveCategory");


}