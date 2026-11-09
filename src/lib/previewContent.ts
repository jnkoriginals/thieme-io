import type { Lang } from "@/lib/translations";

export type SimpliDemoText = {
    editorAlt: string;
    menuTitle: string;
    skipMenu: string;
    menuActivate: string;
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
            after: ", where I led the German-market go-live of an internal application.",
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
                menuActivate: "Tap to use the menu",
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
            before: "Hi, ich bin Jannik. Ich entwickle Produkte von der ersten Idee bis zum Launch. Gerade arbeite ich an ",
            simpli: "Simpli",
            middle: ", einer Plattform für digitale Speisekarten. Außerdem entwickle ich Software bei ",
            mercedes: "Mercedes-Benz",
            after: ".",
            note: "Mobile-Medien-Studium an der HdM Stuttgart, Abschluss 2027",
        },
        simpli: {
            headline: "In 3 Minuten zur digitalen Speisekarte.",
            body: "Restaurants laden ihre Speisekarte einfach hoch, die KI macht daraus eine digitale Version und Gäste rufen sie per QR-Code auf. Änderungen erledigt man danach im Chat mit dem Assistenten.",
            story: "Ein Soloprojekt: Die Idee entstand 2023, der erste Prototyp bestand nur aus der digitalen Karte. Anschließend habe ich daraus ein vollständiges SaaS-Produkt gemacht.",
            caseStudy: "Case Study lesen",
            demo: "Editor-Demo öffnen",
            text: {
                editorAlt:
                    "Der Simpli-Editor mit Live-Vorschau der Speisekarte",
                menuTitle: "Live-Demo der Simpli-Speisekarte",
                skipMenu: "Live-Karte überspringen",
                menuActivate: "Zum Ausprobieren tippen",
                replayNote:
                    "Aufzeichnung eines vorbereiteten Ablaufs mit dem Assistenten auf simpli.menu.",
                menuHint:
                    "Genau diese Karte sehen auch die Gäste. Scroll durch, öffne ein Gericht oder wechsle die Sprache.",
                scenesLabel: "Das kann der Assistent",
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
                "Sucht man ein Café oder eine Bar in der Nähe, scrollt man meist durch eine Karte voller Pins, bis man aufgibt. nearby macht es anders und zeigt immer nur einen Ort. Ein Wisch nach links zeigt den nächsten, ein Wisch nach rechts startet den Weg dorthin.",
                "Auf jeder Karte siehst du Entfernung, Bewertung und ob gerade geöffnet ist. Mit einem Tipp startest du die Navigation oder merkst dir den Ort.",
                "Gebaut mit Ionic und React, per Capacitor als App für iOS und Android verpackt.",
            ],
            storyHeading: "Wie alles anfing",
            story: "nearby begann als Projekt im vierten Semester an der HdM Stuttgart: zu fünft, von April bis Juli 2025. Wir haben die App an der Hochschule präsentiert, und das edit.Magazin hat darüber berichtet. 2026 habe ich sie überarbeitet: ein neues Kartendesign mit dem Foto im Mittelpunkt, flüssigere Swipe-Animationen mit haptischem Feedback, ein neues Onboarding und ein eigenes Backend. Es hält den Google-API-Schlüssel vom Gerät fern und begrenzt die Kosten pro Gerät und Tag.",
            press: "Presseartikel lesen",
            text: {
                screenAlt:
                    "Screenshot der nearby-App mit Standort, Filtern und Swipe-Aktionen",
                save: "Für später merken",
                skip: "Nächster Ort",
                go: "Auf geht's",
                hint: "Wisch die Karte zur Seite.",
                going: (place) => `Auf zu ${place}!`,
            },
        },
    },
};
