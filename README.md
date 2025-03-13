# Meal Planning & Delivery Web Application - Backend

## Overview

This is the **backend service** for the Meal Planning & Delivery Web Application. It manages authentication, meal orders, user roles, and CRUD operations for customers and meal providers using **MongoDB, Node.js, and Express.js**.

## Tech Stack

- **Node.js** (Backend runtime)
- **Express.js** (Web framework for APIs)
- **MongoDB** (Database for storing users, meals, and orders)
- **JWT** (Authentication token system)
- **bcrypt** (Password hashing for security)

## Database Collections (MongoDB)

### 1. Users Collection

Stores user credentials and roles for authentication and authorization.

- **Fields:** `name`, `email`, `phone number`, `password (hashed)`, `role (customer or meal provider)`.

### 2. Orders Collection

Tracks all meal orders placed by customers.

- **Fields:** `meal selection`, `dietary preferences`, `customer ID`, `status (pending, in progress, delivered)`.

### 3. Meal Providers Collection

Stores meal provider profiles that customers can browse.

- **Fields:** `cuisine specialties`, `available meal options`, `pricing`, `experience`, `customer reviews`.

## Authentication

- Uses **JWT (JSON Web Tokens)** for session handling.
- Implements **bcrypt** for password hashing.
- Custom **middleware for protected routes** to ensure that only authorized users (customers and meal providers) access their respective dashboards.

## API Endpoints

### **For Customers:**

- `POST /customers/order` - Create a new meal order.
- `GET /customers/orders` - Retrieve all orders placed by the customer.
- `PUT /customers/profile` - Update customer profile.

### **For Meal Providers:**

- `POST /providers/menu` - Create or update meal menu.
- `GET /providers/orders` - Retrieve all customer orders.
- `PUT /providers/response` - Respond to customer orders.

## Installation & Setup

1. **Clone the Repository:**

2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Set Up Environment Variables:**
   Create a `.env` file and define the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. **Run the Server:**
   ```bash
   npm start
   ```
