// MBANK Mock Data & Initial State
const INITIAL_DATA = {
    user: {
        name: "Азамат Аскарбеков",
        shortName: "Азамат А.",
        phone: "+996 (770) 88-99-00",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        kycStatus: "Идентификацияланган (Толук)",
        pin: "1234",
        cashbackBalance: 1450.00
    },
    accounts: [
        {
            id: "acc_mbank_black",
            name: "MBANK Black (Негизги)",
            type: "card",
            cardNumber: "4169 •••• •••• 8842",
            fullCardNumber: "4169 7401 5592 8842",
            expiry: "09/29",
            cvv: "743",
            balance: 145280.50,
            currency: "KGS",
            color: "from-slate-900 via-zinc-900 to-black",
            textColor: "text-white",
            badge: "MBANK Visa Platinum",
            cardType: "VISA",
            isDefault: true,
            isFrozen: false,
            limits: { online: 50000, atm: 100000 }
        },
        {
            id: "acc_mbank_gold",
            name: "MBANK Gold Элкарт",
            type: "card",
            cardNumber: "9417 •••• •••• 3109",
            fullCardNumber: "9417 8820 4410 3109",
            expiry: "11/28",
            cvv: "329",
            balance: 38450.00,
            currency: "KGS",
            color: "from-amber-600 via-amber-700 to-yellow-900",
            textColor: "text-amber-50",
            badge: "ЭЛКАРТ Premium",
            cardType: "ELKART",
            isDefault: false,
            isFrozen: false,
            limits: { online: 30000, atm: 50000 }
        },
        {
            id: "acc_deposit",
            name: "М-Депозит (Топтоо)",
            type: "deposit",
            cardNumber: "IBAN: KG45KCBK000001099238",
            balance: 250000.00,
            currency: "KGS",
            interestRate: "14.5% жылдык",
            color: "from-emerald-700 via-teal-800 to-slate-900",
            textColor: "text-emerald-100",
            badge: "МДепозит Жылдык 14.5%",
            cardType: "DEPOSIT",
            isDefault: false
        },
        {
            id: "acc_usd",
            name: "MBANK USD Валюталык",
            type: "card",
            cardNumber: "4169 •••• •••• 1205",
            fullCardNumber: "4169 5011 8849 1205",
            expiry: "03/30",
            cvv: "891",
            balance: 1250.00,
            currency: "USD",
            color: "from-blue-900 via-indigo-950 to-slate-900",
            textColor: "text-blue-100",
            badge: "Visa USD Infinite",
            cardType: "VISA",
            isDefault: false,
            isFrozen: false,
            limits: { online: 5000, atm: 5000 }
        }
    ],
    currencyRates: [
        { code: "USD", symbol: "$", buy: 87.40, sell: 87.90, nbkr: 87.45, flag: "🇺🇸" },
        { code: "EUR", symbol: "€", buy: 95.10, sell: 96.20, nbkr: 95.55, flag: "🇪🇺" },
        { code: "RUB", symbol: "₽", buy: 0.950, sell: 0.975, nbkr: 0.962, flag: "🇷🇺" },
        { code: "KZT", symbol: "₸", buy: 0.178, sell: 0.185, nbkr: 0.181, flag: "🇰🇿" }
    ],
    serviceCategories: [
        {
            id: "mobile",
            icon: "smartphone",
            nameKy: "Мобилдик байланыш",
            nameRu: "Мобильная связь",
            color: "bg-blue-500",
            services: [
                { id: "mega", name: "MEGA (MegaCom)", code: "055x, 075x, 099x", logo: "🟢", cashback: "2%" },
                { id: "o", name: "O! (Нур Телеком)", code: "070x, 050x", logo: "🔴", cashback: "2%" },
                { id: "beeline", name: "Beeline Кыргызстан", code: "077x, 022x", logo: "🟡", cashback: "2%" },
                { id: "salam", name: "Salam Мобайл", code: "088x", logo: "🟣", cashback: "1%" }
            ]
        },
        {
            id: "utilities",
            icon: "home",
            nameKy: "Коммуналдык кызматтар",
            nameRu: "Коммунальные услуги",
            color: "bg-emerald-500",
            services: [
                { id: "teplo", name: "Бишкекжылуулук (Теплосеть)", logo: "♨️", sub: "Жылытуу жана ысык суу", cashback: "1%" },
                { id: "taza", name: "«Тазалык» МП", logo: "🚛", sub: "Таштанды чыгаруу", cashback: "1%" },
                { id: "gaz", name: "Газпром Кыргызстан", logo: "🔥", sub: "Жаратылыш газы", cashback: "1%" },
                { id: "sever", name: "Түндүкэлектро (Электр энергиясы)", logo: "⚡", sub: "Электр жарыгы", cashback: "1%" },
                { id: "voda", name: "Бишкекводоканал", logo: "💧", sub: "Муздак суу жана канализация", cashback: "1%" }
            ]
        },
        {
            id: "gov",
            icon: "landmark",
            nameKy: "Мамлекеттик төлөмдөр",
            nameRu: "Госуслуги и штрафы",
            color: "bg-amber-500",
            services: [
                { id: "fines", name: "Коопсуз шаар (ЖКЭ айып пулдары)", logo: "🚓", sub: "Штрафы ПДД", cashback: "0%" },
                { id: "tunduk", name: "Түндүк порталы кызматтары", logo: "🏛️", sub: "Маалымкаттар, каттоо", cashback: "0%" },
                { id: "tax", name: "Мамлекеттик салык (СТИ)", logo: "📊", sub: "Мүлк, жер, патент", cashback: "0%" },
                { id: "passport", name: "Паспорт жана калкты каттоо", logo: "🛂", sub: "ID-карта, жалпы паспорт", cashback: "0%" }
            ]
        },
        {
            id: "internet",
            icon: "wifi",
            nameKy: "Интернет жана ТВ",
            nameRu: "Интернет и ТВ",
            color: "bg-purple-500",
            services: [
                { id: "aknet", name: "Акнет (iTV / Интернет)", logo: "🌐", cashback: "1.5%" },
                { id: "megaline", name: "Мегалайн (Megaline)", logo: "🚀", cashback: "1.5%" },
                { id: "saima", name: "Saima Telecom", logo: "📡", cashback: "1.5%" },
                { id: "homeline", name: "Homeline", logo: "🔌", cashback: "1.5%" }
            ]
        },
        {
            id: "games",
            icon: "gamepad-2",
            nameKy: "Оюндар жана көңүл ачуу",
            nameRu: "Игры и развлечения",
            color: "bg-rose-500",
            services: [
                { id: "steam", name: "Steam Wallet (KGS / USD)", logo: "🎮", cashback: "1%" },
                { id: "pubg", name: "PUBG Mobile UC", logo: "🪂", cashback: "3%" },
                { id: "roblox", name: "Roblox Robux", logo: "🧱", cashback: "2%" },
                { id: "brawl", name: "Brawl Stars Gems", logo: "⭐", cashback: "2%" }
            ]
        }
    ],
    stories: [
        {
            id: 1,
            titleKy: "MBANK Кредит 0%",
            titleRu: "Кредит 0% на 3 мес",
            subtitle: "Акция 1 мүнөттө картага",
            image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80",
            gradient: "from-blue-600 to-indigo-900",
            read: false
        },
        {
            id: 2,
            titleKy: "MBonus 10%",
            titleRu: "MBonus 10% кешбэк",
            subtitle: "Супермаркеттерден төлөңүз",
            image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80",
            gradient: "from-cyan-500 to-blue-700",
            read: false
        },
        {
            id: 3,
            titleKy: "ELQR менен төлө",
            titleRu: "Плати по ELQR",
            subtitle: "Ар бир төлөмдөн бонустар",
            image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=80",
            gradient: "from-emerald-500 to-teal-800",
            read: false
        },
        {
            id: 4,
            titleKy: "Алтын жана Депозит",
            titleRu: "Золото и Депозиты",
            subtitle: "14.5% жылдык пайда",
            image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=600&q=80",
            gradient: "from-amber-500 to-yellow-800",
            read: true
        }
    ],
    transactions: [
        {
            id: "tx_10921",
            type: "expense",
            category: "transfer",
            title: "Бектур А. (MBANK)",
            account: "MBANK Black",
            amount: 2500.00,
            currency: "KGS",
            date: "Бүгүн, 14:28",
            rawDate: "2026-10-20T14:28:00",
            icon: "send",
            iconBg: "bg-blue-100 text-blue-600",
            status: "Ийгиликтүү",
            recipient: "+996 (555) 12-34-56",
            receiptNumber: "MB-20261020-88491",
            commission: "0.00 с",
            cashbackEarned: 0
        },
        {
            id: "tx_10920",
            type: "income",
            category: "income",
            title: "Айлык акы (Зарплата)",
            account: "MBANK Black",
            amount: 85000.00,
            currency: "KGS",
            date: "Бүгүн, 11:15",
            rawDate: "2026-10-20T11:15:00",
            icon: "arrow-down-left",
            iconBg: "bg-emerald-100 text-emerald-600",
            status: "Ийгиликтүү",
            recipient: "ОсОО «ТехИнвест Групп»",
            receiptNumber: "MB-20261020-00412",
            commission: "0.00 с",
            cashbackEarned: 0
        },
        {
            id: "tx_10919",
            type: "expense",
            category: "payment",
            title: "«Глобус» Гипермаркети",
            account: "MBANK Black",
            amount: 3420.00,
            currency: "KGS",
            date: "Кечээ, 19:40",
            rawDate: "2026-10-19T19:40:00",
            icon: "shopping-bag",
            iconBg: "bg-amber-100 text-amber-600",
            status: "Ийгиликтүү",
            recipient: "ELQR: Globus #12 ТЦ Азия Молл",
            receiptNumber: "MB-20261019-99318",
            commission: "0.00 с",
            cashbackEarned: 102.60
        },
        {
            id: "tx_10918",
            type: "expense",
            category: "payment",
            title: "MEGA (MegaCom) Толуктоо",
            account: "MBANK Black",
            amount: 450.00,
            currency: "KGS",
            date: "Кечээ, 12:05",
            rawDate: "2026-10-19T12:05:00",
            icon: "smartphone",
            iconBg: "bg-indigo-100 text-indigo-600",
            status: "Ийгиликтүү",
            recipient: "+996 (550) 99-11-22",
            receiptNumber: "MB-20261019-54129",
            commission: "0.00 с",
            cashbackEarned: 9.00
        },
        {
            id: "tx_10917",
            type: "income",
            category: "cashback",
            title: "MBonus Кешбэк эсептелди",
            account: "MBonus",
            amount: 320.00,
            currency: "KGS",
            date: "18-октябрь, 09:00",
            rawDate: "2026-10-18T09:00:00",
            icon: "sparkles",
            iconBg: "bg-cyan-100 text-cyan-600",
            status: "Ийгиликтүү",
            recipient: "MBANK Лоялдуулук программасы",
            receiptNumber: "MB-20261018-11002",
            commission: "0.00 с",
            cashbackEarned: 0
        },
        {
            id: "tx_10916",
            type: "expense",
            category: "utilities",
            title: "Түндүкэлектро төлөмү",
            account: "MBANK Gold Элкарт",
            amount: 1820.50,
            currency: "KGS",
            date: "17-октябрь, 18:22",
            rawDate: "2026-10-17T18:22:00",
            icon: "zap",
            iconBg: "bg-yellow-100 text-yellow-600",
            status: "Ийгиликтүү",
            recipient: "Л/С 194820120 Бишкек",
            receiptNumber: "MB-20261017-77341",
            commission: "0.00 с",
            cashbackEarned: 18.20
        }
    ]
};
