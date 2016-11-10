# Overview

Project 1 of the course CAS FEE at HSR Rapperswil from Peter Fuerholz.

## Acknowledgement
This project was realized using different approaches so that we can later look up how you can do this in one or the
other fashion. Used "fashions":
* one layout done with floats, otherwise by means of flex
* jQuery is used but could be used more thoroughly
* two persistence technologies used:
  * NeDB (on file) / REST-service on Node.js used for saving user notes
  * LocalStorage used for saving current style setting (since we don't have a user management this is the logical way).


## Quick start
* Download / Clone this project
* Install depending libs: <tt>npm install</tt>
* start node.js (<tt>node server.js</tt>). Open browser under told URL (http://127.0.0.1:3001).


## Specific Features
* A note can be finished on the main page only. (That means the 'finished' property is set from this page, all other
  properties can be set on the edit page.
* The edited note is set by URL parameter. This has the advantage that an URL to a specific note can be saved and passed
  around (is bookmarkable). (If a note cannot be found under set URL an error message is shown.)
* Notes can be edited using Markdown. As a positive side effect we have nicely escaped unwanted tags (preventing XSS
  attacks).
* Date input fields are not (yet) widespread supported (e.g. Safari). Thus I used jQuery-UI's date picker.


## Browser support
Tested with:
* Chrome 53.0 (on Mac & Ubuntu)
* Safari 10.0 (on Mac)
* Firefox (on Ubuntu)


## License

No license applied. (Use for free!)