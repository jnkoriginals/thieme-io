export type Lang = 'de' | 'en';

export const translations = {
    de: {
        metadata: {
            title: 'Jannik Thieme',
            description: 'Full-Stack Developer — Web & Mobile. Mobile-Medien, HdM Stuttgart.',
        },
        nav: {
            experience: 'Erfahrung',
            projects: 'Projekte',
            skills: 'Skills',
            contact: 'Kontakt',
        },
        hero: {
            subtitle: 'Mobile-Medien · HdM Stuttgart',
            description: 'Full-Stack Developer mit Fokus auf Web und Mobile — von der Idee bis zur fertigen App.',
            ctaProjects: 'Projekte',
            ctaContact: 'Kontakt',
        },
        sections: {
            experience: 'Erfahrung',
            projects: 'Projekte',
            skills: 'Skills',
            contact: 'Kontakt',
        },
        experience: [
            {
                role: 'Werkstudent Softwareentwicklung',
                company: 'Mercedes-Benz AG',
                period: 'aktuell',
                description: 'Fullstack-Entwicklung einer internen Angular-Anwendung mit Python-Backend. Verantwortlich für den Großteil der DevOps-Infrastruktur: GitHub Actions, AWS (Setup & Betrieb), Docker und Kubernetes.',
                tags: ['Angular', 'Python', 'AWS', 'Kubernetes', 'Docker', 'GitHub Actions'],
            },
            {
                role: 'Pflichtpraktikum',
                company: 'Mercedes-Benz AG',
                period: '½ Jahr',
                description: 'Praktikum im Bereich Softwareentwicklung — direkter Einstieg in die gleiche technische Umgebung, die später zur Werkstudentenstelle geführt hat.',
                tags: ['Angular', 'Python', 'Docker'],
            },
            {
                role: 'Werkstudent Softwareentwicklung',
                company: 'IJUNO Business Solutions GmbH',
                period: '2025',
                description: 'Entwicklung einer automatisierten Lösung zur Migration von Datenbanken in SAP-Systeme. Die Lösung reduziert den manuellen Aufwand signifikant und beschleunigt Migrationsprozesse erheblich.',
                tags: ['SAP Datasphere', 'Node.js', 'Automatisierung'],
            },
        ],
        projects: [
            {
                name: 'Simpli',
                description: 'SaaS-Plattform für digitale Speisekarten — Restaurants erstellen in Minuten eine QR-Code-Karte, Gäste öffnen sie direkt im Browser ohne App. Mit KI-gestützter Übersetzung in 6 Sprachen, Echtzeit-Updates, Stripe-Abonnements und individuellem QR-Code-Generator.',
                type: 'Eigenprojekt',
            },
            {
                name: 'Torga',
                description: 'SaaS-Plattform für Handwerksbetriebe — als Soloprojekt entwickelt. Deckt den gesamten Geschäftsprozess ab: von der Erstbesichtigung über Angebote bis zur gesetzeskonformen E-Rechnung (ZUGFeRD / XRechnung). Mit Multi-Tenancy, GPS-Zeiterfassung, Echtzeit-Updates via WebSocket und modularem Feature-Subscription-System.',
                type: 'Eigenprojekt',
            },
            {
                name: 'nearby',
                description: 'Mobile App gegen die Entscheidungslähmung: Statt langer Listen wird immer nur ein Ort angezeigt — per Swipe (wie bei Tinder) weitergehen oder direkt loslaufen. Für Touristen und Einheimische, nativ auf iOS & Android.',
                type: 'Studienprojekt',
            },
        ],
        contact: {
            heading: "Let's work together.",
            subtext: 'Schreib mir — ich melde mich schnellstmöglich zurück.',
            nameLabel: 'Name',
            namePlaceholder: 'Dein Name',
            emailLabel: 'E-Mail',
            emailPlaceholder: 'deine@email.de',
            messageLabel: 'Nachricht',
            messagePlaceholder: 'Wie kann ich dir helfen?',
            send: 'Senden',
            sending: 'Senden...',
            sent: 'Gesendet ✓',
            error: 'Etwas ist schiefgelaufen. Bitte versuch es erneut.',
        },
        footer: '© 2026 Jannik Thieme',
    },
    en: {
        metadata: {
            title: 'Jannik Thieme',
            description: 'Full-Stack Developer — Web & Mobile. Mobile Media, HdM Stuttgart.',
        },
        nav: {
            experience: 'Experience',
            projects: 'Projects',
            skills: 'Skills',
            contact: 'Contact',
        },
        hero: {
            subtitle: 'Mobile Media · HdM Stuttgart',
            description: 'Full-Stack Developer focused on Web and Mobile — from idea to finished app.',
            ctaProjects: 'Projects',
            ctaContact: 'Contact',
        },
        sections: {
            experience: 'Experience',
            projects: 'Projects',
            skills: 'Skills',
            contact: 'Contact',
        },
        experience: [
            {
                role: 'Working Student Software Development',
                company: 'Mercedes-Benz AG',
                period: 'current',
                description: 'Fullstack development of an internal Angular application with a Python backend. Responsible for the majority of the DevOps infrastructure: GitHub Actions, AWS (setup & operations), Docker and Kubernetes.',
                tags: ['Angular', 'Python', 'AWS', 'Kubernetes', 'Docker', 'GitHub Actions'],
            },
            {
                role: 'Mandatory Internship',
                company: 'Mercedes-Benz AG',
                period: '½ year',
                description: 'Software development internship — direct entry into the same technical environment that later led to the working student position.',
                tags: ['Angular', 'Python', 'Docker'],
            },
            {
                role: 'Working Student Software Development',
                company: 'IJUNO Business Solutions GmbH',
                period: '2025',
                description: 'Development of an automated solution for migrating databases into SAP systems. The solution significantly reduces manual effort and substantially accelerates migration processes.',
                tags: ['SAP Datasphere', 'Node.js', 'Automation'],
            },
        ],
        projects: [
            {
                name: 'Simpli',
                description: 'SaaS platform for digital menus — restaurants create a QR code menu in minutes, guests open it directly in the browser without an app. With AI-powered translation into 6 languages, real-time updates, Stripe subscriptions, and a custom QR code generator.',
                type: 'Personal Project',
            },
            {
                name: 'Torga',
                description: 'SaaS platform for tradespeople — developed as a solo project. Covers the entire business process: from initial site visits to quotes through to legally compliant e-invoices (ZUGFeRD / XRechnung). With multi-tenancy, GPS time tracking, real-time updates via WebSocket, and a modular feature subscription system.',
                type: 'Personal Project',
            },
            {
                name: 'nearby',
                description: 'Mobile app against decision paralysis: instead of long lists, only one place is shown at a time — swipe (like Tinder) to move on or navigate there directly. For tourists and locals alike, native on iOS & Android.',
                type: 'University Project',
            },
        ],
        contact: {
            heading: "Let's work together.",
            subtext: "Write to me — I'll get back to you as soon as possible.",
            nameLabel: 'Name',
            namePlaceholder: 'Your name',
            emailLabel: 'Email',
            emailPlaceholder: 'your@email.com',
            messageLabel: 'Message',
            messagePlaceholder: 'How can I help you?',
            send: 'Send',
            sending: 'Sending...',
            sent: 'Sent ✓',
            error: 'Something went wrong. Please try again.',
        },
        footer: '© 2026 Jannik Thieme',
    },
} as const;
