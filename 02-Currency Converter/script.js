/*
The converter needs 4 things:
--Amount
--From Currency
--To Currency
--Exchange Rate

Converted Amt = amount * exchange rate
*/
const amount = document.querySelector("#amount");
const fromCurr = document.querySelector("#fromCurrency");
const toCurr = document.querySelector("#toCurrency");
const btn = document.querySelector(".convert");
const result = document.querySelector("#result");

const reverse = document.querySelector("#swap");

const currencies = ["USD", "INR", "EUR", "GBP", "AUD", "NZD"];

currencies.forEach((currency) => {
  const option = document.createElement("option");

  option.textContent = currency;
  option.value = currency;

  fromCurr.appendChild(option);
  toCurr.appendChild(option.cloneNode(true));
});

const getExchangeRates = async function (from, to) {
  try {
    const response = await fetch(
      `https://api.frankfurter.dev/v2/rates?base=${from}&quotes=${to}`,
    );

    if (!response.ok) throw new Error("API couldn't be fetched");
    const data = await response.json();

    return data[0].rate;
  } catch (error) {
    // console.error(error);
    console.log(error.message);
    return null;
  }
};

btn.addEventListener("click", async function (event) {
  const amt = +amount.value;

  if (!amt) return;

  const from = fromCurr.value;
  const to = toCurr.value;

  let rate = from === to ? 1 : await getExchangeRates(from, to);

  if (rate === null) return;

  const ans = (amt * rate).toFixed(2);
  result.innerHTML = `${amt} ${from} = ${ans} ${to}`;
});

reverse.addEventListener("click", function (event) {
  let temp = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = temp;
});
