// Dashboard State
let currentContent = JSON.parse(JSON.stringify(DEFAULT_CONTENT));

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function() {
    initLogin();
    initNavigation();
    initEditors();
    loadContent();
    initSaveButtons();
});

// Login Functionality
function initLogin() {
    const loginForm = document.getElementById('adminLoginForm');
    const loginScreen = document.getElementById('loginScreen');
    const dashboard = document.getElementById('dashboard');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username === ADMIN_CONFIG.defaultUsername && password === ADMIN_CONFIG.defaultPassword) {
                loginScreen.style.display = 'none';
                dashboard.style.display = 'flex';
                loadContent();
                showNotification('Login successful!', 'success');
            } else {
                showNotification('Invalid username or password', 'error');
            }
        });
    }
    
    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            loginScreen.style.display = 'flex';
            dashboard.style.display = 'none';
            showNotification('Logged out successfully', 'info');
        });
    }
}

// Navigation
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.editor-section');
    const sectionTitle = document.getElementById('sectionTitle');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            
            // Update active state
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Show corresponding section
            sections.forEach(sec => sec.classList.remove('active'));
            const activeSection = document.getElementById(`${section}Editor`);
            if (activeSection) activeSection.classList.add('active');
            
            // Update title
            sectionTitle.textContent = item.querySelector('span')?.textContent || 
                                      item.textContent.replace(/[^a-zA-Z]/g, '');
        });
    });
}

// Initialize Editors
function initEditors() {
    // Skills Editor
    initSkillsEditor();
    // Services Editor
    initServicesEditor();
    // Portfolio Editor
    initPortfolioEditor();
    // Gaming Editor
    initGamingEditor();
}

function initSkillsEditor() {
    const addTechBtn = document.getElementById('addTechSkill');
    const addDevBtn = document.getElementById('addDevSkill');
    const techList = document.getElementById('technicalSkillsList');
    const devList = document.getElementById('devSkillsList');
    
    if (addTechBtn) {
        addTechBtn.addEventListener('click', () => {
            addSkillItem(techList, 'technical');
        });
    }
    
    if (addDevBtn) {
        addDevBtn.addEventListener('click', () => {
            addSkillItem(devList, 'development');
        });
    }
}

function addSkillItem(container, type) {
    const skillDiv = document.createElement('div');
    skillDiv.className = 'skill-item';
    skillDiv.innerHTML = `
        <input type="text" class="form-control skill-name" placeholder="Skill Name" style="margin-bottom: 10px;">
        <input type="number" class="form-control skill-percent" placeholder="Percentage" min="0" max="100">
        <button class="delete-btn"><i class="fas fa-trash"></i></button>
    `;
    
    skillDiv.querySelector('.delete-btn').addEventListener('click', () => {
        skillDiv.remove();
    });
    
    container.appendChild(skillDiv);
}

function initServicesEditor() {
    const addBtn = document.getElementById('addService');
    const container = document.getElementById('servicesList');
    
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            addServiceItem(container);
        });
    }
}

function addServiceItem(container) {
    const serviceDiv = document.createElement('div');
    serviceDiv.className = 'service-item';
    serviceDiv.innerHTML = `
        <input type="text" class="form-control" placeholder="Icon Class (e.g., fa-tools)" style="margin-bottom: 10px;">
        <input type="text" class="form-control" placeholder="Service Title" style="margin-bottom: 10px;">
        <textarea class="form-control" placeholder="Service Description" rows="3" style="margin-bottom: 10px;"></textarea>
        <button class="delete-btn"><i class="fas fa-trash"></i></button>
    `;
    
    serviceDiv.querySelector('.delete-btn').addEventListener('click', () => {
        serviceDiv.remove();
    });
    
    container.appendChild(serviceDiv);
}

function initPortfolioEditor() {
    const addBtn = document.getElementById('addPortfolio');
    const container = document.getElementById('portfolioList');
    
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            addPortfolioItem(container);
        });
    }
}

