//pegar dependencia usa require
// express é a dependencia que foi instalada

//comando para criar o servidor e sua porta
// o LIsten significa ouvir 

//()=>{}  significa uma função curta chamada erofunction

// processo de criação de rota
// __dirname significa o caminho do projeto
// sendFile -> enviar o arquivo
// render ira renderizar a pagina e para isso so informa o arquivo. Processo mais pratico do que o sendFile
//.use() significa configuração do servidor, fica normalmente os css

//express.static significa que o express está pegando tudo que está ta na pasta public que é estatico e chamando
// sempre que a varivel conter varios dados usa-se []

// req.query sao os envios que aparece após a ? no caminho da url quando enviamos ou recebemos infor de um banco


//dados
const proffys = [
    //indices dos fors dos labels criados no html
        {name: "Diego Fernandes", 
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsapp: "31993383485", 
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject: "Química", 
        cost: "20" , 
        weekday: [0], 
        time_from: [720], 
        time_to:[1220] 
    },

    {   name: "Wesley Phillipe", 
    avatar: "https://avatars3.githubusercontent.com/u/59942335?s=460&u=067bc61f0a36147d9fdcb34403a23090bed3bd7d&v=4", 
    whatsapp: "31993383485", 
    bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
    subject: "Química", 
    cost: "20" , 
    weekday: [1], 
    time_from: [720], 
    time_to:[1220] 
}
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"

]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"

]


function getSubject(subjectNumber){
    const arrayPosition = +subjectNumber -1
    return subjects[arrayPosition]
}



//funcionalidades da aplicação
function pageLanding(req, res) {
   // return resp.sendFile(__dirname + "/views/index.html")
   return res.render("index.html")
}

function pageStudy(req, res){
    
    const filters = req.query

    //return resp.sendFile(__dirname + "/views/study.html")
    return res.render("study.html", { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req,res){
    
    const data = req.query

    const isNotEmpty = Object.keys(data).length > 0 //pegando as chaves do objeto e transofrmando em um array
    //se tiver dados adicioanr
    if (isNotEmpty) {

        data.subject = getSubject(data.subject)
       //adicionar dados ao objeto/lista proffys
        proffys.push(data) 

        return res.redirect("/study")
    }
    

    //se nao tiver, mostrar a pagina
    //return resp.sendFile(__dirname + "/views/give-classes.html")
    return res.render("give-classes.html",  { subjects, weekdays })
}


//servidor
const express = require('express')
const server = express()

//importando o nunjucks (tamplate engine)
const nunjucks = require ('nunjucks')
//configurar nunjucks
 //1 - informa em qual pasta esta os arquivos htmls
// 2 - enviar algum objeto com algumas opções.
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

//inicio e configuração do servidor
server
//configurar arquivos estaticos (css, scripts, imagens)
.use(express.static("public"))

//

//rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)

//start do servidor
.listen(5500)