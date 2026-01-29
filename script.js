function generarPDF(){
const {jsPDF}=window.jspdf;
const doc=new jsPDF();
let y=15;
doc.setFontSize(16);
doc.text("Documento de recopilación inicial",10,y);y+=10;
doc.setFontSize(10);
doc.text("Fecha: "+new Date().toLocaleDateString(),10,y);y+=10;
const data=new FormData(document.getElementById("relevamientoForm"));
doc.setFontSize(11);
data.forEach((v,k)=>{
 if(k.startsWith("_"))return;
 const lines=doc.splitTextToSize(k+": "+v,180);
 doc.text(lines,10,y);
 y+=lines.length*6;
 if(y>280){doc.addPage();y=15;}
});
doc.save("relevamiento.pdf");
}

document.getElementById("relevamientoForm").addEventListener("submit",function(e){
e.preventDefault();
const data=new FormData(this);
fetch("https://formsubmit.co/ajax/omargarre@gmail.com",{method:"POST",body:data})
.then(()=>alert("Formulario enviado correctamente"))
.catch(()=>alert("Error al enviar"));
});