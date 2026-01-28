// ======================
// PDF PROLIJO
// ======================
function generarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const form = document.getElementById("relevamientoForm");
  const data = new FormData(form);

  let y = 15;

  doc.setFontSize(16);
  doc.text("Relevamiento inicial – Desarrollo de aplicación", 10, y);
  y += 8;

  doc.setFontSize(10);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 10, y);
  y += 10;

  let seccionActual = "";

  data.forEach((value, key) => {
    if (key.startsWith("_")) return;

    const seccion = key.split(" ")[0];

    if (seccion !== seccionActual) {
      y += 6;
      doc.setFontSize(13);
      doc.text(seccion.toUpperCase(), 10, y);
      y += 6;
      doc.setFontSize(11);
      seccionActual = seccion;
    }

    const lineas = doc.splitTextToSize(`${key}: ${value}`, 180);
    doc.text(lineas, 10, y);
    y += lineas.length * 6;

    if (y > 280) {
      doc.addPage();
      y = 15;
    }
  });

  doc.save("relevamiento.pdf");
}

// ======================
// ENVÍO MAIL SILENCIOSO
// ======================
document.getElementById("relevamientoForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);

  fetch("https://formsubmit.co/ajax/omargarre@gmail.com", {
    method: "POST",
    body: data
  })
    .then(response => response.json())
    .then(() => {
      alert("Formulario enviado correctamente.");
      form.reset();
    })
    .catch(() => {
      alert("Error al enviar el formulario.");
    });
});
