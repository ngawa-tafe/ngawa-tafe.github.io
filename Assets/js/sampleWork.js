const commodityCheckbox = document.getElementById("CommodityCheckbox");
const inflationCheckbox = document.getElementById("InflationCheckbox");
const userInput = document.getElementById("UserInput");
const responseArea = document.getElementById("ResponseArea");
const fetchBtn = document.getElementById("FetchBtn");
let url = "";
const alphaCheckRegEx = /^[A-Za-z]+$/;
const alphaCheckWithSpacesRegEx = /^[A-Za-z\\s]*$/;

commodityCheckbox.addEventListener("click", () => {
    if (commodityCheckbox.checked) {
        inflationCheckbox.checked = false;
        userInput.value = "";
        userInput.placeholder = "Enter any commodity (e.g., Gold)";
        responseArea.innerHTML = "";
    } else {
        userInput.placeholder = "Choose an API";
    }
});

inflationCheckbox.addEventListener("click", () => {
    if (inflationCheckbox.checked) {
        commodityCheckbox.checked = false;
        userInput.value = "";
        userInput.placeholder = "Enter any country (e.g., Austria)";
        responseArea.innerHTML = "";
    } else {
        userInput.placeholder = "Choose an API";
    }
});

fetchBtn.addEventListener("click", async () => {
    userInput.value.trim();
    try {
        if (commodityCheckbox.checked) {
            if (userInput.value.length === 0) {
                responseArea.innerHTML = "Enter a commodity name to get response";
                return;
            }
            if (!alphaCheckRegEx.test(userInput.value)) {
                responseArea.innerHTML = "Invalid input: only letters are allowed — no numbers, spaces, or special characters.";
                return;
            }
            url = `https://api.api-ninjas.com/v1/commodityprice?name=${encodeURI((userInput.value.toLowerCase()))}`;
            const response = await fetch(url, {
                headers: {'X-Api-Key': 'wlx95HdOdhn5K8gNx2t/Ww==f0Uv9jmc3FV7Jh5l'}, method: "GET"
            });
            if (!response.ok) {
                const error = await response.json()
                responseArea.innerHTML = `Error: ${error.error}`;
                return;
            }
            const data = await response.json();
            if (data.length === 0) {
                responseArea.innerHTML = `No response found`;
                return;
            }
            responseArea.innerHTML = `
            <div class="response-item">
                <p><strong>Exchange:</strong> ${data.exchange}</p>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Price:</strong> ${data.price} USD</p>
                <p><strong>Updated unix stamp:</strong> ${data.updated}</p>
            </div>`;
        } else if (inflationCheckbox.checked) {
            if (!alphaCheckWithSpacesRegEx.test(userInput.value)) {
                responseArea.innerHTML = "Invalid input — only letters are allowed - can have spaces";
            }
            url = `https://api.api-ninjas.com/v1/inflation?country=${encodeURI((userInput.value))}`;
            const response = await fetch(url, {
                headers: {'X-Api-Key': 'wlx95HdOdhn5K8gNx2t/Ww==f0Uv9jmc3FV7Jh5l'}, method: "GET"
            });
            if (!response.ok) {
                const error = await response.json()
                responseArea.innerHTML = `Error: ${error.error}`;
                return;
            }
            const data = await response.json();
            if (data.length === 0) {
                responseArea.innerHTML = `No response found.`;
                return;
            }
            let html = "";
            data.forEach(item => {
                html += `
                <div class="response-item">
                    <p><strong>Country:</strong> ${item.country}</p>
                    <p><strong>Period:</strong> ${item.period}</p>
                    <p><strong>Type:</strong> ${item.type}</p>
                    <p><strong>Monthly Rate:</strong> ${item.monthly_rate_pct}%</p>
                    <p><strong>Yearly Rate:</strong> ${item.yearly_rate_pct}%</p>
                </div>`;
            });
            responseArea.innerHTML = html;
        } else {
            responseArea.innerHTML = "Please select an API to get response";
        }
    } catch (error) {
        responseArea.innerHTML = `Error: ${error.message}`;
    }
});