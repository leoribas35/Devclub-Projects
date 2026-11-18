const originSelect = document.querySelector(".origin-select");
const currencySelect = document.querySelector(".currency-select");

const inputCurrency = document.querySelector(".input-currency");
const convertButton = document.querySelector(".convert-button");

const originName = document.querySelector(".origin-name");
const currencyName = document.querySelector(".currency-name");

const originValue = document.querySelector(".currency-value-to-convert");
const convertedValue = document.querySelector(".currency-value");

const originFlag = document.querySelector(".origin-flag");
const currencyFlag = document.querySelector(".currency-flag");

const errorMessage = document.querySelector(".error-message");

const currencies = {
    BRL: {
        name: "Real Brasileiro",
        locale: "pt-BR",
        flag: "./brasil.png"
    },

    USD: {
        name: "Dólar Americano",
        locale: "en-US",
        flag: "./estados-unidos.png"
    },

    EUR: {
        name: "Euro",
        locale: "de-DE",
        flag: "./bandeira-do-euro.png"
    },

    GBP: {
        name: "Libra",
        locale: "en-GB",
        flag: "./libra.png"
    },
    BTC: {
        name: "Bitcoin",
        locale: "en-US",
        flag: "./bitcoin.png"
    },
};

function formatCurrency(value, currency) {
    return new Intl.NumberFormat(currencies[currency].locale, {
        style: "currency",
        currency: currency
    }).format(value);
}

function updateCurrencyInfo() {
    const origin = originSelect.value;
    const target = currencySelect.value;

    originName.textContent = currencies[origin].name;
    currencyName.textContent = currencies[target].name;

    originFlag.src = currencies[origin].flag;
    currencyFlag.src = currencies[target].flag;

    originFlag.alt = `Bandeira da moeda ${currencies[origin].name}`;
    currencyFlag.alt = `Bandeira da moeda ${currencies[target].name}`;
}

async function convertValues() {

    const origin = originSelect.value;
    const target = currencySelect.value;
    const amount = Number(inputCurrency.value);

    errorMessage.textContent = "";

    if (inputCurrency.value.trim() === "" || !Number.isFinite(amount) || amount <= 0) {
        errorMessage.textContent = "Digite um valor maior que zero.";
        return;
    }

    updateCurrencyInfo();

    originValue.textContent = formatCurrency(amount, origin);

    if (origin === target) {
        convertedValue.textContent = formatCurrency(amount, target);
        return;
    }

    convertButton.disabled = true;
    convertButton.textContent = "Convertendo...";

    try {

        const url ="https://api.frankfurter.dev/v2/rate/${origin}/${target}";

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (typeof data.rate !== "number") {
            throw new Error("Cotação não encontrada.");
        }

        const result = amount * data.rate;

        convertedValue.textContent = formatCurrency(result, target);

    } catch (error) {

        console.error("Erro na conversão:", error);

        errorMessage.textContent =
            "Não foi possível realizar a conversão. Verifique sua conexão.";

    } finally {

        convertButton.disabled = false;
        convertButton.textContent = "Converter";

    }
}

convertButton.addEventListener("click", convertValues);

originSelect.addEventListener("change", updateCurrencyInfo);

currencySelect.addEventListener("change", updateCurrencyInfo);

updateCurrencyInfo();