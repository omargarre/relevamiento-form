document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("relevamientoForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    /* =========================
       MAPA HUMANO (títulos reales)
    ========================= */
    const labels = {
      "1_1_Nombre_del_proyecto": "1.1 Nombre del proyecto",
      "1_2_Problema_a_resolver": "1.2 Problema a resolver",
      "1_3_Tipo": "1.3 Tipo de proyecto",
      "2_1_Usuarios": "2.1 Usuarios",
      "2_2_Usuario": "2.2 Nivel de usuario",
      "2_4_Situacion": "2.4 Situación de uso",
      "3_1_Contexto": "3.1 Contexto",
      "4_3_Carga": "4.3 Complejidad de carga",
      "9_1_MVP_imprescindible": "9.1 MVP imprescindible",
      "9_2_MVP_futuro": "9.2 MVP futuro",
      "9_3_MVP_fuera": "9.3 MVP fuera",
      "10_1_Exito": "10.1 Criterio de éxito",
      "11_1_Login": "11.1 Login",
      "11_2_Auth": "11.2 Autenticación",
      "12_1_Storage": "12.1 Almacenamiento",
      "12_3_Retencion": "12.3 Retención",
      "14_1_Usuarios": "14.1 Usuarios",
      "14_2_Registros": "14.2 Registros",
      "14_3_Fotos": "14.3 Fotos",
      "16_1_Mantenimiento": "16.1 Mantenimiento",
      "16_2_Cambios": "16.2 Cambios"
    };

    /* =========================
       1. ARMAR TEXTO HUMANO
    ========================= */
    let textoMail = "DOCUMENTO DE RECOPILACIÓN INICIAL\n\n";

    let pdfLines = [];

    for (const [key, value] of formData.entries()) {
      if (key.startsWith("_")) continue;

      const titulo = labels[key] || key;
      const respuesta = value && value.trim() ? value : "-";

      textoMail += `${titulo}:\n${respuesta}\n\n`;

      pdfLines.push({ titulo, respuesta });
    }

    /* =========================
       2. GENERAR PDF PROLIJO
    ========================= */
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    let y = 15;
    pdf.setFontSize(12);

    pdf.text("Documento de recopilación inicial", 10, y);
    y += 10;

    pdf.setFontSize(10);

    pdfLines.forEach(item => {
      pdf.setFont(undefined, "bold");
      pdf.text(item.titulo, 10, y);
      y += 6;

      pdf.setFont(undefined, "normal");
      const lines = pdf.splitTextToSize(item.respuesta, 180);
      pdf.text(lines, 10, y);
      y += lines.length * 5 + 6;

      if (y > 270) {
        pdf.addPage();
        y = 15;
      }
    });

    pdf.save("relevamiento.pdf");

    /* =========================
       3. ENVIAR MAIL LINDO
    ========================= */
    const mailData = new FormData();
    mailData.append("_subject", "Documento de recopilación inicial");
    mailData.append("_captcha", "false");
    mailData.append("_message", textoMail);

    const res = await fetch(
      "https://formsubmit.co/ajax/omargarre@gmail.com",
      {
        method: "POST",
        body: mailData,
        headers: { Accept: "application/json" }
      }
    );

    if (!res.ok) {
      alert("El PDF se generó, pero falló el envío del mail.");
      return;
    }

    alert("Formulario enviado correctamente.\nPDF generado y mail enviado.");
    form.reset();
  });
});
