//part of this code and its logic is from Jeffrey's example from discussion
"use server";
import getCollection, { URLS_COLLECTION } from "@/db";

export default async function createShortUrl(alias: string, url: string): Promise<{ alias: string; url: string } | string> {
    console.log("creating new short url");

    if (!alias || alias.trim() === "") {
        return "Alias cannot be empty";
    }

    try {
        new URL(url);
    } catch {
        return "Invalid URL format";
    }

    try {
        const response = await fetch(url, { method: "HEAD" });
        if (!response.ok && response.status < 400) {
            return "URL is not reachable";
        }
    } catch {
        return "URL is not reachable";
    }

    const urlCollection = await getCollection(URLS_COLLECTION);
    const existing = await urlCollection.findOne({ alias });

    if (existing) {
        return "Invalid alias: This alias already exists";
    }

    const doc = { alias, url };
    const res = await urlCollection.insertOne(doc);

    if (!res.acknowledged) {
        return "DB insert failed";
    }

    return { alias, url };
}