function addPortfolioItem(container) {
    const portfolioDiv = document.createElement('div');
    portfolioDiv.className = 'portfolio-item';
    portfolioDiv.innerHTML = `
        <input type="text" class="form-control" placeholder="Image Path (e.g., images/work1.jpg)" style="margin-bottom: 10px;">
        <input type="text" class="form-control" placeholder="Title" style="margin-bottom: 10px;">
        <input type="text" class="form-control" placeholder="Description" style="margin-bottom: 10px;">
        <select class="form-control" style="margin-bottom: 10px;">
            <option value="hardware">Hardware</option>
            <option value="web">Web</option>
            <option value="repair">Repair</option>
        </select>
        <input type="text" class="form-control" placeholder="Tags (comma separated)" style="margin-bottom: 10px;">
        <button class="delete-btn"><i class="fas fa-trash"></i></button>
    `;
    
    portfolioDiv.querySelector('.delete-btn').addEventListener('click', () => {
        portfolioDiv.remove();
    });
    
    container.appendChild(portfolioDiv);
}

function initGamingEditor() {
    // Gaming Stats
    const addStatBtn = document.getElementById('addGamingStat');
    const statsContainer = document.getElementById('gamingStatsList');
    if (addStatBtn) {
        addStatBtn.addEventListener('click', () => addGamingStatItem(statsContainer));
    }
    
    // Gaming Setup
    const addSetupBtn = document.getElementById('addGamingSetup');
    const setupContainer = document.getElementById('gamingSetupList');
    if (addSetupBtn) {
        addSetupBtn.addEventListener('click', () => addGamingSetupItem(setupContainer));
    }
    
    // Games
    const addGameBtn = document.getElementById('addGame');
    const gamesContainer = document.getElementById('gamesList');
    if (addGameBtn) {
        addGameBtn.addEventListener('click', () => addGameItem(gamesContainer));
    }
}

function addGamingStatItem(container) {
    const statDiv = document.createElement('div');
    statDiv.className = 'gaming-stat-item';
    statDiv.innerHTML = `
        <input type="text" class="form-control" placeholder="Icon Class (e.g., fa-trophy)" style="margin-bottom: 10px;">
        <input type="text" class="form-control" placeholder="Value (e.g., 156)" style="margin-bottom: 10px;">
        <input type="text" class="form-control" placeholder="Label (e.g., Hours Played)" style="margin-bottom: 10px;">
        <button class="delete-btn"><i class="fas fa-trash"></i></button>
    `;
    statDiv.querySelector('.delete-btn').addEventListener('click', () => statDiv.remove());
    container.appendChild(statDiv);
}

function addGamingSetupItem(container) {
    const setupDiv = document.createElement('div');
    setupDiv.className = 'gaming-setup-item';
    setupDiv.innerHTML = `
        <input type="text" class="form-control" placeholder="Label (e.g., CPU)" style="margin-bottom: 10px;">
        <input type="text" class="form-control" placeholder="Value (e.g., Intel Core i5)" style="margin-bottom: 10px;">
        <button class="delete-btn"><i class="fas fa-trash"></i></button>
    `;
    setupDiv.querySelector('.delete-btn').addEventListener('click', () => setupDiv.remove());
    container.appendChild(setupDiv);
}

function addGameItem(container) {
    const gameDiv = document.createElement('div');
    gameDiv.className = 'game-item';
    gameDiv.innerHTML = `
        <input type="text" class="form-control" placeholder="Icon Class (e.g., fa-robot)" style="margin-bottom: 10px;">
        <input type="text" class="form-control" placeholder="Game Name" style="margin-bottom: 10px;">
        <button class="delete-btn"><i class="fas fa-trash"></i></button>
    `;
    gameDiv.querySelector('.delete-btn').addEventListener('click', () => gameDiv.remove());
    container.appendChild(gameDiv);
}

// Load Content from Storage
function loadContent() {
    const saved = localStorage.getItem(ADMIN_CONFIG.storageKey);
    if (saved) {
        currentContent = JSON.parse(saved);
    } else {
        currentContent = JSON.parse(JSON.stringify(DEFAULT_CONTENT));
    }
    
    // Populate forms
    populateHeroForm();
    populateAboutForm();
    populateSkillsForm();
    populateServicesForm();
    populatePortfolioForm();
    populateGamingForm();
    populateContactForm();
}

function populateHeroForm() {
    document.getElementById('heroBadge').value = currentContent.hero.badge;
    document.getElementById('heroTitle').value = currentContent.hero.title;
    document.getElementById('heroDesc').value = currentContent.hero.description;
    
    if (currentContent.hero.stats) {
        document.getElementById('stat1Value').value = currentContent.hero.stats[0]?.value || '';
        document.getElementById('stat1Label').value = currentContent.hero.stats[0]?.label || '';
        document.getElementById('stat2Value').value = currentContent.hero.stats[1]?.value || '';
        document.getElementById('stat2Label').value = currentContent.hero.stats[1]?.label || '';
        document.getElementById('stat3Value').value = currentContent.hero.stats[2]?.value || '';
        document.getElementById('stat3Label').value = currentContent.hero.stats[2]?.label || '';
    }
}

