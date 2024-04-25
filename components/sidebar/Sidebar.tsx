"use client";
import ContentMenu from "../ui/ContentMenu";
import { useParams } from "next/navigation";
import Logo from "../ui/Logo";

const menus = [
    {
      id: 1,
      name: "Pacientes",
      imagen: "paciente",
      path: "/personas",
    }/*,
    {
      id: 2,
      name: "Pacientes",
      imagen: "paciente",
      path: "pacientes",
    },
    {
      id: 3,
      name: "Doctores",
      imagen: "doctor",
      path: "doctores",
    },
    {
      id: 2,
      name: "Especialidades",
      imagen: "especialidad",
      path: "/especialidades",
    },
    {
      id: 3,
      name: "Galeria",
      imagen: "galeria",
      path: "/galeria",
    }*/,
    {
      id: 4,
      name: "Fichas",
      imagen: "ficha",
      path: "/fichas",
    },
  ];

export default function Sidebar() {
  return (
    <aside className="md:w-72 md:h-screen bg-white">
      <Logo />
      <nav className="mt-10">
        {menus.map((menu) => (
          <ContentMenu key={menu.id} menu={menu} />
        ))}
      </nav>
    </aside>
  );
}
