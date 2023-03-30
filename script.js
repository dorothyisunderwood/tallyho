// script.js

// This is for Tally Ho, a browser-based generator of tally marker printable sheets. 
// Basically so I can print nicely formatted pages of little pictures to colour in as I complete tasks.
// Yes, I have ADHD.
// Yes, I did this instead of my actual todo list.
// This was done with ChatGPT 4 and a lot of googling.


// TO ADD:
// Margin adjustments
// inline hidden tab for setting the title and footer font face/size
// also to put this up on github 
// check it in other browsers


// Get elements
const fontFamilyDropdown = document.getElementById("fontFamily");
const fontSizeSlider = document.getElementById("fontSize");
const fontSizeValue = document.getElementById("fontSizeValue");
// const textColor = document.getElementById("textColor");
const inputText = document.getElementById("inputText");
const randomStringBtn = document.getElementById("randomStringBtn");
const generatePdfBtn = document.getElementById("generatePdfBtn");
const textOutput = document.getElementById("textOutput");
const letterSpacingSlider = document.getElementById("letterSpacing");
const letterSpacingValue = document.getElementById("letterSpacingValue");
const lineHeightSlider = document.getElementById("lineHeight");
const lineHeightValue = document.getElementById("lineHeightValue");
const titleInput = document.getElementById("titleInput");
const dateCheckbox = document.getElementById("dateCheckbox");
const titleOutput = document.getElementById("title");
const footerOutput = document.getElementById("footer");
const repeatTextSlider = document.getElementById("repeatText");
const repeatTextValue = document.getElementById("repeatTextValue");
const printBtn = document.getElementById("printBtn");
const linkTag = document.querySelector('link[href^="https://fonts.googleapis.com/css"]');
const fontFaces = ["Arial","Courier New","Times New Roman","Verdana"];

let alphabetsOnly = false;
let lowercaseOnly = false;



// Function to create and append font face options
function createFontFaceOptions(fontFaces) {
  for (const fontFace of fontFaces) {
    const option = document.createElement("option");
    option.value = fontFace;
    option.textContent = fontFace;
    fontFamilyDropdown.appendChild(option);
  }
}

// Function to populate font faces
function populateFontFaces() {
  const linkTag = document.querySelector('link[href*="https://fonts.googleapis.com/css?family="]');
  let fontFaces = [];

  if (linkTag) {
    // Step 2: Get the href attribute value
    const hrefValue = linkTag.getAttribute('href');

    // Step 3: Extract the font names from the href string
    const fontNames = hrefValue.match(/family=([^&]+)/)[1].split('|');

    // Step 4: Create an array of font names
    fontFaces = fontNames.map(fontName => fontName.replace(/\+/g, ' ')).sort();
  } else {
    console.error('Google Fonts link tag not found');
    fontFaces = ["Arial", "Courier New", "Times New Roman", "Verdana"];
  }

  createFontFaceOptions(fontFaces);
}

// Call populateFontFaces function to populate the dropdown
populateFontFaces();



// Function to update text output styles
function updateTextOutputStyles() {
	textOutput.style.fontSize = `${fontSizeSlider.value}px`;
	// textOutput.style.color = textColor.value;
	textOutput.style.fontFamily = fontFamilyDropdown.value;
	textOutput.style.letterSpacing = `${letterSpacingSlider.value}px`;
	textOutput.style.lineHeight = `${lineHeightSlider.value}px`;
  	
	// these are the size markers on the HTML page
	fontSizeValue.textContent = fontSizeSlider.value;
	letterSpacingValue.textContent = letterSpacingSlider.value;	
	lineHeightValue.textContent = lineHeightSlider.value;
}


// Adding the Title and Footer to the output
titleInput.addEventListener("input", () => {
  titleOutput.textContent = titleInput.value;
});

dateCheckbox.addEventListener("change", () => {
  if (dateCheckbox.checked) {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString(undefined, options);
    footerOutput.textContent = formattedDate;
  } else {
    footerOutput.textContent = "";
  }
});



