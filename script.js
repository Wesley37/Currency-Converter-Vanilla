let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const fromCurrencyInput = document.getElementById("fromCurrencyInput");
const fromAutocompleteItems = document.getElementById("fromAutocompleteItems");


const toCurrencyInput = document.getElementById("toCurrencyInput");
const toAutocompleteItems = document.getElementById("toAutocompleteItems");


function filterCurrencies(inputValue) {
    return currencies.filter(function (currency) {
        return currency.toUpperCase().startsWith(inputValue.toUpperCase());
    });
}


function showAutocompleteItems(inputValue, autocompleteItems) {
    autocompleteItems.innerHTML = "";

    const filteredCurrencies = filterCurrencies(inputValue);


    filteredCurrencies.forEach(function (currency) {
        const item = document.createElement("div");
        item.classList.add("autocomplete-item");
        item.textContent = currency;
        autocompleteItems.appendChild(item);
    });

    autocompleteItems.style.display = "block";
}

function hideAutocompleteItems(autocompleteItems) {
    autocompleteItems.style.display = "none";
}


fromCurrencyInput.addEventListener("input", function () {
    const inputValue = fromCurrencyInput.value;

    if (inputValue.length > 0) {
        showAutocompleteItems(inputValue, fromAutocompleteItems);
    } else {
        hideAutocompleteItems(fromAutocompleteItems);
    }
});


fromAutocompleteItems.addEventListener("click", function (event) {
    const selectedCurrency = event.target.textContent;
    fromCurrencyInput.value = selectedCurrency;
    hideAutocompleteItems(fromAutocompleteItems);
});


toCurrencyInput.addEventListener("input", function () {
    const inputValue = toCurrencyInput.value;

    if (inputValue.length > 0) {
        showAutocompleteItems(inputValue, toAutocompleteItems);
    } else {
        hideAutocompleteItems(toAutocompleteItems);
    }
});


toAutocompleteItems.addEventListener("click", function (event) {
    const selectedCurrency = event.target.textContent;
    toCurrencyInput.value = selectedCurrency;
    hideAutocompleteItems(toAutocompleteItems);
});


fromCurrencyInput.value = "GBP";
toCurrencyInput.value = "BRL";

let convertCurrency = () => {

  const amount = document.querySelector("#amount").value;
  const fromCurrency = fromCurrencyInput.value;
  const toCurrency = toCurrencyInput.value;


  if (amount.length != 0) {
    fetch(api)
      .then((resp) => resp.json())
      .then((data) => {
        let fromExchangeRate = data.conversion_rates[fromCurrency];
        let toExchangeRate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
        result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(
          2
        )} ${toCurrency}`;
      });
  } else {
    alert("Please fill in the amount");
  }
};

document
  .querySelector("#convert-button")
  .addEventListener("click", convertCurrency);
window.addEventListener("load", convertCurrency);