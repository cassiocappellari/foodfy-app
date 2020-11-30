const cards = document.querySelectorAll(".card")
const displayIngredients = document.querySelector(".recipe-ingredients")
const displayPreparation = document.querySelector(".recipe-preparation")
const displayInformation = document.querySelector(".recipe-information")
const button1 = document.getElementById("button1")
const button2 = document.getElementById("button2")
const button3 = document.getElementById("button3")

for (let card of cards) {
    card.addEventListener("click", function() {
        const recipeId = card.getAttribute('id')
        window.location.href = `/details/${recipeId}`
    })
}

if(button1) {
    button1.addEventListener('click', function(){
        if (button1.textContent == 'HIDE') {
            button1.innerHTML = 'SHOW'
            displayIngredients.classList.add("hide")
        } else {
            button1.innerHTML = 'HIDE'
            displayIngredients.classList.remove("hide")
        }
    })
}

if(button2) {
    button2.addEventListener('click', function(){
        if (button2.textContent == 'HIDE') {
            button2.innerHTML = 'SHOW'
            displayPreparation.classList.add("hide")
        } else {
            button2.innerHTML = 'HIDE'
            displayPreparation.classList.remove("hide")
        }
    })
}

if(button3) {
    button3.addEventListener('click', function(){
        if (button3.textContent == 'HIDE') {
            button3.innerHTML = 'SHOW'
            displayInformation.classList.add("hide")
        } else {
            button3.innerHTML = 'HIDE'
            displayInformation.classList.remove("hide")
        }
    })
}
