const cards = document.querySelectorAll(".card")

for (let card of cards) {
    card.addEventListener("click", function() {
        const chefId = card.getAttribute('id')
        window.location.href = `/chefs/${chefId}`
    })
}

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

function addPrep() {
    const preps = document.querySelector("#preps")
    const fieldContainer = document.querySelectorAll(".prep")
    
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)
    
    if (newField.children[0].value == "") return false
    
    newField.children[0].value = ""
    preps.appendChild(newField)
}

document
    .querySelector(".add-prep")
    .addEventListener("click", addPrep)
