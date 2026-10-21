// MBANK Application Core Logic & State Management

class MBankApp {
    constructor() {
        this.state = this.loadState();
        this.audioCtx = null;
        this.currentTab = 'home';
        this.lang = localStorage.getItem('mbank_lang') || 'ky';
        this.isDarkMode = localStorage.getItem('mbank_theme') === 'dark';
        this.isPhoneFrame = localStorage.getItem('mbank_frame') !== 'full';
        this.isBalanceHidden = localStorage.getItem('mbank_hide_balance') === 'true';
        this.isLocked = true;
        this.selectedCardId = this.state.accounts[0]?.id;
        this.activeStoryIndex = null;
        
        this.translations = {
            ky: {
                welcome: "Кош келиңиз!",
                enterPin: "MBANK PIN кодун киргизиңиз",
                quickLogin: "Тез кирүү",
                forgotPin: "PIN кодду унуттуңузбу?",
                home: "Башкы",
                transfers: "Которуу",
                payments: "Төлөмдөр",
                qr: "MBANK QR",
                history: "Тарых",
                services: "Кызматтар",
                myCards: "Менин карталарым жана эсептерим",
                totalBalance: "Жалпы баланс",
                hideBalance: "Балансты жашыруу",
                showBalance: "Балансты көрсөтүү",
                topUp: "Толуктоо",
                transferAction: "Которуу",
                payAction: "Төлөө",
                qrAction: "QR Төлөм",
                loanAction: "Насыя 1 мүнөттө",
                mbonusAction: "MBonus",
                mbonusSubtitle: "топтолгон кешбэк",
                recentTransactions: "Акыркы операциялар",
                viewAll: "Баарын көрүү",
                searchPlaceholder: "Төлөмдөрдү жана кызматтарды издөө...",
                byPhone: "Телефон номери боюнча",
                byCard: "Карта номери боюнча",
                betweenAccounts: "Өз эсептеримдин ортосунда",
                abroad: "Чет өлкөгө (Россия, Каз, Өзб)",
                amount: "Суммасы",
                recipientPhone: "Алуучунун номери",
                recipientCard: "Картанын 16 цифрасы",
                commission: "Комиссия",
                freeCommission: "0 с (MBANK ичинде акысыз)",
                sendMoney: "Которууну аткаруу",
                paySuccess: "Төлөм ийгиликтүү аткарылды!",
                transferSuccess: "Акча ийгиликтүү которулду!",
                receipt: "Электрондук чек",
                shareReceipt: "Чекти бөлүшүү",
                printReceipt: "Чекти басып чыгаруу",
                close: "Жабуу",
                loanTitle: "MBANK Онлайн Насыя",
                loanSubtitle: "Күрөөсүз жана маалымкатсыз 1 мүнөттө картага",
                loanAmount: "Насыянын суммасы",
                loanTerm: "Мөөнөтү (ай)",
                monthlyPayment: "Айлык төлөм",
                getLoanBtn: "Насыяны дароо картага алуу",
                loanSuccess: "Насыя ийгиликтүү бекитилди жана картаңызга түштү!",
                exchangeRates: "Валюталар курсу (НБКР / MBANK)",
                currencyConverter: "Валюта конвертери",
                cardDetails: "Карта маалыматы",
                freezeCard: "Картаны убактылуу бөгөттөө",
                unfreezeCard: "Бөгөттөн чыгаруу",
                limitSettings: "Лимиттерди башкаруу",
                newCard: "+ Жаңы виртуалдык карта ачуу",
                notifications: "Билдирүүлөр",
                allTransactions: "Бардык транзакциялар",
                filterAll: "Баары",
                filterIncome: "Кирешелер",
                filterExpense: "Чыгашалар",
                qrScanner: "QR Сканерлөө",
                myQrCode: "Менин QR кодум",
                qrScanHint: "ELQR же MBANK QR кодун камеранын алкагына тууралаңыз",
                simulatedQr: "Тез төлөм үчүн тесттик QR тандаңыз:",
                myQrHint: "Каалаган банктан акча кабыл алуу үчүн бул QR кодду көрсөтүңүз"
            },
            ru: {
                welcome: "Добро пожаловать!",
                enterPin: "Введите PIN-код MBANK",
                quickLogin: "Быстрый вход",
                forgotPin: "Забыли PIN-код?",
                home: "Главная",
                transfers: "Переводы",
                payments: "Платежи",
                qr: "MBANK QR",
                history: "История",
                services: "Сервисы",
                myCards: "Мои карты и счета",
                totalBalance: "Общий баланс",
                hideBalance: "Скрыть баланс",
                showBalance: "Показать баланс",
                topUp: "Пополнить",
                transferAction: "Перевод",
                payAction: "Оплата",
                qrAction: "Оплата QR",
                loanAction: "Кредит за 1 мин",
                mbonusAction: "MBonus",
                mbonusSubtitle: "накопленный кешбэк",
                recentTransactions: "Последние операции",
                viewAll: "Смотреть все",
                searchPlaceholder: "Поиск платежей и услуг...",
                byPhone: "По номеру телефона",
                byCard: "По номеру карты",
                betweenAccounts: "Между своими счетами",
                abroad: "За рубеж (РФ, КЗ, УЗ)",
                amount: "Сумма",
                recipientPhone: "Номер получателя",
                recipientCard: "16 цифр карты",
                commission: "Комиссия",
                freeCommission: "0 с (Бесплатно внутри MBANK)",
                sendMoney: "Перевести деньги",
                paySuccess: "Платеж успешно выполнен!",
                transferSuccess: "Деньги успешно переведены!",
                receipt: "Электронный чек",
                shareReceipt: "Поделиться чеком",
                printReceipt: "Распечатать чек",
                close: "Закрыть",
                loanTitle: "MBANK Онлайн Кредит",
                loanSubtitle: "Без залога и справок за 1 минуту на карту",
                loanAmount: "Сумма кредита",
                loanTerm: "Срок (мес)",
                monthlyPayment: "Ежемесячный платеж",
                getLoanBtn: "Получить кредит на карту",
                loanSuccess: "Кредит одобрен и моментально зачислен!",
                exchangeRates: "Курсы валют (НБКР / MBANK)",
                currencyConverter: "Конвертер валют",
                cardDetails: "Реквизиты карты",
                freezeCard: "Заблокировать карту",
                unfreezeCard: "Разблокировать карту",
                limitSettings: "Управление лимитами",
                newCard: "+ Открыть виртуальную карту",
                notifications: "Уведомления",
                allTransactions: "Все транзакции",
                filterAll: "Все",
                filterIncome: "Доходы",
                filterExpense: "Расходы",
                qrScanner: "Сканер QR",
                myQrCode: "Мой QR-код",
                qrScanHint: "Наведите камеру на ELQR или MBANK QR",
                simulatedQr: "Выберите тестовый QR для оплаты:",
                myQrHint: "Покажите этот QR для получения перевода из любого банка"
            }
        };

        this.init();
    }

    t(key) {
        return this.translations[this.lang]?.[key] || key;
    }

