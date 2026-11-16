/**
 * Khalil Barber Shop - Main Script
 * Puente Piedra • Estilo & Precisión
 * Número Oficial: +51 936 403 769
 */

const OFFICIAL_WHATSAPP = "51936403769";

// Catálogo Oficial de 11 Servicios
const SERVICES = [
    { name: "Corte Degradado", price: "S/ 20", tag: "MÁS PEDIDO" },
    { name: "Corte Clásico", price: "S/ 15", tag: "" },
    { name: "Tinte de Cabello", price: "Desde S/ 40", tag: "" },
    { name: "Ondulaciones + Corte de Cabello", price: "S/ 80", tag: "CAMBIO TOTAL" },
    { name: "Pigmentación de Ceja", price: "S/ 20", tag: "" },
    { name: "Pigmentación de Barba", price: "S/ 20", tag: "" },
    { name: "Planchado de Cejas", price: "S/ 20", tag: "" },
    { name: "Lavado de Cabello + Peinado", price: "S/ 10", tag: "" },
    { name: "Corte Degradado + Lavado", price: "S/ 25", tag: "COMBO" },
    { name: "Corte Clásico + Lavado de Cabello", price: "S/ 20", tag: "COMBO" },
    { name: "Depilaciones de Ceja", price: "S/ 5", tag: "" }
];

// ==========================================================================
// 1. Renderizar tabla de servicios (Diseño Editorial Minimalista)
// ==========================================================================
function renderServices() {
    const grid = document.getElementById("services-grid");
    const modalSelect = document.getElementById("modal-service");
    if (!grid) return;

    grid.innerHTML = "";
    if (modalSelect) modalSelect.innerHTML = "";

    SERVICES.forEach(service => {
        const item = document.createElement("div");
        item.className = "flex items-center justify-between gap-4 border-b border-white/10 pb-4 group";

        item.innerHTML = `
            <div class="flex items-center gap-2.5 flex-wrap">
                <span class="font-heading font-bold uppercase tracking-wide text-white text-sm sm:text-base group-hover:text-barber-gold transition-colors duration-300">${service.name}</span>
                ${service.tag ? `<span class="px-2 py-0.5 text-[9px] font-heading font-bold uppercase tracking-wider rounded bg-barber-gold/15 text-barber-gold border border-barber-gold/30">${service.tag}</span>` : ''}
            </div>
            <div class="flex items-center gap-3 shrink-0">
                <span class="font-heading font-bold text-base sm:text-lg text-barber-gold">${service.price}</span>
                <button type="button" onclick="openBookingModal('${service.name} (${service.price})')" class="px-3.5 py-1.5 rounded-full bg-barber-card hover:bg-barber-gold text-barber-gold hover:text-black border border-barber-gold/40 hover:border-barber-gold text-[10px] font-heading font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm active:scale-95">AGENDAR</button>
            </div>
        `;
        grid.appendChild(item);

        if (modalSelect) {
            modalSelect.add(new Option(`${service.name} — ${service.price}`, `${service.name} (${service.price})`));
        }
    });
}

// ==========================================================================
// 2. Selector de vista de Google Maps (Satélite o Normal)
// ==========================================================================
function switchGoogleMapView(type) {
    const iframe = document.getElementById("google-maps-iframe");
    const btnSat = document.getElementById("btn-sat");
    const btnMap = document.getElementById("btn-map");

    if (iframe) {
        iframe.src = `https://maps.google.com/maps?q=-11.8647784,-77.0868154&t=${type}&z=18&hl=es&output=embed`;
    }
    if (btnSat) {
        btnSat.className = type === 'k'
            ? "px-3 py-1 rounded text-[10px] font-heading font-bold uppercase bg-barber-gold text-barber-black transition-all duration-300 cursor-pointer"
            : "px-3 py-1 rounded text-[10px] font-heading font-bold uppercase text-barber-muted hover:text-white transition-all duration-300 cursor-pointer";
    }
    if (btnMap) {
        btnMap.className = type === 'm'
            ? "px-3 py-1 rounded text-[10px] font-heading font-bold uppercase bg-barber-gold text-barber-black transition-all duration-300 cursor-pointer"
            : "px-3 py-1 rounded text-[10px] font-heading font-bold uppercase text-barber-muted hover:text-white transition-all duration-300 cursor-pointer";
    }
}

// ==========================================================================
// 3. Tarjeta VIP Interactiva
// ==========================================================================
let stampedSlots = new Set([0]);

