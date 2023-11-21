# Project3Stocks
[Presentation Slides](https://docs.google.com/presentation/d/1A818NLMImudR8h7sSqX60PtevVP6c-6bEWukqI5gGsk/edit#slide=id.p)

# Project Setup Instructions

Follow these steps to set up and run the project:

## Cloning the GitHub Repository

1. Clone the GitHub repository to your local machine.

## Setting Up the Development Environment

### Windows Users

2. Open the Command Prompt.
3. Navigate to the cloned repository's directory:
4. Set the environment variable for development:
    Execute: set FLASK_ENV=development
5. Run the Flask application:
    Execute: flask run
- You should see output indicating success:
  ```
  * Serving Flask app 'flask_app.py'
  * Debug mode: off
  WARNING: This is a development server. Do not use it in a production deployment.
  Use a production WSGI server instead.
  * Running on http://127.0.0.1:5000
  Press CTRL+C to quit
  ```

### macOS/Linux Users

2. Open Terminal.
3. Navigate to the cloned repository's directory:
4. Set the environment variable for development:
    Execute: export FLASK_ENV=development
5. Run the Flask application:
    Execute: flask run
- Look for the success output similar to Windows users.

## Setting Up Visual Studio Code

6. Open Visual Studio Code.
7. Install the Live Server extension (if not already installed).
8. Open the `index.html` file from the cloned repository in Visual Studio Code.
9. Launch the file with Live Server:
- Right-click within the code and select "Open with Live Server".
- Or use the keyboard shortcut: `Alt + L` followed by `Alt + O`.

By following these steps, you should have the development environment set up and the project running on your local machine.

