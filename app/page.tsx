"use client";
import {useState} from "react";
import createShortUrl from "@/lib/createShortUrl";

export default function Home() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState("");

    async function shortenLink() {
        setError("");
        setShortUrl("");

        try {
            const result = await createShortUrl(alias, url);
            const fullLink = location.origin + "/" + result.alias;
            setShortUrl(fullLink);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("There has been an error");
            }
        }
    }

    return (
        <main className="max-w-lg mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">URL Shortener</h1>
            <div className="flex flex-col gap-4">
                <label className="text-sm font-medium text-white-700">URL</label>
                <input
                    type="text"
                    placeholder="https://example.com/very/long/url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    className="p-3 border border-gray-300 rounded"
                />
                <label className="text-sm font-medium text-white-700 mt-4">Custom Alias</label>
                <input
                    type="text"
                    placeholder="your-custom-alias"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    required
                    className="p-3 border border-gray-300 rounded"
                />
                <button
                    onClick={shortenLink}
                    className="p-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                >Shorten
                </button>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {shortUrl && (
                <p className="mt-4">
                    Your short URL:{" "}
                    <a href={shortUrl} className="text-blue-600 underline">
                        {shortUrl}
                    </a>
                </p>
            )}
        </main>
    );
}