function renderVipCard() {
    const grid = document.getElementById("vip-stamps-grid");
    const statusBadge = document.getElementById("vip-status-badge");
    if (!grid) return;

    grid.innerHTML = "";
    for (let i = 0; i < 12; i++) {
        const isStamped = stampedSlots.has(i);
        const btn = document.createElement("button");
        btn.type = "button";
        btn.onclick = () => {
            if (stampedSlots.has(i)) stampedSlots.delete(i);
            else stampedSlots.add(i);
            renderVipCard();
        };
        btn.className = `aspect-square rounded-xl flex items-center justify-center font-heading font-bold text-xs transition-all duration-300 cursor-pointer border ${isStamped ? 'bg-barber-gold text-barber-black border-barber-gold shadow-lg scale-105' : 'bg-barber-dark text-barber-muted border-white/10 hover:border-barber-gold/50 hover:text-white'}`;
        btn.textContent = isStamped ? `✓` : `${i + 1}`;
        grid.appendChild(btn);
    }
    if (statusBadge) {
        statusBadge.textContent = `${stampedSlots.size} / 12 Sellos marcados`;
    }
}

function resetVipCard() {
    stampedSlots = new Set([0]);
    renderVipCard();
}

// ==========================================================================
// 4. Modal de Reserva Clásico
// ==========================================================================
function openBookingModal(servicioPreseleccionado = '') {
    const modal = document.getElementById("booking-modal");
    const selectServicio = document.getElementById("modal-service");

    if (servicioPreseleccionado && selectServicio) {
        selectServicio.value = servicioPreseleccionado;
    }

    if (modal) {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
        document.body.style.overflow = "hidden";
    }
}

function closeBookingModal() {
    const modal = document.getElementById("booking-modal");
    if (modal) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        document.body.style.overflow = "";
    }
}

