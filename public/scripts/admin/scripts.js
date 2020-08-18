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

/*const chefDeleteOption = document.querySelector('#chef-delete')

if(chefDeleteOption) {
    const totalRecipes = document.querySelector('#total-recipes').textContent
    chefDeleteOption.addEventListener('submit', function(event){
        if(totalRecipes.includes('0 recipes')) {
            alert('Não é possível deletar!')
            event.preventDefault()
        }
    })
}*/