E-Commerce Backend API:-
This is a backend API for an e-commerce platform, built using Node.js, Express.js, and MongoDB. It includes features like user authentication, product management, cart functionality, order placement, and middleware for security and logging.

Features:-

User Authentication: Sign up, sign in, and password reset with hashed passwords.
Product Management: CRUD operations for products and categories.
Cart Functionality: Add/remove items and manage user carts.
Order Processing: Place orders and manage transactions.

Middleware:
JWT-based authentication for securing API endpoints.
Basic authentication for simple authorization checks.
File upload using Multer.
Logging using Winston.
Error Handling & Validations: Proper error handling for better debugging.

Installation:-
Prerequisites
Node.js (v14+ recommended)
MongoDB (local or cloud-based)
Setup Instructions

Clone the repository:

git clone https://github.com/your-repo/ecommerce-backend.git
cd ecommerce-backend

Install dependencies:

npm install

Create a .env file and add the following:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret

Start the server:

npm start

API Endpoints:-

![image](https://github.com/user-attachments/assets/427a60d3-d07e-4e82-8905-eed497ec484d)
![image](https://github.com/user-attachments/assets/aa8dbaeb-3542-45d6-a606-5116c798515f)
![image](https://github.com/user-attachments/assets/829fa96c-c81e-4029-8353-ad8f293a0761)
![image](https://github.com/user-attachments/assets/b851d42e-9054-497e-a7ec-5113f1b9b422)

Middleware:-

JWT Authentication (jwt.middleware.js): Protects routes using JWT tokens.
Basic Authentication (besicAuth.middleware.js): Simple credential check.
File Upload (fileupload.middleware.js): Handles image/file uploads.
Logger (logger.middleware.js): Logs requests to a file using Winston.

Technologies Used:-
Node.js & Express.js (Server-side framework)
MongoDB & Mongoose (Database & ORM)
JWT & bcrypt (Authentication & password hashing)
Multer (File handling)
Winston (Logging)




