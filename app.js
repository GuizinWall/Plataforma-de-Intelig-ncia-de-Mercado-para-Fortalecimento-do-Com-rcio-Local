// ==========================================
// MARKETPULSE LOCAL
// Seleção do consumidor
// ==========================================

let selectedCustomerId = localStorage.getItem("marketpulse_customer_id") || "ana";
let personalizationEnabled = false;
function getSelectedCustomer() {
    return demoCustomers.find(customer => customer.id === selectedCustomerId);
}

function selectCustomer(customerId) {
    const customer = demoCustomers.find(
        customer => customer.id === customerId
    );

    if (!customer) {
        return;
    }

    selectedCustomerId = customer.id;

    localStorage.setItem(
        "marketpulse_customer_id",
        customer.id
    );

    const selectedArea = document.getElementById(
        "cliente-selecionado"
    );

    if (selectedArea) {
        selectedArea.innerHTML = `
            <p>
                <strong>Consumidor selecionado:</strong>
                ${customer.name}
            </p>

            <p>
                <strong>Cidade:</strong>
                ${customer.city}
            </p>

            <p>
                <strong>Bairro:</strong>
                ${customer.neighborhood}
            </p>
        `;
    }

    alert(
        `Consumidor selecionado: ${customer.name}\n` +
        `Cidade: ${customer.city}\n` +
        `Bairro: ${customer.neighborhood}`
    );
}

function setupCustomerButtons() {
    const buttons = document.querySelectorAll("#cliente button");

    buttons.forEach(button => {
        const name = button.textContent.trim();

        const customer = demoCustomers.find(
            customer => customer.name === name
        );

        if (customer) {
            button.addEventListener("click", () => {
                selectCustomer(customer.id);
            });
        }
    });
}

setupCustomerButtons();

// ==========================================
// INTERPRETAÇÃO DA BUSCA
// ==========================================

function interpretSearch(text) {
    const search = text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    if (
        search.includes("racao") ||
        search.includes("gato") ||
        search.includes("pet")
    ) {
        return {
            category: "pet",
            product: "Ração para gato 10 kg"
        };
    }

    if (
        search.includes("caderno") ||
        search.includes("universitario") ||
        search.includes("papelaria")
    ) {
        return {
            category: "stationery",
            product: "Caderno universitário 10 matérias"
        };
    }

    if (
        search.includes("fone") ||
        search.includes("bluetooth") ||
        search.includes("audio")
    ) {
        return {
            category: "electronics",
            product: "Fone Bluetooth"
        };
    }

    return {
        category: null,
        product: null
    };
}


function handleSearch() {
    const input = document.querySelector(
        "#cliente input"
    );

    if (!input) {
        return;
    }

    const text = input.value.trim();

    if (!text) {
        alert("Digite o que você está procurando.");
        return;
    }

    const result = interpretSearch(text);

    if (!result.product) {
        document.getElementById("produtos").innerHTML = `
            <p>
                Não encontramos esse produto na demonstração.
            </p>
        `;

        return;
    }

    const products = demoProducts.filter(
        product => product.category === result.category
    );

    displayProducts(products);
}


function setupSearchButton() {
    const buttons = document.querySelectorAll(
        "#cliente button"
    );

    buttons.forEach(button => {
        if (button.textContent.trim() === "Enviar") {
            button.addEventListener(
                "click",
                handleSearch
            );
        }
    });
}


setupSearchButton();

