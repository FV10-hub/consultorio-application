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
  console.log(getImagePath(galeria.url!));
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <Head>
        <meta
          http-equiv="Cache-Control"
          content="no-cache, no-store, must-revalidate"
        />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
      </Head>
      <div className="border bg-white">
        <Image
          width={300}
          height={300}
          src={getImagePath(galeria.url!)}
          alt={`Imagen`}
          className="cursor-pointer"
          onClick={openModal}
        />

        <div className="p-5">
          <h3 className="text-sm font-bold">Descripcion</h3>
          <h3 className="mt-5 font-black text-sm text-amber-500">
            <p className="text-sm font-bold">{galeria.descripcion}</p>{" "}
          </h3>
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