function populateAboutForm() {
    document.getElementById('aboutTitle').value = currentContent.about.title || '';
    document.getElementById('aboutSubtitle').value = currentContent.about.subtitle || '';
    document.getElementById('aboutDesc1').value = currentContent.about.description1 || '';
    document.getElementById('aboutDesc2').value = currentContent.about.description2 || '';
    
    if (currentContent.about.stats) {
        document.getElementById('aboutStat1').value = currentContent.about.stats[0]?.value || '';
        document.getElementById('aboutStat1Label').value = currentContent.about.stats[0]?.label || '';
        document.getElementById('aboutStat2').value = currentContent.about.stats[1]?.value || '';
        document.getElementById('aboutStat2Label').value = currentContent.about.stats[1]?.label || '';
        document.getElementById('aboutStat3').value = currentContent.about.stats[2]?.value || '';
        document.getElementById('aboutStat3Label').value = currentContent.about.stats[2]?.label || '';
    }
}

function populateSkillsForm() {
    const techContainer = document.getElementById('technicalSkillsList');
    const devContainer = document.getElementById('devSkillsList');
    
    techContainer.innerHTML = '';
    devContainer.innerHTML = '';
    
    currentContent.skills.technical.forEach(skill => {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill-item';
        skillDiv.innerHTML = `
            <input type="text" class="form-control skill-name" value="${skill.name}" style="margin-bottom: 10px;">
            <input type="number" class="form-control skill-percent" value="${skill.percent}" min="0" max="100">
            <button class="delete-btn"><i class="fas fa-trash"></i></button>
        `;
        skillDiv.querySelector('.delete-btn').addEventListener('click', () => skillDiv.remove());
        techContainer.appendChild(skillDiv);
    });
    
    currentContent.skills.development.forEach(skill => {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill-item';
        skillDiv.innerHTML = `
            <input type="text" class="form-control skill-name" value="${skill.name}" style="margin-bottom: 10px;">
            <input type="number" class="form-control skill-percent" value="${skill.percent}" min="0" max="100">
            <button class="delete-btn"><i class="fas fa-trash"></i></button>
        `;
        skillDiv.querySelector('.delete-btn').addEventListener('click', () => skillDiv.remove());
        devContainer.appendChild(skillDiv);
    });
}

function populateServicesForm() {
    const container = document.getElementById('servicesList');
    container.innerHTML = '';
    
    currentContent.services.forEach(service => {
        const serviceDiv = document.createElement('div');
        serviceDiv.className = 'service-item';
        serviceDiv.innerHTML = `
            <input type="text" class="form-control" value="${service.icon}" placeholder="Icon Class" style="margin-bottom: 10px;">
            <input type="text" class="form-control" value="${service.title}" placeholder="Service Title" style="margin-bottom: 10px;">
            <textarea class="form-control" placeholder="Service Description" rows="3" style="margin-bottom: 10px;">${service.description}</textarea>
            <button class="delete-btn"><i class="fas fa-trash"></i></button>
        `;
        serviceDiv.querySelector('.delete-btn').addEventListener('click', () => serviceDiv.remove());
        container.appendChild(serviceDiv);
    });
}

function populatePortfolioForm() {
    const container = document.getElementById('portfolioList');
    container.innerHTML = '';
    
    currentContent.portfolio.forEach(item => {
        const portfolioDiv = document.createElement('div');
        portfolioDiv.className = 'portfolio-item';
        portfolioDiv.innerHTML = `
            <input type="text" class="form-control" value="${item.image}" placeholder="Image Path" style="margin-bottom: 10px;">
            <input type="text" class="form-control" value="${item.title}" placeholder="Title" style="margin-bottom: 10px;">
            <input type="text" class="form-control" value="${item.description}" placeholder="Description" style="margin-bottom: 10px;">
            <select class="form-control" style="margin-bottom: 10px;">
                <option value="hardware" ${item.category === 'hardware' ? 'selected' : ''}>Hardware</option>
                <option value="web" ${item.category === 'web' ? 'selected' : ''}>Web</option>
                <option value="repair" ${item.category === 'repair' ? 'selected' : ''}>Repair</option>
            </select>
            <input type="text" class="form-control" value="${item.tags.join(', ')}" placeholder="Tags (comma separated)" style="margin-bottom: 10px;">
            <button class="delete-btn"><i class="fas fa-trash"></i></button>
        `;
        portfolioDiv.querySelector('.delete-btn').addEventListener('click', () => portfolioDiv.remove());
        container.appendChild(portfolioDiv);
    });
}

