import ImagenesLista from "@/components/personas/galeria/ImagenesLista";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import ImageLocalUpload from "@/components/personas/galeria/ImageLocalUpload";

export default function GaleriaPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <div className="bg-white mt-10 px-5 py-1 rounded-md shadow-md">
        <Heading>Galeria de Imagenes</Heading>
        <GoBackButton />
        <ImageLocalUpload id={params.id}/>
        <ImagenesLista id={params.id}/>
      </div>
    </>
  );
}
