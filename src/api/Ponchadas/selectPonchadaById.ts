import { PORT } from "../PORT";

export async function selectPonchadaById(id: number) {
  try {
    // El backend espera que se envíe el número de empleado con el nombre "usuario_id" en la query string
    const response = await fetch(`${PORT}/api/v1/ponchada/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = response.body;
      console.log("Not found en GetById", errorText);
      return {
        message: "notFound",
        error: errorText,
      };
    }

    const data = await response.json();
    return { ...data };
  } catch (error) {
    console.log("Error en GetById", error);
    return {
      message: "errorGetById",
      error: error,
    };
  }
}
