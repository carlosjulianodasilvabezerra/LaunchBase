module.exports = {
  age:   function age(timestamp){
    const today = new Date()
    const birthDate = new Date(timestamp)
  
    let age = today.getFullYear() - birthDate.getFullYear()
    let month = today.getMonth() - birthDate.getMonth()
  
    //11 - 12 = -1
    //11 - 11 = 0
    if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()){
      age = age - 1
    }
  
    return age
  },
  date: function(timestamp){
    const date = new Date(timestamp)

    //yyyy
    const year = date.getUTCFullYear()

    //mm
    const month = `0${date.getUTCMonth() + 1}`.slice(-2)

    //dd
    const day = `0${date.getUTCDate()}`.slice(-2)

    //return yyyy-mm-dd
    return {
      day,
      month,
      year,
      iso: `${year}-${month}-${day}`,

      birthDay: `${day}/${month}`
    }

  },

  graduation: function(select){
    if (select == "highschool"){
      return "Ensino Médio Completo";
    }else if

      (select == "college"){
        return "Superior Completo"
    }else if

      (select == "master"){
        return "Mestrado"
    }else if

      (select == "doctorate"){
        return "Doutorado"
    }
  },


  ano:function(select){
    if(select == "5.ano"){
      return "5º Ano Ensino Fundamental";
    }else
    if(select == "6.ano"){
      return "6º Ano Ensino Fundamental";
    }else
    if(select == "7.ano"){
      return "7º Ano Ensino Fundamental";
    }else
    if(select == "8.ano"){
      return "8º Ano Ensino Fundamental";
    }else
    if(select == "9.ano"){
      return "9º Ano Ensino Fundamental";
    }else
    if(select == "1.medio"){
      return "1º Ano Ensino Médio";
    }else
    if(select == "2.medio"){
      return "2º Ano Ensino Médio";
    }else
    if(select == "3.medio"){
      return "3º Ano Ensino Médio";
    }
    
  }
}