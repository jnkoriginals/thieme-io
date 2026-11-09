import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const caseStudyLanguages = {
        de: "https://thieme.io/de/work/simpli",
        en: "https://thieme.io/en/work/simpli",
        "x-default": "https://thieme.io/de/work/simpli",
    };

    return [
        {
            url: caseStudyLanguages.de,
            lastModified: new Date(),
            alternates: { languages: caseStudyLanguages },
        },
        {
            url: caseStudyLanguages.en,
            lastModified: new Date(),
            alternates: { languages: caseStudyLanguages },
        },
        {
            url: "https://thieme.io/de",
            lastModified: new Date(),
            alternates: {
                languages: {
                    de: "https://thieme.io/de",
                    en: "https://thieme.io/en",
                    "x-default": "https://thieme.io/de",
                },
            },
        },
        {
            url: "https://thieme.io/en",
            lastModified: new Date(),
            alternates: {
                languages: {
                    de: "https://thieme.io/de",
                    en: "https://thieme.io/en",
                    "x-default": "https://thieme.io/de",
                },
            },
        },
    ];
}
