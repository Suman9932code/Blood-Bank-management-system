document.getElementById('openRegister').addEventListener('click', function () {
    document.getElementById('registerPopup').classList.remove('hidden');
});

document.getElementById('donorRegisterBtn').addEventListener('click', function () {
    document.getElementById('registerPopup').classList.add('hidden');
    document.getElementById('donorForm').classList.remove('hidden');
});

document.getElementById('userRegisterBtn').addEventListener('click', function () {
    document.getElementById('registerPopup').classList.add('hidden');
    document.getElementById('userForm').classList.remove('hidden');
});

document.getElementById('donorForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const bloodType = document.getElementById('bloodType').value;
    const donationDate = document.getElementById('donationDate').value;
    const address = document.getElementById('address').value;
    const donor = { name, bloodType, donationDate, address };
    saveDonor(donor);
    alert('Donor registered successfully!');
    window.location.href = 'login.html';
});

document.getElementById('userForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const userName = document.getElementById('userName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const userAddress = document.getElementById('userAddress').value;
    const user = { userName, phone, email, userAddress };
    saveUser(user);
    alert('User registered successfully!');
    window.location.href = 'login.html';
});

const saveDonor = (donor) => {
    let donors = JSON.parse(localStorage.getItem('donors')) || [];
    donors.push(donor);
    localStorage.setItem('donors', JSON.stringify(donors));
};

const saveUser = (user) => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
};

document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const loginName = document.getElementById('loginName').value;
    const donors = getDonors();
    const donor = donors.find(d => d.name === loginName);

    if (donor) {
        localStorage.setItem('loggedInDonor', JSON.stringify(donor));
        alert(`Welcome back, ${donor.name}!`);
        window.location.href = 'inventory.html';
    } else {
        document.getElementById('loginMessage').textContent = 'Invalid name. Please register first.';
    }
});

const getDonors = () => {
    return JSON.parse(localStorage.getItem('donors')) || [];
};

const inventoryList = document.getElementById('inventoryList');
if (inventoryList) {
    const loggedInDonor = JSON.parse(localStorage.getItem('loggedInDonor'));
    
    if (!loggedInDonor) {
        alert('You must be logged in to access the inventory.');
        window.location.href = 'login.html';
    } else {
        const donors = getDonors();
        donors.forEach(donor => {
            const listItem = document.createElement('li');
            listItem.textContent = `${donor.name} - Blood Type: ${donor.bloodType} (Last Donation: ${donor.donationDate}, Address: ${donor.address || 'N/A'})`;
            inventoryList.appendChild(listItem);
        });
    }
}

document.getElementById('searchBtn')?.addEventListener('click', function () {
    const searchType = document.getElementById('searchBloodType').value;
    const donors = getDonors();
    const results = donors.filter(donor => donor.bloodType === searchType);

    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    if (results.length > 0) {
        results.forEach(result => {
            const listItem = document.createElement('li');
            listItem.textContent = `${result.name} (Last Donation: ${result.donationDate}, Address: ${result.address || 'N/A'})`;
            searchResults.appendChild(listItem);
        });
    } else {
        searchResults.textContent = 'No donors found for the selected blood type.';
    }
});

document.getElementById('paymentMethod')?.addEventListener('change', function () {
    const method = this.value;
    const upiField = document.getElementById('upiField');
    const cardFields = document.getElementById('cardFields');

    if (method === 'UPI') {
        upiField.style.display = 'block';
        cardFields.style.display = 'none';
    } else if (method === 'Credit Card' || method === 'Debit Card') {
        upiField.style.display = 'none';
        cardFields.style.display = 'block';
    } else {
        upiField.style.display = 'none';
        cardFields.style.display = 'none';
    }
});

document.getElementById('paymentForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const amount = document.getElementById('paymentAmount').value;
    const paymentMethod = document.getElementById('paymentMethod').value;

    document.getElementById('paymentMessage').textContent = `Payment of $${amount} using ${paymentMethod} processed successfully!`;
    this.reset();
});

document.getElementById('contactForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('contactName').value;
    const message = document.getElementById('contactMessage').value;

    document.getElementById('contactResponseMessage').textContent = `Thank you, ${name}! Your message has been sent.`;
    this.reset();
});

document.getElementById('logoutBtn')?.addEventListener('click', function () {
    localStorage.removeItem('loggedInDonor');
    alert('You have been logged out.');
    window.location.href = 'login.html';
});


