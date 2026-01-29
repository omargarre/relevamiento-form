document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("relevamientoForm");
  const btnPdf = document.getElementById("btnPdf");

  /* ===== ESTRUCTURA FIJA PARA EL MAIL ===== */
  const esquema = [
    ["1_1_Nombre_del_proyecto", "1.1 Nombre del proyecto"],
    ["1_2_Problema_a_resolver", "1.2 Problema a resolver"],
    ["1_3_Proyecto_tipo", "1.3 Tipo de proyecto"],
    ["1_3_Otro_detalle", "1.3 Otro (detalle)"],

    ["2_1_Quienes", "2.1 Quiénes usarán la aplicación"],
    ["2_2_Usuario_tipico", "2.2 Usuario típico"],
    ["2_3_Frecuencia", "2.3 Frecuencia de uso"],
    ["2_4_Entorno", "2.4 Entorno"],

    ["3_1_Situaciones_uso", "3.1 Situaciones de uso"],
    ["3_2_Conexion", "3.2 Conectividad"],
    ["3_3_Guardar_continuar", "3.3 Guardar para continuar"],

    ["4_1_Info_importante", "4.1 Información importante"],
    ["4_2_Obligatorios", "4.2 Datos obligatorios"],
    ["4_3_Tipo_carga", "4.3 Tipo de carga"],
    ["4_4_Usuario_puede", "4.4 El usuario puede"],

    ["5_1_Cuantas_fotos", "5.1 Cantidad de fotos"],
    ["5_2_Video_importancia", "5.2 Uso de video"],
    ["5_3_Video_deberia", "5.3 El video debería"],

    ["6_1_PDF_uso", "6.1 Uso del PDF"],
    ["6_2_PDF_imprescindible", "6.2 Requisitos del PDF"],
    ["6_3_PDF_diseno", "6.3 Diseño del PDF"],

    ["7_1_Compartir", "7.1 Compartir"],
    ["7_2_Enviar_a", "7.2 Envío"],
    ["7_3_Historial_envios", "7.3 Historial"],

    ["8_1_Buscar_cercanos", "8.1 Búsqueda"],
    ["8_2_Radio", "8.2 Radio"],
    ["8_3_Info_lugares", "8.3 Información"],
    ["8_4_Patrocinados", "8.4 Patrocinados"],

    ["9_1_MVP_imprescindible", "9.1 MVP imprescindible"],
    ["9_2_MVP_mas_adelante", "9.2 MVP futuro"],
    ["9_3_MVP_afuera", "9.3 Fuera del MVP"],

    ["10_1_Exito", "10.1 Éxito"],
    ["10_2_Deja_de_usar", "10.2 Motivos de abandono"],

    ["11_Usuarios_accesos_control", "11. Usuarios y accesos"],
    ["12_Almacenamiento_y_datos", "12. Almacenamiento"],
    ["13_Ubicacion_y_mapas", "13. Ubicación y mapas"],
    ["14_Volumen_de_uso_descripcion", "14. Volumen de uso"],
    ["15_Evolucion_comercial", "15. Evolución comercial"],
    ["16_1_Nivel_mantenimiento", "16.1 Nivel de mantenimiento"],
    ["16_2_Probabilidad_cambios", "16.2 Probabilidad de cambios"]
  ];

  /* ===== RECOLECTAR DATOS ===== */
  function recolectar() {
    const fd = new FormData(form);
    const data = {};
    for (const [k, v] of fd.entries()) {
      if (!data[k]) data[k] = [];
      if (v && v.trim() !== "") data[k].push(v);
    }
    return data;
  }

  /* ===== HTML PARA EL MAIL ===== */
  function generarHTMLMail(data) {
    let html = "";

    esquema.forEach(([key, titulo]) => {
      html += `<h3 style="margin-top:20px;border-bottom:1px solid #ccc;">${titulo}</h3>`;

      if (data[key] && data[key].length > 0) {
        data[key].forEach(v => {
          html += `<p style="margin:4px 0 4px 15px;">• ${v}</p>`;
        });
      } else {
        html += `<p style="margin-left:15px;color:#999;">No respondido</p>`;
      }
    });

    return html;
  }

  /* ===== ENVÍO DE MAIL ===== */
  form.addEventListener("submit", e => {
    e.preventDefault();

    const data = recolectar();

    emailjs.send(
      "service_formulario",
      "template_0wmkcks",
      {
        contenido: generarHTMLMail(data),
        fecha: new Date().toLocaleString()
      }
    ).then(
      () => {
        alert("Formulario enviado correctamente.");
      },
      err => {
        console.error(err);
        alert("Error al enviar el formulario.");
      }
    );
  });

  /* ===== PDF DESDE EL FORM REAL ===== */
  btnPdf.addEventListener("click", () => {
    html2pdf()
      .set({
        margin: 10,
        filename: "relevamiento.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
      })
      .from(form)
      .save();
  });
});
