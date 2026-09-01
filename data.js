// ==========================================
// MARKETPULSE LOCAL
// Dados fictícios para demonstração escolar
// ==========================================

// ------------------------------------------
// CONSUMIDORES FICTÍCIOS
// ------------------------------------------

const demoCustomers = [
    {
        id: "ana",
        name: "Ana",
        city: "Jundiaí",
        neighborhood: "Centro",
        lat: -23.1857,
        lng: -46.8978,
        preferences: {
            categories: ["pet"],
            maxPrice: 150,
            mainCriterion: "distance",
            availability: "available"
        }
    },

    {
        id: "lucas",
        name: "Lucas",
        city: "Campinas",
        neighborhood: "Cambuí",
        lat: -22.9056,
        lng: -47.0608,
        preferences: {
            categories: ["electronics"],
            maxPrice: 200,
            mainCriterion: "price",
            availability: "available"
        }
    },

    {
        id: "camila",
        name: "Camila",
        city: "Curitiba",
        neighborhood: "Centro",
        lat: -25.4284,
        lng: -49.2733,
        preferences: {
            categories: ["stationery"],
            maxPrice: 100,
            mainCriterion: "availability",
            availability: "available"
        }
    }
];


// ------------------------------------------
// LOJAS FICTÍCIAS
// ------------------------------------------

const demoMerchants = [
    {
        id: "novopet",
        name: "NovoPet",
        city: "Jundiaí",
        category: "Pet shop",
        lat: -23.1857,
        lng: -46.8978
    },

    {
        id: "petmais",
        name: "Pet Mais",
        city: "Campinas",
        category: "Pet shop",
        lat: -22.9056,
        lng: -47.0608
    },

    {
        id: "casaanimal",
        name: "Casa Animal",
        city: "São Paulo",
        category: "Pet shop",
        lat: -23.5505,
        lng: -46.6333
    },

    {
        id: "papelcentro",
        name: "Papel Centro",
        city: "Jundiaí",
        category: "Papelaria",
        lat: -23.1857,
        lng: -46.8978
    },

    {
        id: "estudamais",
        name: "Estuda Mais",
        city: "Campinas",
        category: "Papelaria",
        lat: -22.9056,
        lng: -47.0608
    },

    {
        id: "teclocal",
        name: "TecLocal",
        city: "Jundiaí",
        category: "Eletrônicos",
        lat: -23.1857,
        lng: -46.8978
    }
];


// ------------------------------------------
// PRODUTOS FICTÍCIOS
// ------------------------------------------

const demoProducts = [
    {
        id: "racao-novopet",
        name: "Ração para gato 10 kg",
        category: "pet",
        merchantId: "novopet",
        price: 139.90,
        status: "available",
        brand: "Marca Local",
        updatedAt: "2026-08-01"
    },

    {
        id: "racao-petmais",
        name: "Ração para gato 10 kg",
        category: "pet",
        merchantId: "petmais",
        price: 124.90,
        status: "available",
        brand: "Marca Local",
        updatedAt: "2026-08-01"
    },

    {
        id: "racao-casaanimal",
        name: "Ração para gato 10 kg",
        category: "pet",
        merchantId: "casaanimal",
        price: 112.90,
        status: "available",
        brand: "Marca Local",
        updatedAt: "2026-08-01"
    },

    {
        id: "caderno-papelcentro",
        name: "Caderno universitário 10 matérias",
        category: "stationery",
        merchantId: "papelcentro",
        price: 34.90,
        status: "available",
        brand: "Marca Escolar",
        updatedAt: "2026-08-01"
    },

    {
        id: "caderno-estudamais",
        name: "Caderno universitário 10 matérias",
        category: "stationery",
        merchantId: "estudamais",
        price: 31.90,
        status: "low_stock",
        brand: "Marca Escolar",
        updatedAt: "2026-08-01"
    },

    {
        id: "canetas-papelcentro",
        name: "Kit canetas coloridas",
        category: "stationery",
        merchantId: "papelcentro",
        price: 24.90,
        status: "available",
        brand: "Marca Escolar",
        updatedAt: "2026-08-01"
    },

    {
        id: "fone-teclocal",
        name: "Fone Bluetooth",
        category: "electronics",
        merchantId: "teclocal",
        price: 179.90,
        status: "available",
        brand: "TecLocal",
        updatedAt: "2026-08-01"
    },

    {
        id: "fone-papelcentro",
        name: "Fone básico com fio",
        category: "electronics",
        merchantId: "papelcentro",
        price: 49.90,
        status: "available",
        brand: "Marca Local",
        updatedAt: "2026-08-01"
    },

    {
        id: "calculadora-estudamais",
        name: "Calculadora científica",
        category: "electronics",
        merchantId: "estudamais",
        price: 89.90,
        status: "available",
        brand: "Marca Escolar",
        updatedAt: "2026-08-01"
    }
];


