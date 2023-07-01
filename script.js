let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const fromRow = document.getElementById("custom-select custom-select-sm col-5");
const toRow = document.getElementById("custom-select custom-select-sm col-5");

currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    fromRow.add(option);
});

currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    toRow.add(option);
});

fromRow.value = "GBP";
toRow.value = "BRL";
