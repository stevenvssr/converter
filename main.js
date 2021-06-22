 class FetchWrapper {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    get(endpoint) {
        return fetch(this.baseURL + endpoint)
            .then(response => response.json());
    }

    put(endpoint, body) {
        return this._send("put", endpoint, body);
    }

    post(endpoint, body) {
        return this._send("post", endpoint, body);
    }

    delete(endpoint, body) {
        return this._send("delete", endpoint, body);
    }

    _send(method, endpoint, body) {
        return fetch(this.baseURL + endpoint, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(response => response.json());
    }
}

const API = new FetchWrapper(`https://v6.exchangerate-api.com/v6/84320eb3e9ab0de226b70bea/latest/`)

const base = document.querySelector("#base-currency");
const target = document.querySelector("#target-currency");
const result = document.querySelector("#conversion-result");

const getConversionRates = () => {
    API.get(`${base.value}`)
    .then(data => {
        result.textContent = `${data.conversion_rates[target.value]}`
    })
}

base.addEventListener("change", () => {
    getConversionRates();
})

target.addEventListener("change", () => {
    getConversionRates();
})