function displayProducts(products) {
    const container = document.getElementById("produtos");

    if (!container) {
        return;
    }

    if (products.length === 0) {
        container.innerHTML = `
            <p>
                Nenhuma oferta encontrada.
            </p>
        `;

        return;
    }

    container.innerHTML = products.map(product => {
        const merchant = demoMerchants.find(
            merchant => merchant.id === product.merchantId
        );
        const customer = getSelectedCustomer();

const distance = customer && merchant
    ? calculateDistance(
        customer.lat,
        customer.lng,
        merchant.lat,
        merchant.lng
    )
    : null;

        return `
            <div class="produto-card">
                <h4>${product.name}</h4>

                <p>
                    <strong>Loja:</strong>
                    ${merchant ? merchant.name : "Loja"}
                </p>

                <p>
                    <strong>Preço:</strong>
                    R$ ${product.price.toFixed(2).replace(".", ",")}
                </p>
                <p>
    <strong>Distância:</strong>
    ${distance !== null
        ? distance.toFixed(1).replace(".", ",") + " km"
        : "Não disponível"}
</p>
<button
    class="why-button"
    onclick="showRecommendationReason('${product.id}')"
>
    Por que apareceu aqui?
</button>
<button
    class="interest-button"
    onclick="showInterestForm('${product.id}')"
>
    Tenho interesse
</button>

<div
    id="interest-${product.id}"
    style="display: none;"
></div>

<div
    id="reason-${product.id}"
    class="recommendation-reason"
    style="display: none;"
></div>

                <p>
                    <strong>Status:</strong>
                    ${product.status === "available"
                        ? "Disponível"
                        : "Estoque baixo"}
                </p>
            </div>
        `;
    }).join("");
}

// ==========================================
// CÁLCULO DE DISTÂNCIA
// ==========================================

function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371;

    const latDifference = (
        (lat2 - lat1) * Math.PI
    ) / 180;

    const lonDifference = (
        (lon2 - lon1) * Math.PI
    ) / 180;

    const a =
        Math.sin(latDifference / 2) *
        Math.sin(latDifference / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(lonDifference / 2) *
        Math.sin(lonDifference / 2);

    const c =
        2 * Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );

    return earthRadius * c;
}

// ==========================================
// ORDENAÇÃO POR DISTÂNCIA
// ==========================================

function sortByDistance(products) {
    const customer = getSelectedCustomer();

    if (!customer) {
        return products;
    }

    return [...products].sort((a, b) => {
        const merchantA = demoMerchants.find(
            merchant => merchant.id === a.merchantId
        );

        const merchantB = demoMerchants.find(
            merchant => merchant.id === b.merchantId
        );

        if (!merchantA || !merchantB) {
            return 0;
        }

        const distanceA = calculateDistance(
            customer.lat,
            customer.lng,
            merchantA.lat,
            merchantA.lng
        );

        const distanceB = calculateDistance(
            customer.lat,
            customer.lng,
            merchantB.lat,
            merchantB.lng
        );

        return distanceA - distanceB;
    });
}

// ==========================================
// BOTÃO MAIS PERTO
// ==========================================

function setupSortButtons() {
    const buttons = document.querySelectorAll(
        "#cliente button"
    );

    buttons.forEach(button => {
        if (button.textContent.trim() === "Mais perto") {
            button.addEventListener("click", () => {

                const input = document.querySelector(
                    "#cliente input"
                );

                const result = interpretSearch(
                    input.value.trim()
                );

                if (!result.product) {
                    alert(
                        "Faça primeiro uma busca válida."
                    );
                    return;
                }

                const products = demoProducts.filter(
                    product =>
                        product.category === result.category
                );

                const sortedProducts =
                    sortByDistance(products);

                displayProducts(sortedProducts);
            });
        }
    });
}

setupSortButtons();

// ==========================================
// ORDENAÇÃO POR PREÇO
// ==========================================

function sortByPrice(products) {
    return [...products].sort((a, b) => {
        return a.price - b.price;
    });
}

// ==========================================
// BOTÃO MENOR PREÇO
// ==========================================

function setupPriceButton() {
    const buttons = document.querySelectorAll(
        "#cliente button"
    );

    buttons.forEach(button => {
        if (button.textContent.trim() === "Menor preço") {
            button.addEventListener("click", () => {

                const input = document.querySelector(
                    "#cliente input"
                );

                if (!input) {
                    return;
                }

                const result = interpretSearch(
                    input.value.trim()
                );

                if (!result.product) {
                    alert(
                        "Faça primeiro uma busca válida."
                    );
                    return;
                }

                const products = demoProducts.filter(
                    product =>
                        product.category === result.category
                );

                const sortedProducts =
                    sortByPrice(products);

                displayProducts(sortedProducts);
            });
        }
    });
}

