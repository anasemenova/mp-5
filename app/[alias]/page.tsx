//this next line with force-dynamic I found on stack overflow
//when I was debugging the issue with my params

export const dynamic = "force-dynamic";

import {redirect} from "next/navigation";
import getUrlByAlias from "@/lib/getUrlByAlias";

export default async function Redirect({params,}: {params: Promise<{ alias: string}>; }) {
    const { alias } = await params;
    const result = await getUrlByAlias(alias);

    if (result) {
        redirect(result.url);
    }

    return (
        <div className="p-6 text-red-600 text-center">Alias not found</div>
    );
}

