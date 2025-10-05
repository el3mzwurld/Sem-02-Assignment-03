# 🖼️ Bejamas Photo Store (React Version)

A responsive e-commerce photo gallery built with **React**, featuring filtering, pagination, and cart management. This app is a React-based conversion of a previous vanilla JavaScript implementation, with improved state management and component logic.

---

## ✅ Features

### 🛒 Cart System

- Add items to cart from product cards.
- Cart items display with name, price, and image.
- Toggle cart visibility.
- Clear entire cart with one click.

### 🔍 Product Filtering

- **Category filters:** People, Pets, Food, Cities, Landmarks, Nature, Premium.
- **Price filters:**
  - Lower than $20
  - $20–$100
  - $100–$200
  - Above $200
- **Desktop:** Filters apply instantly when checkboxes change.
- **Mobile:** Filters only apply when the **SAVE** button is clicked.
- **CLEAR** resets filters and restores all products.

### 📄 Pagination

- 6 products per page.
- Dynamic pagination buttons based on results.
- Previous/Next arrows to switch pages.

### 📱 Responsive Design

- Mobile breakpoint: `1239px`
- Filter UI adapts based on device width.

---

## 🚀 Tech Stack

| Feature     | Technology          |
| ----------- | ------------------- |
| Framework   | React (Vite or CRA) |
| Styling     | CSS                 |
| State Mgmt  | useState, useEffect |
| Data Source | `data.json`         |

---

## 📂 Project Structure

```
src/
│
├── assets/
│ ├── img/ # All images used in UI
│ └── data/
│ └── data.json # Product data
│
├── components/
│ └── Home.jsx # Main page logic and UI
│
└── assets/styles/
└── App.css # Global styles
```

# Filtering logic

```
applyfilters()
```
