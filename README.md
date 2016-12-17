# The MEAN Seed

The MEAN Seed provides you with a full stack development toolkit.
MEAN is a collection of JavaScript-based technologies:
 — MongoDB
 — Express.js
 — AngularJS
 — Node.js
These technologies is used to develop web applications. From the client and server sides to databases.

See the seed in action go to the website:
http://securemeanseed-vilstrup.rhcloud.com

## How to run the application
If you have not installed git, npm and note.js, then install them:
```sh
    sudo apt-get update
    sudo apt-get install git
    sudo apt-get install npm
    sudo apt-get install nodejs
```



Clone the program from github
```sh
    git clone `<url>`
```


Then install dependencies
```sh
    npm install
```


Now you can run the program
```sh
    npm start
```



You can verify that the application is runne by pointing you browser to this location:

http://127.0.0.1:3000/  or   http://localhost:3000/


## Setting up ports IP addresses and database
This seed uses the 'cloud-env' package, to ease the setup of Port, IP and databse adresses.
cloud-env provides a vendor-neutral interface for autoconfiguring your server, allowing it to run on a variety of cloud hosting platforms.
It works by checking the system environment (process.env) for known configuration strings (published by OpenShift, Heroku Modulus), normalizing the results into a well-defined list.

locate and open the file:
>   config/config.js

You can change the local port number and ip addess here:
```javascript
    var port = configCloudEnv.get('PORT', 3000);
    var ip = configCloudEnv.get('IP','127.0.0.1');
```


And you can change the name of the local database here:
```javascript
    var localDataBase =  '/security_seed_1';
```



## Testing the servers signup, login (authenticate)

Open up postman, HttpRequester or another program to handle the testing of the RESTfull API of the server.

#### Test if it is possible to sign up:
Post the json object to this address
http://localhost:3000/signup
```javascript
{
	"userName": "test5",
	"password": "test5"
}
```

If Successful you get the following json object back
```javascript
{
    "success": true,
    "msg": "Successful created new user."
}
```


#### Test if it is possible to signin:
Post the json object to this address
http://localhost:3000/signin
```javascript
{
	"userName": "test5",
	"password": "test5"
}
```

If Successful you get the following json back with a web-token
```javascript
{
    "token": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ5b3Vyc2l0ZS5uZXQiLCJpc3MiOiJ5b3VyY29tcGFueUBzb21ld2hlcmUuY29tIiwiaWF0IjoxNDgxMzc3OTM2LjQ5NCwiZXhwIjoxNDgxMzc5MTM2LjQ5NCwic3ViIjoidGVzdDUifQ.OTMqb7YhXtjY7Itj4irYIgm1_BYfWzr7m06QXBRPdTQ"
}
```

#### Test to see if authentications is working
If using HttpRequester then do the following:
* Click on the tab "Headers"
* From the drop-down list "Name:" chose "Authorization"
* Copy the token "JWT eyJ ..." into the text feild "Value:" and press Add

And make a get request to this address
http://localhost:3000/api/users

![Alt text](HttpRequester_authorization.png "picture of HttpRequester")


#### Configuration of web-token for authentication

locate and open the file:
> config/config.js

locate the code snippet:
```javascript
jwtConfig : {
        secret: "ChangMeToARealSecretOurIWillBeHacked",
        tokenExpirationTime : 60*20, //seconds
        audience: "yoursite.net",
        issuer: "yourcompany@somewhere.com"
    }
```

You should change the values of the jwtConfig object. for example change
the secret and the tokenExpirationTime.
you can read more about the Payload(Claims) on the website below: 


https://www.toptal.com/web/cookie-free-authentication-with-json-web-tokens-an-example-in-laravel-and-angularjs


#### How to secure a part of a web-site
locate and open the file:
> server.js

locate the two pieces of code:

```javascript
    var authenticate = require("./app/routes/authenticate.server.route");
    var user = require('./app/routes/user.server.route.js');
    var routes = require('./app/routes/index');
```
First: we have to import the modules (see code snippet above)
Then: we registrer the modules as middleware (see code snippet below)

```javascript
    app.use('/', authenticate);
    app.use('/api', user);
    app.use('/', routes);
```

