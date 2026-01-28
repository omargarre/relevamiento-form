function obtenerDatosFormulario() {
  const form = document.getElementById("relevamientoForm");
  const formData = new FormData(form);
  const datos = {};

  formData.forEach((value, key) => {
    if (datos[key]) {
      if (!Array.isArray(datos[key])) {
        datos[key] = [datos[key]];
      }
      datos[key].push(value);
    } else {
      datos[key] = value;
    }
  });

  let texto = "";
  for (const campo in datos) {
    texto += `${campo}: ${datos[campo]}\n\n`;
  }

  return texto;
}

function generarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const contenido = obtenerDatosFormulario();

  doc.setFontSize(12);
  doc.text("Relevamiento inicial – Desarrollo de aplicación", 10, 10);
  doc.setFontSize(10);
  doc.text(contenido, 10, 20);

  doc.save("relevamiento.pdf");
}

function enviarMail() {
  const contenido = obtenerDatosFormulario();

  const destinatarios = "omargarre@gmail.com,omar.cabezas@bcra.gob.ar";
  const asunto = encodeURIComponent("Relevamiento de proyecto");
  const cuerpo = encodeURIComponent(contenido);

  window.location.href = `mailto:${destinatarios}?subject=${asunto}&body=${cuerpo}`;
}