// EVENT LISTENERS

// Add event listeners to input fields
fontFamilyDropdown.addEventListener("input", updateTextOutputStyles);
fontSizeSlider.addEventListener("input", updateTextOutputStyles);
//  textColor.addEventListener("input", updateTextOutputStyles);
letterSpacingSlider.addEventListener("input", updateTextOutputStyles);
lineHeightSlider.addEventListener("input", updateTextOutputStyles);

// Print button
printBtn.addEventListener("click", printOutputArea);

// Add event listener to random string button
randomStringBtn.addEventListener("click", () => {
  inputText.value = generateRandomString(100, alphabetsOnly, lowercaseOnly); // Generate a random string of length 100
  textOutput.textContent = inputText.value;
});

// Add event listener to text input
inputText.addEventListener("input", () => {
  textOutput.textContent = inputText.value;
    repeatTextValue.textContent = repeatTextSlider.value;
  updateRepeatedText();
});


// Repeat the text
repeatTextSlider.addEventListener("input", () => {
  repeatTextValue.textContent = repeatTextSlider.value;
  updateRepeatedText();
});


dateCheckbox.addEventListener("change", () => {
  if (dateCheckbox.checked) {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString(undefined, options);
    footerOutput.textContent = formattedDate;
  } else {
    footerOutput.textContent = "";
  }
});


// Update the checkbox values
document.getElementById("alphabetsOnly").addEventListener("change", function (event) {
  // Update the value of alphabetsOnly based on the checked state of the checkbox
  alphabetsOnly = event.target.checked;
});

document.getElementById("lowercaseOnly").addEventListener("change", function (event) {
  // Update the value of alphabetsOnly based on the checked state of the checkbox
  lowercaseOnly = event.target.checked;
});



// USEFUL FUNCTIONS


// Function to generate a random string
function generateRandomString(length, alphabetsOnly, lowercaseOnly) {
  console.log("Alphabetsonly is: " + alphabetsOnly + " Lowercaseonly is: " +lowercaseOnly)
  const alphaCharactersLower = "abcdefghijklmnopqrstuvwxyz";
  const alphaCharactersUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numericCharacters = "0123456789";
  const characters = alphabetsOnly ? (lowercaseOnly ? alphaCharactersLower : alphaCharactersLower + alphaCharactersUpper)
                    : (lowercaseOnly ? alphaCharactersLower + numericCharacters: alphaCharactersLower + alphaCharactersLower + alphaCharactersUpper + numericCharacters);

  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}







// Function to repeat the entered text
function updateRepeatedText() {
  const repeatCount = parseInt(repeatTextSlider.value);
  const originalText = inputText.value;
  let repeatedText = "";

  for (let i = 0; i < repeatCount; i++) {
    repeatedText += originalText;
  }

  textOutput.textContent = repeatedText;
}



// Print outputArea only
function printOutputArea() {
  // Create a new window
  const titleInput = document.getElementById("titleInput").value; 
  const printWindow = window.open("", "_blank");

  // Set the new window's title
  if (titleInput) {
    printWindow.document.title = titleInput + " (Tally Ho Printable)";
  } else {
    printWindow.document.title = "Tally Ho Printable";
  }

  // Get the outputArea content and styles
  const outputArea = document.getElementById("outputArea").cloneNode(true);

  // Get the base URL of the original page
  const baseURL = document.location.href.substring(0, document.location.href.lastIndexOf('/') + 1);

  // Create a new link tag for the styles.css file
  const linkTag = document.createElement("link");
  linkTag.href = baseURL + "print.css";
  linkTag.rel = "stylesheet";
  linkTag.type = "text/css";

  // Append the necessary elements to the new window
  printWindow.document.head.appendChild(linkTag);
  printWindow.document.body.appendChild(outputArea);

  // Invoke the print function and close the window after printing
  printWindow.print();
  printWindow.addEventListener("afterprint", () => {
    printWindow.close();
  });
}



