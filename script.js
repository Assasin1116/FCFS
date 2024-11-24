let processes = [];
let processId = 1;

function addProcess() {
    const arrivalTime = parseInt(document.getElementById("arrival-time").value);
    const burstTime = parseInt(document.getElementById("burst-time").value);

    if (isNaN(arrivalTime) || isNaN(burstTime)) {
        alert("Por favor, introduce valores válidos.");
        return;
    }

    processes.push({ id: processId++, arrivalTime, burstTime });
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime); // Ordenar por tiempo de llegada

    document.getElementById("process-form").reset();
    calculateFCFS();
}

function calculateFCFS() {
    let currentTime = 0;
    let tableBody = document.querySelector("#process-table tbody");
    tableBody.innerHTML = ""; // Limpiar tabla
    let timeline = document.getElementById("timeline");
    timeline.innerHTML = ""; // Limpiar línea de tiempo

    processes.forEach(process => {
        const startTime = Math.max(currentTime, process.arrivalTime);
        const finishTime = startTime + process.burstTime;
        const waitTime = startTime - process.arrivalTime;

        // Agregar a la tabla
        const row = `<tr>
            <td>${process.id}</td>
            <td>${process.arrivalTime}</td>
            <td>${process.burstTime}</td>
            <td>${startTime}</td>
            <td>${finishTime}</td>
            <td>${waitTime}</td>
        </tr>`;
        tableBody.innerHTML += row;

        // Agregar a la línea de tiempo
        const processBlock = document.createElement("div");
        processBlock.className = "process";
        processBlock.style.width = `${process.burstTime * 30}px`; // Escalar visualmente
        processBlock.innerText = `P${process.id}`;
        timeline.appendChild(processBlock);

        currentTime = finishTime;
    });
}