function populateGamingForm() {
    // Gaming Stats
    const statsContainer = document.getElementById('gamingStatsList');
    statsContainer.innerHTML = '';
    currentContent.gaming.stats.forEach(stat => {
        const statDiv = document.createElement('div');
        statDiv.className = 'gaming-stat-item';
        statDiv.innerHTML = `
            <input type="text" class="form-control" value="${stat.icon}" placeholder="Icon Class" style="margin-bottom: 10px;">
            <input type="text" class="form-control" value="${stat.value}" placeholder="Value" style="margin-bottom: 10px;">
            <input type="text" class="form-control" value="${stat.label}" placeholder="Label" style="margin-bottom: 10px;">
            <button class="delete-btn"><i class="fas fa-trash"></i></button>
        `;
        statDiv.querySelector('.delete-btn').addEventListener('click', () => statDiv.remove());
        statsContainer.appendChild(statDiv);
    });
    
    // Gaming Setup
    const setupContainer = document.getElementById('gamingSetupList');
    setupContainer.innerHTML = '';
    currentContent.gaming.setup.forEach(item => {
        const setupDiv = document.createElement('div');
        setupDiv.className = 'gaming-setup-item';
        setupDiv.innerHTML = `
            <input type="text" class="form-control" value="${item.label}" placeholder="Label" style="margin-bottom: 10px;">
            <input type="text" class="form-control" value="${item.value}" placeholder="Value" style="margin-bottom: 10px;">
            <button class="delete-btn"><i class="fas fa-trash"></i></button>
        `;
        setupDiv.querySelector('.delete-btn').addEventListener('click', () => setupDiv.remove());
        setupContainer.appendChild(setupDiv);
    });
    
    // Games
    const gamesContainer = document.getElementById('gamesList');
    gamesContainer.innerHTML = '';
    currentContent.gaming.games.forEach(game => {
        const gameDiv = document.createElement('div');
        gameDiv.className = 'game-item';
        gameDiv.innerHTML = `
            <input type="text" class="form-control" value="${game.icon}" placeholder="Icon Class" style="margin-bottom: 10px;">
            <input type="text" class="form-control" value="${game.name}" placeholder="Game Name" style="margin-bottom: 10px;">
            <button class="delete-btn"><i class="fas fa-trash"></i></button>
        `;
        gameDiv.querySelector('.delete-btn').addEventListener('click', () => gameDiv.remove());
        gamesContainer.appendChild(gameDiv);
    });
}

function populateContactForm() {
    document.getElementById('contactLocation').value = currentContent.contact.location;
    document.getElementById('contactPhone').value = currentContent.contact.phone;
    document.getElementById('contactEmail').value = currentContent.contact.email;
}

// Save Functions
function initSaveButtons() {
    const saveBtn = document.getElementById('saveBtn');
    const saveAllBtn = document.getElementById('saveAllBtn');
    const previewBtn = document.getElementById('previewBtn');
    
    if (saveBtn) {
        saveBtn.addEventListener('click', () => saveCurrentSection());
    }
    
    if (saveAllBtn) {
        saveAllBtn.addEventListener('click', () => saveAllContent());
    }
    
    if (previewBtn) {
        previewBtn.addEventListener('click', () => {
            window.open('../index.html', '_blank');
        });
    }
}

function saveCurrentSection() {
    const activeSection = document.querySelector('.editor-section.active').id;
    
    switch(activeSection) {
        case 'heroEditor':
            saveHero();
            break;
        case 'aboutEditor':
            saveAbout();
            break;
        case 'skillsEditor':
            saveSkills();
            break;
        case 'servicesEditor':
            saveServices();
            break;
        case 'portfolioEditor':
            savePortfolio();
            break;
        case 'gamingEditor':
            saveGaming();
            break;
        case 'contactEditor':
            saveContact();
            break;
    }
    
    saveToLocalStorage();
    showNotification('Changes saved successfully!', 'success');
}

