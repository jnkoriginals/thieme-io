import type { Lang } from "@/lib/translations";

type CaseStudySection = {
    heading: string;
    paragraphs: string[];
    facts?: { value: string; label: string }[];
    assistantDemo?: boolean;
};

type CaseStudy = {
    metaTitle: string;
    metaDescription: string;
    back: string;
    title: string;
    intro: string;
    story: string;
    live: string;
    demo: string;
    stackLabel: string;
    stack: string;
    sections: CaseStudySection[];
};

export const simpliCaseStudy: Record<Lang, CaseStudy> = {
    en: {
        metaTitle: "Simpli case study — Jannik Thieme",
        metaDescription:
            "How I built Simpli: an AI assistant that can only propose changes, a faster QR scan path and a server-rendered guest menu.",
        back: "← Back to projects",
        title: "Simpli",
        intro: "A digital menu platform for restaurants. Owners upload the menu they already have, AI turns it into a digital one, and guests open it by QR code. This is about the decisions behind it that you can't see from the outside.",
        story: "Solo project. The idea started in 2023, a first prototype covered only the digital menu, and after that I built it as a full SaaS. It's live.",
        live: "Live",
        demo: "Try the editor",
        stackLabel: "Stack",
        stack: "Next.js · React · Firebase · Gemini · Stripe · Nx · Vercel",
        sections: [
            {
                heading: "The problem",
                paragraphs: [
                    "Simpli started at dinner with friends in Stuttgart, where the QR code on the table led to an outdated PDF menu. Prices and dishes change constantly, but a PDF means going back to whoever made it. So the product has two jobs: getting a menu online has to take minutes, and changing it afterwards has to be effortless.",
                ],
            },
            {
                heading: "The model proposes, the dashboard executes",
                paragraphs: [
                    "Owners can change their menu by chatting with an assistant, for example raising every starter by 5%. The obvious build gives the model write access. I didn't want that: this is a live menu that guests rely on, and a wrong tool call or instructions hidden in imported text shouldn't be able to change it on their own.",
                    "So the Cloud Function only talks to the model. Every tool call goes back to the dashboard, which validates it against the real menu and shows it as a proposal. Nothing is written until the owner confirms. Writes then go through the owner's normal permissions, which Firestore rules enforce on the server, and each change can be undone. Account, billing and imprint settings aren't changeable through chat at all, the assistant can only link to them.",
                    "The trade-off is one extra click per change, which I accepted on purpose. A bad suggestion can still appear, but only as a visible before and after that the owner has to approve. Each turn is also capped at 4 model rounds and 8 tool calls per message, so a looping model can't run up costs.",
                ],
                assistantDemo: true,
            },
            {
                heading: "The request nobody sees",
                paragraphs: [
                    "A scanned code hits a redirect before any of the menu loads, so the guest looks at nothing until it answers. Measured against production it took about 370 ms to first byte, roughly double the menu page it redirects to, for a response the guest never sees.",
                    "It was doing four sequential Firestore round-trips, including a blocking analytics write. The write now runs after the response through waitUntil, because a plain floating promise dies with the serverless function. The two remaining reads run in parallel and are cached, reusing the cache tags the menu page already has, so deactivating a restaurant still stops its codes on the next scan. It now takes about 215 ms once warm.",
                ],
                facts: [
                    {
                        value: "370 → 215 ms",
                        label: "QR redirect, time to first byte (warm)",
                    },
                ],
            },
            {
                heading: "A guest menu that doesn't jump",
                paragraphs: [
                    "The theme stylesheet was fetched after hydration, so guests saw a full-screen spinner that was then replaced by the menu. That single swap caused a layout shift of 0.204 on desktop. Mobile hid the problem, because CPU throttling moved the swap before first paint. The theme is known on the server, so its CSS now ships with the HTML. On production the shift now measures 0.",
                    "Rendering the menu on the server exposed two more problems: every dashboard theme was being loaded as a render-blocking stylesheet on the public page, and guests downloaded full-resolution originals for small thumbnails. The shared menu package also runs in the Vite dashboard, so it can't import next/image. The host app now injects an image renderer instead.",
                ],
                facts: [
                    { value: "0.204 → 0", label: "layout shift on desktop" },
                    {
                        value: "15 → 2",
                        label: "stylesheet links on the menu page",
                    },
                    {
                        value: "280 → 14 KB",
                        label: "for a menu image as displayed",
                    },
                ],
            },
            {
                heading: "Keeping the business safe",
                paragraphs: [
                    "AI calls cost real money per request, so usage is reserved in a Firestore transaction before the model runs and released again if the request fails with an error. Concurrent requests can't slip past a plan's limit, and a failed request doesn't use up the quota.",
                    "A trial is limited to one per payment method, so a new account doesn't mean a new trial. One-off purchases are confirmed right after payment, with a scheduled job as a backstop for customers who never make it back from the bank's verification page.",
                ],
            },
        ],
    },
    de: {
        metaTitle: "Simpli Case Study — Jannik Thieme",
        metaDescription:
            "Wie ich Simpli gebaut habe: ein KI-Assistent, der nur vorschlagen darf, ein schnellerer QR-Scan und eine serverseitig gerenderte Speisekarte.",
        back: "← Zurück zu den Projekten",
        title: "Simpli",
        intro: "Eine Plattform für digitale Speisekarten. Restaurants laden ihre bestehende Karte hoch, die KI macht daraus eine digitale, und Gäste öffnen sie per QR-Code. Hier geht es um die Entscheidungen dahinter, die man von außen nicht sieht.",
        story: "Alleine gebaut. Die Idee entstand 2023, ein erster Prototyp umfasste nur die digitale Karte, danach habe ich es als vollständiges SaaS aufgebaut. Es ist live.",
        live: "Live",
        demo: "Editor ausprobieren",
        stackLabel: "Stack",
        stack: "Next.js · React · Firebase · Gemini · Stripe · Nx · Vercel",
        sections: [
            {
                heading: "Das Problem",
                paragraphs: [
                    "Simpli entstand bei einem Essen mit Freunden in Stuttgart: Der QR-Code auf dem Tisch führte zu einer veralteten PDF-Karte. Preise und Gerichte ändern sich ständig, aber bei einem PDF muss man jedes Mal zurück zu der Person, die es erstellt hat. Das Produkt hat deshalb zwei Aufgaben: Eine Karte muss in Minuten online sein, und Änderungen danach müssen mühelos gehen.",
                ],
            },
            {
                heading: "Das Modell schlägt vor, das Dashboard führt aus",
                paragraphs: [
                    "Betriebe können ihre Karte per Chat ändern, zum Beispiel alle Vorspeisen um 5 % erhöhen. Naheliegend wäre, dem Modell Schreibzugriff zu geben. Das wollte ich nicht: Es geht um eine Live-Karte, auf die sich Gäste verlassen, und ein falscher Tool-Aufruf oder in importiertem Text versteckte Anweisungen dürfen sie nicht von selbst ändern.",
                    "Deshalb spricht die Cloud Function nur mit dem Modell. Jeder Tool-Aufruf geht zurück ans Dashboard, wird dort gegen die echte Karte geprüft und als Vorschlag angezeigt. Geschrieben wird erst nach der Bestätigung, und zwar mit den normalen Rechten des Betriebs, die Firestore-Regeln auf dem Server durchsetzen. Jede Änderung lässt sich rückgängig machen. Konto, Abrechnung und Impressum lassen sich per Chat gar nicht ändern, der Assistent kann nur dorthin verlinken.",
                    "Der Preis ist ein zusätzlicher Klick pro Änderung, den ich bewusst in Kauf genommen habe. Ein schlechter Vorschlag kann weiterhin auftauchen, aber nur als sichtbares Vorher und Nachher, das der Betrieb bestätigen muss. Außerdem ist jeder Durchlauf auf 4 Modell-Runden und 8 Tool-Aufrufe pro Nachricht begrenzt, damit ein Modell in einer Schleife keine Kosten hochtreibt.",
                ],
                assistantDemo: true,
            },
            {
                heading: "Der Request, den niemand sieht",
                paragraphs: [
                    "Ein gescannter Code trifft zuerst auf eine Weiterleitung, bevor irgendetwas von der Karte lädt, und so lange sieht der Gast nichts. In Produktion dauerte das rund 370 ms bis zum ersten Byte, etwa doppelt so lange wie die Kartenseite dahinter, für eine Antwort, die der Gast nie sieht.",
                    "Dahinter steckten vier aufeinanderfolgende Firestore-Zugriffe, darunter ein blockierender Analytics-Schreibvorgang. Der läuft jetzt per waitUntil nach der Antwort, denn ein loses Promise würde mit der Serverless-Funktion sterben. Die beiden übrigen Lesezugriffe laufen parallel und gecacht. Sie nutzen die Cache-Tags der Kartenseite mit, sodass ein deaktiviertes Restaurant seine Codes weiterhin beim nächsten Scan stoppt. Im warmen Zustand dauert es jetzt rund 215 ms.",
                ],
                facts: [
                    {
                        value: "370 → 215 ms",
                        label: "QR-Weiterleitung, Zeit bis zum ersten Byte (warm)",
                    },
                ],
            },
            {
                heading: "Eine Karte, die nicht springt",
                paragraphs: [
                    "Das Theme-Stylesheet wurde erst nach der Hydration geladen, also sahen Gäste einen Vollbild-Spinner, der dann durch die Karte ersetzt wurde. Allein das verursachte auf dem Desktop einen Layout Shift von 0,204. Auf Mobilgeräten fiel es nicht auf, weil die CPU-Drosselung den Wechsel vor den ersten Paint verschob. Das Theme ist auf dem Server bekannt, sein CSS geht jetzt direkt mit dem HTML raus. In Produktion liegt der Shift jetzt bei 0.",
                    "Das serverseitige Rendern brachte zwei weitere Probleme ans Licht: Alle Dashboard-Themes wurden auf der öffentlichen Seite als blockierende Stylesheets geladen, und Gäste luden Originalbilder in voller Auflösung für kleine Vorschauen. Das gemeinsame Karten-Paket läuft auch im Vite-Dashboard und kann next/image daher nicht importieren. Stattdessen übergibt die jeweilige App jetzt einen Bild-Renderer.",
                ],
                facts: [
                    {
                        value: "0,204 → 0",
                        label: "Layout Shift auf dem Desktop",
                    },
                    {
                        value: "15 → 2",
                        label: "Stylesheet-Links auf der Kartenseite",
                    },
                    {
                        value: "280 → 14 KB",
                        label: "für ein Kartenbild in Anzeigegröße",
                    },
                ],
            },
            {
                heading: "Das Geschäft absichern",
                paragraphs: [
                    "KI-Aufrufe kosten pro Anfrage echtes Geld. Deshalb wird die Nutzung vor dem Modellaufruf in einer Firestore-Transaktion reserviert und bei einem Fehler wieder freigegeben. So kommen parallele Anfragen nicht am Limit vorbei, und eine fehlgeschlagene Anfrage verbraucht kein Kontingent.",
                    "Pro Zahlungsmittel gibt es nur eine Testphase, ein neues Konto bedeutet also keine neue. Einmalkäufe werden direkt nach der Zahlung bestätigt, und ein geplanter Job fängt alle auf, die von der Bankverifizierung nicht mehr zurückkommen.",
                ],
            },
        ],
    },
};
