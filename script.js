let initialRows = [];

// Initialize bus data on page load
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

// Update arrival time when checkbox is checked or unchecked
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

// Function to filter bus rows based on the search input
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

// Function to collect selected buses and their data
function collectSelectedBuses() {
    const selectedBuses = [];
    const rows = document.querySelectorAll('#busTable tr');
    
    rows.forEach(row => {
        const checkbox = row.querySelector('input[type="checkbox"]');
        if (checkbox && checkbox.checked) {
            const routeNumber = row.querySelector('td:nth-child(2)').textContent;
            const arrivalTime = row.querySelector('td:nth-child(3)').textContent;
            selectedBuses.push({ routeNumber, arrivalTime });
        }
    });
    
    return selectedBuses;
}

// Function to generate the PDF
function generatePDF() {
    const selectedBuses = collectSelectedBuses();

    if (selectedBuses.length === 0) {
        alert("No buses selected.");
        return;
    }

    let pdfContent = "<h1>Bus Arrivals</h1> <table><tr><th>Route Number</th> <th>Arrival Time</th> </tr>";

    selectedBuses.forEach(bus => {
        // Ensure arrival time is not empty
        if (bus.arrivalTime) {
            pdfContent += `<tr><td>${bus.routeNumber}</td><td>${bus.arrivalTime}</td></tr>`;
        }
    });

    pdfContent += "</table>";

    // Convert the generated HTML to PDF
    const pdfContentDiv = document.createElement("div");
    pdfContentDiv.innerHTML = pdfContent;

    // Use html2pdf.js to generate the PDF
    html2pdf()
        .from(pdfContentDiv)
        .save('bus_log.pdf');
}

// Ensure the table is populated on page load
document.addEventListener("DOMContentLoaded", updateBusTimes);

// Ensure guard name is set from localStorage
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

// Add event listener for the PDF button
document.getElementById("downloadBtn").addEventListener("click", generatePDF);
