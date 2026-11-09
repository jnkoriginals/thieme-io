import type { Lang } from "@/lib/translations";

export type SimpliDemoText = {
    editorAlt: string;
    menuTitle: string;
    skipMenu: string;
    replayNote: string;
    menuHint: string;
    alt: Record<
        "typed" | "thinking" | "proposal" | "applied" | "menu-after",
        string
    >;
    send: string;
    apply: string;
    restart: string;
    hints: Record<"typed" | "thinking" | "proposal" | "saved" | "live", string>;
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
            story: "Solo project. The idea started in 2023, a first prototype covered only the digital menu, and after that I built it as a full SaaS. It's live.",
            caseStudy: "Read the case study",
            demo: "Open the editor demo",
            text: {
                editorAlt:
                    "The Simpli menu editor with a live preview of the guest menu",
                menuTitle: "Live Simpli demo menu",
                skipMenu: "Skip the live menu",
                replayNote:
                    "A replay of real screens from the German production app.",
                menuHint:
                    "This is the live menu guests see. Scroll it, open a dish, change the language.",
                alt: {
                    typed: "Real Simpli assistant with a request to change the Cappuccino price to 4.20 euros",
                    thinking: "Real Simpli assistant working on the request",
                    proposal:
                        "Real Simpli assistant proposing to change the Cappuccino from 3.90 to 4.20 euros",
                    applied:
                        "Real Simpli assistant showing the change as saved",
                    "menu-after":
                        "Real Simpli guest menu with the Cappuccino at 4.20 euros",
                },
                send: "Send the request",
                apply: "Apply the change",
                restart: "Start over",
                hints: {
                    typed: "Tap send.",
                    thinking: "The assistant is working…",
                    proposal: "Guests still see €3.90. Tap apply.",
                    saved: "Saved.",
                    live: "Guests now see €4.20.",
                },
            },
        },
        nearby: {
            tagline:
                "What's worth going to, within walking distance, right now.",
            paragraphs: [
                "Picking a café or bar nearby usually means scrolling a map full of pins until you give up. nearby works against that: it shows one place at a time as a card. Swipe left for the next one, right to go. A compact list is there when you want the overview.",
                "Each card shows distance, rating and whether it's open right now, with one tap to navigate or save it.",
                "Built with Ionic and React and wrapped with Capacitor for iOS and Android.",
            ],
            storyHeading: "How it started",
            story: "nearby began as a fourth-semester project at HdM Stuttgart, built by a team of five from April to July 2025. We presented it at the university, and it was featured in edit.Magazin. In 2026 I refined the card design and animations and improved the app logic.",
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
            before: "Hi, ich bin Jannik. Ich baue Produkte von der ersten Idee bis zum Launch. Gerade ist das ",
            simpli: "Simpli",
            middle: ", eine Plattform für digitale Speisekarten, neben meiner Arbeit als Softwareentwickler bei ",
            mercedes: "Mercedes-Benz",
            after: ".",
            note: "Mobile-Medien-Student an der HdM Stuttgart, Abschluss 2027",
        },
        simpli: {
            headline: "Speisekarten, in 3 Minuten digital.",
            body: "Restaurants laden ihre bestehende Karte hoch, die KI macht daraus eine digitale, und Gäste öffnen sie per QR-Code. Danach lässt sich alles im Chat mit einem Assistenten ändern.",
            story: "Alleine gebaut. Die Idee entstand 2023, ein erster Prototyp umfasste nur die digitale Karte, danach habe ich es als vollständiges SaaS aufgebaut. Es ist live.",
            caseStudy: "Case Study lesen",
            demo: "Editor-Demo öffnen",
            text: {
                editorAlt:
                    "Der Simpli-Karteneditor mit Live-Vorschau der Gästekarte",
                menuTitle: "Live-Demokarte von Simpli",
                skipMenu: "Live-Karte überspringen",
                replayNote:
                    "Eine Wiedergabe echter Screens aus der Produktions-App.",
                menuHint:
                    "Das ist die echte Karte, die Gäste sehen. Scroll durch, öffne ein Gericht, wechsle die Sprache.",
                alt: {
                    typed: "Echter Simpli-Assistent mit der Anfrage, den Cappuccino auf 4,20 Euro zu ändern",
                    thinking: "Echter Simpli-Assistent bearbeitet die Anfrage",
                    proposal:
                        "Echter Simpli-Assistent schlägt vor, den Cappuccino von 3,90 auf 4,20 Euro zu ändern",
                    applied:
                        "Echter Simpli-Assistent zeigt die Änderung als gespeichert",
                    "menu-after":
                        "Echte Simpli-Gästekarte mit dem Cappuccino für 4,20 Euro",
                },
                send: "Anfrage senden",
                apply: "Änderung übernehmen",
                restart: "Neu starten",
                hints: {
                    typed: "Tippe auf Senden.",
                    thinking: "Der Assistent arbeitet…",
                    proposal: "Gäste sehen noch 3,90 €. Tippe auf Übernehmen.",
                    saved: "Gespeichert.",
                    live: "Gäste sehen jetzt 4,20 €.",
                },
            },
        },
        nearby: {
            tagline: "Was sich gerade lohnt, zu Fuß erreichbar.",
            paragraphs: [
                "Ein Café oder eine Bar in der Nähe zu finden heißt meist, so lange durch eine Karte voller Pins zu scrollen, bis man aufgibt. nearby arbeitet dagegen an: Die App zeigt immer nur einen Ort als Karte. Nach links zum nächsten, nach rechts geht es los. Eine kompakte Liste ist da, wenn man den Überblick will.",
                "Jede Karte zeigt Entfernung, Bewertung und ob gerade geöffnet ist, mit einem Tipp zur Navigation oder zum Merken.",
                "Gebaut mit Ionic und React, mit Capacitor für iOS und Android verpackt.",
            ],
            storyHeading: "Wie es entstand",
            story: "nearby begann als Projekt im vierten Semester an der HdM Stuttgart, gebaut im Fünferteam von April bis Juli 2025. Wir haben es an der Hochschule präsentiert, und das edit.Magazin hat darüber berichtet. 2026 habe ich das Kartendesign und die Animationen verfeinert und die App-Logik verbessert.",
            press: "Presseartikel lesen",
            text: {
                screenAlt:
                    "Echter nearby-Bildschirm mit Standort, Filtern und Swipe-Aktionen",
                save: "Für später merken",
                skip: "Nächster Ort",
                go: "Auf geht's",
                hint: "Wisch die Karte.",
                going: (place) => `Auf dem Weg zu ${place}.`,
            },
        },
    },
};