function saveHero() {
    currentContent.hero.badge = document.getElementById('heroBadge').value;
    currentContent.hero.title = document.getElementById('heroTitle').value;
    currentContent.hero.description = document.getElementById('heroDesc').value;
    
    currentContent.hero.stats = [
        { value: document.getElementById('stat1Value').value, label: document.getElementById('stat1Label').value },
        { value: document.getElementById('stat2Value').value, label: document.getElementById('stat2Label').value },
        { value: document.getElementById('stat3Value').value, label: document.getElementById('stat3Label').value }
    ];
}

function saveAbout() {
    currentContent.about.title = document.getElementById('aboutTitle').value;
    currentContent.about.subtitle = document.getElementById('aboutSubtitle').value;
    currentContent.about.description1 = document.getElementById('aboutDesc1').value;
    currentContent.about.description2 = document.getElementById('aboutDesc2').value;
    
    currentContent.about.stats = [
        { value: parseInt(document.getElementById('aboutStat1').value) || 0, label: document.getElementById('aboutStat1Label').value },
        { value: parseInt(document.getElementById('aboutStat2').value) || 0, label: document.getElementById('aboutStat2Label').value },
        { value: parseInt(document.getElementById('aboutStat3').value) || 0, label: document.getElementById('aboutStat3Label').value }
    ];
}

function saveSkills() {
    const technical = [];
    const development = [];
    
    document.querySelectorAll('#technicalSkillsList .skill-item').forEach(item => {
        technical.push({
            name: item.querySelector('.skill-name').value,
            percent: parseInt(item.querySelector('.skill-percent').value) || 0
        });
    });
    
    document.querySelectorAll('#devSkillsList .skill-item').forEach(item => {
        development.push({
            name: item.querySelector('.skill-name').value,
            percent: parseInt(item.querySelector('.skill-percent').value) || 0
        });
    });
    
    currentContent.skills.technical = technical;
    currentContent.skills.development = development;
}

function saveServices() {
    const services = [];
    
    document.querySelectorAll('#servicesList .service-item').forEach(item => {
        services.push({
            icon: item.querySelector('input:first-child').value,
            title: item.querySelectorAll('input')[1].value,
            description: item.querySelector('textarea').value
        });
    });
    
    currentContent.services = services;
}

function savePortfolio() {
    const portfolio = [];
    
    document.querySelectorAll('#portfolioList .portfolio-item').forEach(item => {
        const inputs = item.querySelectorAll('input');
        const select = item.querySelector('select');
        const tagsInput = inputs[4].value;
        
        portfolio.push({
            image: inputs[0].value,
            title: inputs[1].value,
            description: inputs[2].value,
            category: select.value,
            tags: tagsInput.split(',').map(tag => tag.trim())
        });
    });
    
    currentContent.portfolio = portfolio;
}

function saveGaming() {
    const stats = [];
    const setup = [];
    const games = [];
    
    document.querySelectorAll('#gamingStatsList .gaming-stat-item').forEach(item => {
        const inputs = item.querySelectorAll('input');
        stats.push({
            icon: inputs[0].value,
            value: inputs[1].value,
            label: inputs[2].value
        });
    });
    
    document.querySelectorAll('#gamingSetupList .gaming-setup-item').forEach(item => {
        const inputs = item.querySelectorAll('input');
        setup.push({
            label: inputs[0].value,
            value: inputs[1].value
        });
    });
    
    document.querySelectorAll('#gamesList .game-item').forEach(item => {
        const inputs = item.querySelectorAll('input');
        games.push({
            icon: inputs[0].value,
            name: inputs[1].value
        });
    });
    
    currentContent.gaming.stats = stats;
    currentContent.gaming.setup = setup;
    currentContent.gaming.games = games;
}

function saveContact() {
    currentContent.contact.location = document.getElementById('contactLocation').value;
    currentContent.contact.phone = document.getElementById('contactPhone').value;
    currentContent.contact.email = document.getElementById('contactEmail').value;
}

function saveAllContent() {
    saveHero();
    saveAbout();
    saveSkills();
    saveServices();
    savePortfolio();
    saveGaming();
    saveContact();
    saveToLocalStorage();
    showNotification('All changes saved successfully!', 'success');
}

function saveToLocalStorage() {
    localStorage.setItem(ADMIN_CONFIG.storageKey, JSON.stringify(currentContent));
    // Also save to a downloadable file
    downloadContentFile();
}

function downloadContentFile() {
    const dataStr = JSON.stringify(currentContent, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio-content.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Export Content for Main Site
function getContent() {
    return currentContent;
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00d26a' : type === 'error' ? '#ff4757' : '#6c5ce7'};
        color: white;
        padding: 12px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
