// Sends the search string entered by the user to the backend to perform a search action
function performSearch() {
    // Get the search string entered by the user
    var searchString = document.getElementById('searchInput').value;
    
    // Send the search string to Python using the output module
    google.colab.kernel.invokeFunction('notebook.receive_search_string', [searchString], {});
}

// Sends the search string entered by the user in the result screen to the backend to perform a search action
function performSearch_again() {
    var searchString = document.getElementById('searchbartext').value;
    google.colab.kernel.invokeFunction('notebook.receive_search_string', [searchString], {});
}

// Sends a request to the backend to navigate back to the home page
function backToHomePage() {
    google.colab.kernel.invokeFunction('notebook.back_to_home_page', [], {});
}

// Sends a request to the backend to navigate back to the admin page
function backToAdmin()
{
     google.colab.kernel.invokeFunction('notebook.back_to_admin', [], {});
}

// Sends a request to the backend to open the chatbot page
function openChatBot() {
    google.colab.kernel.invokeFunction('notebook.open_chatbot_page', [], {});
}

const correctPassword = "123456";

// Function to open the admin page
function openAdminPage() {
    // Ask the user for a password
    const userInput = prompt("Please enter the password:", "Enter Password");

    // Check if the user input matches the correct password
    if (userInput === correctPassword) {
        // Redirect to the admin page
        google.colab.kernel.invokeFunction('notebook.open_indexeditor_page', [], {});
    } else {
        // Show an error message if the password is incorrect
        alert("Incorrect password. Please try again.");
    }
}

// Sends the user's question to the backend to interact with the chatbot and changing the display screen
function askChatbot() {
    var question = document.getElementById('user-input-chatbot').value;
    var chatContainer = document.getElementById('chat');
    chatContainer.innerHTML += '<div><strong>User:</strong> ' + question + '</div>';
    chatContainer.innerHTML += '<br>'; 
    // Send the question to Python using output module
    google.colab.kernel.invokeFunction('notebook.receive_question_chatbot', [question], {});
}

// Appends the chatbot's response to the chat interface
function ChatbotResponse(response) {
    try {
        // Regular expression to match URLs
        var urlRegex = /(https?:\/\/[^\s]+)/g;

        // Replace URLs with clickable links
        response = response.replace(urlRegex, function(url) {
            return '<a href="' + url + '" target="_blank">' + url + '</a>';
        });

        // Append chatbot's response to the chat
        var chatContainer = document.getElementById('chat');
        chatContainer.innerHTML += '<div><strong style="color: #3498db;">Chatbot:</strong> ' + response + '</div>';
        chatContainer.innerHTML += '<br>'; 
        // Clear the user input
        document.getElementById('user-input-chatbot').value = '';

        // Scroll to the bottom of the chat
        chatContainer.scrollTop = chatContainer.scrollHeight;
    } catch (error) {
        // Handle the error
        console.error('An error occurred while appending chatbot response:', error);
        // You can add additional error handling logic here, such as logging or displaying an error message to the user.
    }
}


// Renders search results with titles and links
function renderResults_title_link(titles, links, times_appeared) {
    // Get the container where you want to append the new div elements
    var container = document.getElementById('searchresultsarea');
    
    // Display search information
    var searchInfoDiv = document.createElement('div');
    var timesAppearedInfo = document.createElement('p');
    timesAppearedInfo.innerText = `Your search appeared ${times_appeared} times in the following links`;
    var numResultsInfo = document.createElement('p');
    numResultsInfo.innerText = `Panther generated ${titles.length} results, in descending order`;
    searchInfoDiv.appendChild(timesAppearedInfo);
    searchInfoDiv.appendChild(numResultsInfo);
    container.appendChild(searchInfoDiv);

    // Check if there are no results
    if(titles.length == 0 || links.length == 0){
        var divElement = document.createElement('div');
        var h2Element = document.createElement('h2');
        h2Element.innerText = "No results found.";
        divElement.appendChild(h2Element);
        container.appendChild(divElement);
        
    }
    else{

        // Loop through titles and links arrays
        for (var i = 0; i < titles.length; i++) {
            // Create a new div element
            var divElement = document.createElement('div');
            divElement.classList.add('searchresult');
    
            // Create a new h2 element
            var h2Element = document.createElement('h2');
            h2Element.innerText = titles[i];
    
            // Create a new anchor element
            var anchorElement = document.createElement('a');
            anchorElement.href = links[i];
            anchorElement.target = "_blank";
            anchorElement.appendChild(h2Element);
    
            // Append the anchor element to the div element
            divElement.appendChild(anchorElement);
    
            // Append the div element to the container
            container.appendChild(divElement);
        }
    }
}

// Adds an event listener to the specified input element to trigger a function when the Enter key is pressed
function addSearchEventListener(inputId, func) {
    document.getElementById(inputId).addEventListener("keyup", function(event) {
      // Check if the pressed key is Enter (key code 13)
      if (event.keyCode === 13) {
        // Trigger the search function
        func();
      }
    });
  }


  addSearchEventListener("searchInput", performSearch);


  

  
