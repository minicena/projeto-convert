//Cotação de moedas do dia.
const USD = 4.87
const EUR = 5.32
const GBP = 6.08

//Obtendo os elementos do formulário.
const form =document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// Manipulando o input amount para receber somente números.
amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, "")
})

//Capturando o envento de submit do formulário.
form.onsubmit = () => {
    event.preventDefault()

    switch(currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, "US")
            break
        case "EUR":
            convertCurrency(amount.value, EUR, "€")
            break
        case "GBP": 
            convertCurrency(amount.value, GBP, "£")
            break
    }
}

//Função para converter a moeda.
function convertCurrency(amount,price,symbol){
  try {
    //Exibindo a contação da moeda selecionada.
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`
    
    //Calculando o total.
    let total  = amount * price

    //Verifica se o valor total é um número válido.
    if(isNaN(total)) {
        return alert("Por favor, insira um valor válido.")
    }

    //Formatando o total.
    total = formatCurrencyBRL(total).replace("R$", "")

    //Exibindo o resultado total.
    result.textContent = `${total} Reais`
    
    //Aplica a classe que exibe o resultado.
    footer.classList.add("show-result")


  } catch (error) {
    //Remove a classe que exibe o resultado em caso de erro.
    footer.classList.remove("show-result")
    console.error(error)
    alert("Não foi possível converter. Tente novamente mais tarde.")
  }
}

//Função para formatar o valor em moeda brasileira.
function formatCurrencyBRL(value) {
    //Converte para número para utilizar o toLocaleString.
    return Number(value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}