function generarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const form = document.querySelector("form");
  const data = new FormData(form);

  let y = 10;
  doc.setFontSize(12);
  doc.text("Relevamiento inicial – Desarrollo de aplicación", 10, y);
  y += 10;

  doc.setFontSize(10);
  data.forEach((value, key) => {
    doc.text(`${key}: ${value}`, 10, y);
    y += 7;
    if (y > 280) {
      doc.addPage();
      y = 10;
    }
  });

  doc.save("relevamiento.pdf");
}
