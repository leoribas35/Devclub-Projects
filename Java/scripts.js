const convertbutton = document.querySelector(".convert-button")
const convertButton = document.querySelector(".currency-select")

function convertValues(){
const inputCurrencyValue = document.querySelector(".input-currency").value
const currencyValeuToConvert = document.querySelector(".currency-value-to-convert")
const currencyValueConverted = document.querySelector(".currency-value")    

const dolarToday = 5.2
const euroToday = 6.2

const convertedValue = inputCurrencyValue / dolarToday;

if(currencySelect.value === ""){
    currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
}).format(convertedValue/dolarToday);


}

if(currencySelect.value === "euro")    currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {      style: "currency",
      currency: "EUR"
    }).format(convertedValue);  
}  
    
    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
}).format(inputCurrencyValue);

convertButton.addEventListener("click", convertValues)