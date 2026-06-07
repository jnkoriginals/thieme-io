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
                },
            },
        },
    ];
}
