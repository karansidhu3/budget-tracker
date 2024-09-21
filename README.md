# 💰 Transaction Tracker

**Transaction Tracker** is a simple, intuitive application to track personal transactions and expenses. With this app, you can keep a running balance of your financial activity, add transactions with positive or negative values (income or expenses), and see your history organized by date.

![App Preview](https://your-image-url-here.com) <!-- Insert image link if you have any screenshots -->

## 🚀 Features

- **Real-time Balance**: Displays a live update of your current balance as you add or delete transactions.
- **Expense & Income Tracking**: Add both positive (income) and negative (expenses) transactions.
- **Date-based Sorting**: Automatically organizes transactions by date in ascending order.
- **Easy Deletion**: Remove transactions instantly with a click.
- **Dynamic Styling**: Positive balances are displayed in green, negative balances in red, making it easy to track your financial health at a glance.

## 🖥️ Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (via Mongoose for ORM)
- **Styling**: Custom CSS with responsive design inspired by Apple’s minimalist UI

## 🛠️ Usage

1. Add transactions by entering the amount (positive for income, negative for expenses), the name of the transaction, and the date.
2. Delete transactions by clicking the "Delete" button next to any entry.
3. The balance at the top updates dynamically based on the transactions entered.
4. Transactions are sorted by date, and a gap separates transactions from different months.


## 📸 Screenshots

1. **Home Page**  
   ![Home Page](https://your-image-url-here.com)

2. **Adding a Transaction**  
   ![Adding a Transaction](https://your-image-url-here.com)

## ⚙️ Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: [Install here](https://nodejs.org/)
- **MongoDB**: [Install MongoDB](https://www.mongodb.com/)

### Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/transaction-tracker.git
   cd transaction-tracker
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the Application

1. **Start the Backend Server:**

   Navigate to the `api` directory and start the backend:

   ```bash
   cd api
   node index.js
   ```
2. **Run the Frontend**
   ```bash
   npm start
   ```
   
