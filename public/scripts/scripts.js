const modalOverlay = document.querySelector(".modal-overlay")
const cards = document.querySelectorAll(".card")
const modalContent = document.querySelector(".modal-content")

for (let card of cards) {
    card.addEventListener("click", function() {
        modalOverlay.classList.add("active")
        const imageId = card.getAttribute("id")
        const dishName = card.getElementsByTagName("h3")[0].textContent
        const dishAuthor = card.getElementsByTagName("h4")[0].textContent
        modalOverlay.querySelector('img').src=`/${imageId}.png`
        modalOverlay.querySelector('h3').innerHTML = `${dishName}`
        modalOverlay.querySelector('h4').innerHTML = `${dishAuthor}`
    })
}

document.querySelector(".close-modal").addEventListener('click', function(){
    modalOverlay.classList.remove('active')
})