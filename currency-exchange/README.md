When starting this project I set a goal to emulate the example video to perfection using react-materialize since I have used it in previous week-long projects. After a while, I realized (was reminded) that my passions do not lie in styling nor does my skill set and with that in mind I set out to complete the functionality requirements, a realm I enjoy. Additionally, I have found react-materialize documentation to be lacking and look forward to trying a different platform such as bootstrap.  

One issue that I was unable to fix is a console warning referring to controlled and uncontrolled elements in the Admin.js file. After some research, I realized the issue has to do with react-materialize Inputs having default values (making the element uncontrolled) while I wired up the Input to receive its value from the store-state (making it a controlled element). Supposedly this was resolved in a newer version of react-materialize but when I tried to update, it broke my app and I decided that was far enough down the rabbit hole for a styling issue. Please know that I am aware of the warning and consciously decided to ignore it for the sake of the rest of the app.

As far as I can see, I was able to meet all the requirements listed in the challenge details. I enjoyed the necessity for creativity in achieving many of these requirements and learned a good amount along the way. I built the app to allow growth by holding actions, APIs, components, and reducers in separate folders. I decided to do most styling inline. I often build styling objects at the bottom of each file and refer to them inline. I feel that this allows for simplicity in the number of file sizes while also allowing some clean and separate coding within the file.

I also balanced the use of redux reducers along with the local component state. If some functionality could be self-contained, I used local state. This involved validations, initializing intervals of API calls, and the timing of the last API call.

Additional points that I included:

 - I clarified through UX/UI that this app is to be used by employees by adding an amount that the company will receive/deliver based on the transaction being a buy/sell. This is clearer than a simple “total”. 
 - I added a very simple password input screen to allow access only to myself and selfDecode. Simply type in the given password and access will be given. This was a simple hack to meet the requirements for restriction. There are no hashes/auth/Oath capabilities as I wante to focus on the actual app instead of a sign-on screen
 - I added a minimum purchase of foreign currency that results in ACEO selling at least $1 to the customer. This feature could easily be added to the admin page for adjustability. I did not include it due to time constrictions as it was a last minute add/idea.
 - I disabled the “order” button until all validations are met. This allows for balances to be accurate and within restrictions.
 - I added a try/catch to the API call that delivers a message prompt on the home page if an update fails. This will allow for accurate and up-to-date rates.
 - One additional business point would be to send some sort of notification to a “balance manager” when balances reach a low status. I also think that this breakpoint could be added into the admin page for adjustability.

Finally, I wanted to ensure that I completed this project in JavaScript first and then redo it in TypeScript using the given linter requirements. I plan to do that over the next week. If you will allow a resubmission with the TypeScript files that would be great. If not, I will benefit from the gained knowledge regardless.

Thank you for the opportunity and please reach out with questions.
