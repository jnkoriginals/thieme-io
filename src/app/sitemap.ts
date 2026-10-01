import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
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
