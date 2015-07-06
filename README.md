#Performance Profile:#

[https://agile-harbor-2021.herokuapp.com/](https://agile-harbor-2021.herokuapp.com/)

##Typical Coding Style:##
The project is typical of a routine project for me in many ways. The project features:

- HTML5/SCSS/JS
- Node.js as a web server
- Grunt as the process runner
- Build process featuring automatic compilation of SCSS as well as concatenation and minification of all JS/CSS
- Inline commenting in JSDoc compilable format
- Unit testing with Mocha/Chai
- GZIP compression of server responses

If this project were to be deployed in a real world setting I would want to address certain bottlenecks associated with it.

##Bottlenecks:##

######SCSS/CSS######
***************
- I make use of Bootstrap for some quick and easy style rules. 
If this were going to be deployed the necessary classes could be extracted to the client.scss 
file and the Bootstrap file deleted. This would reduce the disk storage space, bandwidth, and number of server connections 
required to serve the page. The last two benefits, especially number of server connections, would serve to improve the user's experience.

- Although the effects would be extremely negligible, the use of SCSS could be done away with as well. This would have the effect 
of improving the speed of the build process and reducing the number of files in the repository.

######JS######
***************
-Within the client/js/client.js file multiple functions concatenate an html string to inject search results or error messages 
as appropriate. Performance could be improved by abstracting these strings out to a template that could be read, cached and 
reused as needed by the application.

- Improvements could be made to the Node server to improve browser performance, such as adding far future expiry headers to allow 
for better caching of page elements.

- Several Node modules are used by the server for convenience. In a real world scenario packages like Restify and the Twitter Node 
Client offer more features than are actually needed for the application to perform properly. The use of these packages 
could be re-worked so as to only pull in those portions of code that are absolute essential, reducing the disk space usage 
while increasing the speed ar which the server operates.

######HTML######
***************
- The client/index.html file could be minified upon build time by the Grunt process runner to reduce server disk space usage as 
well as bandwidth needed for transmission, thus increasing transmission speed.

######Files######
***************
- For the purposes of this demo I've included compiled files such as client/css/styles.min.css that would normally not 
be present in the code repository
