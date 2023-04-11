# YoutubeTest
Beginning of ReliefApplication training module

# Goal of application
The goal of this application is to permit to watch not embedded youtube videos thanks to a custom fullstack web application.
This application will allow to : 
    - watch a youtube videos
    - access the history of the last 10 watched videos (+ access videos through this history)
    - add a video to favourites (bookmarks)
    - view and access videos through bookmarks
    - delete a bookmark

# Technologies used
The technology used for the frontend of the application is Angular while the backend is managed thanks to a NodeJs servor.
The database is a PostGreSQL one.
Additionnaly to classic Angular module (router, httpclient, browser...), we use bootstrap for cosmetics and YoutubePlayerModule to play not embedded youtube videos.

# Deployment guide
In order to locally deploy this application to a computer, it is needed to follow these steps : 

To realize once : 
1. Clone this project wherever you want.
2. Use the code given in "DataBase.txt" file in order to create a postgreSQL database corresponding to the app needs.
3. On folder "NodeJs", open "server.js" file. On line 6, change "var conString = 'postgres://admin:admin@localhost:5432/YoutubeTest';" to "var conString = 'postgres://theOwnerLoginOfTheDatabaseJustCreated:theOwnerLoginOfTheDatabaseJustCreated@localhost:thePortOfTheDatabaseJustCreated/theNameOfTheDatabaseJustCreated';
4. Save the changes made.
5. Make sure Node and Angular are well installed on your device

To launch the application : 
1. Open a first terminal. Go to "NodeJs" folder. Use the command line "npm start".
2. Open a second terminal. Go to "AngularYoutube" folder. Use the command line "ng serve". 
3. Open your browser and navigate to "http://localhost:4200/".

To launch the application (after production) : 
1. Open a first terminal. Go to "NodeJs" folder. Use the command line "npm start".
2. Open a second terminal. Go to "AngularYoutube" folder. Use the command line "ng build --configuration production". 
3. Use a module in order to serve the "dist" folder created and see the app in production mode (I use angular-http-server).

It should be working.
