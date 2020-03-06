const cards = document.querySelectorAll('.card')

for (let card of cards){
  card.addEventListener('click', function(){
    const recipeIndex = card.getAttribute("id");
    window.location.href = `/recipe/${recipeIndex}`;
  });
}

const buttons = document.getElementsByClassName('button')

for(let button of buttons){
  const buttonSpan = button.querySelector('span')


  buttonSpan.addEventListener('click', function(){
    if(buttonSpan.innerHTML == "ESCONDER"){
      button.querySelector('.button-content').classList.add('hidden')
      buttonSpan.innerHTML = "MOSTRAR"
    }else {
        button.querySelector('.button-content').classList.remove('hidden');
        buttonSpan.innerHTML = "ESCONDER"
      }
  })
}

//Adicionar ingrediente
function addIngredient() {
  const ingredients = document.querySelector("#create-ingredients");
  const fieldContainer = document.querySelectorAll(".ingredient");

  // Realiza um clone do último ingrediente adicionado
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == "") return false;

  // Deixa o valor do input vazio
  newField.children[0].value = "";
  ingredients.appendChild(newField);
}

document.querySelector(".add-ingredient").addEventListener("click", addIngredient)

//Adicionar Novo Passo do modo de preparo
function addStep() {
  const ingredients = document.querySelector("#preparations");
  const fieldContainer = document.querySelectorAll(".preparation");

  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  if (newField.children[0].value == "") return false;

  newField.children[0].value = "";
  ingredients.appendChild(newField);
}
  
document.querySelector(".add-preparation").addEventListener("click", addStep)


//confirmar para deletar
const formDelete = document.querySelector("#delete")
formDelete.addEventListener("submit", function(e){
  const confirmation = confirm("Deseja realmente deletar?")
  
  if (!confirmation) {
    e.preventDefault()
  }
})

const photosUpload = {
  uploadLimit: 6,
  handleFileInput(event){
    const {files: fileList} = event.target
    const { uploadLimit } = photosUpload

    if (fileList.length > uploadLimit){
      alert(`Envie no máximo ${uploadLimit} fotos`)
      event.preventDefault()
      return
    }
  }
}