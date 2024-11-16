# API Routes Documentation

## Assignment Routes
## Swagger Documentation At /api-docs

1. **Create a New Assignment** (POST)
   - **Endpoint**: `/api/assignment`
   - **Description**: Creates a new assignment.
   - **Middleware**: `auth.requireSignin`

2. **Get a Specific Assignment by ID** (GET)
   - **Endpoint**: `/api/assignments/:id`
   - **Description**: Retrieves an assignment by its ID.
   - **Middleware**: `auth.requireSignin`

3. **Update a Specific Assignment** (PUT)
   - **Endpoint**: `/api/assignments/:id`
   - **Description**: Updates an assignment by its ID.
   - **Middleware**: `auth.requireSignin`

4. **Delete a Specific Assignment** (DELETE)
   - **Endpoint**: `/api/assignments/:id`
   - **Description**: Deletes an assignment by its ID.
   - **Middleware**: `auth.requireSignin`

5. **Get Assignments by User** (GET)
   - **Endpoint**: `/api/assignments/user/:userId`
   - **Description**: Retrieves all assignments for a specific user.
   - **Middleware**: `auth.requireSignin`

6. **List All Assignments** (GET)
   - **Endpoint**: `/api/assignments`
   - **Description**: Lists all assignments.
   - **Middleware**: `auth.requireSignin`

## Grade Routes

1. **Create a New Grade** (POST)
   - **Endpoint**: `/api/grade`
   - **Description**: Creates a new grade.
   - **Middleware**: `auth.requireSignin`

2. **Get a Specific Grade by ID** (GET)
   - **Endpoint**: `/api/grades/:id`
   - **Description**: Retrieves a grade by its ID.
   - **Middleware**: `auth.requireSignin`

3. **Update a Specific Grade** (PUT)
   - **Endpoint**: `/api/grades/:id`
   - **Description**: Updates a grade by its ID.
   - **Middleware**: `auth.requireSignin`

4. **Delete a Specific Grade** (DELETE)
   - **Endpoint**: `/api/grades/:id`
   - **Description**: Deletes a grade by its ID.
   - **Middleware**: `auth.requireSignin`

5. **Get Grades by User** (GET)
   - **Endpoint**: `/api/grades/user/:userId`
   - **Description**: Retrieves all grades for a specific user.
   - **Middleware**: `auth.requireSignin`

6. **List All Grades** (GET)
   - **Endpoint**: `/api/grades`
   - **Description**: Lists all grades.
   - **Middleware**: `auth.requireSignin`

## Subject Routes

1. **Create a New Subject** (POST)
   - **Endpoint**: `/api/subject`
   - **Description**: Creates a new subject.
   - **Middleware**: `auth.requireSignin`

2. **Get a Specific Subject by ID** (GET)
   - **Endpoint**: `/api/subjects/:id`
   - **Description**: Retrieves a subject by its ID.
   - **Middleware**: `auth.requireSignin`

3. **Update a Specific Subject** (PUT)
   - **Endpoint**: `/api/subjects/:id`
   - **Description**: Updates a subject by its ID.
   - **Middleware**: `auth.requireSignin`

4. **Delete a Specific Subject** (DELETE)
   - **Endpoint**: `/api/subjects/:id`
   - **Description**: Deletes a subject by its ID.
   - **Middleware**: `auth.requireSignin`

5. **Get Subjects by User** (GET)
   - **Endpoint**: `/api/subjects/user/:userId`
   - **Description**: Retrieves all subjects for a specific user.
   - **Middleware**: `auth.requireSignin`

6. **List All Subjects** (GET)
   - **Endpoint**: `/api/subjects`
   - **Description**: Lists all subjects.
   - **Middleware**: `auth.requireSignin`

## User Routes

1. **Create a New User** (POST)
   - **Endpoint**: `/api/user`
   - **Description**: Creates a new user.
   - **Middleware**: None

2. **Get a Specific User by ID** (GET)
   - **Endpoint**: `/api/users/:id`
   - **Description**: Retrieves a user by their ID.
   - **Middleware**: `auth.requireSignin`

3. **Update a Specific User** (PUT)
   - **Endpoint**: `/api/users/:id`
   - **Description**: Updates a user by their ID.
   - **Middleware**: `auth.requireSignin`

4. **Delete a Specific User** (DELETE)
   - **Endpoint**: `/api/users/:id`
   - **Description**: Deletes a user by their ID.
   - **Middleware**: `auth.requireSignin`

5. **List All Users** (GET)
   - **Endpoint**: `/api/users`
   - **Description**: Lists all users.
   - **Middleware**: `auth.requireSignin`

