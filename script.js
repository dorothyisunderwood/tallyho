// script.js

// This is for Tally Ho, a browser-based generator of tally marker printable sheets. 
// Basically so I can print nicely formatted pages of little pictures to colour in as I complete tasks.
// Yes, I have ADHD.
// Yes, I did this instead of my actual todo list.
// This was done with ChatGPT 4 and a lot of googling.


// TO ADD:
// Margin adjustments
// center printed block
// random gen text - remove numbers, or all caps, all lowercase
// tighten up the first page ux spacing a lot in left column
// make print button bigger
// show date checkbox align
// estimate printed area and do a little warning? alert? when too big to print - best would be to have a coloured background for printable area. 
// inline hidden tab for setting the title and footer font face/size
// also to put this up on github 
// how do i make it a working webpage on oggham.com?
// check it in other browsers
// what about the fonts? google fonts might work for widgets

// Get elements
const fontFamilyDropdown = document.getElementById("fontFamily");
const fontSizeSlider = document.getElementById("fontSize");
const fontSizeValue = document.getElementById("fontSizeValue");
const textColor = document.getElementById("textColor");
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

// Font faces array
const fontFaces = [
  "Arial",
  "Jenny Doodles",
  "Welcome Home",
  "Botani",
  "Cats and Dogs",
  "Verdana",
  "Times New Roman",
  "Courier New",
];

// Function to update text output styles
function updateTextOutputStyles() {
	textOutput.style.fontSize = `${fontSizeSlider.value}px`;
	textOutput.style.color = textColor.value;
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
textColor.addEventListener("input", updateTextOutputStyles);
letterSpacingSlider.addEventListener("input", updateTextOutputStyles);
lineHeightSlider.addEventListener("input", updateTextOutputStyles);

// Print button
printBtn.addEventListener("click", printOutputArea);

// Add event listener to random string button
randomStringBtn.addEventListener("click", () => {
  inputText.value = generateRandomString(100); // Generate a random string of length 100
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


// USEFUL FUNCTIONS

// Function to generate a random string
function generateRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}


// Function to create and append font face options
function createFontFaceOptions() {
  for (const fontFace of fontFaces) {
    const option = document.createElement("option");
    option.value = fontFace;
    option.textContent = fontFace;

    // Set Arial as the default selected font
    if (fontFace === "Arial") {
      option.selected = true;
    }

    fontFamilyDropdown.appendChild(option);
  }
}

// Call createFontFaceOptions function to populate the dropdown
createFontFaceOptions();


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
  // XXX pass the title over for the window with prefix of Print: , else Print Tally Ho
  const printWindow = window.open("", "_blank");

  // Get the outputArea content and styles
  const outputArea = document.getElementById("outputArea").cloneNode(true);
  const styles = `
    /* Add your styles.css content here */

 /* Output Area and Text Output Styling */
#outputArea {
  background-color: #FFFFFF;
  padding: 10px;
  display: block;
}

#textOutput {
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* Output Title and Footer Styling */
.textOutputTitle,
.textOutputFooter {
  font-family: Verdana, sans-serif;
  text-align: center;
}

.textOutputTitle {
	font-size: 48px;
}

.textOutputFooter {
  font-size: 36px;
}

 @media print {
      @page {
        size: auto;
		margin-top: 0;
		margin-bottom: 0;
		margin-right: 30px;
		margin-left: 34px;
        }
    }
    
  `;

  // Create a new style tag
  const styleTag = document.createElement("style");
  styleTag.innerHTML = styles;

  // Append the necessary elements to the new window
  printWindow.document.head.appendChild(styleTag);
  printWindow.document.body.appendChild(outputArea);

  // Invoke the print function and close the window after printing
  printWindow.print();
  printWindow.addEventListener("afterprint", () => {
    printWindow.close();
  });
}

