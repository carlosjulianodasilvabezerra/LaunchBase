// Criar um programa que calcula a média
// das grades das turmas de students e envia mensagem
// do cálculo da média.
const studentsClassA = [
    {
        name:"João",
        grade:6.7
    },
    {
        name: "Maria",
        grade: 4.3
    },
    {
        name: "Josefa",
        grade: 3.8
    },
    {
        name: "Josefina",
        grade: 8
    }
]

const studentsClassB = [
    {
        name:"John",
        grade:9.3
    },
    {
        name: "Mary",
        grade: 7.2
    },
    {
        name: "Joseph",
        grade: 10
    },
    {
        name:"novo student",
        grade:2
    }
]

function calcAverage(students){
    let sum = 0
    for (let i = 0; i < students.length; i++){
        sum = sum + students[i].grade
    }
    const average = sum / students.length
    return average
}

function sendMessage(average, Class){
    if(average >= 6){
        console.log(`Average: ${average}. The average is higher than 6. Congratulations to ${Class}!`)
    } else {
        console.log(`Average: ${average}. The average is lower than 6. ${Class} needs to study more!`)
    }
}

// Marcar student como flunked se grade menor que 5
function markFlunked(student){
    student.flunked = false
    if(student.grade < 6){
        student.flunked = true
    }
}

function sendMessageFlunked(student){
    if (student.flunked == true){
        console.log(`${student.name} has flunked!`)
    }
}

function studentsFlunked(students){
    for (let student of students){
        markFlunked(student)
        sendMessageFlunked(student)
    }
}

const average1 = calcAverage(studentsClassA).toFixed(2)
const average2 = calcAverage(studentsClassB).toFixed(2)
studentsFlunked(studentsClassA)
studentsFlunked(studentsClassB)
sendMessage(average1, "Class A")
sendMessage(average2, "Class B")