let lista = [];
let Id = 1;

function añadir() {
    const llegada = parseInt(document.getElementById("tiempo_llegada").value);
    const duracion = parseInt(document.getElementById("duracion").value);

    if (isNaN(llegada) || isNaN(duracion)) {
        alert("Por favor, introduce valores válidos.");
        return;
    }

    lista.push({ id: Id++, llegada, duracion });
    lista.sort((a, b) => a.llegada - b.llegada); 

    document.getElementById("formulario").reset();
    carcular();
}

function carcular() {
    let currentTime = 0;
    let tableBody = document.querySelector("#tabla tbody");
    tableBody.innerHTML = ""; 
    let linea_tiempo = document.getElementById("linea_tiempo");
    linea_tiempo.innerHTML = ""; 

    lista.forEach(proceso => {
        const comenzar = Math.max(currentTime, proceso.llegada);
        const terminar = comenzar + proceso.duracion;
        const espera = comenzar - proceso.llegada;

        const row = `<tr>
            <td>${proceso.id}</td>
            <td>${proceso.llegada}</td>
            <td>${proceso.duracion}</td>
            <td>${comenzar}</td>
            <td>${terminar}</td>
            <td>${espera}</td>
        </tr>`;
        tableBody.innerHTML += row;

        const procesoBlock = document.createElement("div");
        procesoBlock.className = "proceso";
        procesoBlock.style.width = `${proceso.duracion * 30}px`; 
        procesoBlock.innerText = `P${proceso.id}`;
        linea_tiempo.appendChild(procesoBlock);

        currentTime = terminar;
    });
}
