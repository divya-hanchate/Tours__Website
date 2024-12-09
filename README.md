# Tours__Website
 Tours Website

Introduction
	
This website represents the backend logic for a Tour Booking Application, enabling users to explore, book, and manage their tour plans. It leverages modern web development practices to integrate a secure payment system and streamline tour booking processes. Key features include Stripe Payment Integration, a robust RESTful API, and error handling to provide a seamless user experience.

Built with Node.js and Express.js, Mongodb, Pug and other third partyAPI’s  it follows a Model-View-Controller (MVC) architecture. The goal is to provide an organized and scalable structure for managing tours, users, reviews, and related functionalities.

Tour Management:
•	Features:
o	View available tours, including their name, description, duration, price, and cover image.
o	Manage tour-related details for the admin (e.g., create, update, delete tours).
•	Endpoints:
o	GET /api/v1/tours – Retrieve all tours.
o	GET /api/v1/tours/:id – Retrieve specific tour details.
o	POST /api/v1/tours – Create a new tour (Admin only).
o	PATCH /api/v1/tours/:id – Update tour information (Admin only).
o	DELETE /api/v1/tours/:id – Remove a tour (Admin only).
•	Key Models:
o	Tour:
	name: String (Name of the tour).
	price: Number (Cost of the tour).
	duration: Number (Duration in days).
	summary: String (Brief description).
	imageCover: String (Cover image URL).
	

2. User Management:

•	Features:
o	User registration and authentication using JWT.
o	Role-based access control (e.g., Admin, User).
o	User profile management.

•	Endpoints:
o	POST /api/v1/users/signup – Register a new user.
o	POST /api/v1/users/login – Authenticate a user and generate a JWT.
o	GET /api/v1/users/me – Retrieve current user’s profile.
o	PATCH /api/v1/users/updateMe – Update user profile details.
o	DELETE /api/v1/users/deleteMe – Mark user for deletion.
o	
•	Key Models:
o	User:
	name: String (User's full name).
	email: String (Unique user email).
	role: String (Default: user, e.g., Admin, Guide).
	password: String (Encrypted password using bcrypt).


3. Booking Management:

•	Features:
o	Book tours and process payments using Stripe.
o	View a user’s booking history.
o	Admin can manage all bookings (view, create, delete).

•	Endpoints:
o	POST /api/v1/bookings/checkout-session/:tourId – Create a checkout session for a tour booking.
o	GET /api/v1/bookings – Retrieve all bookings (Admin only).
o	POST /api/v1/bookings – Create a booking (Admin only).
o	DELETE /api/v1/bookings/:id – Cancel a booking (Admin only).


•	Key Models:
o	Booking:
	user: Reference (User who booked the tour).
	tour: Reference (Tour being booked).
	price: Number (Total price of the booking).
	createdAt: Date (Timestamp of booking creation).

Workflow Example:
1.	Tour Discovery:
o	Users browse available tours and select one for booking.
2.	User Authentication:
o	Users log in or sign up to access booking functionality.
3.	Booking a Tour:
o	Users select a tour, initiate a checkout session, and complete payment via Stripe.
4.	Admin Controls:
o	Admins can manage users, tours, and bookings to ensure smooth operations.

Modules and Tools Used

•	Mongoose: For MongoDB interaction.
•	Multer & Sharp: For image upload and processing.
•	Sendgrid , Mailtrap  : For real time Email communication
•	Custom Utilities: Includes catchAsync for error handling and AppError for consistent error responses.
•	Node.js Core Features: Leverages express for routing and middleware.
