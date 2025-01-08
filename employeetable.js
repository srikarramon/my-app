function filterEmployees() {
    // Get the input values
    var idFilter = document.getElementById("searchById").value.toLowerCase();
    var nameFilter = document.getElementById("searchByName").value.toLowerCase();
    var departmentFilter = document.getElementById("searchByDepartment").value.toLowerCase();
    var designationFilter = document.getElementById("searchByDesignation").value.toLowerCase();

    // Get the table body and rows
    var tableBody = document.getElementById("employeeTableBody");

    if (!tableBody) {
        console.error("Table body not found.");
        return;
    }

    var rows = tableBody.getElementsByTagName("tr");

    // Loop through each row and apply the filters
    for (var i = 0; i < rows.length; i++) {
        var idCell = rows[i].getElementsByTagName("td")[0]; // ID column
        var nameCell = rows[i].getElementsByTagName("td")[1]; // Name column
        var designationCell = rows[i].getElementsByTagName("td")[2]; // Designation column
        var departmentCell = rows[i].getElementsByTagName("td")[3]; // Department column

        // Get cell values
        var idText = idCell ? idCell.textContent.toLowerCase() : "";
        var nameText = nameCell ? nameCell.textContent.toLowerCase() : "";
        var designationText = designationCell ? designationCell.textContent.toLowerCase() : "";
        var departmentText = departmentCell ? departmentCell.textContent.toLowerCase() : "";

        // Check if the row matches all filters
        var matchesId = idText.indexOf(idFilter) > -1;
        var matchesName = nameText.indexOf(nameFilter) > -1;
        var matchesDesignation = designationText.indexOf(designationFilter) > -1;
        var matchesDepartment = departmentText.indexOf(departmentFilter) > -1;

        // Show the row only if all filters match
        if (matchesId && matchesName && matchesDesignation && matchesDepartment) {
            rows[i].style.display = ""; // Show row
        } else {
            rows[i].style.display = "none"; // Hide row
        }
    }
}

// Add event listeners to all filter inputs
document.addEventListener("DOMContentLoaded", function () {
    var idInput = document.getElementById("searchById");
    var nameInput = document.getElementById("searchByName");
    var departmentInput = document.getElementById("searchByDepartment");
    var designationInput = document.getElementById("searchByDesignation");

    if (idInput) idInput.addEventListener("keyup", filterEmployees);
    if (nameInput) nameInput.addEventListener("keyup", filterEmployees);
    if (departmentInput) departmentInput.addEventListener("keyup", filterEmployees);
    if (designationInput) designationInput.addEventListener("keyup", filterEmployees);
});
