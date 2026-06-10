import { db } from './firebase-config.js';
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

async function loadFeaturedStories() {
    const container = document.getElementById('featuredList');
    if (!container) return;

    const storiesCol = collection(db, "stories");
    const storySnapshot = await getDocs(storiesCol);
    container.innerHTML = '';

    storySnapshot.forEach(doc => {
        const story = doc.data();
        const card = document.createElement('div');
        card.className = `card ${story.isPremium ? 'locked' : ''}`;
        card.innerHTML = `
            <img src="${story.coverUrl || 'assets/default-cover.jpg'}" alt="${story.title}">
            <div class="info">
                <h3>${story.title}</h3>
                <p>${story.author}</p>
                <a href="pages/player.html?id=${doc.id}">▶ Nghe ngay</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// Tìm kiếm
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', async (e) => {
        const keyword = e.target.value.toLowerCase();
        const storiesCol = collection(db, "stories");
        // Firestore không hỗ trợ search full-text, ta dùng trick đơn giản
        const snapshot = await getDocs(storiesCol);
        const filtered = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.title.toLowerCase().includes(keyword)) {
                filtered.push({ id: doc.id, ...data });
            }
        });
        renderFiltered(filtered);
    });
}

function renderFiltered(stories) {
    const container = document.getElementById('featuredList');
    if (!container) return;
    container.innerHTML = '';
    stories.forEach(story => {
        const card = document.createElement('div');
        card.className = `card ${story.isPremium ? 'locked' : ''}`;
        card.innerHTML = `
            <img src="${story.coverUrl}" alt="${story.title}">
            <div class="info">
                <h3>${story.title}</h3>
                <p>${story.author}</p>
                <a href="pages/player.html?id=${story.id}">▶ Nghe</a>
            </div>
        `;
        container.appendChild(card);
    });
}

loadFeaturedStories();
