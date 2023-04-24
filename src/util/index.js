export const generarId = () => {
    const fecha = Date.now().toString(36);
    const randon = Math.random().toString(36).substring(2);
    return fecha + randon;
  };

  export const formatearFecha = (f) => {
    const fecha = new Date(f);
    const opciones={
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    };
    return fecha.toLocaleDateString('es-ES',opciones);
  };