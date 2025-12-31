document.addEventListener("mousemove", (e) => {
    const cards = document.querySelectorAll(".glass-card, .group");
    
    cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // Posisi X kursor di dalam card
        const y = e.clientY - rect.top;  // Posisi Y kursor di dalam card

        // Set variabel CSS langsung ke element
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    });
});

// Database Game (Simulasi)
// 1. DATA SEMUA GAME
const gameData = {
    'cyber-city': {
        title: "Cyber City RP",
        category: "Roleplay",
        shortDesc: "Roleplay game masa depan dengan sistem ekonomi yang kompleks dan kustomisasi karakter total.",
        description: "Selamat datang di Cyber City. Game ini menawarkan pengalaman roleplay paling mendalam di Roblox dengan fitur sistem kendaraan kustom, pekerjaan dinamis, dan sistem perumahan yang terintegrasi.",
        visits: "1.2M+",
        tags: ["Open World", "Economy"],
        features: ["Custom Chassis", "Global DataStore", "Advanced UI"],
        thumbnail: "game1_thumb.jpg", // Gambar di grid
        image: "game1_large.jpg"      // Gambar di dalam modal
    },
    'island-survival': {
        title: "Island Survival",
        category: "Survival",
        shortDesc: "Bertahan hidup di pulau terpencil dengan sistem crafting dan cuaca dinamis.",
        description: "Uji ketangkasanmu dalam bertahan hidup. Bangun markas, cari sumber daya, dan hadapi ancaman lingkungan yang berubah-ubah setiap waktu.",
        visits: "800K+",
        tags: ["Survival", "Crafting"],
        features: ["Dynamic Weather", "Building System", "Hunger Mechanics"],
        thumbnail: "game2_thumb.jpg",
        image: "game2_large.jpg"
    }
};

