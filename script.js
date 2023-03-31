// script.js


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
const fontFacesCustom = [];

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
  console.log("5. finish");
}


// Function to populate fontFacesCustom with the custom fonts on the server
function loadCustomFonts() {
  const fontLinks = document.querySelectorAll('link[href*="webfonts/"]');
  let fontFacesCustom = [];

  fontLinks.forEach(link => {
    const href = link.getAttribute('href');
    const fontPath = href.match(/webfonts\/([^/]+)/);
    if (fontPath) {
      fontFacesCustom.push(fontPath[1]);
    }
  });
  console.log("2. Custom: " + fontFacesCustom);
  return fontFacesCustom;
}


// Function to populate fontfaces for Google Fonts
function loadGoogleFonts() {
  const linkTag = document.querySelector('link[href*="https://fonts.googleapis.com/css?family="]');
  let fontFacesGoogle = [];

  if (linkTag) {
    const hrefValue = linkTag.getAttribute('href');
    const fontNames = hrefValue.match(/family=([^&]+)/)[1].split('|');
    fontFacesGoogle = fontNames.map(fontName => fontName.replace(/\+/g, ' ')).sort();
  } else {
    console.error('Google Fonts link tag not found');
  }
  console.log("3 google fonts");
  return fontFacesGoogle;
}

// Function to load fonts, merge and sort arrays
function loadFonts() {
  console.log("1 load fonts");
  const fontFacesCustom = loadCustomFonts();
  const fontFacesGoogle = loadGoogleFonts();
  const mergedFontFaces = [...fontFaces, ...fontFacesCustom, ...fontFacesGoogle].sort((a, b) => {
    return a.localeCompare(b, undefined, {sensitivity: 'base'});
  });
  console.log("4.");
  createFontFaceOptions(mergedFontFaces);
}


// Call loadFonts to load custom and Google fonts, merge, sort and create options
loadFonts();



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
  console.log("roll da dice baby!");
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


  // Create a new link tag for the print.css file
  const baseURL = document.location.href.substring(0, document.location.href.lastIndexOf('/') + 1);
  const linkTagPrint = document.createElement("link");
  linkTagPrint.href = baseURL + "print.css";
  linkTagPrint.rel = "stylesheet";
  linkTagPrint.type = "text/css";

  
  // Get all the other font stylesheets to pass to print (id="passToPrint")
  const allCssStylesheetsLinks = document.getElementsByClassName("passToPrint");


  // looping through each stylesheet
  // and checking if there is href property in each item
  for (let i = 0; i < allCssStylesheetsLinks.length; i++) {
    if (allCssStylesheetsLinks[i].href) {

      // Build the new linkTagPrint to send over
      const linkTagPrintFont = document.createElement("link");
      linkTagPrintFont.href = allCssStylesheetsLinks[i].href
      linkTagPrintFont.rel = "stylesheet";
      linkTagPrintFont.type = "text/css";
    
      // Append it to the new window
      printWindow.document.head.appendChild(linkTagPrintFont);

    }
  }

  // Append the other elements to the new window
  printWindow.document.head.appendChild(linkTagPrint);
  printWindow.document.body.appendChild(outputArea);

  // Invoke the print function and close the window after printing
  printWindow.print();
  printWindow.addEventListener("afterprint", () => {
    printWindow.close();
  });


}
