# Sports Facility Booking Platform API

**Welcome to the powerful backend API for your Sports Facility Booking Platform!** Built with the dynamic trio of TypeScript, Express.js, and Mongoose, this API empowers both users and admins to manage sports facility bookings with ease.

## Core Functionalities

**Users:**

- **Effortless User Management** (in <span style="color: #28a745;">green</span>)
  - **Sign Up (POST /api/auth/signup):** Create a new account with your details and secure your login with hashed passwords!
  - **Login (POST /api/auth/login):** Log in with your credentials to obtain a JWT (your secure access key) for other functionalities.
- **Seamless Booking Management** (in <span style="color: #ffc107;">orange</span>)
  - **Check Availability (GET /api/check-availability):** See available time slots for booking a facility (specify a date or use today's by default).
  - **Create Booking (POST /api/bookings):** Book your chosen facility within available slots (requires JWT authentication).
  - **View Bookings by User (GET /api/bookings/user):** Keep track of all your bookings with ease (requires JWT authentication).
  - **Cancel Booking (DELETE /api/bookings/:id):** Need to reschedule? Cancel existing bookings with a click (requires JWT authentication).

**Admins** (with extra superpowers!):

- **Facility Management** (in <span style="color: #dc3545;">red</span>)
  - **Create Facility (POST /api/facility):** Add new sports facilities with details like name, description, price, and location (requires JWT authentication).
  - **Update Facility (PUT /api/facility/:id):** Update existing facility information to maintain accuracy (requires JWT authentication).
  - **Soft Delete Facility (DELETE /api/facility/:id):** Don't worry, it's not a permanent goodbye! This feature marks facilities as inactive instead of complete removal (requires JWT authentication).
  - **Get All Facilities (GET /api/facility):** Retrieve a list of all available (not soft-deleted) facilities for browsing.

## Security and Access Control

The API prioritizes security with a JWT-based authentication system. Upon login, you'll receive a JWT token that grants access to secure routes. Our vigilant authentication middleware verifies your JWT token before processing requests that require user or admin privileges.

## Handling Errors Like a Champ

The API implements comprehensive error handling to ensure a smooth user experience. Any errors will be communicated through clear JSON responses with details like error messages, status codes, and additional information for developers.

## Bonus Features: The Extra Touch

- **No Data Found:** No more confusion! If a retrieval request finds no matching data, you'll receive a specific "No Data Found" response.
- **Authentication Middleware:** This vigilant guard ensures only authorized users with valid JWT tokens can access specific routes. Unauthorized attempts are met with appropriate error messages.
- **Zod Validation:** Data integrity is key! This feature validates user input data (like booking details) to maintain consistency within the system. Validation errors return a 400 Bad Request status code with clear messages specifying the erroneous fields and reasons.

**Additional Notes:**

- Security best practices like proper password hashing and authorization checks are implemented for maximum protection (but not explicitly mentioned here for brevity).
- This readme provides a high-level overview. Dive deeper into the codebase for detailed implementation specifics.

We hope this expanded explanation clarifies the functionalities and features offered by the Sports Facility Booking Platform backend API. Feel free to explore the codebase for a deeper understanding and potential customization!