// 2. FUNGSI UNTUK MENAMPILKAN DAFTAR GAME (GRID)
function renderGames() {
    const container = document.getElementById('game-container');
    
    // Looping data game untuk membuat HTML
    container.innerHTML = Object.keys(gameData).map(id => {
        const game = gameData[id];
        return `
            <div class="game-card group bg-surface rounded-3xl overflow-hidden border border-white/5" 
                 onclick="openModal('${id}')">
                <div class="relative aspect-[4/3] overflow-hidden">
                    <img src="${game.thumbnail}" alt="${game.title}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700">
                    <div class="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span class="bg-white text-black px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest">View Detail</span>
                    </div>
                </div>
                <div class="p-6">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-xl font-bold text-white">${game.title}</h3>
                        <span class="text-[10px] font-bold text-accent bg-accent/10 px-2 py-1 rounded">${game.visits} Visits</span>
                    </div>
                    <p class="text-gray-500 text-sm line-clamp-2 mb-4">${game.shortDesc}</p>
                    <div class="flex gap-2">
                        ${game.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// 3. FUNGSI UNTUK MODAL (SAMA SEPERTI SEBELUMNYA)
function openModal(id) {
    const data = gameData[id];
    const modal = document.getElementById('gameModal');
    const content = document.getElementById('modalContent');

    content.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div class="rounded-2xl overflow-hidden bg-dark aspect-video">
                <img src="${data.image}" class="w-full h-full object-cover">
            </div>
            <div>
                <span class="text-accent font-bold text-xs uppercase tracking-widest">${data.category}</span>
                <h2 class="text-4xl font-extrabold mt-2 mb-4 text-white">${data.title}</h2>
                <p class="text-gray-400 leading-relaxed mb-6">${data.description}</p>
                <h4 class="font-bold mb-3 text-white">Main Features:</h4>
                <ul class="grid grid-cols-2 gap-y-2">
                    ${data.features.map(f => `<li class="text-sm text-gray-500 flex items-center gap-2">
                        <span class="w-1.5 h-1.5 bg-accent rounded-full"></span> ${f}
                    </li>`).join('')}
                </ul>
                <button class="btn-primary w-full mt-8">Launch Game</button>
            </div>
        </div>
    `;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

// Fungsi Filter dengan perbaikan Bug & Efek
function filterGames(category, element) {
    // 1. Update UI Tombol (Handle jika element null saat onload)
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (element) {
        element.classList.add('active');
    } else {
        // Jika dipanggil dari onload (tanpa klik), cari tombol 'All'
        buttons.forEach(btn => {
            if(btn.innerText.includes('All')) btn.classList.add('active');
        });
    }

    const container = document.getElementById('game-container');
    const noGameMessage = document.getElementById('no-game-message');
    
    const filteredIds = Object.keys(gameData).filter(id => {
        if (category === 'All') return true;
        return gameData[id].category === category;
    });

    // Transisi halus
    container.style.opacity = '0';
    
    setTimeout(() => {
        if (filteredIds.length === 0) {
            container.classList.add('hidden');
            noGameMessage.classList.remove('hidden');
        } else {
            container.classList.remove('hidden');
            noGameMessage.classList.add('hidden');
            
            container.innerHTML = filteredIds.map(id => {
                const game = gameData[id];
                return `
                    <div class="game-card group bg-surface rounded-[2rem] overflow-hidden border border-white/5 hover:border-accent/30 transition-all duration-500 shadow-xl" 
                         onclick="openModal('${id}')">
                        <div class="relative aspect-[16/10] overflow-hidden">
                            <img src="${game.thumbnail}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-80 group-hover:opacity-100">
                        </div>
                        <div class="p-8 relative -mt-12 bg-surface/90 backdrop-blur-md mx-4 mb-4 rounded-2xl border border-white/5">
                            <h3 class="text-xl font-bold text-white tracking-tight">${game.title}</h3>
                            <p class="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">${game.shortDesc}</p>
                            <div class="flex items-center justify-between">
                                <div class="flex gap-1">
                                    ${game.tags.map(t => `<span class="text-[9px] border border-white/10 px-2 py-0.5 rounded-md text-gray-400 font-bold uppercase">${t}</span>`).join('')}
                                </div>
                                <span class="text-accent text-[10px] font-black italic tracking-widest">${game.visits}</span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }
        container.style.opacity = '1';
    }, 300);
}

// Fungsi Buka-Tutup Dropdown
function toggleDropdown() {
    const menu = document.getElementById('dropdown-menu');
    const icon = document.getElementById('dropdown-icon');
    menu.classList.toggle('active');
    icon.classList.toggle('rotate');
}

// Fungsi Saat Kategori Dipilih
function selectCategory(category) {
    // 1. Update Teks Tombol Utama
    document.getElementById('current-category').innerText = category === 'All' ? 'All Projects' : category;
    
    // 2. Tandai item yang dipilih
    const items = document.querySelectorAll('.category-item');
    items.forEach(item => {
        if(item.innerText.includes(category)) item.classList.add('selected');
        else item.classList.remove('selected');
    });

    // 3. Jalankan fungsi filter utama (yang lama tetap digunakan)
    filterGames(category, null);

    // 4. Tutup Menu
    toggleDropdown();
}

// Tambahan: Klik di luar untuk menutup dropdown
window.addEventListener('click', (e) => {
    const wrapper = document.getElementById('dropdown-wrapper');
    if (wrapper && !wrapper.contains(e.target)) {
        document.getElementById('dropdown-menu').classList.remove('active');
        document.getElementById('dropdown-icon').classList.remove('rotate');
    }
});

// Update window.onload (Gunakan ini agar Team tidak hilang)
window.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('team-container')) {
        renderTeam();
    }
    // Set default awal tanpa animasi menu
    selectCategory('All');
});

function closeModal() {
    document.getElementById('gameModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// 1. Data Team
const teamData = {
    'rizz-dev': {
        name: "RizzDev",
        role: "Lead Scripter",
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Felix",
        bio: "Spesialis dalam optimasi sistem backend dan arsitektur gameplay yang kompleks.",
        contributions: [
            "Mengembangkan Custom Physics Engine untuk kendaraan.",
            "Integrasi Global DataStore dengan sistem anti-exploit.",
            "Optimasi frame rate hingga 30% pada perangkat mobile."
        ],
        specialties: ["Luau", "DataStore Service", "Raycasting"]
    },
    'build-master': {
        name: "BuildMaster",
        role: "Master Builder",
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Jordan",
        bio: "Menciptakan dunia imersif dengan detail lingkungan yang tinggi dan lighting sinematik.",
        contributions: [
            "Membangun Map Cyber City seluas 4k x 4k.",
            "Penyusunan sistem modular building untuk efisiensi part.",
            "Lighting & Post-processing setup di semua project utama."
        ],
        specialties: ["Level Design", "3D Modeling", "Atmospheric Lighting"]
    }
};

// 2. Fungsi untuk Menampilkan Daftar Tim di Halaman Utama
function renderTeam() {
    const container = document.getElementById('team-container');
    container.innerHTML = Object.keys(teamData).map(id => {
        const member = teamData[id];
        return `
            <div class="team-card group cursor-pointer" onclick="openTeamModal('${id}')">
                <div class="relative mb-6 overflow-hidden rounded-3xl aspect-square bg-surface border border-white/5 group-hover:border-accent/50 transition-all duration-500">
                    <img src="${member.avatar}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span class="text-[10px] font-bold uppercase tracking-widest bg-white text-black px-4 py-2 rounded-full">View Bio</span>
                    </div>
                </div>
                <h4 class="font-bold text-xl text-center">${member.name}</h4>
                <p class="text-gray-500 text-[10px] uppercase tracking-[0.2em] mt-1 text-center font-bold">${member.role}</p>
            </div>
        `;
    }).join('');
}

// 3. Fungsi Buka Modal Detail Tim
function openTeamModal(id) {
    const member = teamData[id];
    const modal = document.getElementById('teamModal');
    const content = document.getElementById('teamModalContent');

    content.innerHTML = `
        <div class="p-10">
            <div class="flex flex-col items-center text-center mb-8">
                <div class="w-24 h-24 rounded-2xl bg-accent/10 mb-4 overflow-hidden border border-accent/20">
                    <img src="${member.avatar}" class="w-full h-full object-cover">
                </div>
                <h2 class="text-3xl font-bold">${member.name}</h2>
                <p class="text-accent font-bold text-xs uppercase tracking-[0.2em]">${member.role}</p>
            </div>
            
            <div class="space-y-6">
                <div>
                    <h4 class="text-white font-bold mb-2 text-sm uppercase tracking-widest">About</h4>
                    <p class="text-gray-400 text-sm leading-relaxed">${member.bio}</p>
                </div>
                
                <div>
                    <h4 class="text-white font-bold mb-3 text-sm uppercase tracking-widest">Key Contributions</h4>
                    <ul class="space-y-2">
                        ${member.contributions.map(item => `
                            <li class="text-gray-500 text-sm flex gap-3 italic">
                                <span class="text-accent">▹</span> "${item}"
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="flex gap-2 pt-4">
                    ${member.specialties.map(s => `<span class="tag">${s}</span>`).join('')}
                </div>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeTeamModal() {
    document.getElementById('teamModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Panggil fungsi render saat halaman load
window.onload = () => {
    filterGames('All');
    //renderGames(); // Gambar grid game
    renderTeam();  // Gambar grid team (dari kode sebelumnya)
};