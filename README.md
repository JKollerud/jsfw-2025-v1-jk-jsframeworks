# Online Shop – React & Next.js

This project is a fully functional online shop built with Next.js (React) and TypeScript. The application fetches products from a REST API and allows users to browse products, view detailed information, search and sort products, manage a shopping cart, complete a checkout flow, and send messages through a validated contact form.

The application is responsive and works across desktop, tablet, and mobile devices.

## Features

### Product Listing

- Fetches products from the API endpoint:

```bash
GET /online-shop
```

- Displays products in a responsive grid layout.

- Each product card includes:
  - Product image
  - Title
  - Rating
  - Price
  - Discounted price (if available)
  - Discount badge showing percentage.

### Product Details Page

- Clicking a product navigates to a detailed product page.

- Fetches data from:

```bash
GET /online-shop/<id>
```

- Displays:
  - Product image
  - Title
  - Description
  - Original price and discounted price
  - Rating
  - Reviews
  - Includes an Add to Cart button.

### Search Functionality

- Users can search for products from the homepage.

- Matching products appear dynamically in a dropdown list.

- Clicking a search result navigates directly to the product page.

### Sorting

- Products can be sorted by:
  - Price (low → high)
  - Price (high → low)
  - Rating
  - Title

### Shopping Cart

- The cart system allows users to:
  - Add products to the cart
  - View cart item count in the header
  - Adjust product quantities
  - Remove items from the cart
  - See the total cost update dynamically.

### Checkout Flow

- Users can proceed to checkout from the cart page.

- After checkout:
  - A success page is shown
  - The cart is cleared.

### Contact Form

The contact page includes a validated form built with TypeScript.

- Validation rules:
  - Full Name – minimum 3 characters
  - Subject – minimum 3 characters
  - Email – must be a valid email format
  - Message – minimum 10 characters

- Features:
  - Inline validation error messages
  - Form reset after successful submission
  - Success message displayed after submission.

### Tech Stack

- Framework: Next.js (React)
- Language: TypeScript
- Styling: Tailwind CSS
- State Management: React Context API
- API: Noroff Online Shop API
- Deployment: Vercel

### Project Structure

```bash
src
 ├── app
 │   ├── product
 │   │   └── [productId]
 │   │       └── page.tsx
 │   ├── cart
 │   ├── checkout
 │   ├── contact
 │   ├── layout.tsx
 │   └── page.tsx
 │
 ├── components
 │   ├── Header.tsx
 │   ├── ProductCard.tsx
 │   └── SearchBar.tsx
 │
 ├── context
 │   └── CartContext.tsx
 │
 ├── lib
 │   ├── api.ts
 │   ├── types.ts
 │   └── utils.ts
```

### Getting Started

1. Clone the repo

```bash
git clone <your-repository-url>
cd project-name
```

2. Install dependencies

```bash
npm install
```

3. Environment Variables

Create a `.env.local` file in the root of the project based on the provided `.env.example` file.

This project uses the Noroff v2 API.

```bash
NEXT_PUBLIC_API_BASE_URL=https://v2.api.noroff.dev
```

4. Run the development server

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

### Deployment

The project can be deployed using Vercel.

Steps:

1. Push the project to GitHub.
2. Import the repo into Vercel.
3. Add the environment variable:

```bash
NEXT_PUBLIC_API_BASE_URL=https://v2.api.noroff.dev
```

4. Deploy.

### API

This project uses the Noroff Online Shop API.

Endpoints used:

```bash
GET /online-shop
GET /online-shop/<id>
```

Documentation:

[f.dev/](https://docs.noroff.dev/)

### Author

Created as part of the JavaScript Frameworks course assignment.

Student: Joakim Kollerud
