# Jobify
This project was done under the guidance of John Smilga with the intention of getting exposure to Full-Stack development . In this I basically built a web app where one has to register on the server by giving their details, after which they can add/modify/delete job applications so as to track these applications in a convenient way. I have also deployed this web app using heroku. <br><br>
<b>Deployed version </b> - https://jobify-deployed.herokuapp.com/

## Dependencies used

   * [Mongoose](https://mongoosejs.com/docs/)
   * [MongoDB](https://www.mongodb.com/)
   * [Express](http://expressjs.com/)
   * [React](http://www.passportjs.org/docs/)
   * [NodeJs](https://nodejs.org/en/docs/)
 
## Usage

In order to run the website locally on your computer , follow the steps given below:

* Clone this github repo.
* Open the terminal and change the directory to the downloaded folder then run the command 

```sh
 npm run install-dependencies
```

* The above command will install all the required packages and dependencies required for the project 

* Rename .env.temp to .env
* Setup values for - MONGO_URL, JWT_SECRET, JWT_LIFETIME

* The final step is to run the following command

```sh
 npm start

 ```
 `Visit http://localhost:3000`


## Welcome page

![Welcome](https://user-images.githubusercontent.com/62882829/185743298-52fa3161-3860-4331-9e26-ffc1f82e46d8.jpg)


## Login/Register page

*You have to first register on this site to access the resources.*

![Login/Register](https://user-images.githubusercontent.com/62882829/185743335-912b4df1-e64a-4543-80fd-bfaa10810823.jpg)


## Stats

*Here you will be able to see a summary of the stages of your applications. 
You will also be able to see your weekly applications in a charted manner.*

![Stats](https://user-images.githubusercontent.com/62882829/185743489-c3da04a4-acf6-4064-ba4f-0f66293463cc.jpg)

![Weekly Applications](https://user-images.githubusercontent.com/62882829/185743498-27c31332-6580-4af2-8bb7-8f311c4c6b9a.jpg)


## Search for Jobs

*You can search for job/jobs using the search bar
Jobs will be displayed on your search , which you can modify/delete.*

![Search](https://user-images.githubusercontent.com/62882829/185743585-f4bbf493-5eff-48ed-960a-362d3999eca4.jpg)

![Jobs](https://user-images.githubusercontent.com/62882829/185743595-53c922f0-28b1-40fe-a9b7-0491f7a3fab5.jpg)


## Add Job
*You can add a new job application from here.*
![Add Job](https://user-images.githubusercontent.com/62882829/185743640-9389dcde-cba4-46c8-8f8f-829b4146c6b3.jpg)


## Edit Profile

*Your profile details will be displayed which you can edit.* 

![Profile](https://user-images.githubusercontent.com/62882829/185743684-5746df61-ff2d-47e5-9b70-95b99d6819d3.jpg)

