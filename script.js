document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("relevamientoForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // cortamos el submit normal

    try {
      // =========================
      // 1. GENERAR PDF
      // =========================
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF("p", "mm", "a4");

      let y = 10;
      pdf.setFontSize(11);

      const formData = new FormData(form);

      for (const [key, value] of formData.entries()) {
        if (key.startsWith("_")) continue; // ignorar campos ocultos

        pdf.text(`${key.replace(/_/g, " ")}:`, 10, y);
        y += 6;

        const lines = pdf.splitTextToSize(value || "-", 180);
        pdf.text(lines, 10, y);
        y += lines.length * 6 + 4;

        if (y > 270) {
          pdf.addPage();
          y = 10;
        }
      }

      pdf.save("relevamiento.pdf");

      // =========================
      // 2. ENVIAR MAIL (FormSubmit)
      // =========================
      const response = await fetch(
        "https://formsubmit.co/ajax/omargarre@gmail.com",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error enviando el formulario");
      }

      // =========================
      // 3. MENSAJE AL USUARIO
      // =========================
      alert(
        "Formulario enviado correctamente.\n\nEl relevamiento fue recibido y el PDF descargado."
      );

      form.reset();

    } catch (err) {
      console.error(err);
      alert(
        "El PDF se generó, pero hubo un problema enviando el mail.\n\nReintentá el envío."
      );
    }
  });
});
