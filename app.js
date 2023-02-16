var buttonSubmit = document.querySelector('#app form button'); //Possibilitar o JS que usar o elemento para realizar atividades
var zipcodeField = document.querySelector('#app form input'); //Capturando todo campo de input, inclusive os valores inseridos
var content = document.querySelector('#app main') //Capturando o espaço cujo plot será realizado


buttonSubmit.addEventListener('click', run)//Definição função que será submetida através do click do buttonSubmt, supracitado

function run(){ //definição da função que será executada no click
    event.preventDefault(); //retira o comportamento padrão de recarregar a página após um submit


    var zipcode = zipcodeField.value;
    zipcode = zipcode.replace(' ', '');
    zipcode = zipcode.replace('-', '');
    zipcode = zipcode.replace('.', '');
    zipcode = zipcode.trim();  


    axios
    .get(`https://viacep.com.br/ws/${zipcode}/json/`)
    .then(function (response){

        if(response.data.erro){
            throw new Error('CEP invalido')
        }    

        content.innerHTML = ''
        createLine(response.data.localidade +" - "+ response.data.uf)
        createLine(response.data.ddd)       
    })
    .catch(function (error){
        console.log(error)
        content.innerHTML = ''
        createLine('Algo deu errado')
    })      

      
}

function createLine(text){
    
    var line = document.createElement('p')
    var text = document.createTextNode(text)  
    line.appendChild(text)
    content.appendChild(line)

}