function handleBookingSubmit(e) {
    e.preventDefault();
    const nameInput = document.getElementById("modal-name");
    const serviceInput = document.getElementById("modal-service");
    const dateInput = document.getElementById("modal-date");
    const timeInput = document.getElementById("modal-time");

    const name = nameInput ? nameInput.value.trim() : "";
    const service = serviceInput ? serviceInput.value : "";
    const date = dateInput ? dateInput.value : "";
    const time = timeInput ? timeInput.value : "";

    const msg = `Hola *Khalil Barber Shop* 💈, deseo confirmar una cita:\n\n👤 *Nombre:* ${name}\n✂️ *Servicio:* ${service}\n📅 *Fecha:* ${date}\n⏰ *Hora:* ${time}\n📍 *Sede:* Puente Piedra`;
    window.open(`https://wa.me/${OFFICIAL_WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
    closeBookingModal();
}

function sendWhatsAppBooking(event) {
    handleBookingSubmit(event);
}

// ==========================================================================
// 5. Widget Chatbot Asistente Virtual ("Khalil • Central de Citas")
// ==========================================================================
let chatbotState = {
    step: 'welcome', // welcome | ask_name | ask_service | ask_time | summary
    clientName: '',
    service: '',
    time: ''
};

function toggleChatbot() {
    const chatWindow = document.getElementById("chatbot-window");
    if (!chatWindow) return;

    const isHidden = chatWindow.classList.contains("hidden");
    if (isHidden) {
        openChatbot();
    } else {
        closeChatbot();
    }
}

function openChatbot() {
    const chatWindow = document.getElementById("chatbot-window");
    if (!chatWindow) return;

    chatWindow.classList.remove("hidden");
    chatWindow.classList.add("flex");

    const messages = document.getElementById("chatbot-messages");
    if (messages && messages.children.length === 0) {
        resetChatbot();
    }

    scrollChatToBottom();
    const input = document.getElementById("chatbot-input");
    if (input) setTimeout(() => input.focus(), 200);
}

function closeChatbot() {
    const chatWindow = document.getElementById("chatbot-window");
    if (!chatWindow) return;
    chatWindow.classList.add("hidden");
    chatWindow.classList.remove("flex");
}

function scrollChatToBottom() {
    const messages = document.getElementById("chatbot-messages");
    if (messages) {
        setTimeout(() => {
            messages.scrollTop = messages.scrollHeight;
        }, 50);
    }
}

function addBotMessage(htmlContent) {
    const messages = document.getElementById("chatbot-messages");
    if (!messages) return;

    const msgDiv = document.createElement("div");
    msgDiv.className = "chat-bubble-animate flex gap-2.5 items-start max-w-[90%]";
    msgDiv.innerHTML = `
        <div class="w-7 h-7 rounded-full bg-barber-gold text-barber-black font-bold flex items-center justify-center shrink-0 text-[11px] shadow">
            <i class="fa-solid fa-scissors -rotate-45"></i>
        </div>
        <div class="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-3 text-xs text-white leading-relaxed">
            ${htmlContent}
        </div>
    `;
    messages.appendChild(msgDiv);
    scrollChatToBottom();
}

function addUserMessage(text) {
    const messages = document.getElementById("chatbot-messages");
    if (!messages) return;

    const msgDiv = document.createElement("div");
    msgDiv.className = "chat-bubble-animate ml-auto max-w-[85%] bg-barber-gold text-barber-black font-semibold rounded-2xl rounded-tr-sm p-3 text-xs leading-relaxed shadow-md";
    msgDiv.textContent = text;
    messages.appendChild(msgDiv);
    scrollChatToBottom();
}

function renderChatbotOptions(options) {
    const container = document.getElementById("chatbot-quick-options");
    if (!container) return;

    container.innerHTML = "";
    options.forEach(opt => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "px-3 py-1.5 rounded-full bg-barber-dark hover:bg-barber-gold text-white hover:text-black border border-white/15 hover:border-barber-gold text-[11px] font-heading font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm active:scale-95";
        btn.textContent = opt.label;
        btn.onclick = () => opt.action();
        container.appendChild(btn);
    });
}

function resetChatbot() {
    chatbotState = {
        step: 'welcome',
        clientName: '',
        service: '',
        time: ''
    };

    const messages = document.getElementById("chatbot-messages");
    if (messages) messages.innerHTML = "";

    addBotMessage(`
        ¡Hola! 👋 Bienvenido a la Central de Citas de <strong>Khalil Barber Shop</strong> en Puente Piedra.<br><br>
        Soy tu <strong>Asistente Virtual</strong> y te ayudaré a reservar tu turno en segundos o responder tus dudas. ¿Qué te gustaría hacer?
    `);

    renderChatbotOptions([
        { label: "📅 Reservar cita", action: () => startBotReservation() },
        { label: "💰 Ver precios", action: () => botShowPrices() },
        { label: "📍 Ubicación", action: () => botShowLocation() },
        { label: "💬 Hablar por WhatsApp", action: () => botDirectWhatsApp() }
    ]);

    const input = document.getElementById("chatbot-input");
    if (input) input.placeholder = "Escribe tu mensaje...";
}

function startBotReservation() {
    addUserMessage("Deseo reservar una cita");
    chatbotState.step = 'ask_name';

    setTimeout(() => {
        addBotMessage(`¡Excelente elección! 💈 Para comenzar, ¿cuál es tu <strong>nombre completo</strong>?`);
        renderChatbotOptions([]);
        const input = document.getElementById("chatbot-input");
        if (input) {
            input.placeholder = "Escribe tu nombre aquí...";
            input.focus();
        }
    }, 200);
}

function botShowPrices() {
    addUserMessage("Deseo ver los precios");
    setTimeout(() => {
        addBotMessage(`
            Aquí tienes las tarifas más solicitadas:<br><br>
            • <strong>Corte Degradado:</strong> S/ 20 <em>(Más Pedido)</em><br>
            • <strong>Corte Clásico:</strong> S/ 15<br>
            • <strong>Degradado + Lavado:</strong> S/ 25<br>
            • <strong>Ondulaciones + Corte:</strong> S/ 80<br>
            • <strong>Pigmentación Ceja/Barba:</strong> S/ 20<br>
            • <strong>Tinte de Cabello:</strong> Desde S/ 40
        `);

        renderChatbotOptions([
            { label: "📅 Reservar mi turno", action: () => startBotReservation() },
            { label: "📜 Ver catálogo en la web", action: () => { window.location.hash = "#servicios"; closeChatbot(); } },
            { label: "💬 WhatsApp directo", action: () => botDirectWhatsApp() }
        ]);
    }, 200);
}

function botShowLocation() {
    addUserMessage("¿Dónde están ubicados?");
    setTimeout(() => {
        addBotMessage(`
            📍 Estamos en <strong>Puente Piedra, Lima</strong>.<br><br>
            📌 <strong>Referencia principal:</strong> Campo Deportivo Bellavista (Grass Sintético Quispe), cruce con Cam. Real.<br><br>
            ¡Te esperamos con atención directa y personalizada!
        `);

        renderChatbotOptions([
            { label: "🗺️ Ver mapa en web", action: () => { window.location.hash = "#ubicacion"; closeChatbot(); } },
            {
                label: "↗️ Abrir Google Maps", action: () => {
                    window.open("https://www.google.com/maps/place/Campo+Deportivo+Bellavista/@-11.8650262,-77.0872767,179m/data=!3m1!1e3!4m6!3m5!1s0x9105d14cca240769:0x5666ed58c5eb85ee!8m2!3d-11.8647784!4d-77.0868154!16s%2Fg%2F11cs6fcbpg?hl=es", "_blank");
                }
            },
            { label: "📅 Reservar cita", action: () => startBotReservation() }
        ]);
    }, 200);
}

function botDirectWhatsApp() {
    addUserMessage("Deseo hablar directo por WhatsApp");
    setTimeout(() => {
        addBotMessage(`
            ¡Perfecto! Puedes escribirnos directamente a nuestro WhatsApp oficial: <strong>+51 936 403 769</strong>.<br><br>
            <a href="https://wa.me/${OFFICIAL_WHATSAPP}?text=Hola%20Khalil%20Barber%20Shop,%20quisiera%20hacer%20una%20consulta." target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-green-500 hover:bg-green-600 text-white font-heading font-bold uppercase tracking-wider text-xs transition-all shadow-md mt-1">
               <i class="fa-brands fa-whatsapp text-sm"></i>
               <span>Abrir WhatsApp Ahora ↗</span>
            </a>
        `);

        renderChatbotOptions([
            { label: "🔄 Menú principal", action: () => resetChatbot() }
        ]);
    }, 200);
}

function handleClientNameStep(name) {
    chatbotState.clientName = name;
    chatbotState.step = 'ask_service';

    addBotMessage(`¡Mucho gusto, <strong>${name}</strong>! ¿Qué servicio deseas agendar?`);

    renderChatbotOptions([
        { label: "✂️ Corte Degradado (S/ 20)", action: () => selectBotService("Corte Degradado — S/ 20") },
        { label: "✂️ Corte Clásico (S/ 15)", action: () => selectBotService("Corte Clásico — S/ 15") },
        { label: "💈 Degradado + Lavado (S/ 25)", action: () => selectBotService("Corte Degradado + Lavado — S/ 25") },
        { label: "🌊 Ondulaciones + Corte (S/ 80)", action: () => selectBotService("Ondulaciones + Corte — S/ 80") },
        { label: "🧔 Cejas / Barba (S/ 20)", action: () => selectBotService("Pigmentación Barba/Ceja — S/ 20") },
        { label: "✨ Otro servicio", action: () => selectBotService("Consulta por otro servicio") }
    ]);

    const input = document.getElementById("chatbot-input");
    if (input) input.placeholder = "O escribe tu servicio aquí...";
}

function selectBotService(serviceName) {
    addUserMessage(serviceName);
    chatbotState.service = serviceName;
    chatbotState.step = 'ask_time';

    setTimeout(() => {
        addBotMessage(`
            Anotado: <strong>${serviceName}</strong>. 👍<br><br>
            ¿Para qué <strong>día y en qué horario aproximado</strong> te gustaría venir?
        `);

        renderChatbotOptions([
            { label: "Hoy por la tarde", action: () => selectBotTime("Hoy por la tarde") },
            { label: "Mañana por la mañana", action: () => selectBotTime("Mañana por la mañana") },
            { label: "Mañana por la tarde", action: () => selectBotTime("Mañana por la tarde") },
            { label: "Fin de semana", action: () => selectBotTime("Este fin de semana") }
        ]);

        const input = document.getElementById("chatbot-input");
        if (input) {
            input.placeholder = "Ej: Mañana 4:30 PM";
            input.focus();
        }
    }, 200);
}

function selectBotTime(timeText) {
    addUserMessage(timeText);
    chatbotState.time = timeText;
    chatbotState.step = 'summary';

    setTimeout(() => {
        const msgWa = `Hola *Khalil Barber Shop* 💈, deseo confirmar una cita desde la Central de Citas:%0A%0A` +
            `👤 *Cliente:* ${chatbotState.clientName}%0A` +
            `✂️ *Servicio:* ${chatbotState.service}%0A` +
            `📅 *Horario deseado:* ${chatbotState.time}%0A` +
            `📍 *Sede:* Puente Piedra (Campo Deportivo Bellavista)`;

        addBotMessage(`
            <div class="bg-black/50 border border-barber-gold/40 rounded-xl p-3 space-y-1.5 my-1 text-left">
                <div class="font-heading font-black text-barber-gold uppercase text-[11px] border-b border-white/10 pb-1 mb-1">
                    📋 Resumen de tu Reserva
                </div>
                <div><span class="text-barber-muted">👤 Cliente:</span> <strong class="text-white">${chatbotState.clientName}</strong></div>
                <div><span class="text-barber-muted">✂️ Servicio:</span> <strong class="text-white">${chatbotState.service}</strong></div>
                <div><span class="text-barber-muted">📅 Horario:</span> <strong class="text-white">${chatbotState.time}</strong></div>
                <div><span class="text-barber-muted">📍 Sede:</span> <strong class="text-white">Puente Piedra</strong></div>
            </div>
            <p class="mt-2 text-barber-muted">Haz clic en el botón dorado para enviar tus datos directamente por WhatsApp y confirmar tu cita:</p>
            <a href="https://wa.me/${OFFICIAL_WHATSAPP}?text=${msgWa}" target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-barber-gold hover:bg-barber-goldLight text-barber-black font-heading font-bold uppercase tracking-wider text-xs transition-all shadow-lg active:scale-95 mt-3">
               <span>ENVIAR RESERVA A WHATSAPP</span>
               <span>↗</span>
            </a>
        `);

        renderChatbotOptions([
            { label: "🔄 Nueva reserva", action: () => resetChatbot() },
            { label: "📍 Ver ubicación", action: () => botShowLocation() }
        ]);

        const input = document.getElementById("chatbot-input");
        if (input) input.placeholder = "Escribe tu mensaje...";
    }, 250);
}

function handleChatbotInput(e) {
    e.preventDefault();
    const input = document.getElementById("chatbot-input");
    if (!input) return;

    const val = input.value.trim();
    if (!val) return;

    input.value = "";

    if (chatbotState.step === 'ask_name') {
        addUserMessage(val);
        setTimeout(() => handleClientNameStep(val), 200);
    } else if (chatbotState.step === 'ask_service') {
        selectBotService(val);
    } else if (chatbotState.step === 'ask_time') {
        selectBotTime(val);
    } else {
        addUserMessage(val);
        setTimeout(() => {
            const lower = val.toLowerCase();
            if (lower.includes("precio") || lower.includes("costo") || lower.includes("cuanto") || lower.includes("tarifa")) {
                botShowPrices();
            } else if (lower.includes("donde") || lower.includes("ubicacion") || lower.includes("direccion") || lower.includes("llegar")) {
                botShowLocation();
            } else if (lower.includes("reserv") || lower.includes("cita") || lower.includes("turno") || lower.includes("agend")) {
                startBotReservation();
            } else if (lower.includes("whatsapp") || lower.includes("telefono") || lower.includes("numero")) {
                botDirectWhatsApp();
            } else {
                addBotMessage(`
                    Entendido: "<em>${val}</em>".<br><br>
                    Para brindarte la mejor atención personalizada, ¿deseas reservar una cita o prefieres hablar directamente por WhatsApp?
                `);
                renderChatbotOptions([
                    { label: "📅 Reservar cita", action: () => startBotReservation() },
                    { label: "💬 Hablar por WhatsApp", action: () => botDirectWhatsApp() },
                    { label: "🔄 Menú principal", action: () => resetChatbot() }
                ]);
            }
        }, 250);
    }
}

// ==========================================================================
// 6. Inicialización de Menú Móvil y Eventos Globales
// ==========================================================================
function initMobileMenu() {
    const mobileBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileIcon = document.getElementById("mobile-menu-icon");

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener("click", () => {
            const isHidden = mobileMenu.classList.toggle("hidden");
            if (mobileIcon) {
                if (isHidden) {
                    mobileIcon.classList.remove("fa-xmark");
                    mobileIcon.classList.add("fa-bars");
                } else {
                    mobileIcon.classList.remove("fa-bars");
                    mobileIcon.classList.add("fa-xmark");
                }
            }
        });

        document.querySelectorAll(".mobile-link").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.add("hidden");
                if (mobileIcon) {
                    mobileIcon.classList.remove("fa-xmark");
                    mobileIcon.classList.add("fa-bars");
                }
            });
        });
    }

    // Enlaces de reserva rápida (#reservar)
    document.querySelectorAll('a[href="#reservar"]').forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            openBookingModal();
        });
    });

    // Cerrar modal al hacer clic en el backdrop
    const modal = document.getElementById("booking-modal");
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeBookingModal();
            }
        });
    }

    // Cerrar modal o chatbot con tecla Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeBookingModal();
            closeChatbot();
        }
    });
}

// ==========================================================================
// 7. Inicialización al cargar el DOM
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    renderServices();
    renderVipCard();
    initMobileMenu();

    const dateInput = document.getElementById("modal-date");
    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.value = today;
        dateInput.min = today;
    }
});
