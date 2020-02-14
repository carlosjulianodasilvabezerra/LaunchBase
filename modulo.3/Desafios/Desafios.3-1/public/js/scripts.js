const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')
const modal = document.querySelector('.modal')

for (let card of cards){
  card.addEventListener('click', function(){
    const cardId = card.getAttribute('id')
    window.location.href = `/conteudos/${cardId}`
  })
  }

// document.querySelector('.maximize-modal').addEventListener('click', function() {
//   if (modal.classList.contains("maximize")) {
//     modal.classList.remove("maximize");
//   } else {
//     modal.classList.add("maximize");
//   }
// })

// document.querySelector('.close-modal').addEventListener('click', function(){
//   modalOverlay.classList.remove('active')
// })