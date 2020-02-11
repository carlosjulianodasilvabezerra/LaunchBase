const name = "João Abilio"
const sexo = "M"
const idade = 70
const contribuicao = 15
const tempContrib = (idade+contribuicao)


const condicao1 = sexo == "M" && (idade >= 95 || tempContrib >=95)
const condicao2 = sexo == "F" && (idade >= 85 || tempContrib >=85)

if(condicao1 || condicao2){
  console.log(`${name}, você já pode se aposentar!`)
} else {
  console.log(`${name}, você não pode se aposentar ainda!`)
}