# What did I implement?

## Back End End

- GET (subtasks) :id/subtasks
- DELETE (task) :id
- Added Decorators and validators to create-task.dto.ts
- Created SubtaskResponseDto to resolve circular referencing issue with subtasks
- TaskResponseDto to transform the task data and resolve circular referencing issue
- Added transformers to Task Entity to transform data
- Used TaskResponseDto to transform data in create and findAll service function
- Added delete service function
- Added findSubtasks service function

## Front End

- Tailwind
- AddInput to be used to add a task and subtask
- Button component
- CloseButton component
- AddSubtask component, uses AddInput component
- removeTask added to context provider

# What would I improve?

## Frontend:

- Nextjs
  - SSR
    - SSR pages and components
    - Static page generation
    - Access to data server side
  - Routing
    - File System routing
    - In built routing
  - API routes
    - Middleware for authentication
  - In built components
    - Link
    - Image
  - File based layouts
- Design overhaul
  - Designer to create designs
  - Implement with company logos and colours
- SWR
  - Implement SWR as data fetching library to handle fetching and mutation of data
  - Takes advantage of optimistic updates, meaning the user wont need to wait to see the UI update.
- Providers
  - Move the providers to the index.tsx file
  - Have a providers component, the providers can become hard to read and maintain, using a single component for providers could mitigate this.
- Component library or equivalent
  - Shadcn is my preferred choice
    - Why? Its not a traditional component library, you don’t have to import the whole library into your application, instead you use a script which creates the component and you can modify the component as you need
  - Toast notifications to confirm whether a task/subtask was successfully created or deleted
  - Confirmation modal, when deleting a task
- Stop using axios
  - Because Nextjs has in built caching with the fetch api, I would stop using axios.
  - Create a helper function to use the fetch api
- Accessibility
  - Make the application accessible using tabs,
  - Add event listener to use Enter button when adding a task/subtask
  - Add roles to html elements
  - When elements are active or focus, five them a clear border or outline
- Input validation
  - Add validation to inputs to handle empty strings and very long titles
  - I recommend React-hook-form library
- Lazy load subtasks (using new :id/subtasks route)
  - Possibly add a 'get subtasks' button instead of getting all tasks and subtasks when the page loads
- Dark mode (nice to have)

## Backend

- Have a table for tasks and table for subtasks
  - If tasks and subtasks become vastly different, it will get harder to maintain
- Have a tasks module and a subtasks module
  - If tasks and subtasks become vastly different, it will get harder to maintain
- Use a persistent database such as postgres
- Tokens
- API and security middleware
  - Add CORS configuration for security
  - Implement request rate limiting to prevent abuse
- API Documentation
  - Swagger
  - Include proper API documentation with examples and response schemas
- Performance
  - Add caching
- Error Handling and Logging:
  - Implement a global exception filter for consistent error responses
  - Add proper logging with different log levels (error, warn, info, debug)
  - Consider using a logging service for production
- Configuration Management:
  - Use .env files for environment variables
- Input Validation and Sanitization:
  - Add proper type checking and interfaces
- Development Experience:
  - Add API versioning support

## General

- Testing
  - Add testing suite, I recommend Jest
  - Add manual and automatic testing
- Typescript paths
  - Makes import and exporting much easier
