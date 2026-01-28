document.getElementById("relevamientoForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = {};

  formData.forEach((value, key) => {
    if (data[key]) {
      if (!Array.isArray(data[key])) {
        data[key] = [data[key]];
      }
      data[key].push(value);
    } else {
      data[key] = value;
    }
  });

  console.log("Relevamiento:", data);
  alert("Formulario enviado. Gracias.");

  // acá después:
  // fetch('/api/guardar', { method: 'POST', body: JSON.stringify(data) })
});
