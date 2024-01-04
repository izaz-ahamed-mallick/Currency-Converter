const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let drpDwns = document.querySelectorAll(".input-container select");
let convertBtn = document.querySelector("#convertBtn");
let fromValue = document.querySelector(".from select");
let toValue = document.querySelector(".to select");
let result = document.querySelector("#result");
let reverseResult = document.querySelector("#reverseResult");

drpDwns.forEach((select) => {
  for (curcode in countryList) {
    let option = document.createElement("option");
    option.innerText = curcode;
    option.value = curcode;
    if (select.name === "from" && curcode === "INR") {
      option.selected = "selected";
    } else if (select.name === "to" && curcode === "USD") {
      option.selected = "selected";
    }
    select.appendChild(option);
  }
  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
});

function updateFlag(elem) {
  let curcode = elem.value;
  let countryCode = countryList[curcode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

  let img = elem.parentElement.querySelector("img");
  img.src = newSrc;
}

async function exchangeCurrency() {
  let amount = document.querySelector("#amount");
  let amountvalue = amount.value;

  if (amountvalue === "" || amountvalue < 1) {
    amountvalue = 1;
    amount.value = "1";
  }

  let url = `${BASE_URL}/${fromValue.value.toLowerCase()}/${toValue.value.toLowerCase()}.json`;
  let res = await fetch(url);
  let data = await res.json();
  let reverseRate = data[fromValue.value.toLowerCase()];
  let rate = data[toValue.value.toLowerCase()];

  console.log(fromValue.value);
  let finalamnt = amountvalue * rate;

  result.innerHTML = `${amountvalue} ${fromValue.value}  = <span>${finalamnt} ${toValue.value}</span>`;
}
const reverserRate = async () => {
  let url = `${BASE_URL}/${toValue.value.toLowerCase()}/${fromValue.value.toLowerCase()}.json`;
  let res = await fetch(url);
  let data = await res.json();
  let reverseRate = data[fromValue.value.toLowerCase()];
  reverseResult.innerHTML = `1 ${toValue.value} = ${reverseRate} ${fromValue.value}`;
};

convertBtn.addEventListener("click", (e) => {
  e.preventDefault();
  exchangeCurrency();
  reverserRate();
});

window.addEventListener("load", () => {
  exchangeCurrency();
});
