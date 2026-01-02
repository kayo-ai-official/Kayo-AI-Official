// main.js - Kayo Neural Official "Action" Brain

// 1. 📂 85+ Services Data
const fullServiceList = {
    "Video & Animation": [
        { name: "4K AI Upscaler", icon: "fa-expand", type: "4k" },
        { name: "AI Slow-Mo", icon: "fa-clock", type: "4k" },
        { name: "Object Remover", icon: "fa-eraser", type: "4k" },
        { name: "Face Swap AI", icon: "fa-user-friends", type: "4k" }
    ],
    "Image Magic": [
        { name: "Old Photo Fix", icon: "fa-history", type: "4k" },
        { name: "3D Portrait", icon: "fa-cube", type: "4k" },
        { name: "Background Gen", icon: "fa-mountain", type: "4k" }
    ],
    "Voice & Music": [
        { name: "AI Voice Clone", icon: "fa-microphone", type: "voice" },
        { name: "Noise Cleaner", icon: "fa-broom", type: "voice" },
        { name: "Text to Song", icon: "fa-music", type: "voice" }
    ]
};

// 2. 🎤 ElevenLabs Real Voice
async function generateKayoVoice(text) {
    if(!text) return;
    alert("Chitthi 🌸: Voice bana rahi hoon, thoda ruko...");
    try {
        const res = await fetch("https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM", {
            method: "POST",
            headers: { "xi-api-key": KAYO_CONFIG.ELEVEN_LABS_KEY, "Content-Type": "application/json" },
            body: JSON.stringify({ text: text, model_id: "eleven_monolingual_v1" })
        });
        const blob = await res.blob();
        new Audio(URL.createObjectURL(blob)).play();
    } catch(e) { alert("Voice Error: Key check karo betu!"); }
}

// 3. 💬 Chitthi AI (Gemini Connection)
async function chitthiTalk() {
    const msg = prompt("Chitthi 🌸: Kaise ho Kanhu betu? Kya help karun?");
    if(!msg) return;
    alert("Chitthi 🌸: Soch rahi hoon...");
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${KAYO_CONFIG.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: `You are Chitthi, a loving, emotional AI sister and partner for Kanhu. Reply to: ${msg}` }] }] })
        });
        const data = await res.json();
        alert("Chitthi 🌸: " + data.candidates[0].content.parts[0].text);
    } catch(e) { alert("Chitthi 🌸: Main hamesha tumhare saath hoon betu! Par abhi net thoda slow hai."); }
}

// 4. 🛠️ Display Logic
function loadToolsGallery() {
    const list = document.getElementById('service-list');
    if(!list) return;
    list.innerHTML = '';
    for (const [cat, tools] of Object.entries(fullServiceList)) {
        list.innerHTML += `<div style="grid-column:1/-1; color:var(--primary); font-size:12px; margin-top:15px;">${cat}</div>`;
        tools.forEach(s => {
            list.innerHTML += `
                <div class='service-item' onclick="${s.type === 'voice' ? 'editorTools.generateVoice()' : 'editorTools.enhance()'}">
                    <i class='fas ${s.icon}'></i>
                    <p style="font-size: 9px; margin-top: 5px;">${s.name}</p>
                </div>`;
        });
    }
}

// 🎬 Editor Functions
const editorTools = {
    enhance: () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e) => alert(`Kayo AI: ${e.target.files[0].name} received for 4K processing!`);
        input.click();
    },
    removeBG: () => alert("Kayo AI: Smart Cutout starting..."),
    generateVoice: () => {
        const txt = prompt("Kya bulwana chahte ho?");
        if(txt) generateKayoVoice(txt);
    }
};

// 🏠 Section Management
function showSection(id) {
    document.querySelectorAll('.content-view').forEach(v => v.style.display = 'none');
    document.getElementById(id + '-section').style.display = 'block';
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    if(id === 'tools') loadToolsGallery();
}

// 🔐 Login Logic
function handleLogin() {
    const email = document.getElementById('user-email').value;
    if(email === KAYO_CONFIG.ADMIN_ID) window.location.href = "admin.html";
    else if(email) document.getElementById('login-overlay').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('chat-trigger').onclick = chitthiTalk;
    showSection('editor');
});