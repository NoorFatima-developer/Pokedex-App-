const inputElement = document.querySelector("#search-input");
const search_icon = document.querySelector("#search-close-icon");
const sort_wrapper = document.querySelector("#sort-wrapper");

inputElement.addEventListener("input", function(){
    handleInputChange(inputElement);
});
search_icon.addEventListener("click", function(){
    handleSearchCloseOnClick;
});

sort_wrapper.addEventListener("click", function(event){
    handleSortIconOnClick;
});


function handleInputChange(inputElement) {
    const inputValue = inputElement.value;

    if(inputValue !== ""){
        document.querySelector("search-close-icon").classList.add("search-close-icon-visible");
    } else {
        document.querySelector("search-close-icon").classList.remove("search-close-icon-visible");
    }
}