function updateBusTimes() {
    let buses = [];
    
    // Generating bus numbers from 1 to 100
    for (let i = 1; i <= 100; i++) {
        buses.push({ number: i, arrival: "" });
    }
    
    let tableBody = document.getElementById("busTable");
    tableBody.innerHTML = "";
    
    buses.forEach(bus => {
        let row = document.createElement("tr");
        row.innerHTML = `<td><input type='checkbox' onchange='updateArrivalTime(this)'></td>
                         <td>Route number ${bus.number}</td>
                         <td class='arrival-time'></td>`;
        tableBody.appendChild(row);
    });
}

function updateArrivalTime(checkbox) {
    if (checkbox.checked) {
        let now = new Date();
        let hours = now.getHours().toString().padStart(2, '0');
        let minutes = now.getMinutes().toString().padStart(2, '0');
        let formattedTime = `${hours}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
        checkbox.closest('tr').querySelector('.arrival-time').textContent = formattedTime;
    } else {
        checkbox.closest('tr').querySelector('.arrival-time').textContent = "";
    }
}

// Initialize table on load
document.addEventListener("DOMContentLoaded", updateBusTimes);
