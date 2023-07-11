let users = [
            {
                "userId": "USR00001",
                "name": "John Doe",
                "profilePicture": "https://randomuser.me/api/portraits/men/1.jpg",
                "statusMessage": "Hello, I'm John",
                "presence": 1,
                "messages": []
            },
            {
                "userId": "USR00002",
                "name": "Jane Smith",
                "profilePicture": "https://randomuser.me/api/portraits/women/2.jpg",
                "statusMessage": "Nice to meet you!",
                "presence": 4,
                "messages": []
            },
            {
                "userId": "USR00003",
                "name": "Mike Johnson",
                "profilePicture": "https://randomuser.me/api/portraits/men/3.jpg",
                "statusMessage": "One small positive thought can change your whole day",
                "presence": 2,
                "messages": []
            },
            {
                "userId": "USR00004",
                "name": "Steve Dunk",
                "profilePicture": "https://randomuser.me/api/portraits/men/4.jpg",
                "statusMessage": "I am a rockstar",
                "presence": 3,
                "messages": []
            },
            {
                "userId": "USR00005",
                "name": "Maria Dropola",
                "profilePicture": "https://randomuser.me/api/portraits/women/5.jpg",
                "statusMessage": "hello angel",
                "presence": 4,
                "messages": []
            }
        ];
        let activeUserId = null;
        let nextUserIndex = users.length + 1;


        function createProfile(user) {
      const existingContainer = document.getElementById(user.userId);
if (existingContainer) {
  return existingContainer;
}

      const container = document.createElement('div');
      container.id = user.userId;
      container.className = 'user-container';
      container.addEventListener('click', () => openChat(user.userId));

      const profile = document.createElement('div');
      profile.className = `user-profile ${getStatusClass(user.presence)}`;

      const image = document.createElement('img');
      image.src = user.profilePicture;
      profile.appendChild(image);

      const details = document.createElement('div');
      details.className = 'user-details';
      const name = document.createElement('div');
      name.className = 'name';
      name.textContent = user.name;
      details.appendChild(name);

      if (user.statusMessage) {
        const status = document.createElement('div');
        status.className = 'status-message';
        status.textContent = user.statusMessage;
        details.appendChild(status);
      }

      const dropdownToggle = document.createElement('div');
      dropdownToggle.className = 'dropdown-toggle';
      dropdownToggle.innerHTML = '';

      const dropdownMenu = document.createElement('div');
      dropdownMenu.className = 'dropdown-menu';
      const deleteOption = document.createElement('div');
      deleteOption.className = 'option';
      deleteOption.textContent = 'Delete';
      deleteOption.addEventListener('click', () => deleteUser(user.userId));
      dropdownMenu.appendChild(deleteOption);

      const updateOption = document.createElement('div');
      updateOption.className = 'option';
      updateOption.textContent = 'Update';
      updateOption.addEventListener('click', () => showUpdateForm(user.userId));
      dropdownMenu.appendChild(updateOption);

      dropdownToggle.appendChild(dropdownMenu);
      deleteOption.addEventListener('click', () => {
  const userContainer = document.getElementById(user.userId);
  if (userContainer) {
    userContainer.remove();
  }
  deleteUser(user.userId);
});
      container.appendChild(profile);
      container.appendChild(details);
      container.appendChild(dropdownToggle);

      return container;
    }

function createUpdateForm(user) {
      const form = document.createElement('div');
      form.className = 'update-form';

      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.value = user.name;
      form.appendChild(nameInput);

      const statusInput = document.createElement('input');
      statusInput.type = 'text';
      statusInput.value = user.statusMessage;
      form.appendChild(statusInput);

      const pictureInput = document.createElement('input');
      pictureInput.type = 'text';
      pictureInput.value = user.profilePicture;
      form.appendChild(pictureInput);

      const presenceSelect = document.createElement('select');
      const presenceOptions = ['Online', 'Busy', 'Idle', 'Offline (Not Logged In)'];
      for (let i = 0; i < presenceOptions.length; i++) {
        const option = document.createElement('option');
        option.value = i + 1;
        option.text = presenceOptions[i];
        presenceSelect.appendChild(option);
      }
      presenceSelect.value = user.presence.toString();
      form.appendChild(presenceSelect);

      const updateButton = document.createElement('button');
      updateButton.textContent = 'Update';
      updateButton.addEventListener('click', () => {
        const updatedUser = {
          userId: user.userId,
          name: nameInput.value,
          profilePicture: pictureInput.value,
          statusMessage: statusInput.value,
          presence: parseInt(presenceSelect.value)
        };
        updateUser(updatedUser);
        form.style.display = 'none';
      });
      form.appendChild(updateButton);

      return form;
    }


        function getStatusClass(presence) {
            switch (presence) {
                case 1:
                    return 'online';
                case 2:
                    return 'idle';
                case 3:
                    return 'busy';
                case 4:
                    return 'offline';
                default:
                    return '';
            }
        }