    loadState() {
        const saved = localStorage.getItem('mbank_app_state');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("State parse error", e);
            }
        }
        return JSON.parse(JSON.stringify(INITIAL_DATA));
    }

    saveState() {
        localStorage.setItem('mbank_app_state', JSON.stringify(this.state));
    }

    init() {
        this.applyTheme();
        this.applyFrameMode();
        this.renderAll();
        this.attachGlobalListeners();
    }

    // Audio synthesizer for realistic native sounds
    initAudio() {
        if (!this.audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.audioCtx = new AudioContext();
            }
        }
    }

    playSuccessSound() {
        try {
            this.initAudio();
            if (!this.audioCtx) return;
            const now = this.audioCtx.currentTime;
            
            // Major triad fintech chime (E5 -> G#5 -> B5 -> E6)
            const freqs = [659.25, 830.61, 987.77, 1318.51];
            freqs.forEach((freq, idx) => {
                const osc = this.audioCtx.createOscillator();
                const gain = this.audioCtx.createGain();
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + idx * 0.08);
                
                gain.gain.setValueAtTime(0, now + idx * 0.08);
                gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.08 + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.45);
                
                osc.connect(gain);
                gain.connect(this.audioCtx.destination);
                
                osc.start(now + idx * 0.08);
                osc.stop(now + idx * 0.08 + 0.46);
            });
        } catch (e) {
            console.log("Audio not supported or blocked", e);
        }
    }

    playTapSound() {
        try {
            this.initAudio();
            if (!this.audioCtx) return;
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            const now = this.audioCtx.currentTime;
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(280, now);
            osc.frequency.exponentialRampToValueAtTime(80, now + 0.04);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
            osc.connect(gain);
            gain.connect(this.audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.04);
        } catch (e) {}
    }

    playCashSound() {
        try {
            this.initAudio();
            if (!this.audioCtx) return;
            const now = this.audioCtx.currentTime;
            [900, 1200, 1500, 1800].forEach((freq, i) => {
                const osc = this.audioCtx.createOscillator();
                const gain = this.audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + i * 0.05);
                gain.gain.setValueAtTime(0.15, now + i * 0.05);
                gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.25);
                osc.connect(gain);
                gain.connect(this.audioCtx.destination);
                osc.start(now + i * 0.05);
                osc.stop(now + i * 0.05 + 0.25);
            });
        } catch (e) {}
    }

    formatMoney(amount, currency = 'KGS') {
        const num = Number(amount) || 0;
        const formatted = num.toLocaleString('ru-RU', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        const symbol = currency === 'KGS' ? 'с' : (currency === 'USD' ? '$' : currency);
        return `${formatted} ${symbol}`;
    }

    applyTheme() {
        if (this.isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('mbank_theme', this.isDarkMode ? 'dark' : 'light');
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        this.applyTheme();
        this.playTapSound();
        this.renderAll();
    }

    applyFrameMode() {
        const frameContainer = document.getElementById('device-wrapper');
        const phoneFrame = document.getElementById('phone-frame');
        const frameToggleBtn = document.getElementById('toggle-frame-mode');

        if (this.isPhoneFrame) {
            frameContainer?.classList.remove('w-full', 'max-w-none', 'p-0');
            frameContainer?.classList.add('max-w-md', 'mx-auto', 'py-6');
            phoneFrame?.classList.add('phone-mockup-frame', 'min-h-[860px]', 'max-h-[92vh]');
            if (frameToggleBtn) frameToggleBtn.innerHTML = `📱 <span class="hidden sm:inline">Телефон режими</span>`;
        } else {
            frameContainer?.classList.remove('max-w-md', 'mx-auto', 'py-6');
            frameContainer?.classList.add('w-full', 'max-w-3xl', 'mx-auto', 'py-4', 'px-2');
            phoneFrame?.classList.remove('phone-mockup-frame', 'min-h-[860px]', 'max-h-[92vh]');
            if (frameToggleBtn) frameToggleBtn.innerHTML = `💻 <span class="hidden sm:inline">Толук экран</span>`;
        }
        localStorage.setItem('mbank_frame', this.isPhoneFrame ? 'phone' : 'full');
    }

    toggleFrameMode() {
        this.isPhoneFrame = !this.isPhoneFrame;
        this.applyFrameMode();
        this.playTapSound();
    }

    setLanguage(lang) {
        this.lang = lang;
        localStorage.setItem('mbank_lang', lang);
        this.playTapSound();
        this.renderAll();
    }

    toggleBalanceVisibility() {
        this.isBalanceHidden = !this.isBalanceHidden;
        localStorage.setItem('mbank_hide_balance', this.isBalanceHidden ? 'true' : 'false');
        this.playTapSound();
        this.renderHome();
    }

    switchTab(tabName) {
        this.currentTab = tabName;
        this.playTapSound();
        this.renderNav();
        this.renderCurrentTab();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    unlockApp() {
        this.isLocked = false;
        this.playSuccessSound();
        const pinScreen = document.getElementById('pin-screen');
        if (pinScreen) {
            pinScreen.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
            setTimeout(() => {
                pinScreen.classList.add('hidden');
            }, 300);
        }
        this.showToast("Кош келиңиз, " + this.state.user.shortName + "! 👋");
    }

    lockApp() {
        this.isLocked = true;
        this.playTapSound();
        const pinScreen = document.getElementById('pin-screen');
        if (pinScreen) {
            pinScreen.classList.remove('hidden');
            setTimeout(() => {
                pinScreen.classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
            }, 20);
        }
        this.currentPinInput = "";
        this.updatePinDots();
    }

    // Dynamic Island / In-app Toast Notification
    showToast(message, type = 'info') {
        const island = document.getElementById('dynamic-island');
        const toastContent = document.getElementById('island-content');
        if (!island || !toastContent) return;

        toastContent.innerHTML = `
            <div class="flex items-center gap-2 text-xs text-white px-2 py-1 truncate">
                <span class="inline-block w-2 h-2 rounded-full ${type === 'success' ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'}"></span>
                <span class="font-medium">${message}</span>
            </div>
        `;
        island.classList.add('expanded');
        setTimeout(() => {
            island.classList.remove('expanded');
        }, 3200);
    }

    // Modal Helpers
    openModal(modalId) {
        this.playTapSound();
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modalId) {
        this.playTapSound();
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
        }
    }

    // Transaction & Balance Actions
    createTransaction(txData) {
        const newTx = {
            id: 'tx_' + Date.now(),
            date: "Бүгүн, " + new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
            rawDate: new Date().toISOString(),
            receiptNumber: 'MB-' + new Date().toISOString().slice(0,10).replace(/-/g,'') + '-' + Math.floor(10000 + Math.random() * 90000),
            commission: "0.00 с",
            status: "Ийгиликтүү",
            ...txData
        };

        this.state.transactions.unshift(newTx);

        // Update corresponding account balance
        const account = this.state.accounts.find(a => a.name === txData.account || a.id === txData.accountId) || this.state.accounts[0];
        if (account) {
            if (txData.type === 'expense') {
                account.balance -= Number(txData.amount);
            } else {
                account.balance += Number(txData.amount);
            }
        }

        // Add cashback if applicable
        if (txData.cashbackEarned && txData.cashbackEarned > 0) {
            this.state.user.cashbackBalance = (this.state.user.cashbackBalance || 0) + Number(txData.cashbackEarned);
        }

        this.saveState();
        this.renderAll();
        return newTx;
    }

    // Top up balance (терминалдан же башка картадан)
    topUpAccount(accountId, amount) {
        const account = this.state.accounts.find(a => a.id === accountId) || this.state.accounts[0];
        if (!account) return;

        account.balance += Number(amount);
        this.createTransaction({
            type: 'income',
            category: 'income',
            title: `Баланс толукталды (${account.name})`,
            account: account.name,
            accountId: account.id,
            amount: Number(amount),
            currency: account.currency,
            icon: 'arrow-down-left',
            iconBg: 'bg-emerald-100 text-emerald-600',
            recipient: 'Терминал / Банк картасы',
            cashbackEarned: 0
        });

        this.playCashSound();
        this.showToast(`+${this.formatMoney(amount, account.currency)} эсепке түштү!`, 'success');
        this.closeModal('topup-modal');
    }

    // Apply for Instant Online Loan
    applyLoan(amount, months) {
        const monthlyInterest = 0.015; // 1.5% per month
        const totalAmount = amount * (1 + monthlyInterest * months);
        const monthlyPayment = totalAmount / months;

        const mainCard = this.state.accounts[0];
        mainCard.balance += Number(amount);

        const tx = this.createTransaction({
            type: 'income',
            category: 'income',
            title: `MBANK Насыя (${months} айга)`,
            account: mainCard.name,
            accountId: mainCard.id,
            amount: Number(amount),
            currency: 'KGS',
            icon: 'badge-percent',
            iconBg: 'bg-blue-100 text-blue-600',
            recipient: 'ОАО «Коммерческий банк КЫРГЫЗСТАН» MBANK',
            cashbackEarned: 0
        });

        this.playCashSound();
        this.showToast(`🎉 Сизге ${this.formatMoney(amount)} берилди!`, 'success');
        this.closeModal('loan-modal');
        this.showReceipt(tx);
    }

    // Freeze / Unfreeze card
    toggleFreezeCard(cardId) {
        const card = this.state.accounts.find(a => a.id === cardId);
        if (!card) return;
        card.isFrozen = !card.isFrozen;
        this.saveState();
        this.playTapSound();
        this.renderCardsSection();
        this.showToast(card.isFrozen ? "Карта убактылуу бөгөттөлдү 🔒" : "Карта бөгөттөн чыгарылды 🔓");
    }

    // Show Official MBANK Digital Receipt
    showReceipt(tx) {
        const modal = document.getElementById('receipt-modal');
        const container = document.getElementById('receipt-content');
        if (!modal || !container) return;

        const isIncome = tx.type === 'income';

        container.innerHTML = `
            <div class="receipt-paper p-6 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-900 shadow-2xl relative overflow-hidden">
                <!-- Watermark -->
                <div class="absolute -right-8 -bottom-8 opacity-5 pointer-events-none select-none text-9xl font-black text-blue-700">
                    M
                </div>

                <!-- Header -->
                <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div class="flex items-center gap-2">
                        <div class="w-10 h-10 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-xl shadow-md shadow-blue-500/30">
                            M
                        </div>
                        <div>
                            <div class="font-black text-lg tracking-tight text-blue-600">MBANK</div>
                            <div class="text-[10px] text-slate-400 font-medium tracking-wide">ОАО «КБ КЫРГЫЗСТАН»</div>
                        </div>
                    </div>
                    <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 flex items-center gap-1 border border-emerald-200">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        ${tx.status || 'Ийгиликтүү'}
                    </span>
                </div>

                <!-- Amount -->
                <div class="text-center my-6">
                    <div class="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                        ${isIncome ? 'Түшкөн сумма' : 'Төлөнгөн сумма'}
                    </div>
                    <div class="text-3xl font-black ${isIncome ? 'text-emerald-600' : 'text-slate-900'}">
                        ${isIncome ? '+' : '-'}${this.formatMoney(tx.amount, tx.currency)}
                    </div>
                    ${tx.cashbackEarned > 0 ? `
                        <div class="mt-2 inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-cyan-50 text-cyan-700 text-xs font-bold border border-cyan-200">
                            ✨ +${this.formatMoney(tx.cashbackEarned)} MBonus кешбэк
                        </div>
                    ` : ''}
                </div>

                <!-- Details List -->
                <div class="space-y-3 text-xs border-y border-dashed border-slate-200 py-4 my-4">
                    <div class="flex justify-between">
                        <span class="text-slate-400">Кызмат / Алуучу:</span>
                        <span class="font-bold text-slate-800 text-right">${tx.title}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-400">Реквизит / Номер:</span>
                        <span class="font-semibold text-slate-700">${tx.recipient || '—'}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-400">Эсеп / Карта:</span>
                        <span class="font-semibold text-slate-700">${tx.account || 'MBANK Black'}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-400">Күнү жана убактысы:</span>
                        <span class="font-semibold text-slate-700">${tx.date}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-400">Квитанция №:</span>
                        <span class="font-mono text-slate-700 select-all font-semibold">${tx.receiptNumber}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-400">Комиссия:</span>
                        <span class="font-semibold text-emerald-600">${tx.commission || '0.00 с'}</span>
                    </div>
                </div>

                <!-- QR Validation Stamp -->
                <div class="flex items-center justify-between pt-2">
                    <div class="text-[10px] text-slate-400 leading-tight">
                        Фискалдык чек электрондук түрдө түзүлдү.<br>
                        MBANK 24/7 колдоо: <strong>*3333</strong>
                    </div>
                    <div class="w-14 h-14 bg-slate-100 rounded-xl p-1 flex items-center justify-center border border-slate-200">
                        <svg viewBox="0 0 24 24" class="w-full h-full text-slate-800" fill="currentColor">
                            <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14-2h4v2h-4v-2zm-4 0h2v4h-2v-4zm2 4h4v4h-4v-4zm-4 2h2v2h-2v-2z"/>
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Action buttons -->
            <div class="flex gap-3 mt-4">
                <button onclick="window.print()" class="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 tap-effect transition">
                    <i data-lucide="printer" class="w-4 h-4"></i> Басып чыгаруу
                </button>
                <button onclick="mbank.shareReceipt('${tx.receiptNumber}')" class="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 tap-effect transition shadow-lg shadow-blue-500/25">
                    <i data-lucide="share-2" class="w-4 h-4"></i> Бөлүшүү
                </button>
            </div>
        `;

        this.openModal('receipt-modal');
        if (window.lucide) window.lucide.createIcons();
    }

    shareReceipt(receiptNumber) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(`MBANK Чеги № ${receiptNumber} ийгиликтүү аткарылды.`);
            this.showToast("Чек маалыматы көчүрүлдү! 📋", "success");
        } else {
            this.showToast(`Чек № ${receiptNumber}`);
        }
    }

    // Attach Listeners
    attachGlobalListeners() {
        // PIN pad interactions
        this.currentPinInput = "";
        window.handlePinPress = (digit) => {
            this.playTapSound();
            if (this.currentPinInput.length < 4) {
                this.currentPinInput += digit;
                this.updatePinDots();
                if (this.currentPinInput.length === 4) {
                    setTimeout(() => {
                        if (this.currentPinInput === this.state.user.pin || this.currentPinInput === "1234") {
                            this.unlockApp();
                        } else {
                            this.playTapSound();
                            this.showToast("PIN-код туура эмес! (1234 териңиз)", "error");
                            this.currentPinInput = "";
                            this.updatePinDots();
                        }
                    }, 150);
                }
            }
        };

        window.handlePinDelete = () => {
            this.playTapSound();
            this.currentPinInput = this.currentPinInput.slice(0, -1);
            this.updatePinDots();
        };

        // Quick FaceID login
        window.handleBiometricLogin = () => {
            this.playTapSound();
            const bioIcon = document.getElementById('biometric-icon');
            if (bioIcon) bioIcon.classList.add('animate-spin', 'text-cyan-400');
            setTimeout(() => {
                if (bioIcon) bioIcon.classList.remove('animate-spin', 'text-cyan-400');
                this.unlockApp();
            }, 600);
        };
    }

    updatePinDots() {
        for (let i = 1; i <= 4; i++) {
            const dot = document.getElementById(`pin-dot-${i}`);
            if (dot) {
                if (i <= this.currentPinInput.length) {
                    dot.classList.add('bg-cyan-400', 'scale-125', 'shadow-md', 'shadow-cyan-400/50');
                    dot.classList.remove('bg-white/20');
                } else {
                    dot.classList.remove('bg-cyan-400', 'scale-125', 'shadow-md', 'shadow-cyan-400/50');
                    dot.classList.add('bg-white/20');
                }
            }
        }
    }

    renderAll() {
        this.renderHeader();
        this.renderNav();
        this.renderCurrentTab();
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    renderHeader() {
        const header = document.getElementById('app-header');
        if (!header) return;

        header.innerHTML = `
            <div class="flex items-center justify-between px-4 pt-3 pb-2">
                <div class="flex items-center gap-3">
                    <button onclick="mbank.switchTab('services')" class="relative tap-effect">
                        <img src="${this.state.user.avatar}" class="w-10 h-10 rounded-full border-2 border-blue-500 object-cover shadow-sm" alt="Profile">
                        <span class="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900"></span>
                    </button>
                    <div>
                        <div class="text-xs text-slate-500 dark:text-slate-400 font-medium">Кош келиңиз,</div>
                        <div class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            ${this.state.user.shortName}
                            <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 font-extrabold">PRO</span>
                        </div>
                    </div>
                </div>

                <div class="flex items-center gap-2">
                    <!-- Language selector -->
                    <div class="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full p-0.5 text-xs font-bold">
                        <button onclick="mbank.setLanguage('ky')" class="px-2 py-1 rounded-full transition ${this.lang === 'ky' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}">КЫР</button>
                        <button onclick="mbank.setLanguage('ru')" class="px-2 py-1 rounded-full transition ${this.lang === 'ru' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}">РУС</button>
                    </div>

                    <!-- Theme toggle -->
                    <button onclick="mbank.toggleTheme()" class="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center tap-effect transition">
                        <i data-lucide="${this.isDarkMode ? 'sun' : 'moon'}" class="w-4 h-4"></i>
                    </button>

                    <!-- Notifications -->
                    <button onclick="mbank.openModal('notifications-modal')" class="relative w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center tap-effect transition">
                        <i data-lucide="bell" class="w-4 h-4"></i>
                        <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900"></span>
                    </button>

                    <!-- Lock button -->
                    <button onclick="mbank.lockApp()" title="Бөгөттөө" class="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center tap-effect transition">
                        <i data-lucide="lock" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
        `;
    }

    renderNav() {
        const nav = document.getElementById('bottom-nav');
        if (!nav) return;

        const navItems = [
            { id: 'home', icon: 'home', label: this.t('home') },
            { id: 'transfers', icon: 'arrow-left-right', label: this.t('transfers') },
            { id: 'qr', icon: 'qr-code', label: this.t('qr'), highlight: true },
            { id: 'history', icon: 'clock', label: this.t('history') },
            { id: 'services', icon: 'grid', label: this.t('services') }
        ];

        nav.innerHTML = `
            <div class="flex items-center justify-around py-2 px-3 border-t border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
                ${navItems.map(item => {
                    const isActive = this.currentTab === item.id;
                    if (item.highlight) {
                        return `
                            <button onclick="mbank.switchTab('${item.id}')" class="relative -top-3 flex flex-col items-center tap-effect group">
                                <div class="w-12 h-12 rounded-2xl bg-mbank-gradient text-white flex items-center justify-center shadow-lg shadow-blue-500/40 group-hover:scale-105 transition">
                                    <i data-lucide="${item.icon}" class="w-6 h-6"></i>
                                </div>
                                <span class="text-[11px] font-bold mt-1 text-blue-600 dark:text-cyan-400">${item.label}</span>
                            </button>
                        `;
                    }
                    return `
                        <button onclick="mbank.switchTab('${item.id}')" class="flex flex-col items-center py-1 px-2 tap-effect transition ${isActive ? 'text-blue-600 dark:text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 font-medium'}">
                            <i data-lucide="${item.icon}" class="w-5 h-5 mb-1 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}"></i>
                            <span class="text-[10px] tracking-tight">${item.label}</span>
                        </button>
                    `;
                }).join('')}
            </div>
        `;
    }

    renderCurrentTab() {
        const main = document.getElementById('tab-content');
        if (!main) return;

        switch (this.currentTab) {
            case 'home':
                this.renderHome();
                break;
            case 'transfers':
                this.renderTransfers();
                break;
            case 'payments':
                this.renderPayments();
                break;
            case 'qr':
                this.renderQr();
                break;
            case 'history':
                this.renderHistory();
                break;
            case 'services':
                this.renderServices();
                break;
            default:
                this.renderHome();
        }

        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    renderHome() {
        const main = document.getElementById('tab-content');
        if (!main) return;

        const totalKGS = this.state.accounts.reduce((sum, a) => {
            if (a.currency === 'KGS') return sum + a.balance;
            if (a.currency === 'USD') return sum + (a.balance * 87.40);
            return sum;
        }, 0);

        main.innerHTML = `
            <div class="tab-pane space-y-4 px-4 pb-20">
                <!-- Stories Carousel -->
                ${this.renderStoriesHtml()}

                <!-- Main Balance Card & Quick Actions -->
                <div class="rounded-3xl p-5 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white shadow-xl shadow-blue-600/25 relative overflow-hidden">
                    <div class="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-cyan-400/20 blur-2xl pointer-events-none"></div>

                    <div class="flex items-center justify-between text-blue-100 text-xs font-semibold mb-1">
                        <span class="flex items-center gap-1.5">
                            <i data-lucide="wallet" class="w-3.5 h-3.5 text-cyan-300"></i> ${this.t('totalBalance')}
                        </span>
                        <button onclick="mbank.toggleBalanceVisibility()" class="p-1 text-blue-200 hover:text-white tap-effect">
                            <i data-lucide="${this.isBalanceHidden ? 'eye-off' : 'eye'}" class="w-4 h-4"></i>
                        </button>
                    </div>

                    <div class="text-3xl font-extrabold tracking-tight mb-4">
                        ${this.isBalanceHidden ? '••••••••' : this.formatMoney(totalKGS, 'KGS')}
                    </div>

                    <!-- 4 Main Quick Action Buttons -->
                    <div class="grid grid-cols-4 gap-2 pt-2 border-t border-white/15">
                        <button onclick="mbank.switchTab('transfers')" class="flex flex-col items-center gap-1.5 tap-effect group">
                            <div class="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center group-hover:bg-white/25 transition">
                                <i data-lucide="send" class="w-5 h-5 text-white"></i>
                            </div>
                            <span class="text-[11px] font-semibold text-blue-50">${this.t('transferAction')}</span>
                        </button>

                        <button onclick="mbank.switchTab('payments')" class="flex flex-col items-center gap-1.5 tap-effect group">
                            <div class="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center group-hover:bg-white/25 transition">
                                <i data-lucide="receipt" class="w-5 h-5 text-white"></i>
                            </div>
                            <span class="text-[11px] font-semibold text-blue-50">${this.t('payAction')}</span>
                        </button>

                        <button onclick="mbank.switchTab('qr')" class="flex flex-col items-center gap-1.5 tap-effect group">
                            <div class="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center group-hover:bg-white/25 transition">
                                <i data-lucide="scan-line" class="w-5 h-5 text-cyan-300"></i>
                            </div>
                            <span class="text-[11px] font-semibold text-blue-50">${this.t('qrAction')}</span>
                        </button>

                        <button onclick="mbank.openModal('topup-modal')" class="flex flex-col items-center gap-1.5 tap-effect group">
                            <div class="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center group-hover:bg-white/25 transition">
                                <i data-lucide="plus-circle" class="w-5 h-5 text-emerald-300"></i>
                            </div>
                            <span class="text-[11px] font-semibold text-blue-50">${this.t('topUp')}</span>
                        </button>
                    </div>
                </div>

                <!-- MBANK Cards Carousel & Flip Section -->
                ${this.renderCardsSectionHtml()}

                <!-- MBonus Banner -->
                <div onclick="mbank.openModal('mbonus-modal')" class="rounded-2xl p-4 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border border-cyan-500/30 flex items-center justify-between cursor-pointer tap-effect hover:border-cyan-500/60 transition">
                    <div class="flex items-center gap-3">
                        <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white flex items-center justify-center shadow-md shadow-cyan-500/30 font-black text-lg">
                            💎
                        </div>
                        <div>
                            <div class="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                                MBonus Кешбэк
                                <span class="px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300 text-[10px] font-extrabold">1-10%</span>
                            </div>
                            <div class="text-xs text-slate-500 dark:text-slate-400">
                                Сизде: <strong class="text-blue-600 dark:text-cyan-400 font-extrabold">${this.formatMoney(this.state.user.cashbackBalance || 0)}</strong>
                            </div>
                        </div>
                    </div>
                    <i data-lucide="chevron-right" class="w-5 h-5 text-slate-400"></i>
                </div>

                <!-- Instant Loan Banner (MBANK 1 мүнөттө Насыя) -->
                <div onclick="mbank.openModal('loan-modal')" class="rounded-2xl p-4 bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-yellow-500/15 border border-amber-500/30 flex items-center justify-between cursor-pointer tap-effect hover:border-amber-500/60 transition">
                    <div class="flex items-center gap-3">
                        <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/30 font-black text-lg">
                            ⚡
                        </div>
                        <div>
                            <div class="font-bold text-sm text-slate-900 dark:text-white">
                                MBANK Насыя (Кредит)
                            </div>
                            <div class="text-xs text-amber-700 dark:text-amber-400 font-medium">
                                250 000 сомго чейин 1 мүнөттө картага алуу
                            </div>
                        </div>
                    </div>
                    <span class="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-sm">
                        Алуу
                    </span>
                </div>

                <!-- Currency Exchange Rates -->
                <div class="rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div class="flex items-center justify-between mb-3">
                        <div class="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                            <i data-lucide="trending-up" class="w-4 h-4 text-blue-500"></i> ${this.t('exchangeRates')}
                        </div>
                        <button onclick="mbank.openModal('currency-modal')" class="text-xs font-bold text-blue-600 dark:text-cyan-400 tap-effect">
                            Конвертер
                        </button>
                    </div>
                    <div class="grid grid-cols-4 gap-2 text-center">
                        ${this.state.currencyRates.map(cr => `
                            <div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                                <div class="text-xs font-bold flex items-center justify-center gap-1 mb-0.5 text-slate-800 dark:text-slate-200">
                                    <span>${cr.flag}</span> ${cr.code}
                                </div>
                                <div class="text-[10px] text-slate-400 font-medium">Сатуу</div>
                                <div class="text-xs font-black text-blue-600 dark:text-cyan-400">${cr.sell}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Recent Transactions Feed -->
                <div>
                    <div class="flex items-center justify-between mb-3 px-1">
                        <span class="font-bold text-sm text-slate-900 dark:text-white">${this.t('recentTransactions')}</span>
                        <button onclick="mbank.switchTab('history')" class="text-xs font-bold text-blue-600 dark:text-cyan-400 tap-effect">
                            ${this.t('viewAll')}
                        </button>
                    </div>
                    <div class="space-y-2.5">
                        ${this.state.transactions.slice(0, 5).map(tx => this.renderTransactionItemHtml(tx)).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderStoriesHtml() {
        return `
            <div class="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
                ${this.state.stories.map((story, i) => `
                    <div onclick="mbank.openStory(${i})" class="flex-shrink-0 flex flex-col items-center gap-1.5 cursor-pointer tap-effect group">
                        <div class="w-16 h-16 rounded-2xl p-0.5 ${story.read ? 'bg-slate-300 dark:bg-slate-700' : 'bg-gradient-to-tr from-cyan-400 via-blue-600 to-purple-600'} transition group-hover:scale-105">
                            <div class="w-full h-full rounded-[14px] overflow-hidden bg-slate-800 relative">
                                <img src="${story.image}" class="w-full h-full object-cover" alt="Story">
                                <div class="absolute inset-0 bg-black/25"></div>
                            </div>
                        </div>
                        <span class="text-[10px] font-bold text-slate-700 dark:text-slate-300 max-w-[68px] truncate text-center">
                            ${this.lang === 'ky' ? story.titleKy : story.titleRu}
                        </span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderCardsSectionHtml() {
        const activeCard = this.state.accounts.find(a => a.id === this.selectedCardId) || this.state.accounts[0];

        return `
            <div class="space-y-3">
                <div class="flex items-center justify-between px-1">
                    <span class="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        ${this.t('myCards')} (${this.state.accounts.length})
                    </span>
                    <button onclick="mbank.openModal('card-options-modal')" class="text-xs font-bold text-blue-600 dark:text-cyan-400 tap-effect">
                        Башкаруу
                    </button>
                </div>

                <!-- 3D Flippable Card -->
                <div class="perspective-1000">
                    <div id="interactive-card" onclick="this.classList.toggle('card-flipped')" class="card-3d relative w-full h-52 rounded-3xl p-5 text-white shadow-2xl cursor-pointer bg-gradient-to-br ${activeCard.color} border border-white/20 select-none">
                        
                        <!-- Front of Card -->
                        <div class="card-front absolute inset-0 p-5 flex flex-col justify-between">
                            <div class="flex items-start justify-between">
                                <div class="flex items-center gap-2">
                                    <div class="w-8 h-8 rounded-lg bg-blue-600 text-white font-black flex items-center justify-center text-sm shadow">
                                        M
                                    </div>
                                    <span class="font-black tracking-wider text-lg">MBANK</span>
                                </div>
                                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 backdrop-blur-md">
                                    ${activeCard.badge}
                                </span>
                            </div>

                            <!-- Chip & Contactless -->
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-7 rounded-md bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 border border-yellow-200 shadow-inner"></div>
                                <i data-lucide="wifi" class="w-5 h-5 text-white/80 rotate-90"></i>
                            </div>

                            <div>
                                <div class="text-xs text-white/70 font-medium">Баланс</div>
                                <div class="text-2xl font-black tracking-tight">
                                    ${this.isBalanceHidden ? '••••••' : this.formatMoney(activeCard.balance, activeCard.currency)}
                                </div>
                                <div class="flex items-center justify-between mt-2 pt-2 border-t border-white/10 text-xs">
                                    <span class="font-mono tracking-widest text-white/90 font-bold">${activeCard.cardNumber}</span>
                                    <span class="text-[10px] text-white/60">Басыңыз 🔄 CVV</span>
                                </div>
                            </div>
                        </div>

                        <!-- Back of Card -->
                        <div class="card-back absolute inset-0 rounded-3xl bg-slate-900 border border-slate-700 flex flex-col justify-between overflow-hidden">
                            <div class="w-full h-10 bg-black mt-4"></div>
                            <div class="px-6 space-y-2">
                                <div class="text-[10px] text-slate-400">Толук номер:</div>
                                <div class="font-mono text-sm tracking-wider font-bold text-white">${activeCard.fullCardNumber || activeCard.cardNumber}</div>
                                <div class="flex items-center justify-between bg-white text-slate-900 px-3 py-1.5 rounded-lg">
                                    <span class="text-[10px] font-bold">Мөөнөтү: ${activeCard.expiry || '09/29'}</span>
                                    <span class="text-xs font-mono font-black">CVV: ${activeCard.cvv || '743'}</span>
                                </div>
                            </div>
                            <div class="p-3 bg-slate-950/80 text-[9px] text-slate-400 text-center">
                                Коопсуздук сыр сөзүн эч кимге бербеңиз! Кайра басып оодарыңыз.
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Account Selector Pills -->
                <div class="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                    ${this.state.accounts.map(acc => `
                        <button onclick="mbank.selectCard('${acc.id}')" class="flex-shrink-0 px-3 py-2 rounded-2xl text-xs font-bold border transition tap-effect ${acc.id === activeCard.id ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'}">
                            ${acc.name} (${this.formatMoney(acc.balance, acc.currency)})
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    selectCard(cardId) {
        this.selectedCardId = cardId;
        this.playTapSound();
        this.renderHome();
    }

    renderTransactionItemHtml(tx) {
        const isIncome = tx.type === 'income';
        return `
            <div onclick="mbank.showReceipt(${JSON.stringify(tx).replace(/"/g, '&quot;')})" class="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-sm hover:border-blue-400 dark:hover:border-blue-500/50 cursor-pointer tap-effect transition">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-2xl ${tx.iconBg || 'bg-blue-100 text-blue-600'} flex items-center justify-center font-bold">
                        <i data-lucide="${tx.icon || 'arrow-left-right'}" class="w-5 h-5"></i>
                    </div>
                    <div>
                        <div class="font-bold text-xs text-slate-900 dark:text-white leading-tight">
                            ${tx.title}
                        </div>
                        <div class="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                            ${tx.date} • ${tx.account || 'MBANK'}
                        </div>
                    </div>
                </div>

                <div class="text-right">
                    <div class="font-black text-xs ${isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}">
                        ${isIncome ? '+' : '-'}${this.formatMoney(tx.amount, tx.currency)}
                    </div>
                    ${tx.cashbackEarned > 0 ? `
                        <div class="text-[9px] text-cyan-600 dark:text-cyan-400 font-bold">
                            +${this.formatMoney(tx.cashbackEarned)} бонустар
                        </div>
                    ` : `
                        <div class="text-[9px] text-slate-400">Чек 🧾</div>
                    `}
                </div>
            </div>
        `;
    }

    // Transfers Screen (Которуулар)
    renderTransfers() {
        const main = document.getElementById('tab-content');
        if (!main) return;

        main.innerHTML = `
            <div class="tab-pane space-y-4 px-4 pb-20">
                <div class="pt-2">
                    <h2 class="text-xl font-black text-slate-900 dark:text-white">${this.t('transfers')}</h2>
                    <p class="text-xs text-slate-500 dark:text-slate-400">MBANK, Элкарт, Visa, Россия (Сбер/Т-Банк) ж.б.</p>
                </div>

                <!-- Quick Transfer Type Switcher -->
                <div class="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
                    <button id="transfer-mode-phone" onclick="mbank.setTransferMode('phone')" class="py-2.5 rounded-xl text-xs font-bold transition bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-sm">
                        📱 Телефон боюнча
                    </button>
                    <button id="transfer-mode-card" onclick="mbank.setTransferMode('card')" class="py-2.5 rounded-xl text-xs font-bold transition text-slate-600 dark:text-slate-400">
                        💳 Картага (P2P)
                    </button>
                </div>

                <!-- Transfer Form Card -->
                <div class="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
                    <!-- Source Account -->
                    <div>
                        <label class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                            Кайсы эсептен:
                        </label>
                        <select id="transfer-source-acc" class="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white outline-none focus:border-blue-500">
                            ${this.state.accounts.map(acc => `
                                <option value="${acc.id}">
                                    ${acc.name} — ${this.formatMoney(acc.balance, acc.currency)}
                                </option>
                            `).join('')}
                        </select>
                    </div>

                    <!-- Destination Input (Phone / Card) -->
                    <div id="transfer-destination-box">
                        <label class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                            ${this.t('recipientPhone')}
                        </label>
                        <div class="relative">
                            <input id="transfer-recipient-input" type="text" placeholder="+996 (700) 12-34-56" value="+996 700 882 109" oninput="mbank.onRecipientInput(this.value)" class="w-full p-3.5 pl-10 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-blue-500">
                            <i data-lucide="phone" class="w-4 h-4 text-slate-400 absolute left-3.5 top-4"></i>
                        </div>
                        <div id="recipient-detected-info" class="mt-2 text-xs font-semibold text-blue-600 dark:text-cyan-400 flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 p-2 rounded-xl border border-blue-200 dark:border-blue-800">
                            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                            Табылды: <strong>Айбек Т. (MBANK)</strong>
                        </div>
                    </div>

                    <!-- Amount Input -->
                    <div>
                        <label class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                            ${this.t('amount')} (сом)
                        </label>
                        <div class="relative">
                            <input id="transfer-amount-input" type="number" placeholder="0.00" value="1000" class="w-full p-3.5 pl-4 pr-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xl font-black text-slate-900 dark:text-white outline-none focus:border-blue-500">
                            <span class="absolute right-4 top-3.5 font-bold text-slate-400">СОМ</span>
                        </div>
                    </div>

                    <!-- Quick amount chips -->
                    <div class="flex items-center gap-2 overflow-x-auto no-scrollbar">
                        ${[200, 500, 1000, 2000, 5000].map(amt => `
                            <button onclick="document.getElementById('transfer-amount-input').value = ${amt}; mbank.playTapSound()" class="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-blue-100 hover:text-blue-600 transition tap-effect">
                                +${amt} с
                            </button>
                        `).join('')}
                    </div>

                    <!-- Fee notice -->
                    <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <span>${this.t('commission')}:</span>
                        <span class="font-bold text-emerald-600 dark:text-emerald-400">${this.t('freeCommission')}</span>
                    </div>

                    <!-- Submit Button -->
                    <button onclick="mbank.executeTransfer()" class="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-xl shadow-blue-500/30 tap-effect transition flex items-center justify-center gap-2 btn-glow">
                        <i data-lucide="arrow-right-circle" class="w-5 h-5"></i>
                        ${this.t('sendMoney')}
                    </button>
                </div>

                <!-- Recent transfer recipients -->
                <div>
                    <span class="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2 px-1">
                        Тез которуу (Байланыштар):
                    </span>
                    <div class="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
                        ${[
                            { name: "Айбек Т.", phone: "+996 700 882 109", initial: "А" },
                            { name: "Жылдыз К.", phone: "+996 555 334 455", initial: "Ж" },
                            { name: "Эрлан Б.", phone: "+996 777 990 011", initial: "Э" },
                            { name: "Апам ❤️", phone: "+996 500 112 233", initial: "❤️" }
                        ].map(c => `
                            <button onclick="mbank.selectQuickRecipient('${c.name}', '${c.phone}')" class="flex-shrink-0 flex flex-col items-center gap-1 tap-effect">
                                <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-400 text-white font-black text-sm flex items-center justify-center shadow-md shadow-blue-500/20">
                                    ${c.initial}
                                </div>
                                <span class="text-[11px] font-bold text-slate-800 dark:text-slate-200">${c.name}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    setTransferMode(mode) {
        this.playTapSound();
        const phoneBtn = document.getElementById('transfer-mode-phone');
        const cardBtn = document.getElementById('transfer-mode-card');
        const box = document.getElementById('transfer-destination-box');

        if (mode === 'phone') {
            phoneBtn.className = "py-2.5 rounded-xl text-xs font-bold transition bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-sm";
            cardBtn.className = "py-2.5 rounded-xl text-xs font-bold transition text-slate-600 dark:text-slate-400";
            box.innerHTML = `
                <label class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                    ${this.t('recipientPhone')}
                </label>
                <div class="relative">
                    <input id="transfer-recipient-input" type="text" placeholder="+996 (700) 12-34-56" value="+996 700 882 109" oninput="mbank.onRecipientInput(this.value)" class="w-full p-3.5 pl-10 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-blue-500">
                    <i data-lucide="phone" class="w-4 h-4 text-slate-400 absolute left-3.5 top-4"></i>
                </div>
                <div id="recipient-detected-info" class="mt-2 text-xs font-semibold text-blue-600 dark:text-cyan-400 flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 p-2 rounded-xl border border-blue-200 dark:border-blue-800">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Табылды: <strong>Айбек Т. (MBANK)</strong>
                </div>
            `;
        } else {
            cardBtn.className = "py-2.5 rounded-xl text-xs font-bold transition bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-sm";
            phoneBtn.className = "py-2.5 rounded-xl text-xs font-bold transition text-slate-600 dark:text-slate-400";
            box.innerHTML = `
                <label class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                    ${this.t('recipientCard')}
                </label>
                <div class="relative">
                    <input id="transfer-recipient-input" type="text" placeholder="1180 •••• •••• 9921" value="9417 8820 4410 3109" class="w-full p-3.5 pl-10 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-mono font-bold text-slate-900 dark:text-white outline-none focus:border-blue-500">
                    <i data-lucide="credit-card" class="w-4 h-4 text-slate-400 absolute left-3.5 top-4"></i>
                </div>
                <div id="recipient-detected-info" class="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/30 p-2 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Карта: <strong>ЭЛКАРТ Кыргызстан (0% комиссия)</strong>
                </div>
            `;
        }
        if (window.lucide) window.lucide.createIcons();
    }

    onRecipientInput(val) {
        const info = document.getElementById('recipient-detected-info');
        if (!info) return;
        if (val.length > 7) {
            info.innerHTML = `
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                Табылды: <strong>Эрмек К. (MBANK кардары)</strong>
            `;
        }
    }

    selectQuickRecipient(name, phone) {
        this.playTapSound();
        const input = document.getElementById('transfer-recipient-input');
        if (input) input.value = phone;
        const info = document.getElementById('recipient-detected-info');
        if (info) {
            info.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500"></span> Табылды: <strong>${name} (MBANK)</strong>`;
        }
    }

    executeTransfer() {
        const amount = parseFloat(document.getElementById('transfer-amount-input')?.value);
        const recipient = document.getElementById('transfer-recipient-input')?.value;
        const sourceAccId = document.getElementById('transfer-source-acc')?.value;
        const sourceAcc = this.state.accounts.find(a => a.id === sourceAccId) || this.state.accounts[0];

        if (!amount || amount <= 0) {
            this.showToast("Туура сумманы жазыңыз!", "error");
            return;
        }

        if (sourceAcc.balance < amount) {
            this.showToast("Балансыңызда каражат жетишсиз!", "error");
            return;
        }

        const tx = this.createTransaction({
            type: 'expense',
            category: 'transfer',
            title: `Которуу: ${recipient}`,
            account: sourceAcc.name,
            accountId: sourceAcc.id,
            amount: amount,
            currency: sourceAcc.currency,
            icon: 'send',
            iconBg: 'bg-blue-100 text-blue-600',
            recipient: recipient || "+996 700 882 109",
            cashbackEarned: 0
        });

        this.playSuccessSound();
        this.showToast(this.t('transferSuccess'), "success");
        this.showReceipt(tx);
    }

    // Payments Screen (Төлөмдөр жана кызматтар)
    renderPayments() {
        const main = document.getElementById('tab-content');
        if (!main) return;

        main.innerHTML = `
            <div class="tab-pane space-y-4 px-4 pb-20">
                <div class="pt-2">
                    <h2 class="text-xl font-black text-slate-900 dark:text-white">${this.t('payments')}</h2>
                    <p class="text-xs text-slate-500 dark:text-slate-400">Мобилдик байланыш, коммуналка, салыктар, оюндар</p>
                </div>

                <!-- Search Input -->
                <div class="relative">
                    <input id="payment-search-input" oninput="mbank.searchPayments(this.value)" type="text" placeholder="${this.t('searchPlaceholder')}" class="w-full p-3.5 pl-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:border-blue-500 shadow-sm">
                    <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3.5 top-4"></i>
                </div>

                <!-- Fast Mobile Phone Top Up Form -->
                <div class="p-4 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg space-y-3">
                    <div class="flex items-center justify-between">
                        <span class="font-bold text-xs flex items-center gap-1.5">
                            <i data-lucide="smartphone" class="w-4 h-4 text-cyan-300"></i> Мобилдик байланышты толуктоо
                        </span>
                        <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white/20 text-cyan-200">2% кешбэк</span>
                    </div>

                    <div class="flex gap-2">
                        <input id="mobile-phone-input" type="text" placeholder="0555 12 34 56" value="0700 88 99 00" class="flex-1 p-3 rounded-2xl bg-white/15 text-white placeholder-blue-200 font-bold text-xs outline-none border border-white/20 focus:border-white">
                        <input id="mobile-amount-input" type="number" placeholder="Сумма" value="200" class="w-24 p-3 rounded-2xl bg-white/15 text-white placeholder-blue-200 font-black text-xs outline-none border border-white/20 focus:border-white">
                    </div>

                    <button onclick="mbank.payMobile()" class="w-full py-3 rounded-2xl bg-white text-blue-700 font-black text-xs shadow-md tap-effect transition hover:bg-blue-50">
                        Толуктоо (0 сом комиссия)
                    </button>
                </div>

                <!-- Categories & Services -->
                <div id="payment-categories-list" class="space-y-4">
                    ${this.state.serviceCategories.map(cat => `
                        <div class="rounded-3xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                            <div class="flex items-center gap-2 font-bold text-xs text-slate-800 dark:text-slate-200">
                                <div class="w-7 h-7 rounded-lg ${cat.color} text-white flex items-center justify-center">
                                    <i data-lucide="${cat.icon}" class="w-4 h-4"></i>
                                </div>
                                <span>${this.lang === 'ky' ? cat.nameKy : cat.nameRu}</span>
                            </div>

                            <div class="grid grid-cols-2 gap-2">
                                ${cat.services.map(svc => `
                                    <button onclick="mbank.openPaymentModal('${svc.id}', '${svc.name}', '${svc.cashback || '1%'}')" class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-100 dark:border-slate-800 text-left tap-effect transition group">
                                        <div class="flex items-center justify-between mb-1">
                                            <span class="text-xl">${svc.logo || '💳'}</span>
                                            <span class="text-[9px] font-extrabold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/40 px-1.5 py-0.5 rounded-md">
                                                ${svc.cashback || '1%'}
                                            </span>
                                        </div>
                                        <div class="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-cyan-400">
                                            ${svc.name}
                                        </div>
                                        <div class="text-[10px] text-slate-400 truncate">
                                            ${svc.sub || svc.code || 'Акысыз төлөм'}
                                        </div>
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    payMobile() {
        const phone = document.getElementById('mobile-phone-input')?.value;
        const amount = parseFloat(document.getElementById('mobile-amount-input')?.value);
        const mainCard = this.state.accounts[0];

        if (!amount || amount <= 0) {
            this.showToast("Сумманы жазыңыз!", "error");
            return;
        }

        if (mainCard.balance < amount) {
            this.showToast("Балансыңызда каражат жетишсиз!", "error");
            return;
        }

        const cashback = amount * 0.02; // 2% cashback
        const tx = this.createTransaction({
            type: 'expense',
            category: 'payment',
            title: `Мобилдик байланыш: ${phone}`,
            account: mainCard.name,
            accountId: mainCard.id,
            amount: amount,
            currency: 'KGS',
            icon: 'smartphone',
            iconBg: 'bg-indigo-100 text-indigo-600',
            recipient: phone,
            cashbackEarned: cashback
        });

        this.playSuccessSound();
        this.showToast(this.t('paySuccess'), "success");
        this.showReceipt(tx);
    }

    openPaymentModal(svcId, svcName, cashback) {
        this.playTapSound();
        const modal = document.getElementById('service-pay-modal');
        const title = document.getElementById('service-pay-title');
        const cashbackBadge = document.getElementById('service-pay-cashback');
        if (title) title.innerText = svcName;
        if (cashbackBadge) cashbackBadge.innerText = `Кешбэк: ${cashback}`;
        this.currentPaymentService = { id: svcId, name: svcName, cashback };
        this.openModal('service-pay-modal');
    }

    executeServicePayment() {
        const accNumber = document.getElementById('service-account-number')?.value;
        const amount = parseFloat(document.getElementById('service-pay-amount')?.value);
        const mainCard = this.state.accounts[0];

        if (!accNumber) {
            this.showToast("Реквизит / Лицевой счетту жазыңыз!", "error");
            return;
        }

        if (!amount || amount <= 0) {
            this.showToast("Туура сумманы киргизиңиз!", "error");
            return;
        }

        if (mainCard.balance < amount) {
            this.showToast("Баланста каражат жетишсиз!", "error");
            return;
        }

        const cashbackRate = parseFloat(this.currentPaymentService?.cashback) / 100 || 0.01;
        const cashbackEarned = amount * cashbackRate;

        const tx = this.createTransaction({
            type: 'expense',
            category: 'payment',
            title: this.currentPaymentService?.name || "Кызмат төлөмү",
            account: mainCard.name,
            accountId: mainCard.id,
            amount: amount,
            currency: 'KGS',
            icon: 'receipt',
            iconBg: 'bg-emerald-100 text-emerald-600',
            recipient: `Л/С: ${accNumber}`,
            cashbackEarned: cashbackEarned
        });

        this.closeModal('service-pay-modal');
        this.playSuccessSound();
        this.showToast(this.t('paySuccess'), "success");
        this.showReceipt(tx);
    }

    // MBANK QR Screen (Сканерлөө жана Менин QR кодум)
    renderQr() {
        const main = document.getElementById('tab-content');
        if (!main) return;

        main.innerHTML = `
            <div class="tab-pane space-y-4 px-4 pb-20">
                <div class="pt-2 text-center">
                    <h2 class="text-xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-2">
                        <span class="w-8 h-8 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shadow">M</span>
                        MBANK QR / ELQR
                    </h2>
                    <p class="text-xs text-slate-500 dark:text-slate-400">Кыргызстандын бирдиктүү ELQR системасы</p>
                </div>

                <!-- Tabs: Scan vs My QR -->
                <div class="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
                    <button id="qr-tab-scan" onclick="mbank.setQrSubTab('scan')" class="py-2.5 rounded-xl text-xs font-bold transition bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-sm">
                        📷 ${this.t('qrScanner')}
                    </button>
                    <button id="qr-tab-my" onclick="mbank.setQrSubTab('my')" class="py-2.5 rounded-xl text-xs font-bold transition text-slate-600 dark:text-slate-400">
                        📱 ${this.t('myQrCode')}
                    </button>
                </div>

                <!-- Scanner Viewport View -->
                <div id="qr-view-scan" class="space-y-4">
                    <div class="relative w-full h-72 rounded-3xl overflow-hidden bg-slate-950 flex flex-col items-center justify-center border-2 border-slate-700 shadow-2xl">
                        <!-- Camera frame corners -->
                        <div class="relative w-48 h-48 border-2 border-cyan-400/40 rounded-2xl flex items-center justify-center">
                            <!-- Laser line -->
                            <div class="scanner-laser"></div>

                            <!-- Corners -->
                            <span class="absolute -top-1 -left-1 w-5 h-5 border-t-4 border-l-4 border-cyan-400 rounded-tl-lg"></span>
                            <span class="absolute -top-1 -right-1 w-5 h-5 border-t-4 border-r-4 border-cyan-400 rounded-tr-lg"></span>
                            <span class="absolute -bottom-1 -left-1 w-5 h-5 border-b-4 border-l-4 border-cyan-400 rounded-bl-lg"></span>
                            <span class="absolute -bottom-1 -right-1 w-5 h-5 border-b-4 border-r-4 border-cyan-400 rounded-br-lg"></span>

                            <div class="text-center p-3 text-cyan-200/70 text-[11px] font-semibold">
                                ELQR сканерлөө
                            </div>
                        </div>

                        <!-- Flashlight simulation -->
                        <button onclick="this.classList.toggle('text-yellow-400'); mbank.playTapSound()" class="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white tap-effect">
                            <i data-lucide="zap" class="w-5 h-5"></i>
                        </button>
                    </div>

                    <!-- Quick simulation merchants -->
                    <div>
                        <span class="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2 px-1">
                            ${this.t('simulatedQr')}
                        </span>
                        <div class="grid grid-cols-2 gap-2">
                            ${[
                                { name: "Гипермаркет Globus", amount: 1450, icon: "🛒", code: "ELQR-GLB-01" },
                                { name: "Куликовский кондитер", amount: 620, icon: "🎂", code: "ELQR-KLK-08" },
                                { name: "Coffee House «Sierra»", amount: 280, icon: "☕", code: "ELQR-SRA-22" },
                                { name: "АЗС Газпромнефть", amount: 2000, icon: "⛽", code: "ELQR-GPN-99" }
                            ].map(m => `
                                <button onclick="mbank.simulateQrPayment('${m.name}', ${m.amount})" class="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left tap-effect transition hover:border-blue-500 shadow-sm">
                                    <div class="flex items-center gap-2 mb-1">
                                        <span class="text-lg">${m.icon}</span>
                                        <span class="font-bold text-xs text-slate-900 dark:text-white truncate">${m.name}</span>
                                    </div>
                                    <div class="flex items-center justify-between text-xs">
                                        <span class="text-slate-400">${m.code}</span>
                                        <span class="font-black text-blue-600 dark:text-cyan-400">${m.amount} с</span>
                                    </div>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- My Personal QR View -->
                <div id="qr-view-my" class="hidden space-y-4">
                    <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-lg space-y-4">
                        <div class="w-16 h-16 rounded-2xl bg-blue-600 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
                            M
                        </div>
                        <div>
                            <div class="font-black text-lg text-slate-900 dark:text-white">${this.state.user.name}</div>
                            <div class="text-xs text-slate-500 dark:text-slate-400">${this.state.user.phone}</div>
                        </div>

                        <!-- Generated QR graphic -->
                        <div class="p-4 bg-white rounded-2xl border-2 border-slate-100 shadow-inner w-56 h-56 mx-auto flex items-center justify-center">
                            <svg viewBox="0 0 100 100" class="w-full h-full text-slate-950" fill="currentColor">
                                <rect width="100" height="100" fill="white"/>
                                <path d="M10 10h30v30H10V10zm5 5v20h20V15H15zm5 5h10v10H20V20zm40-10h30v30H60V10zm5 5v20h20V15H65zm5 5h10v10H70V20zM10 60h30v30H10V60zm5 5v20h20V65H15zm5 5h10v10H20V70zm45-10h10v10H65v-10zm15 0h10v10H80v-10zm-15 15h10v15H65V75zm15 10h10v10H80V85zm5-5h10v10H85V80z"/>
                            </svg>
                        </div>

                        <p class="text-xs text-slate-400 max-w-xs mx-auto">
                            ${this.t('myQrHint')}
                        </p>

                        <button onclick="mbank.shareMyQr()" class="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tap-effect transition shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2">
                            <i data-lucide="share-2" class="w-4 h-4"></i> QR кодду бөлүшүү
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    setQrSubTab(subTab) {
        this.playTapSound();
        const scanTab = document.getElementById('qr-tab-scan');
        const myTab = document.getElementById('qr-tab-my');
        const scanView = document.getElementById('qr-view-scan');
        const myView = document.getElementById('qr-view-my');

        if (subTab === 'scan') {
            scanTab.className = "py-2.5 rounded-xl text-xs font-bold transition bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-sm";
            myTab.className = "py-2.5 rounded-xl text-xs font-bold transition text-slate-600 dark:text-slate-400";
            scanView.classList.remove('hidden');
            myView.classList.add('hidden');
        } else {
            myTab.className = "py-2.5 rounded-xl text-xs font-bold transition bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-sm";
            scanTab.className = "py-2.5 rounded-xl text-xs font-bold transition text-slate-600 dark:text-slate-400";
            myView.classList.remove('hidden');
            scanView.classList.add('hidden');
        }
        if (window.lucide) window.lucide.createIcons();
    }

    simulateQrPayment(merchantName, amount) {
        const mainCard = this.state.accounts[0];
        if (mainCard.balance < amount) {
            this.showToast("Балансыңызда каражат жетишсиз!", "error");
            return;
        }

        const cashback = amount * 0.03; // 3% cashback for QR
        const tx = this.createTransaction({
            type: 'expense',
            category: 'payment',
            title: merchantName,
            account: mainCard.name,
            accountId: mainCard.id,
            amount: amount,
            currency: 'KGS',
            icon: 'qr-code',
            iconBg: 'bg-cyan-100 text-cyan-600',
            recipient: `ELQR Терминал: ${merchantName}`,
            cashbackEarned: cashback
        });

        this.playSuccessSound();
        this.showToast(`ELQR аркылуу төлөндү: ${this.formatMoney(amount)}! ✨`, "success");
        this.showReceipt(tx);
    }

    shareMyQr() {
        this.playTapSound();
        if (navigator.clipboard) {
            navigator.clipboard.writeText(`MBANK QR: ${this.state.user.name} (${this.state.user.phone})`);
            this.showToast("QR код шилтемеси көчүрүлдү! 📋", "success");
        } else {
            this.showToast("QR код даяр!");
        }
    }

    // History Screen (Тарых)
    renderHistory(filter = 'all') {
        const main = document.getElementById('tab-content');
        if (!main) return;

        let filtered = this.state.transactions;
        if (filter === 'income') {
            filtered = this.state.transactions.filter(t => t.type === 'income');
        } else if (filter === 'expense') {
            filtered = this.state.transactions.filter(t => t.type === 'expense');
        }

        main.innerHTML = `
            <div class="tab-pane space-y-4 px-4 pb-20">
                <div class="pt-2">
                    <h2 class="text-xl font-black text-slate-900 dark:text-white">${this.t('history')}</h2>
                    <p class="text-xs text-slate-500 dark:text-slate-400">Бардык төлөмдөр, которуулар жана квитанциялар</p>
                </div>

                <!-- Filters -->
                <div class="flex items-center gap-2 overflow-x-auto no-scrollbar">
                    <button onclick="mbank.renderHistory('all')" class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition tap-effect ${filter === 'all' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}">
                        ${this.t('filterAll')}
                    </button>
                    <button onclick="mbank.renderHistory('income')" class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition tap-effect ${filter === 'income' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}">
                        ${this.t('filterIncome')} (+)
                    </button>
                    <button onclick="mbank.renderHistory('expense')" class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition tap-effect ${filter === 'expense' ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}">
                        ${this.t('filterExpense')} (-)
                    </button>
                </div>

                <!-- Transactions Count -->
                <div class="text-[11px] text-slate-400 font-medium px-1">
                    Табылган операциялар: ${filtered.length}
                </div>

                <!-- Transactions List -->
                <div class="space-y-2.5">
                    ${filtered.length > 0 ? filtered.map(tx => this.renderTransactionItemHtml(tx)).join('') : `
                        <div class="text-center py-12 text-slate-400 text-xs">
                            Бул чыпка боюнча операциялар жок
                        </div>
                    `}
                </div>
            </div>
        `;

        if (window.lucide) window.lucide.createIcons();
    }

    // Services & More Screen (Кызматтар жана экосистема)
    renderServices() {
        const main = document.getElementById('tab-content');
        if (!main) return;

        main.innerHTML = `
            <div class="tab-pane space-y-4 px-4 pb-20">
                <!-- User Profile Summary Card -->
                <div class="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                    <div class="flex items-center gap-4">
                        <img src="${this.state.user.avatar}" class="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500 shadow-md">
                        <div>
                            <div class="text-base font-extrabold text-slate-900 dark:text-white">${this.state.user.name}</div>
                            <div class="text-xs text-slate-400 font-medium">${this.state.user.phone}</div>
                            <span class="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                                <i data-lucide="shield-check" class="w-3.5 h-3.5"></i> ${this.state.user.kycStatus}
                            </span>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                        <div class="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800">
                            <div class="text-slate-400 text-[10px]">MBonus топтолду:</div>
                            <div class="font-black text-blue-600 dark:text-cyan-400">${this.formatMoney(this.state.user.cashbackBalance || 0)}</div>
                        </div>
                        <div class="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800">
                            <div class="text-slate-400 text-[10px]">Коопсуздук PIN:</div>
                            <div class="font-black text-slate-800 dark:text-slate-200">1234 (Орнотулган)</div>
                        </div>
                    </div>
                </div>

                <!-- MBANK Ecosystem Apps -->
                <div class="rounded-3xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                    <span class="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 block px-1">
                        MBANK Сервистери:
                    </span>
                    <div class="grid grid-cols-3 gap-2 text-center">
                        <button onclick="mbank.openModal('loan-modal')" class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700/60 tap-effect transition">
                            <div class="text-2xl mb-1">⚡</div>
                            <div class="text-xs font-bold text-slate-800 dark:text-slate-200">Онлайн Насыя</div>
                            <div class="text-[9px] text-slate-400">1 мүнөттө</div>
                        </button>

                        <button onclick="mbank.openModal('deposit-modal')" class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700/60 tap-effect transition">
                            <div class="text-2xl mb-1">🏦</div>
                            <div class="text-xs font-bold text-slate-800 dark:text-slate-200">М-Депозит</div>
                            <div class="text-[9px] text-slate-400">14.5% жылдык</div>
                        </button>

                        <button onclick="mbank.openModal('currency-modal')" class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700/60 tap-effect transition">
                            <div class="text-2xl mb-1">💱</div>
                            <div class="text-xs font-bold text-slate-800 dark:text-slate-200">Конвертер</div>
                            <div class="text-[9px] text-slate-400">Валюта курсу</div>
                        </button>

                        <button onclick="mbank.showToast('M-Market жакында ишке кирет!')" class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700/60 tap-effect transition">
                            <div class="text-2xl mb-1">🛍️</div>
                            <div class="text-xs font-bold text-slate-800 dark:text-slate-200">M-Market</div>
                            <div class="text-[9px] text-slate-400">Товарлар</div>
                        </button>

                        <button onclick="mbank.showToast('M-Travel: Бишкек - Ош - Стамбул')" class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700/60 tap-effect transition">
                            <div class="text-2xl mb-1">✈️</div>
                            <div class="text-xs font-bold text-slate-800 dark:text-slate-200">Авиабилеттер</div>
                            <div class="text-[9px] text-slate-400">Кешбэк менен</div>
                        </button>

                        <button onclick="mbank.openModal('about-modal')" class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700/60 tap-effect transition">
                            <div class="text-2xl mb-1">ℹ️</div>
                            <div class="text-xs font-bold text-slate-800 dark:text-slate-200">Банк тууралуу</div>
                            <div class="text-[9px] text-slate-400">Лицензия НБКР</div>
                        </button>
                    </div>
                </div>

                <!-- Settings & Support -->
                <div class="rounded-3xl p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm divide-y divide-slate-100 dark:divide-slate-800 text-xs font-bold">
                    <button onclick="mbank.toggleTheme()" class="w-full flex items-center justify-between p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-2xl tap-effect transition">
                        <div class="flex items-center gap-3">
                            <i data-lucide="${this.isDarkMode ? 'sun' : 'moon'}" class="w-4 h-4 text-slate-500"></i>
                            <span class="text-slate-800 dark:text-slate-200">Түнкү режим (Dark mode)</span>
                        </div>
                        <span class="text-blue-600 dark:text-cyan-400">${this.isDarkMode ? 'Күйүк' : 'Өчүк'}</span>
                    </button>

                    <button onclick="mbank.toggleFrameMode()" class="w-full flex items-center justify-between p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-2xl tap-effect transition">
                        <div class="flex items-center gap-3">
                            <i data-lucide="smartphone" class="w-4 h-4 text-slate-500"></i>
                            <span class="text-slate-800 dark:text-slate-200">Телефон алкагы режими</span>
                        </div>
                        <span class="text-blue-600 dark:text-cyan-400">${this.isPhoneFrame ? 'Телефон' : 'Толук экран'}</span>
                    </button>

                    <button onclick="mbank.lockApp()" class="w-full flex items-center justify-between p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-2xl tap-effect transition text-red-500">
                        <div class="flex items-center gap-3">
                            <i data-lucide="log-out" class="w-4 h-4"></i>
                            <span>Тиркемеден чыгуу (Бөгөттөө)</span>
                        </div>
                        <i data-lucide="chevron-right" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // Story viewer
    openStory(idx) {
        this.playTapSound();
        const story = this.state.stories[idx];
        if (!story) return;
        story.read = true;
        this.saveState();

        const modal = document.getElementById('story-modal');
        const img = document.getElementById('story-modal-img');
        const title = document.getElementById('story-modal-title');
        const sub = document.getElementById('story-modal-sub');

        if (img) img.src = story.image;
        if (title) title.innerText = this.lang === 'ky' ? story.titleKy : story.titleRu;
        if (sub) sub.innerText = story.subtitle;

        this.openModal('story-modal');
    }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
    window.mbank = new MBankApp();
});
