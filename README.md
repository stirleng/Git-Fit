# Git-Fit

1. About
---------------------------------------------
GitFit is a website where users can create accounts and generate 
workouts and meal plans for themselves. Generally, the site
will tell the user about how many calories per day to eat to
attain a certain weight loss gal. As such, if the user follows
the generated plans, they can genuinely see change over time.

Users are able to upload workouts and meals
into the Firebase database, where they are stored.

Users are also able to generate these uploaded as well as
initially generated workouts and meals.

The site tracks users' protein intake as well as days since 
starting, and days where workouts were completed so as to 
calculate rates of following through with recommendations.

2. Requirements for running on a local machine
-----------------------------------------------
Ideally should be run on Visual Studio Code

Must have Node.JS cmd.exe terminal installed. Download from
https://nodejs.org/en/download/
Once installed, npm commands must be activated if not already active
Test as follows:
    If the terminal command npm -v yields an error, access This PC's
    environmental variable PATH and add a new path:
        C:\Program Files\nodejs\npm
    Once this is done, restart VSCode

3. **Build Instructions**
    1. Git Clone the repo into a directory
    2. Open the command line
    3. Navigate to the directory on the command line (e.g., cd C:\Users\joe\Git-Fit)
    4. On the command line, type and enter "npm install"
    5. Type and enter "npm install firebase"
    6. Type and enter "npm install @mui/material@5.4.3 @mui/icons-material@5.4.2"
    7. Type and enter "npm install react-router-dom@6"
    8. Type and enter "npm install axios cheerio"
    9. Type and enter "npm install --save geofire-common"
    10. Type and enter: "npm start"
