
import getCollection, {URLS_COLLECTION} from "@/db";

export type Url = {
    alias: string;
    url: string;
};

export default async function getUrlByAlias(
    alias: string
): Promise<Url | null> {
    const urlsCollection = await getCollection(URLS_COLLECTION);
    const data = await urlsCollection.findOne({ alias });

    if (data === null) {
        return null;
    }

    return {
        alias: data.alias,
        url: data.url,
    };
}
