import Image from "next/image";

export function Loading() {
    return <div className="h-screen w-screen flex items-center justify-center gap-2">
        <Image src="/s3repo.png" height={40} width={40} alt="logo" draggable="false" className="animate-spin-slow" />
        Getting your details
    </div>;
}