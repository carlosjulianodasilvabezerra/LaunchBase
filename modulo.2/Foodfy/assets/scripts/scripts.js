const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')

for (let card of cards){
  card.addEventListener('click', function(){
    const srcImage = card.querySelector('img').src
    const cardTitle = card.querySelector('.card-title h1').innerHTML
    const cardAuthor = card.querySelector('.card-author p').innerHTML
    modalOverlay.classList.add('active')

    modalOverlay.querySelector('img').src = `${srcImage}`
    modalOverlay.querySelector('.modal-title').innerHTML = `${cardTitle}`
    modalOverlay.querySelector('.modal-author').innerHTML = `${cardAuthor}`
  })
}

document.querySelector('.close-modal').addEventListener('click', function(){
  modalOverlay.classList.remove('active')
})