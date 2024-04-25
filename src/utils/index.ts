export function getImagePath(imagePath: string) {
  const cloudinaryBaseUrl = "https://res.cloudinary.com";
  if (imagePath.startsWith(cloudinaryBaseUrl)) {
    return imagePath;
  }
  if (imagePath.startsWith("public")) {
    const startIndex = imagePath.indexOf("images/");
    const newPath = imagePath.substring(startIndex);
    return `/${newPath}`;
  }
  // Ruta relativa de la carpeta public
  return `/${imagePath}`;
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatFecha(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatMilesSeparador(amount: string) {
  return new Intl.NumberFormat("en-US").format(+amount);
}

export function formatPhoneNumber(numberString: string) {
  if (numberString.length !== 10) {
    return "El teléfono debe tener 10 dígitos.";
  }

  const formatted = `${numberString.slice(0, 4)}-${numberString.slice(4, 7)}-${numberString.slice(7)}`;
  
  return formatted;
}