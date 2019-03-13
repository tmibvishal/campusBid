
# campusBid
This is a IIT Bazaar portal where you can sell second hand products.

# Hosted on
https://campusbid.herokuapp.com/

# Overview
1. A NodeJs background with express middleware
2. Uses passport-local of Passport.js for authentication
3. Uses ejs for templating on the frontend.
4. Uses Mongodb Atlas for database
6. bcryptjs: For encrypting password to store in database
7. connect-flash, express-session: Flash messages are stored in a session and can be displayed to the user in some other in some other page.

# Features
1. **Registration** - For new users and
2. **Login** - For existing users
3. **User Dashboard**: User can delete the products uploaded by him
4. **Admin Dashboard**: If you are logged in as admin you can delete any product in the dashboard
5. **Search bar & category links** - They can be used to easily search the product, I also used metaphone function for better and more accurate search    **Example** You can search for Electrodinamics, Elictrodinamics, Elictrodinamiks and they all give the result that contained Electrodynamics. Currently the search is perfect for single word search because for multiword search it searches in order which is not very good.
6. **Sell** - Link to sell your products. However, if you are not logged in you will be redirected to login page
7. **Comments** You can comment on any product if you are logged in


# To deploy
There is a file name hiddenFromGit_ImpInfo.js in local machine that is not uploaded to git
File format is

	module.exports = {
	    username: "",
	    password: "",
	    encryptionKey: ""
	}

This file is not uploaded on git due to security reasons

To deploy

    $ Install Node
	$ git clone  'https://github.com/tmibvishal/campusBid''
    $ npm install
    $ npm start
    
# Some users to try
email, password  
admin@campusbid.com, admin  
vishal@gmail.com, vishal123  
piyush@gmail.com, piyush123  
user_1, pass_1  
	
Note: admin can remove any product, a normal user can only remove the product he has created

# Database Schema


**Product Schema**

| Key        | Value           |
| ------------- |:-------------:|
| productName      | ```{type: String, required: true, max: 180}``` |
| author      | ```{type: Schema.Types.ObjectId }``` |
| metaphoneName      | ```{type: String, required: true, max: 180}``` |
| price      | ```{type: Number, required: true}``` |
| sellerEmail      | ```{type: String}``` |
| sellerPhone      | ```{type: String, default: "Not Given by the User" , max: 10}``` |
| imageLink      | ```{type: String, required: true}``` |
| description      | ```{type: String, required: true}``` |
| category      | ```{type: String}``` |
| technicalDetailsKey      | ```[{type: String}]``` |
| technicalDetailsValue      | ```[{type: String}]``` |
| commentsUser      | ```[{type: String}]``` |
| commentsMessage      | ```[{type: String}]``` |
| dateAdded      | ```{ type: Date, default: Date.now }``` |

**User Schema**

| Key        | Value           |
| ------------- |:-------------:|
| name      | ```{type: String, required: true}``` |
| email      | ```{type: String, required: true}``` |
| userPhone      | ```{type: String, default: "Not Given by the User" , max: 10}``` |
| password      | ```{type: String, required: true}``` |
| date      | ```{type: Date, default: Date.now}``` |


# campusBid Screenshots

**Home Page**

![Home Page](https://i.imgur.com/D3VmqYZ.png)

**Single Product Page**

![Single Product Page](https://i.imgur.com/M8UkYw5.png)

**Searching**

*  You can use the search bar to search products by name, description, category 
*  You can filter using category bar given in the left side
* They can be used to easily search the product, I also used metaphone function for better and more accurate search    
* **Example** You can search for Electrodinamics, Elictrodinamics, Elictrodinamiks and they all give the result that contained Electrodynamics. Currently the search is perfect for single word search because for multiword search it searches in order which is not very good.

![Searching](https://i.imgur.com/7criZ2M.png)

**Registration Page**

![Registration](https://i.imgur.com/NIA4X1w.png)

**Login Page**

![Login Page](https://i.imgur.com/LN3DgYe.png)

**User Profile Page**

* Your profile page also shows items you have uploaded and you can delete the items you have uploaded
* If you have logged in as admin, then you can delete any product of any user

![User Profile Page](https://i.imgur.com/QYIAV8p.png)

**Sell a product page**

* To sell a product, you need to be logged in
* Fill the details form
* After uploading the product you will be redirected to the product page with a message that "successfully created the product" 

![sell a product](https://i.imgur.com/6Hg6TOq.png)

