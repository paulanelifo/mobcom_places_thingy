// globals
let lastButton = null; // To track the last button pressed

// Sample data for establishments with their distances (in km)
const establishments = [
  { name: 'Fast Food 1', distance: 5 },
  { name: 'Fast Food 2', distance: 46 },
  { name: 'Fast Food 3', distance: 85 },
  { name: 'Fast Food 4', distance: 95 },
  { name: 'Bank 1', distance: 35 },
  { name: 'Bank 2', distance: 85 },
  { name: 'Mall 1', distance: 24 },
  { name: 'Mall 2', distance: 72 },
  { name: 'Police Station 1', distance: 15 },
  { name: 'Police Station 2', distance: 57 },
  { name: 'Church', distance: 50 }
];

// Function to toggle button active state
function toggleButtonActive(buttons) {
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      // If the clicked button is already active, deactivate it
      if (this === lastButton) {
        this.classList.remove('active');
        lastButton = null; // Reset lastButton
      } else {
        // If there was a previously clicked button, remove the active state
        if (lastButton) {
          lastButton.classList.remove('active');
        }
        // Add the active state to the clicked button
        this.classList.add('active');
        // Update lastButton to be the current button
        lastButton = this;

        // Call displayResults with the selected destination
        displayResults(this.innerText);
      }
    });
  });
}

// Function to display results
function displayResults(destination) {
    const output = document.querySelector('.group3 h1');
    const sliderValue = parseFloat(document.getElementById("myRange").value); // Get the slider value
  
    // Filter the establishments based on the selected destination
    const filteredEstablishments = establishments.filter(est => est.name.toLowerCase().includes(destination.toLowerCase()));
  
    if (filteredEstablishments.length > 0) {
      // Find the establishment closest to the slider value
      const nearest = filteredEstablishments.reduce((prev, curr) => {
        // Check if current establishment is closer to the slider value than the previous one
        return Math.abs(curr.distance - sliderValue) < Math.abs(prev.distance - sliderValue) ? curr : prev;
      });
  
      // Calculate the distance from the user to the nearest establishment
      const distanceFromUser = Math.abs(nearest.distance - sliderValue);
  
      // Display the results
      output.innerHTML = `Nearest establishment: ${nearest.name}<br>Distance: ${nearest.distance} km<br>You are ${distanceFromUser} km away from this destination.`;
    } else {
      output.innerHTML = 'No establishments found for this destination.';
    }
  }
  

// Instantiations
const buttons = document.querySelectorAll('.loc-button');
toggleButtonActive(buttons);

const slider = document.getElementById("myRange");
const sliderValue = document.getElementById("sliderValue");
const locationInput = document.getElementById("location"); // Get the location input field

// Slider functionality
slider.oninput = function() {
  sliderValue.innerHTML = this.value; // Display the slider value
  locationInput.value = this.value; // Synchronize slider value with the text field
  // Optionally, you can trigger the displayResults function on slider change
  if (lastButton) {
    displayResults(lastButton.innerText); // Display results based on the last active button
  }
};

// Text field functionality
locationInput.addEventListener('input', function() {
  const value = parseFloat(this.value); // Get the value from the text field
  if (!isNaN(value)) {
    slider.value = value; // Set the slider value
    sliderValue.innerHTML = value; // Update displayed slider value
    // Optionally, you can trigger the displayResults function when typing in the text field
    if (lastButton) {
      displayResults(lastButton.innerText); // Display results based on the last active button
    }
  }
});

const refreshButton = document.getElementById("refresh-button"); // Assuming you have an ID for the refresh button
refreshButton.addEventListener('click', function() {
  // Reset the slider value
  slider.value = 0; // or set it to whatever your default value is
  sliderValue.innerHTML = slider.value; // Update displayed slider value

  // Clear the text field
  const textField = document.getElementById("location"); // Replace with your actual text field ID
  textField.value = '';
  const textField2 = document.getElementById("destination-txt"); // Replace with your actual text field ID
  textField2.value = '';

  // Remove active class from the last active button
  if (lastButton) {
    lastButton.classList.remove('active');
    lastButton = null; // Reset lastButton
  }

  // Clear displayed results
  const output = document.querySelector('.group3 h1');
  output.innerHTML = 'Select a destination to see results.';
});

const findButton = document.getElementById("find-button"); // Assuming you have an ID for the find button
findButton.addEventListener('click', function() {
  // Check if a button was last clicked
  if (lastButton) {
    // Trigger the display results function with the last button's text
    displayResults(lastButton.innerText);
  }
});
// Function to activate the button based on key press
function activateButtonByKey(event) {
    const key = event.key.toUpperCase(); // Get the key pressed and convert to uppercase
    const buttonMap = {
      'A': document.getElementById('ps-button'), // Police Station
      'B': document.getElementById('ff-button'), // Fast Food
      'C': document.getElementById('mall-button'), // Mall
      'D': document.getElementById('bank-button'), // Bank
      'E': document.getElementById('church-button') // Church
    };
  
    if (buttonMap[key]) {
      // Simulate a click on the corresponding button
      buttonMap[key].click();
    }
  }
  
  // Add event listener for keydown
  document.addEventListener('keydown', activateButtonByKey);
  