setupPriceButton();

// ==========================================
// RANKING RECOMENDADO
// ==========================================

function calculateRecommendationScore(product) {
    const customer = getSelectedCustomer();

    if (!customer) {
        return 0;
    }

    const merchant = demoMerchants.find(
        merchant => merchant.id === product.merchantId
    );

    if (!merchant) {
        return 0;
    }

    const distance = calculateDistance(
        customer.lat,
        customer.lng,
        merchant.lat,
        merchant.lng
    );

    // Quanto menor a distância, maior a pontuação.
    const proximityScore = Math.max(
        0,
        100 - distance
    );

    // Considera R$ 200 como referência máxima.
    const priceScore = Math.max(
        0,
        100 - (product.price / 200) * 100
    );

    const availabilityScore =
        product.status === "available"
            ? 100
            : 50;

    // Neste primeiro momento consideramos lojas
    // fictícias novas como uma pequena vantagem.
    const newMerchantIds = [
        "novopet",
        "petmais",
        "papelcentro",
        "estudamais",
        "teclocal"
    ];

    const newMerchantScore =
        newMerchantIds.includes(product.merchantId)
            ? 100
            : 0;

    const score =
        proximityScore * 0.55 +
        priceScore * 0.25 +
        availabilityScore * 0.10 +
        newMerchantScore * 0.10;

    return score;
}


function sortByRecommendation(products) {
    return [...products].sort((a, b) => {
        const scoreA =
            calculateRecommendationScore(a);

        const scoreB =
            calculateRecommendationScore(b);

        return scoreB - scoreA;
    });
}

// ==========================================
// BOTÃO RECOMENDADO
// ==========================================

function setupRecommendedButton() {
    const buttons = document.querySelectorAll(
        "#cliente button"
    );

    buttons.forEach(button => {
        if (button.textContent.trim() === "Recomendado") {
            button.addEventListener("click", () => {

                const input = document.querySelector(
                    "#cliente input"
                );

                if (!input) {
                    return;
                }

                const result = interpretSearch(
                    input.value.trim()
                );

                if (!result.product) {
                    alert(
                        "Faça primeiro uma busca válida."
                    );
                    return;
                }

                const products = demoProducts.filter(
                    product =>
                        product.category === result.category
                );

                const sortedProducts =
                    sortByRecommendation(products);

                displayProducts(sortedProducts);
            });
        }
    });
}

setupRecommendedButton();

// ==========================================
// BOTÃO DE PERSONALIZAÇÃO
// ==========================================

function setupPersonalizationButton() {
    const buttons = document.querySelectorAll(
        "#cliente button"
    );

    buttons.forEach(button => {
        if (
            button.textContent.trim() ===
            "Personalização desligada"
        ) {
            button.addEventListener("click", () => {

                personalizationEnabled =
                    !personalizationEnabled;

                if (personalizationEnabled) {
                    button.textContent =
                        "Personalização ligada";
                } else {
                    button.textContent =
                        "Personalização desligada";
                }

                const input = document.querySelector(
                    "#cliente input"
                );

                if (!input || !input.value.trim()) {
                    return;
                }

                const result = interpretSearch(
                    input.value.trim()
                );

                if (!result.product) {
                    return;
                }

                const products = demoProducts.filter(
                    product =>
                        product.category === result.category
                );

                let sortedProducts;

                if (personalizationEnabled) {
                    sortedProducts =
                        sortByPersonalization(products);
                } else {
                    sortedProducts =
                        sortByRecommendation(products);
                }

                displayProducts(sortedProducts);
            });
        }
    });
}

setupPersonalizationButton();

// ==========================================
// RANKING PERSONALIZADO
// ==========================================

function sortByPersonalization(products) {
    const customer = getSelectedCustomer();

    if (!customer) {
        return products;
    }

    return [...products].sort((a, b) => {
        const scoreA = getPersonalizedScore(a, customer);
        const scoreB = getPersonalizedScore(b, customer);

        return scoreB - scoreA;
    });
}


