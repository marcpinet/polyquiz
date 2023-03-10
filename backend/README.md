# NodeJS Back-End Starter

## Install & Run

1) Install [NodeJS Installer](https://nodejs.org/en/download/) (you should already have NodeJS since it was a dependency of the Front-End)
2) Fork the repository and clone your new repository `git clone https://github.com/PATH_TO_YOUR_BACK_END_REPOSITORY.git`
3) install the dependencies `npm install`. If you see any vunerabilities after the installation, like `5 moderate, 1 high`, you don't need to fix them. The project will build correctly.
4) Run the application `npm run dev`

## Development

During the development process, you should use `npm run dev` to have livereload each time you modify a file in `app` folder.

## Run the linter

```
npm run lint
```
Note: The linter will be executed before each commit. If the linter fails then the commit will be canceled.

## Dependencies

The following libraries are used in this Node starter, we encourage you to have a look :
- Express (for building the http API) : https://www.npmjs.com/package/express
- Joi (for Schema validation) : https://www.npmjs.com/package/joi
