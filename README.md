# fairdata-ui
Common Fairdata service UI components and style guidelines which can be shared by all Fairdata service implementations.

Online documentation can be found [here](https://cscfi.github.io/fairdata-ui/).


## Development

If you want to customize the styles, it can be done by using a development server with Gulp.js and Browsersync. Development server provides this documentation page, where all the components are present. Gulp automatically compiles the SCSS, injects styles and hot reloads documentation page when changes detected. Gulp provides also a task to build and copy necessary files for production use.

Start customizing the styles with:

### Docker
If you have Docker installed you can just build the image and start local development server by executing the script `run-docker` which executes the following commands:

    docker build -t fairdata-ui .
    docker run -v "$(pwd)":/code --name fairdata-ui --rm fairdata-ui npm install
    docker run -d -p 3000:3000 -v "$(pwd)":/code --name fairdata-ui --rm fairdata-ui
          
Now you should have the documentation running on http://localhost:3000

With Docker you can create the bundled css by (when development server is running) by executing the script `run-css-build` which executes the following command:

    docker run -v "$(pwd)":/code  --rm fairdata-ui npm run build          

### Without Docker

Development workflow requires nodejs (v12 or later) and npm to be installed on your development machine. Install requirements and start local development server by:

    npm install
    npm start
    Now you should have the documentation running on http://localhost:3000

A compiled version of styles can be done with npm run build.