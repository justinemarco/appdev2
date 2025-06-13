# Render URL:
https://simple-book-api-7z19.onrender.com

# How to use the Simple Book AP!:

1. Test the API using Postman or any HTTP client. Ensure that you include the correct Authorization header -- Bearer Token for protected routes.
2. To test Authentication Routes:
    # Sign Up : create a new user account
        POST /api/auth/signup 
        Body (JSON):
            {
                "username": "yourusername",
                "email": "youremail@example.com",
                "password": "yourpassword"
            }
    # Sign In : authenticates the user and returns a JWT token. Use the JWT Token in the Authorization header for book-related routes.
        POST /api/auth/signin
        Body (JSON):
            {
                "email": "youremail@example.com",
                "password": "yourpassword"
            }
3. To test Book Routes:
    # Get All Books
        GET /api/books
    # Create a Book
        POST /api/books
        Body (JSON):
            {
                "title": "Book Title",
                "author": "Author Name",
                "year": any_year
            }
    # Update a Book
        PUT /api/books/:id
        Body (JSON):
            {
                "title": "Updated Title",
                "author": "Updated Author",
                "year": any_year
            }
    # Delete a Book
        DELETE /api/books/:id

# All data (users and books) are stored and retrieved in real-time from your MongoDB Atlas cloud database.