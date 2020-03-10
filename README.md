# Journaly

This is a hackathon submission for Hacktech 2020 (1st place in Facebook's "Best Project That Gives People A Voice" Prize!).

[Check it out on Devpost](https://devpost.com/software/journaly)

## What Is It?

Journaly is a platform where users can rate, review and support journalists. Through a chrome extension, the user can view the rating of a journalist and check out their patreon. 

## How does it work?
This chrome extension scrapes the user's web page for an article. If it finds an article, it searched for a journalist name and sends it to the Journaly server. If a match is found in the database, it sends the journalist's information (including employer, rating and the journalist's patreon) to the chrome extension.

Once the plugin recieves this information, a sidebar opens on the users browser that shows the journalist's employer, rating and patreon url. Furthermore, the plugin links to a React app that allows the user to rate the journalist and see other reviews.
