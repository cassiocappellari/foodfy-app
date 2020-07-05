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

button1.addEventListener('click', function(){
    if (button1.textContent == 'ESCONDER') {
        button1.innerHTML = 'MOSTRAR'
        displayIngredients.classList.add("hidde")
    } else {
        button1.innerHTML = 'ESCONDER'
        displayIngredients.classList.remove("hidde")
    }
})

button2.addEventListener('click', function(){
    if (button2.textContent == 'ESCONDER') {
        button2.innerHTML = 'MOSTRAR'
        displayPreparation.classList.add("hidde")
    } else {
        button2.innerHTML = 'ESCONDER'
        displayPreparation.classList.remove("hidde")
    }
})

button3.addEventListener('click', function(){
    if (button3.textContent == 'ESCONDER') {
        button3.innerHTML = 'MOSTRAR'
        displayInformation.classList.add("hidde")
    } else {
        button3.innerHTML = 'ESCONDER'
        displayInformation.classList.remove("hidde")
    }
})