function getPersonalizedScore(product, customer) {
    const merchant = demoMerchants.find(
        merchant => merchant.id === product.merchantId
    );

    if (!merchant) {
        return 0;
    }

    let score = 0;

    // ------------------------------------------
    // 1. Preferência por categoria
    // ------------------------------------------

    if (
        customer.preferences &&
        customer.preferences.category === product.category
    ) {
        score += 40;
    }

    // ------------------------------------------
    // 2. Preferência por preço
    // ------------------------------------------

    if (
        customer.preferences &&
        customer.preferences.maxPrice &&
        product.price <= customer.preferences.maxPrice
    ) {
        score += 30;
    }

    // ------------------------------------------
    // 3. Critério principal
    // ------------------------------------------

    if (
        customer.preferences &&
        customer.preferences.mainCriterion === "distance"
    ) {
        const distance = calculateDistance(
            customer.lat,
            customer.lng,
            merchant.lat,
            merchant.lng
        );

        score += Math.max(0, 30 - distance);
    }

    if (
        customer.preferences &&
        customer.preferences.mainCriterion === "price"
    ) {
        score += Math.max(
            0,
            30 - (product.price / 10)
        );
    }

    // ------------------------------------------
    // 4. Disponibilidade
    // ------------------------------------------

    if (product.status === "available") {
        score += 10;
    }

    return score;
}

// ==========================================
// EXPLICAÇÃO DA RECOMENDAÇÃO
// ==========================================

function showRecommendationReason(productId) {
    const product = demoProducts.find(
        product => product.id === productId
    );

    if (!product) {
        return;
    }

    const customer = getSelectedCustomer();

    const merchant = demoMerchants.find(
        merchant => merchant.id === product.merchantId
    );

    if (!customer || !merchant) {
        return;
    }

    const distance = calculateDistance(
        customer.lat,
        customer.lng,
        merchant.lat,
        merchant.lng
    );

    let reasons = [];

    if (
        customer.preferences &&
        customer.preferences.category === product.category
    ) {
        reasons.push(
            "combina com uma categoria de interesse"
        );
    }

    if (
        customer.preferences &&
        customer.preferences.maxPrice &&
        product.price <= customer.preferences.maxPrice
    ) {
        reasons.push(
            "está dentro da faixa de preço"
        );
    }

    if (product.status === "available") {
        reasons.push(
            "está disponível"
        );
    }

    if (distance <= 20) {
        reasons.push(
            "está próximo da localização simulada"
        );
    }

    if (reasons.length === 0) {
        reasons.push(
            "faz parte das ofertas encontradas para esta busca"
        );
    }

    const reasonArea = document.getElementById(
        `reason-${product.id}`
    );

    if (!reasonArea) {
        return;
    }

    reasonArea.style.display = "block";

    reasonArea.innerHTML = `
        <strong>Por que apareceu aqui?</strong>
        <p>
            Este produto foi recomendado porque
            ${reasons.join(", ")}.
        </p>
    `;
}
// ==========================================
// FORMULÁRIO DE INTERESSE
// ==========================================

function showInterestForm(productId) {
    const area = document.getElementById(
        `interest-${productId}`
    );

    if (!area) {
        return;
    }

    area.style.display = "block";

    area.innerHTML = `
        <div class="interest-form">

            <h4>Quando pretende comprar?</h4>

            <select id="purchase-time-${productId}">
                <option value="">
                    Selecione uma opção
                </option>

                <option value="today">
                    Hoje
                </option>

                <option value="this_week">
                    Esta semana
                </option>

                <option value="this_month">
                    Este mês
                </option>

                <option value="researching">
                    Apenas pesquisando
                </option>
            </select>

            <h4>
                Qual critério é mais importante?
            </h4>

            <select id="main-criterion-${productId}">
                <option value="">
                    Selecione uma opção
                </option>

                <option value="price">
                    Preço
                </option>

                <option value="distance">
                    Distância
                </option>

                <option value="availability">
                    Disponibilidade
                </option>

                <option value="brand">
                    Marca
                </option>
            </select>

            <button
                onclick="saveInterest('${productId}')"
            >
                Confirmar interesse
            </button>

        </div>
    `;
}
// ==========================================
// SALVAR INTERESSE
// ==========================================

