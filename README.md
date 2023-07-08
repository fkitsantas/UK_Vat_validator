# UK VAT Validator App (Django/ React.JS/ Tailwind.CSS)

![UK VAT Validator Screenshot](https://i.imgur.com/tTqfz8d.png) 

## Table of Contents
- [About The Project](#about-the-project)
- [Technical Stack](#technical-stack)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [License](#license)


## About The Project

The UK VAT Validator is a tool designed for the validation of UK VAT numbers. The application is engineered with a backend powered by Django API, a frontend developed using React, and is aesthetically enhanced with Tailwind CSS for a modern and user-friendly interface. You can use it for both individual and business VAT Numbers, and it can pull in extensive business data directly from the UK's HMRC API.

## Technical Stack

This application is built using the following technologies:

- **Backend**: Django API, a high-level Python web framework that encourages rapid development and clean, pragmatic design.
- **Frontend**: React, a JavaScript library for building user interfaces.
- **Styling**: Tailwind CSS, a highly customizable, utility-first CSS framework for modern UI design.

## Features

- The application can validate VAT numbers for both individuals and businesses, ensuring the numbers are in the correct format and are valid according to the UK's HMRC standards.
- The application integrates with the HMRC API to fetch comprehensive business data, providing users with accurate and up-to-date information.

![UK VAT Validator Screenshot in action](https://i.imgur.com/mspZsDH.png) 

## Getting Started

### Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- npm 6 or higher

### Backend Setup

1. Navigate to the backend directory of the project.
2. Create a virtual environment: `python3 -m venv env`
3. Activate the virtual environment: `source env/bin/activate` (on Windows use `env\Scripts\activate`)
4. Install the required packages: `pip install -r requirements.txt`
5. Run the migrations: `python manage.py migrate`
6. Start the server: `python manage.py runserver`

### Frontend Setup

1. Navigate to the frontend directory of the project.
2. Install the required packages: `npm install @testing-library/jest-dom @testing-library/react @testing-library/user-event autoprefixer axios postcss react react-dom react-scripts tailwindcss web-vitals`
3. Start the server: `npm start`

## License

Distributed under the GPL-3.0 License. See `LICENSE` for more information.
