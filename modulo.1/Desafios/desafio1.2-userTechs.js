const programador =[{
  nome: "João",
  idade: 26,
  tecnologias:[
    {nome: 'C++', especialidade: 'Desktop'},
    {nome: 'Python', especialidade: 'Data Science'},
    {nome: 'JavaScript', especialidade: 'Web/Mobile'}
  ]
}]

console.log(`O programador ${programador[0].nome} tem ${programador[0].idade} anos e usa a tecnologia ${programador[0].tecnologias[0].nome} com especialidade em ${programador[0].tecnologias[0].especialidade}!`)