function saveInterest(productId) {
    const customer = getSelectedCustomer();

    const product = demoProducts.find(
        product => product.id === productId
    );

    if (!customer || !product) {
        alert("Não foi possível identificar o consumidor ou produto.");
        return;
    }

    const purchaseSelect = document.getElementById(
        `purchase-time-${productId}`
    );

    const criterionSelect = document.getElementById(
        `main-criterion-${productId}`
    );

    if (!purchaseSelect || !criterionSelect) {
        alert("Formulário de interesse não encontrado.");
        return;
    }

    const purchaseTime = purchaseSelect.value;
    const mainCriterion = criterionSelect.value;

    if (!purchaseTime || !mainCriterion) {
        alert(
            "Selecione quando pretende comprar e o critério mais importante."
        );
        return;
    }

    const savedEvents =
        localStorage.getItem("marketpulse_events");

    let events = [];

    if (savedEvents) {
        events = JSON.parse(savedEvents);
    }

    const newEvent = {
        id: "event-" + Date.now(),
        customerId: customer.id,
        productId: product.id,
        category: product.category,
        city: customer.city,
        purchaseTime: purchaseTime,
        mainCriterion: mainCriterion,
        date: new Date().toISOString(),
        isDemo: true
    };

    events.push(newEvent);

    localStorage.setItem(
        "marketpulse_events",
        JSON.stringify(events)
    );

    alert("Interesse registrado na demonstração!");

    const area = document.getElementById(
        `interest-${productId}`
    );

    if (area) {
        area.innerHTML += `
            <p>
                ✅ Interesse registrado com sucesso.
            </p>
        `;
    }
}
function checkSavedEvents() {
    const events = localStorage.getItem(
        "marketpulse_events"
    );

    const area = document.getElementById(
        "saved-events"
    );

    if (!events) {
        area.textContent =
            "Nenhum evento salvo.";
        return;
    }

    area.textContent = events;
}
function testLocalStorage() {
    localStorage.setItem(
        "marketpulse_test",
        "funcionou"
    );

    const result = localStorage.getItem(
        "marketpulse_test"
    );

    const area = document.getElementById(
        "saved-events"
    );

    area.textContent =
        "Teste do localStorage: " + result;
}
// ==========================================
// NAVEGAÇÃO ENTRE CLIENTE E COMERCIANTE
// ==========================================

function showClientArea() {
    const clientArea = document.getElementById("cliente");
    const merchantArea = document.getElementById("comerciante");

    if (clientArea) {
        clientArea.style.display = "block";
    }

    if (merchantArea) {
        merchantArea.style.display = "none";
    }
}


function showMerchantArea() {
    const clientArea = document.getElementById("cliente");
    const merchantArea = document.getElementById("comerciante");

    if (clientArea) {
        clientArea.style.display = "none";
    }

    if (merchantArea) {
        merchantArea.style.display = "block";
    }
}
// ==========================================
// SELEÇÃO DA LOJA DO COMERCIANTE
// ==========================================

function setupMerchantSelector() {
    const select = document.getElementById(
        "merchant-select"
    );

    if (!select) {
        return;
    }

    select.addEventListener("change", () => {
        const merchantId = select.value;

        const area = document.getElementById(
            "selected-merchant-info"
        );

        if (!area) {
            return;
        }

        if (!merchantId) {
            area.innerHTML = `
                <p>
                    Nenhuma loja selecionada.
                </p>
            `;

            return;
        }

        const merchant = demoMerchants.find(
            merchant => merchant.id === merchantId
        );

        if (!merchant) {
            return;
        }

        area.innerHTML = `
            <div class="merchant-selected">
                <h3>${merchant.name}</h3>

                <p>
                    <strong>Cidade:</strong>
                    ${merchant.city}
                </p>

                <p>
                    <strong>Categoria:</strong>
                    ${merchant.category}
                </p>
            </div>
        `;
    });
}

setupMerchantSelector();