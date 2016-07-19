# Meganote

A note taking app with a bunch of features and no problems.Instead of errors, Meganote has only unintuitive features.Meganote is exploring a new fronter in web development.

Nothing has ever been or will ever be as incredible.

**NOTE:** The [backend](https://github.com/Alex-Aralis/week6-meganote-server) must be running somewhere for this app to be functional.

> *This site was built in the [Xtern Bootcamp](http://bootcamp16.getfretless.com) from the meganote project created by [Davey](https://github.com/dstrus)* 

## Stuff used

- [Angular 1.x](https://angularjs.org/)
- [UI Router](https://github.com/angular-ui/ui-router)
- [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/README.md)

## Get up and running

- clone the repo with `git clone <this repo url>`
- cd into the new folder
- do an `npm start` which will install all the dependancies and starts the server running on localhost:8080
- your done!

## Deployment

Do an `npm install`.

Run `npm start` so that the build system can transpile the code into bundle.js.

take the stuff in the app/ dir in your servers root directory.

## Configuration

### Changing the port

The port can be changed by editing the http-server call in the package.json file.

```shell
http-server -p PORT_NUMBER
```


