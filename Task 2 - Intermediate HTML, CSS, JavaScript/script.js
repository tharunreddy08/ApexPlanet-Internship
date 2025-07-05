document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === '' || email === '') {
        document.getElementById('formMessage').textContent = 'All fields are required.';
    } else if (email.indexOf('@') === -1) {
        document.getElementById('formMessage').textContent = '@ is missing in the email address.';
    } else if (!emailPattern.test(email)) {
        document.getElementById('formMessage').textContent = 'Please enter a valid email address.';
    } else {
        document.getElementById('formMessage').textContent = 'Form submitted successfully!';
        alert('Thank you for your submission, ' + name + '!');
        document.getElementById('dynamicHeader').innerText = 'Thank you for your submission!';
        document.getElementById('contactForm').reset(); 
    }
});

document.getElementById('addTodoButton').addEventListener('click', function() {
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value;

    if (todoText === '') {
        alert('Please enter a task.');
        return;
    }

    const todoList = document.getElementById('todoList');
    const li = document.createElement('li');
    li.textContent = todoText;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = function() {
        todoList.removeChild(li);
        document.getElementById('todoMessage').textContent = 'Task removed successfully!';
    };

    li.appendChild(removeButton);
    todoList.appendChild(li);
    todoInput.value = ''; 
    document.getElementById('todoMessage').textContent = 'Task added successfully!';
    document.getElementById('dynamicHeader').innerText = 'You have added a new task!';
});