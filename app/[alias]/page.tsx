import getUrlByAlias from "@/lib/getUrlByAlias";
import { redirect } from "next/navigation";

export default async function RedirectPage({
    params,
}: {
    params: { alias: string };
}) {
    const result = await getUrlByAlias(params.alias);

    if (result) {
        redirect(result.url);
    }

    return (
        <div className="p-6 text-red-600 text-center">Alias not found</div>
    );
}
