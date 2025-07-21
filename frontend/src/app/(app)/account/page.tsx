"use client";

import { authClient } from "@/lib/auth-client";
import { Loading } from "@/components/Loading";
import { redirect } from "next/navigation";

export default function Page() {
    const { data: session, isPending, error } = authClient.useSession();

    if (isPending) return <Loading />;
    if (!session || error) return redirect('/login');
    
    return (<div>Accounts page</div>)
}
