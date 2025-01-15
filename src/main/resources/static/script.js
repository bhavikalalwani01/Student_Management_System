// Loader functions
function showLoader() {
    document.getElementById('loader').style.display = 'flex';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}

// Load students when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadStudents();
});

// Function to load all students
function loadStudents() {
    showLoader();
    fetch('/api/students')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('studentTableBody');
            tableBody.innerHTML = '';

            data.forEach(student => {
                const row = `
                    <tr>
                        <td>${student.name}</td>
                        <td>${student.email}</td>
                        <td>${student.department}</td>
                        <td>${student.age}</td>
                        <td>
                            <button onclick="editStudent(${student.id})" class="edit-btn">Edit</button>
                            <button onclick="deleteStudent(${student.id})" class="delete-btn">Delete</button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error loading students!');
        })
        .finally(() => {
            hideLoader();
        });
}

// Handle form submission (Add/Update student)
const studentForm = document.getElementById('studentForm');
studentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    showLoader();

    const studentId = document.getElementById('studentId').value;
    const student = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        department: document.getElementById('department').value,
        age: parseInt(document.getElementById('age').value)
    };

    const url = studentId ? `/api/students/${studentId}` : '/api/students';
    const method = studentId ? 'PUT' : 'POST';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    })
        .then(response => response.json())
        .then(data => {
            loadStudents();
            studentForm.reset();
            document.getElementById('studentId').value = '';
            alert('Student saved successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error saving student!');
        })
        .finally(() => {
            hideLoader();
        });
});

// Function to delete student
function deleteStudent(id) {
    if(confirm('Are you sure you want to delete this student?')) {
        showLoader();
        fetch(`/api/students/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                loadStudents();
                alert('Student deleted successfully!');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error deleting student!');
            })
            .finally(() => {
                hideLoader();
            });
    }
}

// Function to edit student
function editStudent(id) {
    showLoader();
    fetch(`/api/students/${id}`)
        .then(response => response.json())
        .then(student => {
            document.getElementById('studentId').value = student.id;
            document.getElementById('name').value = student.name;
            document.getElementById('email').value = student.email;
            document.getElementById('department').value = student.department;
            document.getElementById('age').value = student.age;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error loading student details!');
        })
        .finally(() => {
            hideLoader();
        });
}