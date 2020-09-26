const cards = document.querySelectorAll(".card")

for (let card of cards) {
    card.addEventListener("click", function() {
        const chefId = card.getAttribute('id')
        window.location.href = `/chefs/${chefId}`
    })
}

document.querySelector(".add-ingredient").addEventListener("click", addIngredient)
document.querySelector(".add-prep").addEventListener("click", addPrep)

function addIngredient() {
    const ingredients = document.querySelector("#ingredients")
    const fieldContainer = document.querySelectorAll(".ingredient")
    
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)
  
    if (newField.children[0].value == "") return false
  
    newField.children[0].value = ""
    ingredients.appendChild(newField)
}  

function addPrep() {
    const preps = document.querySelector("#preps")
    const fieldContainer = document.querySelectorAll(".prep")
    
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)
    
    if (newField.children[0].value == "") return false
    
    newField.children[0].value = ""
    preps.appendChild(newField)
}

const PhotosUpload = {
    uploadLimit: 5,
    handleFileInput(event) {
        const {files: fileList} = event.target
        const {uploadLimit} = PhotosUpload

        if(fileList.length > uploadLimit) {
            alert(`Please, send the maximum of ${uploadLimit} photos!`)
            event.preventDefault()
            return
        }

        Array.from(fileList).forEach(file => {
            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = document.createElement('div')
                div.classList.add('photo')

                div.onclick = () => alert('Remove Photo')
                div.appendChild(image)

                document.querySelector('#photos-preview').appendChild(div)
            }

            reader.readAsDataURL(file)
        })
    }
}