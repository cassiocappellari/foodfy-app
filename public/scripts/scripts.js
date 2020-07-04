const cards = document.querySelectorAll(".card")

for (let card of cards) {
    card.addEventListener("click", function() {
        const recipeId = card.getAttribute('id')
        window.location.href = `/details/${recipeId}`
    })
}