function renderUsers() {
  const userList = document.getElementById('user-list');
  userList.innerHTML = '';

  users.forEach((user) => {
    const profile = createProfile(user);
    userList.appendChild(profile);
  });
}

function renderUpdateForm(userId) {
      const inputContainer = document.getElementById('input-container');
      inputContainer.innerHTML = '';

      const user = users.find(u => u.userId === userId);
      const form = createUpdateForm(user);
      inputContainer.appendChild(form);
      form.style.display = 'flex';
    }

    function showUpdateForm(userId) {
      renderUpdateForm(userId);
    }

    function hideUpdateForm() {
      const inputContainer = document.getElementById('input-container');
      inputContainer.innerHTML = '';
    }

        function displayUserInput() {
  const inputContainer = document.getElementById('input-container');
  inputContainer.innerHTML = '';

  const form = document.createElement('div');
  form.className = 'update-form';

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.placeholder = 'Name';
  nameInput.className = 'name-input';
  form.appendChild(nameInput);

  const pictureInput = document.createElement('input');
  pictureInput.type = 'text';
  pictureInput.placeholder = 'Profile Picture URL';
  pictureInput.className = 'picture-input';
  form.appendChild(pictureInput);

  const statusInput = document.createElement('input');
  statusInput.type = 'text';
  statusInput.placeholder = 'Status Message';
  statusInput.className = 'status-input';
  form.appendChild(statusInput);

  const presenceSelect = document.createElement('select');
  presenceSelect.className = 'presence-select';
  const presenceOptions = ['Online', 'Busy', 'Idle', 'Offline (Not Logged In)'];
  for (let i = 0; i < presenceOptions.length; i++) {
    const option = document.createElement('option');
    option.value = i + 1;
    option.text = presenceOptions[i];
    presenceSelect.appendChild(option);
  }
  form.appendChild(presenceSelect);

  const addButton = document.createElement('button');
  addButton.textContent = 'Add User';
  addButton.addEventListener('click', () => {
    const name = nameInput.value;
    const profilePicture = pictureInput.value;
    const statusMessage = statusInput.value;
    const presence = parseInt(presenceSelect.value);

    const newUser = {
      userId: `USR${nextUserIndex.toString().padStart(5, '0')}`,
      name,
      profilePicture,
      statusMessage,
      presence,
      messages: [] // Initialize the messages array for the new user
    };
    nextUserIndex++;
    users.push(newUser); // Add the new user to the users array
    addUser(newUser);
    nameInput.value = '';
    pictureInput.value = '';
    statusInput.value = '';
    renderUsers(); // Call renderUsers() after adding a new user
  });
  form.appendChild(addButton);

  inputContainer.appendChild(form);
  form.style.display = 'flex';
}



    

    function updateUser(updatedUser) {
  const index = users.findIndex((user) => user.userId === updatedUser.userId);
  if (index !== -1) {
    users[index] = updatedUser;
    renderUsers();
  }
}

function addUser(user) {
  users.push(user);
  renderUsers();
}

function deleteUser(userId) {
  const index = users.findIndex((user) => user.userId === userId);
  if (index !== -1) {
    users.splice(index, 1);
    if (activeUserId === userId) {
      activeUserId = null;
    }
    renderUsers();
  }
  const chatHeader = document.getElementById('chat-header');
  chatHeader.textContent = '';
}



        function openChat(userId) {
            activeUserId = userId;
            const chatHeader = document.getElementById('chat-header');
            const chatMessages = document.getElementById('chat-messages');
            const chatInput = document.getElementById('chat-input');
            const sendButton = document.getElementById('chat-send-button');

            const activeUser = users.find(user => user.userId === userId);
            chatHeader.textContent = activeUser.name;
            chatMessages.textContent = '';

            activeUser.messages.forEach(message => {
                const messageElement = document.createElement('div');
                messageElement.className = message.from === activeUser.userId ? 'outgoing-message' : 'incoming-message';
                messageElement.textContent = message.text;
                chatMessages.appendChild(messageElement);
            });

            chatInput.value = '';
            chatInput.focus();
            sendButton.onclick = sendMessage;


            const chatContainer = document.querySelector('.chat-container');
            chatContainer.style.display = 'flex';
            renderUsers();
        }

        function sendMessage() {
            const chatInput = document.getElementById('chat-input');
            const messageText = chatInput.value.trim();

            if (messageText.length === 0) {
                return;
            }

            const activeUser = users.find(user => user.userId === activeUserId);

            const message = {
                from: activeUser.userId,
                text: messageText
            };

            activeUser.messages.push(message);

            const chatMessages = document.getElementById('chat-messages');
            const messageElement = document.createElement('div');
            messageElement.className = 'outgoing-message';
            messageElement.textContent = messageText;
            chatMessages.appendChild(messageElement);

            chatInput.value = '';
            chatInput.focus();
        }

        function initialize() {
  users.forEach(user => addUser(user));
  renderUsers(); // Call renderUsers() to initially render the users
}

        initialize();