// Menú del restaurante

const menu=[


{
nombre:"Bruschetta Clásica",
descripcion:"Pan tostado con tomate y albahaca fresca",
precio:4500,
categoria:"Entrada",
imagen:"https://images.unsplash.com/photo-1572695157366-5e585ab2b69f"
},


{
nombre:"Tabla de Quesos",
descripcion:"Selección de quesos importados con mermelada",
precio:7800,
categoria:"Entrada",
imagen:"https://images.unsplash.com/photo-1452195100486-9cc805987862"
},


{
nombre:"Lomo al Vino Tinto",
descripcion:"Lomo de res en reducción de vino tinto",
precio:15500,
categoria:"Plato Fuerte",
imagen:"https://images.unsplash.com/photo-1544025162-d76694265947"
},


{
nombre:"Pasta Carbonara",
descripcion:"Pasta con tocino, huevo y queso parmesano",
precio:10200,
categoria:"Plato Fuerte",
imagen:"https://images.unsplash.com/photo-1473093295043-cdd812d0e601"
},


{
nombre:"Salmón a la Plancha",
descripcion:"Filete de salmón con vegetales al vapor",
precio:13800,
categoria:"Plato Fuerte",
imagen:"https://images.unsplash.com/photo-1467003909585-2f8a72700288"
},


{
nombre:"Tiramisú",
descripcion:"Postre italiano con café y mascarpone",
precio:5200,
categoria:"Postre",
imagen:"https://images.unsplash.com/photo-1571877227200-a0d98ea607e9"
},


{
nombre:"Cheesecake de Maracuyá",
descripcion:"Cheesecake cremoso con coulis de maracuyá",
precio:4800,
categoria:"Postre",
imagen:"https://images.unsplash.com/photo-1565958011703-44f9829ba187"
}



];



let reservas=[];





// Mostrar menú

function renderMenu(lista=menu){


let contenedor=document.getElementById("menu-container");


contenedor.innerHTML="";



lista.forEach(plato=>{


let card=document.createElement("div");

card.className="card-plato";



let img=document.createElement("img");

img.src=plato.imagen;


  
let titulo=document.createElement("h3");

titulo.textContent=plato.nombre;



let desc=document.createElement("p");

desc.textContent=plato.descripcion;



let precio=document.createElement("p");

precio.textContent="₡"+plato.precio.toLocaleString();



let categoria=document.createElement("p");

categoria.textContent=plato.categoria;



card.appendChild(img);

card.appendChild(titulo);

card.appendChild(desc);

card.appendChild(precio);

card.appendChild(categoria);



contenedor.appendChild(card);



});


}






// Filtrar menú

function filtrarCategoria(categoria){


if(categoria==="Todos"){

renderMenu();

}

else{


let filtro=menu.filter(

p=>p.categoria===categoria

);


renderMenu(filtro);


}



}







// Validar formulario

function validarFormulario(){


let correcto=true;



document.querySelectorAll(".error-campo")
.forEach(e=>e.textContent="");



if(nombre.value.length<5){

errorNombre.textContent="Nombre inválido";

correcto=false;

}



if(!/^\S+@\S+\.\S+$/.test(correo.value)){


errorCorreo.textContent="Correo inválido";

correcto=false;


}



let hoy=new Date()
.toISOString()
.split("T")[0];



if(fecha.value<hoy || fecha.value===""){


errorFecha.textContent="Fecha incorrecta";

correcto=false;


}



if(personas.value<1 || personas.value>20){


errorPersonas.textContent="Debe ser entre 1 y 20";

correcto=false;


}



btnEnviar.disabled=!correcto;


return correcto;


}







// Agregar reserva

function agregarReserva(e){


e.preventDefault();



if(!validarFormulario()) return;



let reserva={


nombre:nombre.value,

correo:correo.value,

fecha:fecha.value,

hora:hora.value,

personas:Number(personas.value)


};



reservas.push(reserva);



let fila=document.createElement("tr");


fila.className="fila-reserva";



fila.innerHTML=`

<td>${reserva.nombre}</td>

<td>${reserva.correo}</td>

<td>${reserva.fecha}</td>

<td>${reserva.hora}</td>

<td>${reserva.personas}</td>

`;



if(reserva.personas>=6){

fila.style.background="#90ee90";

}



tablaReservas.appendChild(fila);



formReserva.reset();


btnEnviar.disabled=true;



actualizarResumen();



}








// Resumen

function actualizarResumen(){



let total=0;

let mayor=null;



reservas.forEach(r=>{


total+=r.personas;


if(!mayor || r.personas>mayor.personas)

mayor=r;


});




resumen.innerHTML=`

<h3>Resumen</h3>

<p>Total reservas: ${reservas.length}</p>

<p>Total personas: ${total}</p>

<p>Mayor reserva:
${mayor ? mayor.nombre+" - "+mayor.personas+" personas":"Ninguna"}

</p>


`;



}






formReserva.addEventListener(
"input",
validarFormulario
);



formReserva.addEventListener(
"submit",
agregarReserva
);




renderMenu();