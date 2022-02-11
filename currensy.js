const [dropList, fromCurrency, toCurrency, getButton, exchangeIcon] = [document.querySelectorAll("form select"), document.querySelector(".from select"), document.querySelector(".to select"), document.querySelector("form button"), document.querySelector("form .icon")]

for (let i = 0; i < dropList.length; i++) {
    for(let currency_code in country_list){
        let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "UZS" ? "selected" : "";
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target);
    });
}

function loadFlag(element){
    for(let code in country_list){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}

window.addEventListener("load", () => getExchangeRate());

getButton.addEventListener("click", e => {
    if (!isNaN(input.value)) {
        e.preventDefault(); 
        getExchangeRate()
    } else {
        alert('Deeng')
        input.value = null
    }
});

exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
})

function getExchangeRate(){
    const [amount, exchangeRateTxt] =[ document.querySelector("form input"), document.querySelector("form .exchange-rate")]
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Sabr...";
    let url = `https://v6.exchangerate-api.com/v6/cb2907d2a2d7ac0e9832d3fd/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    }).catch(() =>{
        exchangeRateTxt.innerText = "Texnik nosozlik";
    });
}