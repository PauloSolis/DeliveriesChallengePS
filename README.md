assumptions:

- The files have one address/driver per line
- The files are in English
- The whitespaces are missed when evaluating the lenght between addresses and drivers
- There are not whitespace at the beginning/end of the entry
  

Approach:
- My first step was to divide the problem in pieces, I identified the easiest one, which were the conditions of the vowels and consonants. Later was the condition for adding the 50% bonus.
- I created the models and created some dummy objects with the objective of testing what I had done.
- Once the SS conditions were done, what I have to do was coupling the info I needed to have all the possible combinations for each address and driver. Save the highest one if it was not repeated. It is not the most optimal solution but it works.
- At the end, when I already had the data coupling what I needed to do was the file reading.


<h1>Run </h1>
- You just need to fill the files "addresses.txt" and "drivers.txt" with data, ONE PER LINE.
- If you are running the files in replit, just click the run button or run the next command: node --enable-source-maps .build/index.js

<h3>If you are using a local environment:</h3>
- Have git installed, if you dont have it here is the installer: https://git-scm.com/downloads
-Visit github https://github.com/PauloSolis/DeliveriesChallengePS
- Download or clone the repo
- Have node 10.16.0 installed, here is a link with the installation process: https://nodejs.org/en/blog/release/v10.16.0/
-Open the project
-Run the command: npm i
- You just need to fill the files "addresses.txt" and "drivers.txt" with data, ONE PER LINE.
-Run the command: command: node --enable-source-maps .build/index.js
