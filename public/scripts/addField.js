//procurar o botao

document.querySelector("#add-time")

//quando clicar no botão
  //utiliza muito os eventos de botão
.addEventListener('click', cloneField)

//executar uma ação (atraves da funçao criada)
function cloneField(){
    //duplicar os campos
    const newfieldContainer = document.querySelector('.schedule-item').cloneNode(true)

    //pegar os campos os campos
    const fields = newfieldContainer.querySelectorAll('input')

    //para cada campo limpar

    fields.forEach(function(field){
        //pegar o field do momento
        field.value = " "
    });


    //onde colocar o elemento na pagina
    document.querySelector('#schedule-items').appendChild(newfieldContainer)



      
}


