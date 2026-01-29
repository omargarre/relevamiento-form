/**************************************************
 * MAPEO DE CAMPOS TÉCNICOS → TÍTULOS HUMANOS
 **************************************************/
const LABELS = {
  "1.1 Nombre del proyecto": "1.1 Nombre del proyecto",
  "1.2 Problema a resolver": "1.2 Problema a resolver",
  "1.3 Tipo": "1.3 Tipo de proyecto",

  "2.1 Usuarios": "2.1 Usuarios de la aplicación",
  "2.2 Usuario": "2.2 Perfil del usuario",
  "2.3 Frecuencia": "2.3 Frecuencia de uso",
  "2.4 Situacion": "2.4 Situación del usuario",

  "3.1 Contexto": "3.1 Contexto de uso",
  "3.2 Internet": "3.2 Conectividad",
  "3.3 Guardado": "3.3 Guardado de información",

  "4.1 Tipo": "4.1 Tipo de información",
  "4.2 Obligatorios": "4.2 Datos obligatorios",
  "4.3 Carga": "4.3 Forma de carga",
  "4.4 Acciones": "4.4 Acciones permitidas",

  "5.1 Fotos": "5.1 Cantidad de fotos",
  "5.2 Video": "5.2 Uso de video",
  "5.3 VideoUso": "5.3 Tratamiento del video",

  "6.1 PDF": "6.1 Uso del PDF",
  "6.2 PDFReq": "6.2 Requisitos del PDF",
  "6.3 PDFDiseno": "6.3 Diseño del PDF",

  "7.1 Compartir": "7.1 Forma de compartir",
  "7.2 Envio": "7.2 Destinatarios del envío",
  "7.3 Historial": "7.3 Historial de envíos",

  "8.1 Busqueda": "8.1 Búsqueda de lugares",
  "8.2 Radio": "8.2 Radio de búsqueda",
  "8.3 Info": "8.3 Información mostrada",
  "8.4 Patrocinio": "8.4 Resultados patrocinados",

  "9.1 MVP imprescindible": "9.1 MVP – Funcionalidades imprescindibles",
  "9.2 MVP futuro": "9.2 MVP – Funcionalidades futuras",
  "9.3 MVP fuera": "9.3 MVP – Fuera del alcance",

  "10.1 Exito": "10.1 Criterio de éxito",
  "10.2 Abandono": "10.2 Motivos de abandono",

  "11.1 Login": "11.1 Requiere login",
  "11.2 Auth": "11.2 Tipo de autenticación",
  "11.3 Roles": "11.3 Roles de usuario",
  "11.4 Visibilidad": "11.4 Visibilidad de datos",

  "12.1 Storage": "12.1 Almacenamiento de datos",
  "12.2 Backup": "12.2 Respaldo automático",
  "12.3 Retencion": "12.3 Tiempo de conservación",

  "13.1 Ubicacion": "13.1 Obtención de ubicación",
  "13.2 Mapa": "13.2 Tipo de mapa",
  "13.3 Mapas": "13.3 Proveedor de mapas",

  "14.1 Usuarios": "14.1 Cantidad de usuarios",
  "14.2 Registros": "14.2 Registros por día",
  "14.3 Fotos": "14.3 Fotos por registro",

  "15.1 Reutilizacion": "15.1 Reutilización comercial",
  "15.2 Ampliable": "15.2 Sistema ampliable",
  "15.3 Codigo": "15.3 Propiedad del código",

  "16.1 Mantenimiento": "16.1 Nivel de mantenimiento",
  "16.2 Cambios": "16.2 Probabilidad de cambios"
};


/**************************************************
 * GENERAR PDF PROLIJO
 **************************************************/
function generarPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  const form = document.getElementById("relevamientoForm");
  const formData = new FormData(form);

  // Agrupar respuestas
  const data = {};
  for (let [key, value] of formData.entries()) {
    key = key.replace(/\[\]/g, "");
    if (!data[key]) data[key] = [];
    data[key].push(value);
  }

  let y = 15;

  // Título
  pdf.setFontSize(16);
  pdf.setFont(undefined, "bold");
  pdf.text("Documento de recopilación inicial", 10, y);
  y += 8;

  pdf.setFontSize(10);
  pdf.setFont(undefined, "normal");
  pdf.text(`Fecha: ${new Date().toLocaleDateString()}`, 10, y);
  y += 10;

  // Contenido
  pdf.setFontSize(11);

  Object.keys(data).forEach(key => {
    const label = LABELS[key] || key;
    const values = data[key];

    if (y > 270) {
      pdf.addPage();
      y = 15;
    }

    pdf.setFont(undefined, "bold");
    pdf.text(label, 10, y);
    y += 6;

    pdf.setFont(undefined, "normal");

    values.forEach(val => {
      pdf.text(`• ${val}`, 14, y);
      y += 5;
    });

    y += 4;
  });

  pdf.save("relevamiento.pdf");
}


/**************************************************
 * ENVÍO DEL FORM (NO SE TOCA FormSubmit)
 **************************************************/
document.getElementById("relevamientoForm").addEventListener("submit", function () {
  // No hacemos nada acá a propósito.
  // El submit sigue su curso normal hacia FormSubmit.
});
