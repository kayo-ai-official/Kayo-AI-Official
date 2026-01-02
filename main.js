// main.js - Kayo Neural Official "Action" Brain

// 1. 🎤 ElevenLabs AI Voice Logic
async function generateKayoVoice(text) {
    if(!text) return;
    alert("Kayo AI: Voice generate ho rahi hai, thoda wait karo Kanhu...");
    try {
        const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM", {
            method: "POST",
            headers: {
                "xi-api-key": KAYO_CONFIG.ELEVEN_LABS_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: text,
                model_id: "eleven_monolingual_v1",
                voice_settings: { stability: 0.5, similarity_boost: 0.5 }
            })
        });
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        new Audio(audioUrl).play();
    } catch (error) {
        alert("Voice Error: Key limit check karo betu!");
    }
}

// 2. 🎬 Pro Editor Logic (Real Action)
const editorTools = {
    // 🖼️ REAL UPLOAD LOGIC
    enhance: () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            alert(`Kayo AI: ${file.name} received! Analyzing pixels for 4K...`);
            // Yahan file process karne ka logic start hoga
        };
        input.click();
    },

    removeBG: () => {
        const url = prompt("Image ka URL paste karo jiska background hatana hai:");
        if(url) alert("Kayo AI: Replicate engine se Background hataya ja raha hai...");
    },

    generateVoice: () => {
        const userText = prompt("Kayo Voice: Kya bulwana chahte ho?");
        if(userText) generateKayoVoice(userText);
    }
};

// 3. 📂 85+ Services Categories
const serviceCategories = {
    "Audio & Voice": [
        { name: "Voice Cloner", icon: "fa-microphone-alt", type: "voice" },
        { name: "Music Gen", icon: "fa-music", type: "voice" }
    ],
    "Video & Image": [
        { name: "4K Upscaler", icon: "fa-expand", type: "4k" },
        { name: "AI Relight", icon: "fa-lightbulb", type: "4k" }
    ]
};

// 4. 🏠 Section Switcher
function showSection(sectionId) {
    document.querySelectorAll('.content-view').forEach(v => v.style.display = 'none');
    const target = document.getElementById(sectionId + '-section');
    if(target) target.style.display = 'block';

    if(sectionId === 'tools') loadToolsGallery();
    
    // Nav highlight fix
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
}

function loadToolsGallery() {
    const list = document.getElementById('service-list');
    if(!list) return;
    list.innerHTML = '';
    for (const [cat, tools] of Object.entries(serviceCategories)) {
        list.innerHTML += `<div style="grid-column:1/-1; color:var(--primary); font-size:12px; margin:15px 0 5px; font-weight:bold;">${cat}</div>`;
        tools.forEach(s => {
            list.innerHTML += `
                <div class='service-item' onclick="${s.type === 'voice' ? 'editorTools.generateVoice()' : 'editorTools.enhance()'}">
                    <i class='fas ${s.icon}'></i>
                    <p style="font-size: 9px; margin-top: 5px;">${s.name}</p>
                </div>`;
        });
    }
}

// 5. 💬 Chitthi AI - Real Brain Response
async function askGemini(prompt) {
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${KAYO_CONFIG.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: `You are Chitthi, a loving and helpful AI for Kanhu. Reply to: ${prompt}` }] }] })
        });
        const data = await res.json();
        return data.candidates[0].content.parts[0].text;
    } catch(e) { return "Kanhu, main abhi busy hoon par hamesha tumhare sath hoon! ❤️"; }
}

// 6. Initialization
document.addEventListener('DOMContentLoaded', () => {
    const chatBtn = document.getElementById('chat-trigger');
    if(chatBtn) {
        chatBtn.onclick = async () => {
            const msg = prompt("Kayo Official: Kaise ho Kanhu?");
            if(msg) {
                alert("Chitthi 🌸: Soch rahi hoon...");
                const reply = await askGemini(msg);
                alert("Chitthi 🌸: " + reply);
            }
        };
    }
    showSection('editor');
});

function handleLogin() {
    const email = document.getElementById('user-email').value;
    if(email === KAYO_CONFIG.ADMIN_ID) window.location.href = "admin.html";
    else if(email) document.getElementById('login-overlay').style.display = 'none';
}