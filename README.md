# tallyho
Javascript page to generate a tally marker printable page with Google fonts


This is for Tally Ho, a browser-based generator of tally marker printable sheets. 

Basically so I can print nicely formatted pages of little pictures to colour in as I complete tasks.

Yes, I have ADHD.

Yes, I did this instead of my actual todo list.

This was done with ChatGPT 4 and a lot of googling.

------------------
Next Up notes

1. Expandable tag for advanced adjustments like:
    - Margins
    - Setting font and size and alignment for title 
    - Setting font and size and alignment for footer
    - adding a border
    - repeating the title and footer on more pages (so you can print 20 sheets with different randomised)
    - changing the no. of characters in random

2. Make the font stylesheets more modular
    - You add them to the subdirectory
    - stylesheet link in the html file is automatically built
    - the drop down is automatically created from that link
    - correct dropdown name is displayed
    - if possible to auto credit the font

3. Figure out how to optimise the print space better
    - set this for A4 for now, but make it possible to plug in other measurements
    - if no title or footer, more space
    - it's dynamic so your grid will automatically resize - choose to overflow? or choose to shrink to fit?

4. Take the center output area and position it properly 
at the center
    - need to pay attention to flexible margins

5. Set up a proper config.ini file to pull out and set all the defaults cleaner
    - include some baic tweaks to the css for screen and for print so users don't have to mess with the css directly
