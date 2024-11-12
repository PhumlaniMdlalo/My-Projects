
let volunteers = [];

document.getElementById('Volunteer').addEventListener('submit', function(e) {
    e.preventDefault();

    let volunteerName = document.getElementById('volunteerName').value;
    let volunteerEmail = document.getElementById('volunteerEmail').value;
    let volunteerPhone = document.getElementById('volunteerPhone').value;
    let volunteerAvailability = document.getElementById('volunteerAvailability').value;
    let volunteerSkills = document.getElementById('volunteerSkills').value;

    let newVolunteer = {
        name: volunteerName,
        email: volunteerEmail,
        phone: volunteerPhone,
        availability: volunteerAvailability,
        skills: volunteerSkills
    };

    volunteers.push(newVolunteer);
    displayVolunteers();
    this.reset();
});

document.getElementById('searchBar').addEventListener('input', function() {
    let searchTerm = this.value.toLowerCase();
    displayVolunteers(searchTerm);
});

function displayVolunteers(searchTerm = '') {
    let volunteerBody = document.getElementById('volunteerBody');
    volunteerBody.innerHTML = '';

    volunteers
        .filter(volunteer => volunteer.name.toLowerCase().includes(searchTerm))
        .forEach((volunteer, index) => {
            let row = document.createElement('tr');

            row.innerHTML = `
                <td>${volunteer.name}</td>
                <td>${volunteer.email}</td>
                <td>${volunteer.phone}</td>
                <td>${volunteer.availability}</td>
                <td>${volunteer.skills}</td>
                <td>
                    <button onclick="editVolunteer(${index})">Edit</button>
                    <button onclick="deleteVolunteer(${index})">Delete</button>
                </td>
            `;

            volunteerBody.appendChild(row);
        });
}

function sortTable(columnIndex) {
    volunteers.sort((a, b) => {
        let valueA = Object.values(a)[columnIndex].toLowerCase();
        let valueB = Object.values(b)[columnIndex].toLowerCase();
        
        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
        return 0;
    });
    displayVolunteers();
}

function deleteVolunteer(index) {
    volunteers.splice(index, 1);
    displayVolunteers();
}

function editVolunteer(index) {
    let volunteer = volunteers[index];
    
    document.getElementById('volunteerName').value = volunteer.name;
    document.getElementById('volunteerEmail').value = volunteer.email;
    document.getElementById('volunteerPhone').value = volunteer.phone;
    document.getElementById('volunteerAvailability').value = volunteer.availability;
    document.getElementById('volunteerSkills').value = volunteer.skills;

    deleteVolunteer(index);
}

// Initial display
displayVolunteers();