note, when a module is prefixed with the URI path '/api' then this 
module is protected and any attempt to go to any path inside this/these 
modules needs authentication.




## Best practice
Follow the link below to read more about best practice to gain performance
> https://expressjs.com/en/advanced/best-practice-performance.html

Follow the link below to read more about best practice of getting secure
>https://expressjs.com/en/advanced/best-practice-security.html

#### More on best practice 

Ensure your dependencies are secure

Using npm to manage your application’s dependencies is powerful and 
convenient. But the packages that you use may contain critical security 
vulnerabilities that could also affect your application. The security of 
your app is only as strong as the “weakest link” in your dependencies.

Use either or both of the following two tools to help ensure the security 
of third-party packages that you use: nsp and requireSafe. These two tools 
do largely the same thing.

nsp is a command-line tool that checks the Node Security Project 
vulnerability database to determine if your application uses packages 
with known vulnerabilities. Install it as follows:

```sh
    npm install nsp -g
```


Use this command to submit the npm-shrinkwrap.json / package.json files for validation to nodesecurity.io:

```sh
    nsp check
```


Here’s how to use requireSafe to audit your Node modules:

```sh
    npm install -g requiresafe
    cd your-app
    requiresafe check
```




#### More on securety


##### Helmet
How it works

Helmet is a collection of 11 smaller middleware functions that set HTTP
headers. Running app.use(helmet()) will not include all of these
middleware functions by default.

```
    Default?                        Module
                 contentSecurityPolicy for setting Content Security Policy 	
    ✓           dnsPrefetchControl controls browser DNS prefetching
    ✓           frameguard to prevent clickjacking 
    ✓           hidePoweredBy to remove the X-Powered-By header
                hpkp for HTTP Public Key Pinning 	
    ✓           hsts for HTTP Strict Transport Security
    ✓           ieNoOpen sets X-Download-Options for IE8+
                noCache to disable client-side caching 	
    ✓           noSniff to keep clients from sniffing the MIME type
                 referrerPolicy to hide the Referer header 	
    ✓           xssFilter adds some small XSS protections
```



You can see more in the documentation.

##### Openshift's certificate and https

Openshifts free certificate, read more on there website:
https://developers.openshift.com/faq/troubleshooting.html#_how_do_i_redirect_traffic_to_https


locate and open the file:
> server.js

```javascript
app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] == 'http') {
    res.redirect('https://' + req.headers.host + req.path);
  } else {
    return next();
  }
});
```




## Deploy

Go to Openshift and create a new gear with:
```sh
    node
    mongoDB
```



In this example  we will let OPENSHIFT create the
infrastructure for a Node application and then commit and push our code 
to the repository provided by OPENSHIFT.
When the application has been created, OPENSHIFT provides you with a URL
which you can use to clone the "start code" for the demo-page OPENSHIFT 
has created (we will just delete this code).

```sh
    git clone ssh://585320382d527143f4000030@securemeanseed-vilstrup.rhcloud.com/~/git/securemeanseed.git/
    cd securemeanseed/
```


Delete all files except (see below)
```sh
    .git
    .openshift
```


Now copy ALL files/folders from your express project into this folder and do:

```sh
    Git add .
    Git commit -m "initial commit"
    Git push
```



#### Pushing to Multiple Remotes
Here we will see how you can push to two different remote repositories, 
where of one them could be openshift and the other github.

Because openshift is already added, we just need to add github to the
remote repository config file (.git/config)

Create a github repository on github and then do:

```sh
    git remote add <shortname> <repository url>
```


Where `<repository url>` is equal to the newly created repository on github
and `<shortname>` is an alias for the remote repository

Here is an example of how it should look:
```sh
    git remote add github https://github.com/YourName/applicationName.git
```


Now you can push your local repository (code) to github:
```sh
    git push github master
```


If you want to set github as your default repository so you only need to
write "git push/pull" for version control, then

```sh
    git branch --set-upstream-to github/master
```


Now you can push code to github by writing:
```sh
    git push
```


And deploy code to openshift by writing:
```sh
    git push origin master
```



#### Some useful git commands

```sh
    git remote -v

    git remote show origin
    git remote show github
```
























