import type { Lang } from "@/lib/translations";

export type SimpliDemoText = {
    editorAlt: string;
    menuTitle: string;
    skipMenu: string;
    replayNote: string;
    menuHint: string;
    scenesLabel: string;
    scenes: Record<"prices" | "soldout" | "images" | "translate" | "design", string>;
};

export type NearbyText = {
    screenAlt: string;
    save: string;
    skip: string;
    go: string;
    hint: string;
    going: (place: string) => string;
};

type PreviewContent = {
    intro: {
        role: string;
        before: string;
        simpli: string;
        middle: string;
        mercedes: string;
        after: string;
        note: string;
    };
    simpli: {
        headline: string;
        body: string;
        story: string;
        caseStudy: string;
        demo: string;
        text: SimpliDemoText;
    };
    nearby: {
        tagline: string;
        paragraphs: string[];
        storyHeading: string;
        story: string;
        press: string;
        text: NearbyText;
    };
};

export const previewContent: Record<Lang, PreviewContent> = {
    en: {
        intro: {
            role: "Product Engineer · Stuttgart",
            before: "Hi, I'm Jannik. I build products from the first idea to launch. Right now that's ",
            simpli: "Simpli",
            middle: ", a menu platform for restaurants, alongside software engineering at ",
            mercedes: "Mercedes-Benz",
            after: ".",
            note: "Mobile Media Student at HdM Stuttgart, graduating 2027",
        },
        simpli: {
            headline: "Restaurant menus, digital in 3 minutes.",
            body: "Restaurants upload the menu they already have, AI turns it into a digital one, and guests open it by QR code. Owners can then change everything by chatting with an assistant.",
            story: "Solo project. The idea started in 2023, a first prototype covered only the digital menu, and after that I developed it into a full SaaS.",
            caseStudy: "Read the case study",
            demo: "Open the editor demo",
            text: {
                editorAlt:
                    "The Simpli menu editor with a live preview of the guest menu",
                menuTitle: "Live Simpli demo menu",
                skipMenu: "Skip the live menu",
                replayNote:
                    "A scripted replay of the assistant flow, recorded from simpli.menu.",
                menuHint:
                    "This is the live menu guests see. Scroll it, open a dish, change the language.",
                scenesLabel: "Assistant examples",
                scenes: {
                    prices: "Prices",
                    soldout: "Sold out",
                    images: "Photos",
                    translate: "Translation",
                    design: "Design",
                },
            },
        },
        nearby: {
            tagline:
                "What's worth going to, within walking distance, right now.",
            paragraphs: [
                "Picking a café or bar nearby usually means scrolling a map full of pins until you give up. nearby works against that: it shows one place at a time as a card. Swipe left for the next one, right to go.",
                "Each card shows distance, rating and whether it's open right now, with one tap to navigate or save it.",
                "Built with Ionic and React and wrapped with Capacitor for iOS and Android.",
            ],
            storyHeading: "How it started",
            story: "nearby began as a fourth-semester project at HdM Stuttgart, built by a team of five from April to July 2025. We presented it at the university, and it was featured in edit.Magazin. In 2026 I reworked the app: a photo-first card design, smoother swipe animations with haptic feedback, a new onboarding, and my own backend that keeps the Google API key off the device and limits costs per device and day.",
            press: "Read the press article",
            text: {
                screenAlt:
                    "Real nearby app screen with location, filters and swipe actions",
                save: "Save for later",
                skip: "Next place",
                go: "Let's go",
                hint: "Swipe the card.",
                going: (place) => `On your way to ${place}.`,
            },
        },
    },
    de: {
        intro: {
            role: "Product Engineer · Stuttgart",
            before: "Hi, ich bin Jannik. Ich entwickle Produkte von der ersten Idee bis zum Launch. Aktuell ist das ",
            simpli: "Simpli",
            middle: ", eine Plattform für digitale Speisekarten. Daneben arbeite ich als Softwareentwickler bei ",
            mercedes: "Mercedes-Benz",
            after: ".",
            note: "Mobile-Medien-Studium an der HdM Stuttgart, Abschluss 2027",
        },
        simpli: {
            headline: "Speisekarten in 3 Minuten digital.",
            body: "Restaurants laden ihre bestehende Speisekarte hoch, KI macht daraus eine digitale Karte, und Gäste öffnen sie per QR-Code. Änderungen gehen danach einfach per Chat mit einem Assistenten.",
            story: "Ein Soloprojekt. Die Idee entstand 2023, der erste Prototyp war nur die digitale Karte, danach habe ich daraus ein vollständiges SaaS entwickelt.",
            caseStudy: "Case Study lesen",
            demo: "Editor-Demo öffnen",
            text: {
                editorAlt:
                    "Der Simpli-Karteneditor mit Live-Vorschau der Gästekarte",
                menuTitle: "Live-Demokarte von Simpli",
                skipMenu: "Live-Karte überspringen",
                replayNote:
                    "Eine geskriptete Wiedergabe des Assistenten-Ablaufs, aufgenommen von simpli.menu.",
                menuHint:
                    "Das ist die echte Karte, die auch Gäste sehen. Scroll durch, öffne ein Gericht oder wechsle die Sprache.",
                scenesLabel: "Beispiele des Assistenten",
                scenes: {
                    prices: "Preise",
                    soldout: "Ausverkauft",
                    images: "Fotos",
                    translate: "Übersetzung",
                    design: "Design",
                },
            },
        },
        nearby: {
            tagline: "Was sich gerade lohnt, nur ein paar Schritte entfernt.",
            paragraphs: [
                "Ein Café oder eine Bar in der Nähe zu finden heißt meist: durch eine Karte voller Pins scrollen, bis man aufgibt. nearby setzt genau da an und zeigt immer nur einen Ort. Nach links geht es zum nächsten, nach rechts direkt los.",
                "Jede Karte zeigt Entfernung, Bewertung und ob gerade geöffnet ist. Mit einem Tipp startest du die Navigation oder merkst dir den Ort.",
                "Entwickelt mit Ionic und React, mit Capacitor als App für iOS und Android.",
            ],
            storyHeading: "Wie es entstand",
            story: "nearby entstand im vierten Semester an der HdM Stuttgart, von April bis Juli 2025 im Fünferteam. Wir haben die App an der Hochschule präsentiert, und das edit.Magazin hat darüber berichtet. 2026 habe ich die App überarbeitet: ein neues Kartendesign mit dem Foto im Mittelpunkt, flüssigere Swipe-Animationen mit haptischem Feedback, ein neues Onboarding und ein eigenes Backend, das den Google-API-Schlüssel vom Gerät fernhält und die Kosten pro Gerät und Tag begrenzt.",
            press: "Presseartikel lesen",
            text: {
                screenAlt:
                    "Echter nearby-Bildschirm mit Standort, Filtern und Swipe-Aktionen",
                save: "Für später merken",
                skip: "Nächster Ort",
                go: "Auf geht's",
                hint: "Wisch die Karte zur Seite.",
                going: (place) => `Auf dem Weg zu ${place}.`,
            },
        },
    },
};
