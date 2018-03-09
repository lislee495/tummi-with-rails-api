# Tummi : Your stomach's best friend

## About

Tummi is a food ordering app that offers a streamlined user interface for an improved food ordering experience. Utilizing the Yelp API, it allows users to search and view food options in any vicinity. A map displays all results and updates as the user moves from one restaurant to another. Upon choosing a restaurant, users can then see its basic information, as well as a menu where they can filter out food aversions (i.e. nuts) and filter in their preferences (i.e. vegan). Users can save favorite dishes and view past orders. The app also implements a light-weight natural language processing module to sort through the user's favorites and past orders to highlight the users' preferences, which it arranges in a visual word cloud on the trends page.

## Notes 

Due to the scarcity of open-source menu information online, every restaurant uses a randomly generated basic menu of dishes, which do not reflect its real menu online. Additionally, since the app is just supposed to model the front-end user experience, its checkout button does not actually function. 

Additionally, this app uses a rails backend system, and to lessen the amount of work I had to do to transplant my Express-backend app over, I removed the features: Oauth with Google, ...

##Instructions

Download the folder from https://github.com/snickers495/tummi-with-rails-api.git and navigate to it in your terminal:
```
$ bundle install && npm install
$ rake start
```
Open localhost:3000 on browser.

##Contributors Guide

To contribute, please create an issue at https://github.com/snickers495/tummi-with-rails-api/issues.

##License

This project has been licensed under the MIT open source license. Visit it at: 
