// 📂 85+ Tools ki Complete Database
const fullServiceList = {
    "Video Pro Engine": [
        { name: "4K AI Upscaler", icon: "fa-expand", type: "4k" },
        { name: "AI Slow-Mo (120FPS)", icon: "fa-clock", type: "4k" },
        { name: "Object Remover", icon: "fa-eraser", type: "4k" },
        { name: "AI Video Relight", icon: "fa-lightbulb", type: "4k" },
        { name: "Face Swap AI", icon: "fa-user-friends", type: "4k" },
        { name: "Anime Converter", icon: "fa-magic", type: "4k" },
        { name: "Sky Replacer", icon: "fa-cloud-sun", type: "4k" },
        { name: "Video Denoise", icon: "fa-broom", type: "4k" }
    ],
    "Image & Art Tools": [
        { name: "Old Photo Restore", icon: "fa-history", type: "4k" },
        { name: "3D Portrait Gen", icon: "fa-cube", type: "4k" },
        { name: "AI Avatar Maker", icon: "fa-user-astronaut", type: "4k" },
        { name: "Logo AI Designer", icon: "fa-pen-nib", type: "4k" },
        { name: "Text to Image", icon: "fa-paint-brush", type: "4k" },
        { name: "Background HD Gen", icon: "fa-image", type: "4k" }
    ],
    "Audio & Neural Voice": [
        { name: "Voice Cloner", icon: "fa-microphone-alt", type: "voice" },
        { name: "AI Music Composer", icon: "fa-music", type: "voice" },
        { name: "Noise Cleaner HD", icon: "fa-volume-mute", type: "voice" },
        { name: "Text to Speech", icon: "fa-comment-dots", type: "voice" }
    ]
    // Add more here to reach 85...
};

// 🛠️ Gallery Load karne wala Engine
function loadToolsGallery() {
    const list = document.getElementById('service-list');
    if(!list) return;
    list.innerHTML = ''; 

    for (const [category, tools] of Object.entries(fullServiceList)) {
        // Adding Category Header
        let header = document.createElement('div');
        header.style = "grid-column: 1/-1; color: var(--primary); font-size: 14px; margin: 20px 0 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;";
        header.innerText = category;
        list.appendChild(header);
        
        // Creating Tool Cards
        tools.forEach(tool => {
            const card = document.createElement('div');
            card.className = 'service-item';
            card.innerHTML = `<i class='fas ${tool.icon}'></i><p style="font-size: 10px; margin-top: 8px;">${tool.name}</p>`;
            card.onclick = () => tool.type === 'voice' ? editorTools.generateVoice() : editorTools.enhance();
            list.appendChild(card);
        });
    }
}

// 🏠 Active Before/After Slider Logic
function initSlider() {
    const container = document.getElementById('before-after-display');
    if(!container) return;
    container.innerHTML = `
        <div class="showcase-card" style="position: relative; overflow: hidden; height: 180px;">
            <div style="position: absolute; width: 100%; height: 100%; background: url('https://kayo-ai.pages.dev/assets/after.jpg') center/cover;"></div>
            <div id="before-layer" style="position: absolute; width: 50%; height: 100%; background: url('https://kayo-ai.pages.dev/assets/before.jpg') center/cover; border-right: 2px solid var(--primary); filter: blur(2px);"></div>
            <input type="range" min="1" max="100" value="50" style="position: absolute; bottom: 10px; width: 80%; left: 10%; accent-color: var(--primary);" 
                oninput="document.getElementById('before-layer').style.width = this.value + '%'">
            <span style="position: absolute; top: 10px; left: 10px; background: black; padding: 2px 8px; font-size: 8px;">BEFORE</span>
            <span style="position: absolute; top: 10px; right: 10px; background: var(--primary); color: black; padding: 2px 8px; font-size: 8px; font-weight: bold;">KAYO 4K</span>
        </div>
    `;
}

// 🚀 Boot System
document.addEventListener('DOMContentLoaded', () => {
    loadToolsGallery();
    initSlider();
    // Chat button trigger
    document.getElementById('chat-trigger').onclick = () => {
        let msg = prompt("Kayo Official: Kaise ho Kanhu?");
        if(msg) alert("Chitthi 🌸: Main hamesha tumhare sath hoon! Processing...");
    };
});