##Project name: BlockEd

##Description: It is an educational app where teachers and students can collaborate by teaching and maintaining the course profile. 

##Installation:
 - git clone <repo-url>
 - switch to branch : **updated-dev**
 - npm install
 - npm run-android

##Contribution of work for Sprint#1:
Since the work is divided into Sprint based ecosystem. Currently in Sprint#1 there are around 10 screens that are completed and functioning properly. You can test those screens by following the user stories present on project google sheets doc.

The following functionality is implemented so far : 

 - **Screen#1** : User can select between signup or login then the selected option will immediately be saved in redux store under the **generalReducer** state.

 - **Screen#2** : User can select between teacher or student account type then the selected option will immediately be saved in redux store under the **generalReducer** state.

 - **Screen#3** : Since in our application, user have to login with google classroom first so in this screen user is restricted to select Login In with google option and the functionality is working properly and the data fetched from google after successful login is saving in the redux state as well for future use.

 - **Screen#4** : In this screen only facebook login and google login functionalities are working as mention in sprint - 1 user stories written in google sheet docs of the project.

 - **Screen#5A** : After successful login from user then navigated from screen#4 to this screen for taking input for registering the user. The basic fields like first name, last name, email address will already be filled **automatically** from the data received from google login we did on screen#3. After filling all the fields and hit submit the user account is then created and receive a verification code on the provided email. Which we are going to use in screen#5B.

 - **Screen#5B** : The otp code we get from email after going through screen5#A. Take it and input it in this screen and hit verify. If the code is correct the user account will be then verified and the user will be navigated according to it's account type. If the user is of type **Student** then he/she will be navigated to screen#5C. If the user is of type **Teacher** teh he/she will be navigated to screen#5D.

 - **Screen#6** : This screen comes when the user selects Signin option from **screen#1** and everytime the user wants to signin. He/She have to verify it's account by the same OTP code process.The user have to enter the mobile number with which he/she creates the account. Then if the entered number matches the record in database it will then send the OTP code on the email associated with that number and navigated the user Screen5#B.

 - **Screen#7A** : On this screen the Logout function is currently workin. This is out of context of sprint#1 but I added it so that user can easily test again the process of the previous screens.

NOTE : screen#0 the splash screen is currently disabled due to the reason that it caused build errors which are unresolved yet. But on the debug build it is working properly if and only if you uncomments the **line#24 of MainActivity.java**.# BlockEd_BitcoinApp
