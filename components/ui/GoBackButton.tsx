"use client";
import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();
  return (
    <>
      <button
        onClick={() => router.back()}
        className="bg-cyan-500 hover:bg-cyan-600 text-white w-full inline-flex items-center rounded-lg lg:w-auto text-xs px-10 py-3 text-center font-bold cursor-pointer"
      >
       
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h14M5 12l4-4m-4 4 4 4"
          />
        </svg>
        Volver
      </button>
    </>
  );
}
