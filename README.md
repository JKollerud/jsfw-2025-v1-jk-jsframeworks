# Online Shop – React & Next.js

A fully functional online shop built with Next.js, React, and TypeScript. The application fetches products from a REST API and allows users to browse products, view detailed information, search and sort products, manage a persistent shopping cart, complete a checkout flow, and send messages through a validated contact form.

The application is responsive and works across desktop, tablet, and mobile devices.

🔗 **Live demo:** [js-frameworks-online-shop.netlify.app](https://js-frameworks-online-shop.netlify.app)

---

## Features

### Product Listing

- Fetches products from the API and displays them in a responsive grid
- Each product card includes image, title, rating, price, and a discount badge showing the percentage saved

### Product Details Page

- Clicking a product navigates to a detailed page showing image, description, pricing, rating, and reviews
- Includes an Add to Cart button

### Search & Sort

- Live search with a dropdown showing matching products as you type
- Sort by price (low → high / high → low), rating, or title (A → Z)

### Shopping Cart

- Add, remove, and adjust quantities
- Product thumbnail shown for each cart item
- Per-item subtotal and running total
- Cart persists across page refreshes via localStorage
- Item count badge displayed on the cart button in the header

### Checkout Flow

- Proceed to checkout from the cart page
- Cart clears on successful checkout and a confirmation page is shown

### Contact Form

- Validated form with inline error messages
- Validation rules: Full Name (min 3 chars), Subject (min 3 chars), valid email format, Message (min 10 chars)
- Form resets and shows a success message after submission

---

## Tech Stack

| Tool                                   | Purpose                         |
| -------------------------------------- | ------------------------------- |
| [Next.js](https://nextjs.org/)         | React framework with App Router |
| TypeScript                             | Type safety                     |
| Tailwind CSS                           | Styling                         |
| React Context + useReducer             | Cart state management           |
| localStorage                           | Cart persistence                |
| [Noroff API](https://docs.noroff.dev/) | Product data                    |
| Netlify                                | Deployment                      |

---

## Project Structure

```
src/
├── app/
│   ├── cart/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── product/
│   │   └── [productId]/
│   │       └── page.tsx
│   ├── success/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AddToCartButton.tsx
│   ├── Header.tsx
│   ├── ProductBrowser.tsx
│   └── ProductCard.tsx
├── context/
│   └── CartContext.tsx
└── lib/
    ├── api.ts
    ├── types.ts
    └── utils.ts
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/JKollerud/jsfw-2025-v1-jk-jsframeworks.git
cd jsfw-2025-v1-jk-jsframeworks
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root of the project:

```bash
NEXT_PUBLIC_API_BASE_URL=https://v2.api.noroff.dev
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment

This project is deployed on Netlify. To deploy your own version:

1. Push the project to GitHub
2. Import the repo into Netlify
3. Add the environment variable `NEXT_PUBLIC_API_BASE_URL=https://v2.api.noroff.dev`
4. Deploy

---

## API

Uses the [Noroff Online Shop API](https://docs.noroff.dev/).

```
GET /online-shop          – fetch all products
GET /online-shop/<id>     – fetch a single product
```

---

## Author

**Joakim Kollerud**
Created as part of the JavaScript Frameworks course at Noroff.
