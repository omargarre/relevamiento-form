document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("relevamientoForm");
  const btnPdf = document.getElementById("btnPdf");

  /* =========================
     MAPA DE TÍTULOS (WORD)
  ========================= */
  const titulos = {
    "1_1_Nombre_del_proyecto": "1.1 Nombre del proyecto",
    "1_2_Problema_a_resolver": "1.2 Describa brevemente qué problema quiere resolver con esta aplicación",
    "1_3_Tipo": "1.3 El proyecto está pensado inicialmente como",
    "2_1_Usuarios": "2.1 ¿Quiénes cree que usarán la aplicación?",
    "2_2_Usuario": "2.2 ¿Qué nivel de familiaridad tienen con la tecnología?",
    "3_1_Contexto": "3.1 Contexto de uso",
    "9_1_MVP_imprescindible": "9.1 Funcionalidades imprescindibles (MVP)",
    "9_2_MVP_futuro": "9.2 Funcionalidades deseables a futuro",
    "9_3_MVP_fuera": "9.3 Funcionalidades fuera del alcance",
    "10_1_Exito": "10.1 ¿Cómo se medirá el éxito del proyecto?",
    "12_3_Retencion": "12.3 Retención de la información",
    "14_1_Usuarios": "14.1 Cantidad de usuarios",
    "14_2_Registros": "14.2 Cantidad de registros",
    "14_3_Fotos": "14.3 Uso de fotos / imágenes",
    "16_1_Mantenimiento": "16.1 Mantenimiento"
  };

  /* =========================
     AGRUPAR DATOS DEL FORM
  ========================= */
  function recolectarDatos() {
    const data = {};
    const fd = new FormData(form);

    for (const [key, value] of fd.entries()) {
      if (key.startsWith("_")) continue;

      if (!data[key]) data[key] = [];
      data[key].push(value);
    }
    return data;
  }

  /* =========================
     GENERAR PDF
  ========================= */
  function generarPDF(datos) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    let y = 15;
    pdf.setFontSize(12);
    pdf.text("Documento de recopilación inicial", 10, y);
    y += 10;

    pdf.setFontSize(10);

    for (const key in datos) {
      const titulo = titulos[key] || key;

      pdf.setFont(undefined, "bold");
      pdf.text(titulo, 10, y);
      y += 6;

      pdf.setFont(undefined, "normal");

      datos[key].forEach(val => {
        const texto = val && val.trim() ? val : "-";
        const lineas = pdf.splitTextToSize("• " + texto, 180);
        pdf.text(lineas, 12, y);
        y += lineas.length * 5;
      });

      y += 6;

      if (y > 270) {
        pdf.addPage();
        y = 15;
      }
    }

    pdf.save("relevamiento.pdf");
  }

  /* =========================
     TEXTO PARA MAIL
  ========================= */
  function armarTextoMail(datos) {
    let texto = "DOCUMENTO DE RECOPILACIÓN INICIAL\n\n";

    for (const key in datos) {
      const titulo = titulos[key] || key;
      texto += titulo + ":\n";

      datos[key].forEach(v => {
        texto += "- " + (v || "-") + "\n";
      });

      texto += "\n";
    }
    return texto;
  }

  /* =========================
     BOTÓN SOLO PDF
  ========================= */
  btnPdf.addEventListener("click", () => {
    const datos = recolectarDatos();
    generarPDF(datos);
  });

  /* =========================
     ENVÍO COMPLETO
  ========================= */
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datos = recolectarDatos();
    generarPDF(datos);

    const mailData = new FormData();
    mailData.append("_subject", "Documento de recopilación inicial");
    mailData.append("_captcha", "false");
    mailData.append("_message", armarTextoMail(datos));

    const res = await fetch("https://formsubmit.co/ajax/omargarre@gmail.com", {
      method: "POST",
      body: mailData,
      headers: { Accept: "application/json" }
    });

    if (!res.ok) {
      alert("El PDF se generó, pero falló el envío del mail.");
      return;
    }

    alert("Formulario enviado correctamente.\nPDF generado y mail enviado.");
    form.reset();
  });
});
