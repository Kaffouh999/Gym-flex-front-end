# GymFlex Front-End

GymFlex is an Angular and PrimeNG-based application designed for gym management, focusing on client and equipment handling.

## Quick Links

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
    - [Prerequisites](#prerequisites)
    - [Installation Steps](#installation-steps)
- [How to Use](#how-to-use)
- [Testing](#testing)
- [Future Plans](#future-plans)
- [Credits](#credits)
- [Learn More](#learn-more)

## Features

- Intuitive management of gym clients and equipment
- Full CRUD capabilities for client and equipment data
- Advanced search and filtering
- Responsive layout for various devices

## Tech Stack

- **Frontend**: Angular 15, PrimeNG 15, HTML5, CSS3, TypeScript
- **Server**: Nginx
- **Testing**: Cypress

## Setup

#### Prerequisites

- Node.js
- Nginx

#### Installation Steps

1. Clone the repo:
```bash
   git clone https://github.com/Kaffouh999/Gym-flex-front-end.git
 ```
2. Navigate to the project directory: 
```bash
cd gymflex
```
3. Install dependencies: 
```bash
npm install
```
4. Configure API and Nginx URLs in `src/environments/environment.ts`
```typescript
  API_URL: 'http://localhost:8081',
  NGINX_URL: 'http://localhost:5051'
```
5. Launch the development server: 
```bash
ng serve
```
6. Visit [http://localhost:4200](http://localhost:4200) in your browser

## How to Use

- Register new gym clients
- Add and manage gym equipment
- View and update client and equipment details
- Search and filter clients and equipment based on specific criteria

## Testing

GymFlex includes unit tests to ensure code quality and functionality. To run the tests, use the following command:

```
ng test
```


## Future Plans

- Development of a mobile app for client workout tracking.



## Credits

Special thanks to our contributors:

- Youssef ZAHI (@YoussefZahi)
- Othman KAFFOUH (@Kaffouh999)

## Learn More

For more about GymFlex and our team, visit our [website](https://your-website-url.com).
