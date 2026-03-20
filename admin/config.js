// Admin Configuration
const ADMIN_CONFIG = {
    defaultUsername: 'admin',
    defaultPassword: 'admin123',
    storageKey: 'portfolio_content',
    version: '1.0.0'
};

// Default Content Structure
const DEFAULT_CONTENT = {
    hero: {
        badge: 'DIGITAL ARTISAN',
        title: 'DISCOVER DIGITAL ART\nAND COLLECT NPTS',
        description: 'Passionate Computer Hardware Technician & Web Developer with expertise in system troubleshooting, hardware repair, and modern web development.',
        stats: [
            { value: '27K+', label: 'ARTISTS' },
            { value: '876K+', label: 'ARTWORK' },
            { value: '20K+', label: 'AUCTION' }
        ]
    },
    about: {
        title: 'ABOUT ME',
        subtitle: 'Computer Hardware Technician & Developer',
        description1: 'I am a dedicated Computer Hardware Technician with hands-on experience in diagnosing, assembling, and maintaining computer systems. My expertise extends to component-level repair and system optimization.',
        description2: 'With a foundation in web development, I combine technical hardware knowledge with modern programming skills to deliver complete technical solutions.',
        stats: [
            { value: 50, label: 'Projects' },
            { value: 3, label: 'Years' },
            { value: 100, label: 'Clients' }
        ]
    },
    skills: {
        technical: [
            { name: 'Computer Hardware', percent: 90 },
            { name: 'Troubleshooting', percent: 85 },
            { name: 'System Maintenance', percent: 80 },
            { name: 'Network Setup', percent: 75 }
        ],
        development: [
            { name: 'HTML/CSS', percent: 85 },
            { name: 'JavaScript', percent: 60 },
            { name: 'Responsive Design', percent: 80 },
            { name: 'Problem Solving', percent: 90 }
        ]
    },
    services: [
        { icon: 'fa-tools', title: 'Computer Repair', description: 'Hardware diagnosis, component replacement, system optimization, and preventive maintenance.' },
        { icon: 'fa-laptop-code', title: 'Web Development', description: 'Custom website development with responsive design, clean code, and optimal user experience.' },
        { icon: 'fa-headset', title: 'IT Support', description: 'Software installation, network configuration, troubleshooting, and system setup.' }
    ],
    portfolio: [
        { title: 'Custom PC Assembly', description: 'Gaming PC build with custom cooling.', category: 'hardware', image: 'images/work1.jpg', tags: ['Hardware', 'Assembly'] },
        { title: 'E-commerce Website', description: 'Responsive online store.', category: 'web', image: 'images/work2.jpg', tags: ['Web', 'E-commerce'] },
        { title: 'Laptop Screen Replacement', description: 'Professional repair service.', category: 'repair', image: 'images/work3.jpg', tags: ['Repair', 'Laptop'] }
    ],
    gaming: {
        stats: [
            { icon: 'fa-trophy', value: '156', label: 'Hours Played' },
            { icon: 'fa-gamepad', value: '24', label: 'Games Completed' },
            { icon: 'fa-users', value: '1.2K', label: 'Stream Followers' },
            { icon: 'fa-crown', value: '8', label: 'Achievements' }
        ],
        setup: [
            { label: 'CPU', value: 'Intel Core i5 8th Gen' },
            { label: 'GPU', value: 'NVIDIA GTX 1060' },
            { label: 'RAM', value: '16 GB DDR5' },
            { label: 'Monitor', value: '23-inch 144Hz' },
            { label: 'Audio', value: 'Fantech HG11 Headset' }
        ],
        games: [
            { icon: 'fa-robot', name: 'CS:GO' },
            { icon: 'fa-dragon', name: 'Valorant' },
            { icon: 'fa-space-shuttle', name: 'Apex Legends' },
            { icon: 'fa-fort-awesome', name: 'Fortnite' }
        ]
    },
    contact: {
        location: 'Kegalle, Sri Lanka',
        phone: '+94 704 804 941',
        email: 'heshanmd.ml@gmail.com'
    }
};
