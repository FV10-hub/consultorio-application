import { auth } from "@/auth.config";
import Image from "next/image";
import { redirect } from "next/navigation";

type LogoProps = {
  name: string
}

export default function Logo({name}: LogoProps) {
  
  return (
    <>
      <div className="flex justify-center mt-5">
        <div className="relative w-40 h-40">
          <Image className="rounded-full" fill src={"/logo.jpg"} alt="No se pudo cargar" priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
        </div>
      </div>
      <h1 className="p-1 text-lg text-gray-800 flex justify-center ">{name || 'NO_HAY_USER'}</h1>
    </>
  );
}
