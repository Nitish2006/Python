# Flask Framework Series: Introduction Notes

## 1. What is Flask?
*   A complete web framework created with Python programming language.
*   Primarily used to develop end-to-end web applications.

## 2. Why is Flask Used?
*   **Deployment of ML Models:** Essential for showcasing Machine Learning (ML) models and creating user-facing web applications for them.
*   **Interactive Applications:** Allows for the creation of web forms and interfaces where user inputs can interact with ML models to generate responses.
*   **Relevance for Data Scientists/ML Engineers:** Crucial for professionals in these fields to deploy their models as accessible web applications.

## 3. Key Components of Flask:

### a. WSGI (Web Server Gateway Interface)
*   **Definition:** A standard protocol that facilitates communication between a web server and a web application.
*   **Purpose:**
    *   Handles incoming user requests (e.g., for a homepage, API endpoint). These requests first arrive at the web server where the Flask application is deployed.
    *   WSGI acts as a bridge, redirecting the request from the web server to the appropriate part of the web application.
    *   It also manages sending the processed response back from the web application to the web server, and subsequently to the end-user.
*   **Analogy:** It's the "language" or "protocol" that enables the web server to "talk" to the web application effectively.
*   **Examples of Web Servers (where Flask apps can be deployed):** AWS EC2, Azure App Service, Apache, IIS (for C# .NET applications), Google Cloud Platform (GCP).

### b. Jinja2 (Template Engine)
*   **Definition:** A powerful web template engine integrated within Flask.
*   **Purpose:**
    *   Combines a web template (which defines the layout and structure of a web page) with a data source.
    *   Enables the dynamic loading and rendering of web pages by injecting data fetched from various sources into the template.
*   **Examples of Data Sources:**
    *   SQL Databases (e.g., PostgreSQL, MySQL)
    *   CSV files
    *   ML Models (e.g., to display classification results like "cat" or "dog" based on an image input)
    *   NoSQL Databases (e.g., MongoDB)
*   **Mechanism:** Data retrieved from the specified source is seamlessly integrated into the web template, resulting in a dynamically generated web page.
*   **Practical Applications:**
    *   Displaying the output of an ML model directly on a webpage (e.g., showing "cat" after an image classification).
    *   Populating user-specific information on a page after successful login authentication, with data pulled from a database.
*   **Outcome:** The primary goal and benefit of Jinja2 is the creation of **dynamic web pages**.

## 4. Other Web Frameworks Mentioned (for context):
*   Django
*   FastAPI
*   Streamlit

## Summary of Flask's Core Functionality:
*   **Communication:** Utilizes WSGI to manage the interaction and data flow between the web server and the Flask web application, driven by user requests.
*   **Dynamic Content:** Employs the Jinja2 template engine to merge web page layouts with various data sources, thereby facilitating the creation of interactive and dynamic web pages.

