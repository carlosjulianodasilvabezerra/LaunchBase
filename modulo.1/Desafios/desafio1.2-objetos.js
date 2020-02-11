const empresa =[
  {
    nome: "Rocketseat",
    cor: "Roxo",
    Foco: "Programação",
    Endereço: [
          {Rua: "Rua Guilherme Gembala"},
          {Número: 260}
        ]
  }
]

console.log(`A empresa ${empresa[0].nome} está localizada em ${empresa[0].Endereço[0].Rua}, ${empresa[0].Endereço[1].Número}.`)