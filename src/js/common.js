// Function to handle Add Student
document.getElementById('addStudentForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const studentRequest = {
        studentRequest: {
            studentName: document.getElementById('studentName').value,
            studentMobileNumber: document.getElementById('studentMobileNumber').value,
            studentEmailID: document.getElementById('studentEmailID').value,
            studentAddress: document.getElementById('studentAddress').value
        }
    };

    fetch('http://localhost:7800/studentservice/v1/addStudent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentRequest)
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('result');
        if (data.studentResponse.apiResponse.responseCode === '0000') { // Corrected this line
            const studRollNo = data.studentResponse.studentResponse.studentRollNo;
            const studName = data.studentResponse.studentResponse.studentName;
            const studPhoneNo = data.studentResponse.studentResponse.studentPhoneNumber;

            resultDiv.innerHTML = `
                <h3>Student Roll No: ${studRollNo}</h3>
                <h3>Name: ${studName}</h3>
                <h3>Phone No: ${studPhoneNo}</h3>
                <p>Successfully Student data added.</p>
            `;
        } else {
            resultDiv.innerHTML = '<p>Student not added..!!!</p>';
        }
    })
    .catch(error => {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '<p>An error occurred while adding the student.</p>';
        console.error('Error:', error);
    });
});

// Function to handle Update Student
document.getElementById('updateStudentForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const studentRequest = {
        studentRequest: {
            studentRollNo: document.getElementById('studentRollNo').value,
            studentName: document.getElementById('studentName').value,
            studentMobileNumber: document.getElementById('studentMobileNumber').value,
            studentEmailID: document.getElementById('studentEmailID').value,
            studentAddress: document.getElementById('studentAddress').value
        }
    };

    fetch('http://localhost:7800/studentservice/v1/updateStudent', { 
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentRequest)
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('result');
        if (data.studentResponse.apiResponse.responseCode === '0000') {
            resultDiv.innerHTML = `
                <h3>Student Roll No: ${data.studentResponse.studentResponse.studentRollNo}</h3>
                <h3>Name: ${data.studentResponse.studentResponse.studentName}</h3>
                <p>${data.studentResponse.studentResponse.updateStatus}</p>
            `;
        } else {
            resultDiv.innerHTML = '<p>Student data not updated..!!!</p>';
        }
    })
    .catch(error => {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    });
});

// Function to handle View Student
document.getElementById('viewStudentForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const rollNo = document.getElementById('studentRollNo').value;
    const name = document.getElementById('studentName').value;

    fetch(`http://ace-admin:7800/studentservice/v1/getStudent?studentRollNo=${rollNo}&studentName=${name}`)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('result');
            if (data.studentResponse.apiResponse.responseCode === '0000') {
                const students = data.studentResponse.studentResponse;
                let tableRows = '';

                // Check if students array is not empty
                if (students.length > 0) {
                    students.forEach((student, index) => {
                        tableRows += `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${student.studentRollNo}</td>
                                <td>${student.studentName}</td>
                                <td>${student.studentMobileNumber}</td>
                                <td>${student.studentEmailID}</td>
                                <td>${student.studentAddress}</td>
                            </tr>
                        `;
                    });
                    resultDiv.innerHTML = `
                        <table border="1">
                            <tr>
                                <th>SL No</th>
                                <th>Roll No</th>
                                <th>Name</th>
                                <th>Mobile No</th>
                                <th>Email ID</th>
                                <th>Address</th>
                            </tr>
                            ${tableRows}
                        </table>
                    `;
                } else {
                    resultDiv.innerHTML = '<p>No records available.</p>';
                }
            } else {
                resultDiv.innerHTML = '<p>No records available.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('result').innerHTML = '<p>Error fetching student details. Please try again.</p>';
        });
});


// Function to handle Delete Student
document.getElementById('deleteStudentForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const studentRequest = {
        studentRequest: {
            studentRollNo: document.getElementById('studentRollNo').value,
            studentName: document.getElementById('studentName').value
        }
    };

    fetch('http://localhost:7800/studentservice/v1/deleteStudent', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentRequest)
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('result');
            if (data.studentResponse.apiResponse.responseCode === '0000') {
                resultDiv.innerHTML = `
                    <h3>Student Roll No: ${data.studentResponse.studentResponse.studentRollNo}</h3>
                    <h3>Name: ${data.studentResponse.studentResponse.studentName}</h3>
                    <p>${data.studentResponse.studentResponse.deleteStatus}</p>
                `;
            } else {
                resultDiv.innerHTML = '<p>Student data not deleted..!!!</p>';
            }
    })
    .catch(error => {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    });
});

/*
// Function to handle View All Students
document.getElementById('viewAllStudentsButton')?.addEventListener('click', function() {
    fetch('http://ace-admin:7800/studentservice/v1/getAllStudent')
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('result');
            if (data.studentResponse.apiResponse.responseCode === '0000') {
                const students = data.studentResponse.studentResponse;
                let tableRows = '';

                if (students.length > 0) {
                    students.forEach((student, index) => {
                        tableRows += `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${student.studentRollNo}</td>
                                <td>${student.studentName}</td>
                                <td>${student.studentMobileNumber}</td>
                                <td>${student.studentEmailID}</td>
                                <td>${student.studentAddress}</td>
                            </tr>
                        `;
                    });
                    resultDiv.innerHTML = `
                        <table border="1">
                            <tr>
                                <th>SL No</th>
                                <th>Roll No</th>
                                <th>Name</th>
                                <th>Mobile No</th>
                                <th>Email ID</th>
                                <th>Address</th>
                            </tr>
                            ${tableRows}
                        </table>
                    `;
                } else {
                    resultDiv.innerHTML = '<p>No records available.</p>';
                }
            } else {
                resultDiv.innerHTML = '<p>No records available.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('result').innerHTML = '<p>Error fetching student details. Please try again.</p>';
        });
}); */

// Function to handle View All Students
document.getElementById('viewAllStudentsButton')?.addEventListener('click', function() {
    fetch('http://ace-admin:7800/studentservice/v1/getAllStudent')
        .then(response => response.json())
        .then(data => {
            if (data.studentResponse.apiResponse.responseCode === '0000') {
                const students = data.studentResponse.studentResponse;

                // Store the student data in session storage
                sessionStorage.setItem('allStudents', JSON.stringify(students));

                // Redirect to the viewAllStudent.html
                window.location.href = 'viewAllStudent.html';
            } else {
                alert('No records available.');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Error fetching student details. Please try again.');
        });
});