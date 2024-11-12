// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // First, let's create the form inputs since they're missing
    const formGroups = document.querySelectorAll('.form-group');
    
    // Create the form inputs
    formGroups.forEach(group => {
        const label = group.textContent.trim();
        switch(label) {
            case 'Name':
                group.innerHTML = `
                    <label for="Name">Name</label>
                    <input type="text" id="Name" name="Name" required>
                `;
                break;
            case 'Email':
                group.innerHTML = `
                    <label for="Email">Email</label>
                    <input type="email" id="Email" name="Email" required>
                `;
                break;
            case 'Donation Amount (R)':
                group.innerHTML = `
                    <label for="Amount">Donation Amount (R)</label>
                    <input type="number" id="Amount" name="Amount" required>
                `;
                break;
            case 'Donation Type':
                group.innerHTML = `
                    <label for="Type">Donation Type</label>
                    <select id="Type" name="Type" required>
                        <option value="One-time">One-time</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                `;
                break;
            case 'Payment Method':
                group.innerHTML = `
                    <label for="paymentMethod">Payment Method</label>
                    <select id="paymentMethod" name="paymentMethod" required>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Paypal">Paypal</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                `;
                break;
        }
    });

    // Create the donation list table structure
    const donationList = document.querySelector('.donation-list .container');
    if (!donationList.querySelector('table')) {
        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Payment Method</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="donationBody"></tbody>
        `;
        donationList.appendChild(table);
    }

    // Add event listener to form
    const form = document.querySelector('.donation-form button');
    form.parentElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const newDonation = {
            name: document.getElementById('Name').value,
            email: document.getElementById('Email').value,
            amount: document.getElementById('Amount').value,
            type: document.getElementById('Type').value,
            paymentMethod: document.getElementById('paymentMethod').value
        };

        // Add to donations array
        donations.push(newDonation);
        
        // Display updated donations
        displayDonations();
        
        // Reset form
        this.reset();
    });
});

let donations = [];

function displayDonations() {
    const donationBody = document.getElementById('donationBody');
    donationBody.innerHTML = '';

    donations.forEach((donation, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${donation.name}</td>
            <td>${donation.email}</td>
            <td>R${donation.amount}</td>
            <td>${donation.type}</td>
            <td>${donation.paymentMethod}</td>
            <td>
                <button onclick="editDonation(${index})" class="btn">Edit</button>
                <button onclick="deleteDonation(${index})" class="btn">Delete</button>
            </td>
        `;
        donationBody.appendChild(row);
    });
}

function deleteDonation(index) {
    donations.splice(index, 1);
    displayDonations();
}

function editDonation(index) {
    const donation = donations[index];
    
    document.getElementById('Name').value = donation.name;
    document.getElementById('Email').value = donation.email;
    document.getElementById('Amount').value = donation.amount;
    document.getElementById('Type').value = donation.type;
    document.getElementById('paymentMethod').value = donation.paymentMethod;

    donations.splice(index, 1);
    displayDonations();
}