function performSearch() {
    var searchString = document.getElementById('searchInput').value;
    //window.location.assign("results.html");
    // Send the search string to Python using output module
    google.colab.kernel.invokeFunction('notebook.receive_search_string', [searchString], {});

}

function performSearch_again() {
    var searchString = document.getElementById('searchbartext').value;
    google.colab.kernel.invokeFunction('notebook.receive_search_string', [searchString], {});
}

function backToHomePage() {
    google.colab.kernel.invokeFunction('notebook.back_to_home_page', [], {});
}

function backToAdmin()
{
     google.colab.kernel.invokeFunction('notebook.back_to_admin', [], {});
}

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

function askChatbot() {
    var question = document.getElementById('user-input-chatbot').value;
    var chatContainer = document.getElementById('chat');
    chatContainer.innerHTML += '<div><strong>User:</strong> ' + question + '</div>';
    // Send the question to Python using output module
    google.colab.kernel.invokeFunction('notebook.receive_question_chatbot', [question], {});
}
    
function ChatbotResponse(response) {
    
    // Append chatbot's response to the chat
    var chatContainer = document.getElementById('chat');
    chatContainer.innerHTML += '<div><strong style="color: blue;">Chatbot:</strong> ' + response + '</div>';
    
    // Clear the user input
    document.getElementById('user-input-chatbot').value = '';

    // Scroll to the bottom of the chat
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function renderResults_title_link(titles, links, times_appeared) {
    // Get the container where you want to append the new div elements
    var container = document.getElementById('searchresultsarea');
    
    // Display search information
    var searchInfoDiv = document.createElement('div');
    var timesAppearedInfo = document.createElement('p');
    timesAppearedInfo.innerText = `Your search appeared ${times_appeared} times in the following links`;
    var numResultsInfo = document.createElement('p');
    numResultsInfo.innerText = `About ${titles.length} results`;
    searchInfoDiv.appendChild(timesAppearedInfo);
    searchInfoDiv.appendChild(numResultsInfo);
    container.appendChild(searchInfoDiv);
    
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


  

  