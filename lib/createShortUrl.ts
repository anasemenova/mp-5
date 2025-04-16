"use server";

import getCollection, { URLS_COLLECTION } from "@/db";

export default async function createShortUrl(
    alias: string,
    url: string
): Promise<{ alias: string; url: string }> {
    console.log("creating new short url");

    if (!alias || alias.trim() === "") {
        throw new Error("Alias cannot be empty");
    }

    try {
        new URL(url);
    } catch {
        throw new Error("Invalid URL format");
    }

    try {
        const response = await fetch(url, { method: "HEAD" });

        if (!response.ok && response.status < 400) {
            throw new Error("URL is not reachable");
        }

    } catch {
        throw new Error("URL is not reachable");
    }

    const urlCollection = await getCollection(URLS_COLLECTION);
    const existing = await urlCollection.findOne({ alias });

    if (existing) {
        throw new Error("Invalid alias: This alias already exists");
    }

    const doc = { alias, url };
    const res = await urlCollection.insertOne(doc);

    if (!res.acknowledged) {
        throw new Error("DB insert failed");
    }

    return { alias, url };

}
