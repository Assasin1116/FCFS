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
    calculateFCFS();
}

function calculateFCFS() {
    let currentTime = 0;
    let tableBody = document.querySelector("#tabla tbody");
    tableBody.innerHTML = ""; 
    let linea_tiempo = document.getElementById("linea_tiempo");
    linea_tiempo.innerHTML = ""; 

    lista.forEach(process => {
        const comenzar = Math.max(currentTime, process.llegada);
        const terminar = comenzar + process.duracion;
        const espera = comenzar - process.llegada;

        const row = `<tr>
            <td>${process.id}</td>
            <td>${process.llegada}</td>
            <td>${process.duracion}</td>
            <td>${comenzar}</td>
            <td>${terminar}</td>
            <td>${espera}</td>
        </tr>`;
        tableBody.innerHTML += row;

        const processBlock = document.createElement("div");
        processBlock.className = "process";
        processBlock.style.width = `${process.duracion * 30}px`; 
        processBlock.innerText = `P${process.id}`;
        linea_tiempo.appendChild(processBlock);

        currentTime = terminar;
    });
}
