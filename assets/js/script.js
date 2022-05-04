let visorExpressao = document.getElementById('resultado')
visorExpressao.innerHTML = '0'
let calculo = document.getElementById('calculo')
calculo.innerHTML = 'crie um cálculo'
let historico = document.getElementById('historico')
let listaDeCalculos = document.getElementById('listaDeCalculos')
let calculadora = document.getElementById('calculadora')

var dadosHistorico = [] //armazenar todos os calculos feitos e guardados na memória.
var calculado = false //serve para auxiliar no reset da expressao após o calculo ser feito
var input = 0 // serve para auxiliar na criação das expressões.

function botaoNumerico(value) {
  if (visorExpressao.innerHTML == '0' && value != '.') {
    visorExpressao.innerHTML = ''
  }
  if (!(value == '.') || !input.match(/[.]/)) {
    input += value
    visorExpressao.innerHTML += value
    console.log(input)
  }
  if (calculado) {
    //Após o calculo ser feito, só será aceito operadores e não números ou pontos.
    if (value == '.') {
      visorExpressao.innerHTML = ''
      input = 0
    } else {
      visorExpressao.innerHTML = value
      calculado = false
    }
  }
}

function botaoOperador(operator) {
  if (input !== 0 && input !== ' - ') {
    // estilização do sinal de multiplicação
    if (operator === ' * ') {
      visorExpressao.innerHTML += ' x '
      input = 0
    }
    if (operator !== ' * ') {
      visorExpressao.innerHTML += operator
      input = 0
    }
  }
  // Permiti que o primeiro pode ser negativo
  if (visorExpressao.innerHTML == '0' && operator == ' - ') {
    visorExpressao.innerHTML = operator
    input = 0
  }

  calculado = false
}

function calcular() {
  regex = /[0-9]/

  if (regex.test(visorExpressao.innerHTML.slice(-1))) {
    //impede calculo de expressão imcompleta
    calculo.innerHTML = visorExpressao.innerHTML + ' = '
    var expressao = visorExpressao.innerHTML
    var expressaoCorrigida = expressao.replace(/[x]/g, ' * ') //corrigir sinal de multiplicação para eval
    var resultado = eval(expressaoCorrigida)
    dadosHistorico.push('\n' + calculo.innerHTML + resultado)
    console.log(dadosHistorico)
    visorExpressao.innerHTML = resultado
    calculado = true
  } else {
    calculadora.animate(
      [ //Executa uma animação quando a operação é incompleta
        { transform: 'translate(1px, 1px) rotate(0deg)' },
        { transform: 'translate(-1px, -2px) rotate(-1deg)' },
        { transform: 'translate(-3px, 0px)  rotate(1deg)' },
        { transform: 'translate(3px, 2px)  rotate(0deg)' },
        { transform: 'translate(1px, -1px)  rotate(1deg)' },
        { transform: 'translate(-1px, 2px)  rotate(-1deg)' },
        { transform: 'translate(-3px, 1px)  rotate(0deg)' },
        { transform: 'translate(3px, 1px)  rotate(-1deg)' },
        { transform: 'translate(-1px, -1px) rotate(1deg)' },
        { transform: 'translate(1px, 2px)  rotate(0deg)' },
        { transform: 'translate(1px, -2px) rotate(-1deg)' }
      ],
      {
        duration: 500
      }
    )
    document.body.style.filter = 'grayscale(100%)'
    setTimeout(function () {
      window.alert('Cálculo não pode ser realizado com operação vazia'),
        (document.body.style.filter = 'grayscale(0%)')
    }, 700)
    preventDefault()
  }
}

function deletar() {
  visorExpressao.innerHTML = '0'
  calculo.innerHTML = 'crie um cálculo'
  input = 0
}

function corrigir() {
  regex = /[0-9]/
  // Regex usando pra calibrar a correção.
  if (regex.test(visorExpressao.innerHTML.slice(-1))) {
    input = input.slice(0, -1)
    visorExpressao.innerHTML = visorExpressao.innerHTML.slice(0, -1)
    if (visorExpressao.innerHTML == '') {
      input = 0
      visorExpressao.innerHTML = 0
    }
  } else {
    input = input.slice(0, -2)
    visorExpressao.innerHTML = visorExpressao.innerHTML.slice(0, -2)
  }
}

// FUNÇAO Salvar dados
function salvar() {
  listaDeCalculos.innerHTML = '' //Reseta os dados Historicos no listaDeCalculos

  for (let i = 0; i < dadosHistorico.length; i++) {
    listaDeCalculos.innerHTML += `<li>${dadosHistorico[i]}` + '</li>'
  }
}

function limparMemoria() {
  dadosHistorico.length = 0
  listaDeCalculos.innerHTML = ''
}

// Acessibilidade via teclado
document.addEventListener('keydown', function (e) {
  switch (e.key) {
    case '1':
      botaoNumerico('1')
      break
    case '2':
      botaoNumerico('2')
      break
    case '3':
      botaoNumerico('3')
      break
    case '4':
      botaoNumerico('4')
      break
    case '5':
      botaoNumerico('5')
      break
    case '6':
      botaoNumerico('6')
      break
    case '7':
      botaoNumerico('7')
      break
    case '8':
      botaoNumerico('8')
      break
    case '9':
      botaoNumerico('9')
      break
    case '0':
      botaoNumerico('0')
      break
    case '.':
      botaoNumerico('.')
      break
    case ',':
      botaoNumerico('.')
      break
    case '/':
      botaoOperador(' / ')
      break
    case '*':
      botaoOperador(' * ')
      break
    case '-':
      botaoOperador(' - ')
      break
    case '+':
      botaoOperador(' + ')
      break
    case 'Enter':
      calcular()
      break
    case 'Backspace':
      corrigir()
      break
    case 'Delete':
      deletar()
      break
    case 'Insert':
      salvar()
      break
    case 'End':
      limparMemoria()
      break
    default:
      console.log('ERRO')
  }
})

// Aparecimento da Modal
let modal = document.getElementById('modal')

// evento de envio do form, que valida os inputs
function start(){
  modal.style.visibility = "hidden"

}
// Abrir modal - ajuda
function help(){
  modal.style.visibility = "visible"
}

//Ao clicar em qualquer lugar da tela
// window.addEventListener("click", function() {
//   modal.style.display = "none"
// })


