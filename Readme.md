# Lunarnomics: The Lunar Economy Encyclopedia

Lunarnomics is a comprehensive web-based encyclopedia dedicated to documenting the emerging lunar economy. It features a relational database structure and a user-friendly React front end, providing a platform to explore missions, companies, projects, investments, and more.

## Project Overview

* **Backend:** Django with a relational SQLite3 database. The database schema is designed to capture intricate relationships between various entities within the lunar economy.
* **Frontend:** React, designed for responsive display on both web and mobile platforms. The frontend communicates with the backend via the Django REST Framework.
* **Database:** Currently using SQLite3, with plans to migrate to a centralized RDS (Relational Database Service) upon reaching sufficient data volume.
* **Data Organization:** Information is organized using tables and relational links, ensuring data integrity and ease of navigation.

## Current Status

The project is currently in development and actively seeking contributions. The SQLite3 database, located within this repository, serves as a snapshot of the current data structure and content.

## Contribution Guidelines

We welcome contributions in the following areas:

* **Data Entry:** Adding and updating information related to lunar missions, companies, projects, investments, and technologies.
  * **Important:** Maintain relational integrity. When adding an investment related to a specific company (e.g., BluOrigin), ensure the investment is linked to that company's record in the database.
  * **References:** Always provide reliable references for any information added.
* **Code Improvements:**
  * **Backend (Django):** Suggestions and contributions to optimize database queries, improve API performance, and enhance data management are welcome.
  * **Frontend (React):** We are open to suggestions for improving the user interface, enhancing data visualization, and optimizing performance.
* **Documentation:** Improving the project's documentation, including this README file and API documentation.
* **Editor and Researcher:** People to ensure data quality and grow the data base.

## Database Structure

The database is relational, designed to link related information. Key tables include:

* `Missions`: Details on lunar missions.
* `Companies`: Information about companies involved in the lunar economy.
* `Projects`: Specific projects related to lunar development.
* `Investments`: Records of investments in lunar ventures.
* `Technologies`: Information on relevant technologies.
* `Grants`: Information of grants awarded to companies or projects.

When adding data, ensure that related information is linked appropriately. For example, an investment should be linked to the company it is related to.

## Future Plans

* Migrate to a centralized RDS database for improved scalability and performance.
* Implement advanced search and filtering capabilities.
* Develop interactive data visualizations.
* Expand the API to support more complex queries.
* Improve code optimization.

## Getting Started

1. Clone the repository: `git clone [repository URL]`
2. Set up the Django backend:
   * Navigate to the backend directory: `cd backend`
   * Create a virtual environment: `python -m venv venv` (or `python3 -m venv venv`)
   * Activate the virtual environment: `source venv/bin/activate` (or `venv\Scripts\activate` on Windows)
   * Install dependencies: `pip install -r requirements.txt`
   * Run migrations: `python manage.py migrate`
   * Run the development server: `python manage.py runserver`
3. Set up the React frontend:
   * Navigate to the frontend directory: `cd frontend`
   * Install dependencies: `npm install`
   * Start the development server: `npm start`

## Contact

For questions or contributions, please contact [Your Contact Information].