// ------------------------------------------
// EVENTOS HISTÓRICOS FICTÍCIOS
// 36 eventos
// ------------------------------------------

const seedEvents = [
    // Semana 1
    {
        id: "event-01",
        product: "Ração para gato 10 kg",
        category: "pet",
        city: "Jundiaí",
        deadline: "7_days",
        priceRange: "100_150",
        noResult: false,
        date: "2026-07-06",
        isDemo: true
    },

    {
        id: "event-02",
        product: "Ração para gato 10 kg",
        category: "pet",
        city: "Jundiaí",
        deadline: "today",
        priceRange: "100_150",
        noResult: false,
        date: "2026-07-07",
        isDemo: true
    },

    {
        id: "event-03",
        product: "Caderno universitário 10 matérias",
        category: "stationery",
        city: "Jundiaí",
        deadline: "7_days",
        priceRange: "30_50",
        noResult: false,
        date: "2026-07-08",
        isDemo: true
    },

    {
        id: "event-04",
        product: "Fone Bluetooth",
        category: "electronics",
        city: "Campinas",
        deadline: "30_days",
        priceRange: "150_200",
        noResult: false,
        date: "2026-07-09",
        isDemo: true
    },

    {
        id: "event-05",
        product: "Ração para cachorro 15 kg",
        category: "pet",
        city: "Jundiaí",
        deadline: "7_days",
        priceRange: "100_150",
        noResult: true,
        date: "2026-07-10",
        isDemo: true
    },

    {
        id: "event-06",
        product: "Kit canetas coloridas",
        category: "stationery",
        city: "Campinas",
        deadline: "today",
        priceRange: "0_30",
        noResult: false,
        date: "2026-07-11",
        isDemo: true
    },

    {
        id: "event-07",
        product: "Calculadora científica",
        category: "electronics",
        city: "Campinas",
        deadline: "30_days",
        priceRange: "50_100",
        noResult: false,
        date: "2026-07-12",
        isDemo: true
    },

    {
        id: "event-08",
        product: "Ração para gato 10 kg",
        category: "pet",
        city: "São Paulo",
        deadline: "7_days",
        priceRange: "100_150",
        noResult: false,
        date: "2026-07-12",
        isDemo: true
    },

    {
        id: "event-09",
        product: "Fone sem fio esportivo",
        category: "electronics",
        city: "Jundiaí",
        deadline: "7_days",
        priceRange: "150_200",
        noResult: true,
        date: "2026-07-12",
        isDemo: true
    },

    // Semana 2
    {
        id: "event-10",
        product: "Ração para gato 10 kg",
        category: "pet",
        city: "Jundiaí",
        deadline: "7_days",
        priceRange: "100_150",
        noResult: false,
        date: "2026-07-13",
        isDemo: true
    },

    {
        id: "event-11",
        product: "Ração para gato 10 kg",
        category: "pet",
        city: "Jundiaí",
        deadline: "7_days",
        priceRange: "100_150",
        noResult: false,
        date: "2026-07-15",
        isDemo: true
    },

    {
        id: "event-12",
        product: "Caderno universitário 10 matérias",
        category: "stationery",
        city: "Campinas",
        deadline: "7_days",
        priceRange: "30_50",
        noResult: false,
        date: "2026-07-16",
        isDemo: true
    },

    {
        id: "event-13",
        product: "Fone Bluetooth",
        category: "electronics",
        city: "Jundiaí",
        deadline: "today",
        priceRange: "150_200",
        noResult: false,
        date: "2026-07-17",
        isDemo: true
    },

    {
        id: "event-14",
        product: "Ração para cachorro 15 kg",
        category: "pet",
        city: "Campinas",
        deadline: "7_days",
        priceRange: "100_150",
        noResult: true,
        date: "2026-07-18",
        isDemo: true
    },

    {
        id: "event-15",
        product: "Kit canetas coloridas",
        category: "stationery",
        city: "Jundiaí",
        deadline: "today",
        priceRange: "0_30",
        noResult: false,
        date: "2026-07-18",
        isDemo: true
    },

    {
        id: "event-16",
        product: "Calculadora científica",
        category: "electronics",
        city: "Campinas",
        deadline: "7_days",
        priceRange: "50_100",
        noResult: false,
        date: "2026-07-19",
        isDemo: true
    },

    {
        id: "event-17",
        product: "Ração para gato 10 kg",
        category: "pet",
        city: "São Paulo",
        deadline: "30_days",
        priceRange: "100_150",
        noResult: false,
        date: "2026-07-19",
        isDemo: true
    },

    {
        id: "event-18",
        product: "Caderno inteligente",
        category: "stationery",
        city: "Jundiaí",
        deadline: "7_days",
        priceRange: "50_100",
        noResult: true,
        date: "2026-07-19",
        isDemo: true
    },

    // Semana 3
    {
        id: "event-19",
        product: "Ração para gato 10 kg",
        category: "pet",
        city: "Jundiaí",
        deadline: "today",
        priceRange: "100_150",
        noResult: false,
        date: "2026-07-20",
        isDemo: true
    },

    {
        id: "event-20",
        product: "Ração para gato 10 kg",
        category: "pet",
        city: "Jundiaí",
        deadline: "7_days",
        priceRange: "100_150",
        noResult: false,
        date: "2026-07-21",
        isDemo: true
    },

    {
        id: "event-21",
        product: "Ração para gato 10 kg",
        category: "pet",
        city: "Jundiaí",
        deadline: "7_days",
        priceRange: "100_150",
        noResult: false,
        date: "2026-07-22",
        isDemo: true
    },

    {
        id: "event-22",
        product: "Fone Bluetooth",
        category: "electronics",
        city: "Campinas",
        deadline: "7_days",
        priceRange: "150_200",
        noResult: false,
        date: "2026-07-23",
        isDemo: true
    },

    {
        id: "event-23",
        product: "Caderno universitário 10 matérias",
        category: "stationery",
        city: "Jundiaí",
        deadline: "today",
        priceRange: "30_50",
        noResult: false,
        date: "2026-07-24",
        isDemo: true
    },

    {
        id: "event-24",
        product: "Ração para cachorro 15 kg",
        category: "pet",
        city: "Jundiaí",
        deadline: "today",
        priceRange: "100_150",
        noResult: true,
        date: "2026-07-25",
        isDemo: true
    },

    {
        id: "event-25",
        product: "Kit canetas coloridas",
        category: "stationery",
        city: "Campinas",
        deadline: "7_days",
        priceRange: "0_30",
        noResult: false,
        date: "2026-07-25",
        isDemo: true
    },

    {
        id: "event-26",
        product: "Calculadora científica",
        category: "electronics",
        city: "Jundiaí",
        deadline: "30_days",
        priceRange: "50_100",
        noResult: false,
        date: "2026-07-26",
        isDemo: true
    },

    {
        id: "event-27",
        product: "Fone gamer",
        category: "electronics",
        city: "Jundiaí",
        deadline: "7_days",
        priceRange: "150_200",
        noResult: true,
        date: "2026-07-26",
        isDemo: true
    },

    // Semana 4
    {
        id: "event-28",
        product: "Ração para gato 10 kg",
        category: "pet",
        city: "Jundiaí",
        deadline: "7_days",
        priceRange: "100_150",
        noResult: false,
        date: "2026-07-27",
        isDemo: true
    },

    {
        id: "event-29",
        product: "Ração para gato 10 kg",
        category: "pet",
        city: "Jundiaí",
        deadline: "today",
        priceRange: "100_150",
        noResult: false,
        date: "2026-07-28",
        isDemo: true
    },

    {
        id: "event-30",
        product: "Ração para gato 10 kg",
        category: "pet",
        city: "Jundiaí",
        deadline: "7_days",
        priceRange: "100_150",
        noResult: false,
        date: "2026-07-29",
        isDemo: true
    },

    {
        id: "event-31",
        product: "Caderno universitário 10 matérias",
        category: "stationery",
        city: "Jundiaí",
        deadline: "7_days",
        priceRange: "30_50",
        noResult: false,
        date: "2026-07-30",
        isDemo: true
    },

    {
        id: "event-32",
        product: "Fone Bluetooth",
        category: "electronics",
        city: "Jundiaí",
        deadline: "7_days",
        priceRange: "150_200",
        noResult: false,
        date: "2026-07-31",
        isDemo: true
    },

    {
        id: "event-33",
        product: "Ração para cachorro 15 kg",
        category: "pet",
        city: "Campinas",
        deadline: "30_days",
        priceRange: "100_150",
        noResult: true,
        date: "2026-08-01",
        isDemo: true
    },

    {
        id: "event-34",
        product: "Kit canetas coloridas",
        category: "stationery",
        city: "Jundiaí",
        deadline: "today",
        priceRange: "0_30",
        noResult: false,
        date: "2026-08-02",
        isDemo: true
    },

    {
        id: "event-35",
        product: "Calculadora científica",
        category: "electronics",
        city: "Campinas",
        deadline: "7_days",
        priceRange: "50_100",
        noResult: false,
        date: "2026-08-02",
        isDemo: true
    },

    {
        id: "event-36",
        product: "Fone sem fio esportivo",
        category: "electronics",
        city: "Jundiaí",
        deadline: "7_days",
        priceRange: "150_200",
        noResult: true,
        date: "2026-08-02",
        isDemo: true
    }
];