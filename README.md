# vcda_poc
## Initial Post:

Virtual College Directory Application Proof of Concept (take 2)

This is a redeployment of this repo https://github.com/johnonymous86/Virtual_College_Directory_Application_poc

Issues with a possibly corrupted pages publication were easier to fix by redeploying the code to a new repo and intiating a pages publiction that way.

This app is purely HTML with a few small instances of inline javascript to keep the search function clean and responsive. The purpose of this app is as a proof of concept to show that a basic search function, if segregated by topic, can be useful as a building directory. A simplistic and intuitive design can be expanded from the current architecture to include a search function that can search based on topic tags and allows users to type search terms. 

The next step in developing this application would involve a more robust search functionality with greater specification and more values. Styling and design needs to be created and added in a way that will benefit the intentionally simple layout. An inputable search function will need to be implimented to allow users to type in search words.

## Update 9/14:

Initial HTML only set up for authentication was successful. Implimented JS logic and created very basic authentication loop that occurs in-browser (obviously, this is about as secure as putting a piece of scotch tape on the gate to a lion's cage). Exploring more robust security options means looking at user persistance via a backend database solution. A free solution that offers a relational Postgres database for yet-to-be-developed directory data storage is [Supabase](https://supabase.com/). I am currently only exploring this solution as a authentication structure but the utility of directory data storage makes it an attractive option.

Also, I have decided to change the name of the application to

# Campus Compass!

![Campus Compass](assets/Campus_Compass%20(6).png)

## Update 9/19

Successfully connected with Supabase and created user persistance. Still working on making the dashboard secure, which involves coding a seperate JS file for the logic that occurs once the user passes credentials and that page loads. Running into some difficulty with async function but basic user authentication now occurs with Supabase, not in browser and the data is persistant, so I'll take success where I can get it. 

## Update 10/12

Major changes in the approach to interacting with map content. Previously, my approach was to create static URLs for each iteration of the map (i.e., if you are looking for Office 100, you click on that link and the server shows /office-100, a unique document/page associated only with that URL). This seemed like a wildly inefficient way to approach the mapping. Some consideration was given to integrating GIS data but this proved to be outside the scope of the project. 

[Additional research](https://community.adobe.com/questions-621/responsive-image-map-not-working-642544) pointed towards image mapping with hot spots [W3Schools Image Map breakdown](https://www.w3schools.com/html/html_images_imagemap.asp). Using a combination of HTML and JS, I can code buttons for each location in an area. Placing the image inside an HTML container allows the location of pixels to be mapped like coordinates on a map. The buttons are populated with data from the Supabase DB which corresponds to a specific x and y location on the jpeg, so that pressing the button indicates a corresponding x & y coordinate. 

The full map piece works but more detailing has to be put into the configuration as right now, the coordinates are just random points on the container. Still, a small but significant success.