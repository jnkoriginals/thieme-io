import type { FlowDiagramContent } from "@/app/[lang]/work/simpli/FlowDiagram";
import type { Lang } from "@/lib/translations";

type CaseStudySection = {
    heading: string;
    paragraphs: string[];
    facts?: { value: string; label: string }[];
    assistantDemo?: boolean;
    diagram?: FlowDiagramContent;
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
            "How Simpli grew from a menu filter idea into a full platform, why the first customers left, and what I built because of it.",
        back: "← Back to projects",
        title: "Simpli",
        intro: "A digital menu platform for restaurants. Owners upload the menu they already have, AI turns it into a digital one, and guests open it by QR code. This is how it got there, and the decisions behind it that you can't see from the outside.",
        story: "Solo project. The idea started in 2023, a first prototype covered only the digital menu, and after that I developed it into a full SaaS.",
        live: "Visit Simpli",
        demo: "Try the editor",
        stackLabel: "Stack",
        stack: "Next.js · React · Firebase · Gemini · Stripe · Nx · Vercel",
        sections: [
            {
                heading: "A PDF on a phone",
                paragraphs: [
                    "Simpli started at dinner with friends in Stuttgart. We were looking for something vegetarian and wanted to see the drinks first, but that meant digging through a PDF on our phones that was never made for such a small screen. Why can't you just filter this? That question became Simpli.",
                ],
            },
            {
                heading: "From prototype to platform",
                paragraphs: [
                    "It began as nothing more than a prototype of the digital menu. Then I realised restaurants also need a dashboard to set up their menu quickly and easily, so I rebuilt everything from scratch.",
                    "It was never only about the technology, though. Going to a restaurant is always a bit like stepping into another world, and that world shouldn't get lost on the menu. So Simpli offers different themes and further customization, such as own colours, fonts, header layouts and backgrounds, that let each restaurant keep its corporate identity.",
                    "I also deliberately separated QR codes from menus. Every code lives on its own and can be assigned any menu, automatically if you like: one menu at lunchtime, another in the evening.",
                ],
            },
            {
                heading: "Then came AI",
                paragraphs: [
                    "The better AI became, the more it could take off restaurants' hands. Translations and suggestions for allergens and tags came first, followed later by spell-checking.",
                ],
            },
            {
                heading: "Why the first customers left",
                paragraphs: [
                    "Then came the first setback: my first registered customers didn't renew their subscription. When I looked for the reason, it turned out they had never finished setting up their menu. The barrier was right at the start.",
                    "So I rethought the setup. An onboarding flow now guides new users step by step to their first published menu, and AI import cuts creating a menu from around 30 minutes to under 3, depending on the menu.",
                    "And since nobody wants to dig through submenus for the right setting in the age of ChatGPT, I added an AI assistant that helps with any question or change across the account and its menus, and carries them out where possible.",
                    "All of this is live now, but without new customers there's no proof yet that it removes the barrier. The number I'll watch is how many sign-ups reach a published menu.",
                ],
                facts: [
                    { value: "30 → under 3 min", label: "to create a menu, depending on the menu" },
                ],
            },
            {
                heading: "The model proposes, the dashboard executes",
                paragraphs: [
                    "One decision shaped the assistant more than any other. Owners change their menu by chatting, for example raising every starter by 5%, and the obvious build gives the model write access. I didn't want that: this is a live menu that guests rely on, and a wrong tool call or instructions hidden in imported text shouldn't be able to change it on their own.",
                    "So the Cloud Function only talks to the model. Every tool call goes back to the dashboard, which validates it against the real menu and shows it as a proposal. Nothing is written until the owner confirms. Writes then go through the owner's normal permissions, which Firestore rules enforce on the server, and each change can be undone. Account, billing and imprint settings aren't changeable through chat at all, the assistant can only link to them.",
                    "The trade-off is one extra click per change, which I accepted on purpose. A bad suggestion can still appear, but only as a visible before and after that the owner has to approve. Each turn is also capped at 4 model rounds and 8 tool calls per message, so a looping model can't run up costs.",
                ],
                diagram: {
                    propose: "The model proposes",
                    execute: "The dashboard executes",
                    toolCalls: "tool calls",
                    confirm: "owner confirms",
                    model: { title: "Gemini", text: "Suggests changes" },
                    fn: { title: "Cloud Function", text: "Only talks to the model" },
                    dashboard: { title: "Dashboard", text: "Validates and shows a proposal" },
                    store: { title: "Firestore", text: "Rules check every write" },
                },
                assistantDemo: true,
            },
            {
                heading: "The request nobody sees",
                paragraphs: [
                    "A scanned code hits a redirect before any of the menu loads, so the guest looks at nothing until it answers. Measured against production it took about 370 ms to first byte, roughly double the menu page it redirects to, for a response the guest never sees.",
                    "It was doing four sequential Firestore round-trips, including a blocking analytics write. The write now runs after the response through waitUntil, because a plain floating promise dies with the serverless function. The two remaining reads run in parallel and are cached, reusing the cache tags the menu page already has, so deactivating a restaurant still stops its codes on the next scan. It now takes about 215 ms.",
                ],
                facts: [
                    {
                        value: "370 → 215 ms",
                        label: "QR redirect, time to first byte",
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
            {
                heading: "What I've already changed",
                paragraphs: [
                    "Simpli has already been through changes I'd make again. I completely redesigned and reworked the landing page once to fit the target audience better. And the dashboard used to follow the structure of the data, so I rebuilt its flow around what users are actually trying to do.",
                ],
            },
        ],
    },
    de: {
        metaTitle: "Simpli Case Study — Jannik Thieme",
        metaDescription:
            "Wie aus der Idee, Speisekarten filtern zu können, eine Plattform wurde, warum die ersten Kunden absprangen und was ich daraufhin gebaut habe.",
        back: "← Zurück zu den Projekten",
        title: "Simpli",
        intro: "Eine Plattform für digitale Speisekarten. Restaurants laden ihre bestehende Speisekarte hoch, KI macht daraus eine digitale Karte, und Gäste öffnen sie per QR-Code. Hier erzähle ich, wie es dazu kam und welche Entscheidungen dahinterstecken, die man von außen nicht sieht.",
        story: "Ein Soloprojekt: Die Idee entstand 2023, der erste Prototyp bestand nur aus der digitalen Karte. Anschließend habe ich daraus ein vollständiges SaaS-Produkt gemacht.",
        live: "Zu Simpli",
        demo: "Editor ausprobieren",
        stackLabel: "Stack",
        stack: "Next.js · React · Firebase · Gemini · Stripe · Nx · Vercel",
        sections: [
            {
                heading: "Ein PDF auf dem Handy",
                paragraphs: [
                    "Simpli entstand bei einem Essen mit Freunden in Stuttgart. Wir suchten etwas Vegetarisches und wollten erst mal die Getränke sehen, aber dafür mussten wir uns auf dem Handy durch ein PDF wühlen, das nie für so einen kleinen Bildschirm gedacht war. Warum kann man das nicht einfach filtern? Aus dieser Frage wurde Simpli.",
                ],
            },
            {
                heading: "Vom Prototyp zur Plattform",
                paragraphs: [
                    "Am Anfang stand nur ein Prototyp der digitalen Karte. Dann wurde mir klar, dass Restaurants auch ein Dashboard brauchen, mit dem sie ihre Karte schnell und einfach einrichten können. Also habe ich alles noch einmal von vorn gebaut.",
                    "Dabei ging es nie nur um die Technik. Ein Restaurantbesuch ist immer auch ein kleiner Ausflug in eine andere Welt, und die darf auf der Karte nicht verloren gehen. Deshalb bietet Simpli verschiedene Themes und Anpassungen wie eigene Farben, Schriften, Header-Layouts und Hintergründe. So bleibt jedes Restaurant auch auf der Karte unverkennbar es selbst.",
                    "Auch die QR-Codes habe ich bewusst von den Karten getrennt. Jeder Code steht für sich und lässt sich einer beliebigen Karte zuweisen, auf Wunsch automatisch: mittags die eine, abends die andere.",
                ],
            },
            {
                heading: "Dann kam die KI",
                paragraphs: [
                    "Je besser KI wurde, desto mehr konnte sie den Restaurants abnehmen. Zuerst Übersetzungen und Vorschläge für Allergene und Tags, später auch die Rechtschreibprüfung.",
                ],
            },
            {
                heading: "Warum die ersten Kunden absprangen",
                paragraphs: [
                    "Dann kam der erste Rückschlag: Meine ersten Kunden verlängerten ihr Abo nicht. Als ich dem nachging, stellte sich heraus, dass sie ihre Karte nie fertig eingerichtet hatten. Die Hürde lag also ganz am Anfang.",
                    "Also habe ich die Einrichtung von Grund auf überarbeitet. Neue Nutzer werden jetzt Schritt für Schritt bis zur ersten veröffentlichten Karte geführt, und der KI-Import verkürzt das Anlegen einer Karte je nach Umfang von rund 30 auf unter 3 Minuten.",
                    "Und weil im Zeitalter von ChatGPT niemand mehr in Untermenüs nach der richtigen Einstellung suchen will, gibt es jetzt einen KI-Assistenten. Er hilft bei jeder Frage und Änderung rund um Konto und Karten und setzt sie nach Möglichkeit direkt um.",
                    "Das alles ist live, aber ohne neue Kunden ist noch nicht belegt, dass es die Hürde wirklich beseitigt. Entscheidend wird sein, wie viele Registrierungen es bis zur veröffentlichten Karte schaffen.",
                ],
                facts: [
                    { value: "30 → unter 3 Min.", label: "zum Anlegen einer Karte, je nach Umfang" },
                ],
            },
            {
                heading: "Das Modell schlägt vor, das Dashboard führt aus",
                paragraphs: [
                    "Keine Entscheidung hat den Assistenten so geprägt wie diese. Restaurants ändern ihre Karte per Chat, erhöhen zum Beispiel alle Vorspeisen um 5 %, und am naheliegendsten wäre es, dem Modell dafür Schreibzugriff zu geben. Das wollte ich nicht: Gäste verlassen sich auf diese Karte, und ein falscher Tool-Aufruf oder in importiertem Text versteckte Anweisungen dürfen sie nicht einfach ändern können.",
                    "Deshalb spricht die Cloud Function nur mit dem Modell. Jeder Tool-Aufruf geht zurück ans Dashboard, das ihn gegen die echte Karte prüft und als Vorschlag anzeigt. Geschrieben wird erst, wenn das Restaurant bestätigt hat, und zwar mit den normalen Rechten des Kontos, die Firestore Rules serverseitig durchsetzen. Jede Änderung lässt sich rückgängig machen. Konto, Abrechnung und Impressum sind per Chat gar nicht änderbar, dorthin kann der Assistent nur verlinken.",
                    "Das kostet pro Änderung einen zusätzlichen Klick, und den nehme ich bewusst in Kauf. Ein schlechter Vorschlag kann zwar weiterhin auftauchen, aber nur als sichtbarer Vorher-Nachher-Vergleich, den das Restaurant freigeben muss. Außerdem ist jede Nachricht auf 4 Modellrunden und 8 Tool-Aufrufe begrenzt, damit ein Modell in einer Schleife keine Kosten hochtreiben kann.",
                ],
                diagram: {
                    propose: "Das Modell schlägt vor",
                    execute: "Das Dashboard führt aus",
                    toolCalls: "Tool-Aufrufe",
                    confirm: "Restaurant bestätigt",
                    model: { title: "Gemini", text: "Schlägt Änderungen vor" },
                    fn: { title: "Cloud Function", text: "Spricht nur mit dem Modell" },
                    dashboard: { title: "Dashboard", text: "Prüft und zeigt den Vorschlag" },
                    store: { title: "Firestore", text: "Rules prüfen jede Änderung" },
                },
                assistantDemo: true,
            },
            {
                heading: "Die Anfrage, die niemand sieht",
                paragraphs: [
                    "Nach dem Scan landet man zuerst bei einer Weiterleitung, und bis die antwortet, sehen Gäste gar nichts. In Produktion dauerte das rund 370 ms bis zum ersten Byte, etwa doppelt so lange wie die Kartenseite dahinter. Und das für eine Antwort, die nie jemand zu Gesicht bekommt.",
                    "Der Grund waren vier aufeinanderfolgende Firestore-Zugriffe, darunter ein blockierender Schreibvorgang für die Analytics. Der läuft jetzt per waitUntil erst nach der Antwort, denn ein nicht abgewartetes Promise würde zusammen mit der Serverless-Funktion abgebrochen. Die beiden verbleibenden Lesezugriffe laufen parallel und werden gecacht. Dabei nutzen sie die Cache-Tags der Kartenseite mit, sodass die Codes eines deaktivierten Restaurants gleich beim nächsten Scan nicht mehr funktionieren. Jetzt sind es rund 215 ms.",
                ],
                facts: [
                    {
                        value: "370 → 215 ms",
                        label: "QR-Weiterleitung, Zeit bis zum ersten Byte",
                    },
                ],
            },
            {
                heading: "Eine Karte, die nicht springt",
                paragraphs: [
                    "Das Theme-Stylesheet wurde erst nach der Hydration geladen. Gäste sahen also zuerst einen bildschirmfüllenden Spinner, bis die Karte ihn ersetzte. Allein dieser Wechsel verursachte auf dem Desktop einen Layout Shift von 0,204. Auf Mobilgeräten fiel das nicht auf, weil die CPU-Drosselung den Wechsel vor den First Paint verschob. Da das Theme schon auf dem Server bekannt ist, wird sein CSS jetzt direkt mit dem HTML ausgeliefert. In Produktion liegt der Shift jetzt bei 0.",
                    "Durch das serverseitige Rendern fielen zwei weitere Probleme auf: Auf der öffentlichen Seite wurden sämtliche Dashboard-Themes als render-blockierende Stylesheets geladen, und Gäste luden für kleine Vorschaubilder die Originale in voller Auflösung. Das gemeinsame Karten-Paket läuft auch im Vite-Dashboard und kann next/image deshalb nicht importieren. Stattdessen übergibt die jeweilige App jetzt ihren eigenen Bild-Renderer.",
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
                heading: "Kosten und Missbrauch im Griff",
                paragraphs: [
                    "Jeder KI-Aufruf kostet echtes Geld. Deshalb wird das Kontingent schon vor dem Modellaufruf in einer Firestore-Transaktion reserviert und bei einem Fehler wieder freigegeben. So können parallele Anfragen das Limit eines Tarifs nicht umgehen, und eine fehlgeschlagene Anfrage verbraucht kein Kontingent.",
                    "Pro Zahlungsmittel gibt es nur eine Testphase, ein neues Konto bringt also keine neue. Einmalkäufe werden direkt nach der Zahlung bestätigt. Für alle, die von der Verifizierungsseite der Bank nicht mehr zurückkommen, springt ein geplanter Job ein.",
                ],
            },
            {
                heading: "Was sich schon geändert hat",
                paragraphs: [
                    "Einige Änderungen hat Simpli schon hinter sich, und ich würde sie wieder so machen. Die Landingpage habe ich einmal komplett neu gestaltet, damit sie besser zur Zielgruppe passt. Und das Dashboard war früher nach der Datenstruktur aufgebaut, deshalb habe ich es neu an dem ausgerichtet, was Nutzer tatsächlich erledigen wollen.",
                ],
            },
        ],
    },
};
