function addIngredient() {
    const ingredients = document.querySelector("#ingredients")
    const fieldContainer = document.querySelectorAll(".ingredient")
    
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)
  
    if (newField.children[0].value == "") return false
  
    newField.children[0].value = ""
    ingredients.appendChild(newField)
}
  
document
    .querySelector(".add-ingredient")
    .addEventListener("click", addIngredient)