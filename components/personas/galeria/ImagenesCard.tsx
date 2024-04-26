"use client";
import { getImagePath } from "@/src/utils";
import { Galeria } from "@prisma/client";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

type GaleriaCardProps = {
  galeria: Galeria;
};

export default function ImagenesCard({ galeria }: GaleriaCardProps) {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <div className="bg-white shadow-md mt-5 border border-gray-200 rounded-lg max-w-sm dark:bg-gray-600 dark:border-gray-700">
        <Image
          width={385}
          height={300}
          src={getImagePath(galeria.url!)}
          alt={`Imagen`}
          className="rounded-t-lg"
        />
        <div className="p-5">
          <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
            Descripcion:
          </h5>
          <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
            {galeria.descripcion}
          </p>
          <button
            onClick={openModal}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Ver Imagen
            <svg
              className="-mr-1 ml-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5">
            <Image
              src={getImagePath(galeria.url!)}
              alt="Imagen ampliada"
              width={600}
              height={600}
              onClick={closeModal}
              className="cursor-pointer"
            />
          </div>
        </div>
      )}
    </>
  );
}
