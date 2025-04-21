let initialRows = [];

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
        row.dataset.routeNumber = bus.number; // Store the route number in a data attribute
        row.innerHTML = `<td><input type='checkbox' onchange='updateArrivalTime(this)'></td>
                         <td>Route number ${bus.number}</td>
                         <td class='arrival-time'></td>`;
        tableBody.appendChild(row);
        initialRows.push(row); // Store the initial row
    });
}

function updateArrivalTime(checkbox) {
    const parentRow = checkbox.closest('tr');
    const tableBody = parentRow.parentNode;

    if (checkbox.checked) {
        let now = new Date();
        let hours = now.getHours().toString().padStart(2, '0');
        let minutes = now.getMinutes().toString().padStart(2, '0');
        let formattedTime = `${hours}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
        parentRow.querySelector('.arrival-time').textContent = formattedTime;

        // Ensure the tick appears first
        setTimeout(() => {
            // Move the row to the end of the table without transition
            tableBody.appendChild(parentRow);
        }, 1000); // 1000ms delay to ensure tick appears first
    } else {
        parentRow.querySelector('.arrival-time').textContent = "";

        // Move the row back to its original position
        const routeNumber = parentRow.dataset.routeNumber;
        const originalIndex = initialRows.findIndex(row => row.dataset.routeNumber === routeNumber);
        const rows = Array.from(tableBody.rows);
        rows.splice(rows.indexOf(parentRow), 1); // Remove the row from its current position
        rows.splice(originalIndex, 0, parentRow); // Insert the row back to its original position

        // Reinsert rows in the correct order
        rows.forEach(row => tableBody.appendChild(row));
    }
}

function filterRows() {
    const searchValue = document.getElementById('searchBar').value.toLowerCase();
    const rows = document.querySelectorAll('#busTable tr');
    
    rows.forEach(row => {
        const routeNumber = row.dataset.routeNumber;
        if (routeNumber.includes(searchValue)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Initialize table on load
document.addEventListener("DOMContentLoaded", updateBusTimes);

window.addEventListener("DOMContentLoaded", function () {
    const userName = localStorage.getItem("userName") || "Guest";

    const span = document.createElement("span");
    span.className = "guard-name";
    span.textContent = userName;

    const guardInfo = document.getElementById("guard-info");
    if (guardInfo) {
        guardInfo.appendChild(span);
    }
});
