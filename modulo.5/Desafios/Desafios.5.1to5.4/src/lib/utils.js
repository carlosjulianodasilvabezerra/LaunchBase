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
  grade(education_level){
    if(education_level == "5º"){
      return "5º Ano Ensino Fundamental";
    }else
    if(education_level == "6º"){
      return "6º Ano Ensino Fundamental";
    }else
    if(education_level == "7º"){
      return "7º Ano Ensino Fundamental";
    }else
    if(education_level == "8º"){
      return "8º Ano Ensino Fundamental";
    }else
    if(education_level == "9º"){
      return "9º Ano Ensino Fundamental";
    }else
    if(education_level == "1º"){
      return "1º Ano Ensino Médio";
    }else
    if(education_level == "2º"){
      return "2º Ano Ensino Médio";
    }else
    if(education_level == "3º"){
      return "3º Ano Ensino Médio";
    }
    
  }
}