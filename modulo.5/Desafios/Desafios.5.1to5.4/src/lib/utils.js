module.exports = {
  age(timestamp){
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

  date(timestamp){
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
      birthDay: `${day}/${month}`,
      format: `${day}/${month}/${year}`
    }
  },


  graduation(education_level){
    if (education_level == "highschool"){
      return "Ensino Médio Completo";
    }else if

      (education_level == "college"){
        return "Superior Completo"
    }else if

      (education_level == "master"){
        return "Mestrado"
    }else if

      (education_level == "doctorate"){
        return "Doutorado"
    }
  },
  ano(educationlevel){
    if(educationlevel == "5.ano"){
      return "5º Ano Ensino Fundamental";
    }else
    if(educationlevel == "6.ano"){
      return "6º Ano Ensino Fundamental";
    }else
    if(educationlevel == "7.ano"){
      return "7º Ano Ensino Fundamental";
    }else
    if(educationlevel == "8.ano"){
      return "8º Ano Ensino Fundamental";
    }else
    if(educationlevel == "9.ano"){
      return "9º Ano Ensino Fundamental";
    }else
    if(educationlevel == "1.medio"){
      return "1º Ano Ensino Médio";
    }else
    if(educationlevel == "2.medio"){
      return "2º Ano Ensino Médio";
    }else
    if(educationlevel == "3.medio"){
      return "3º Ano Ensino Médio";
    }
    
  }
}