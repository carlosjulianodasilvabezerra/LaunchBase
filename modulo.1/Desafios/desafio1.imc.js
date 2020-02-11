const name = "João";
const peso = 80;
const altura = 1.70;
const imc = (peso / (altura*altura)).toFixed(2)

if(!(imc < 29.9) || (imc > 30)){
  console.log(`${imc}. ${name}, você está acima do peso!`)
} else{
  console.log(`${imc}. ${name}, você não está acima do peso!`)
}