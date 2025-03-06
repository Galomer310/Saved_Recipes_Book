
# 📖 Saved Recipes Book App

## 🍽️ About the Project
The **Saved Recipes Book App** is a **full-stack web application** that allows users to **save, edit, and manage their favorite recipes** online. Users can **sign up, log in, add new recipes, update them, delete them, and view all saved recipes** anytime.

## 🚀 Features
✅ **User Authentication** – Register and log in securely  
✅ **Add Recipes** – Save new recipes with ingredients and instructions  
✅ **Edit Recipes** – Update saved recipes anytime  
✅ **Delete Recipes** – Remove recipes from your collection  
✅ **View Saved Recipes** – Access all your saved recipes in one place  
✅ **Responsive Design** – Works on desktop, tablet, and mobile  
✅ **Secure API** – Protected routes with JWT authentication  

## 🛠️ Technologies Used
### **Frontend**
- React
- TypeScript
- React Router
- Fetch API
- CSS (Custom Styling)

### **Backend**
- Node.js
- Express.js
- PostgreSQL (NeonDB)
- JWT (JSON Web Token) Authentication
- bcrypt.js (Password Hashing)

## 🔧 Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/recipe-book-app.git
cd recipe-book-app
```

### **2️⃣ Install Dependencies**
#### **Frontend**
```sh
cd frontend
npm install
npm run dev
```

#### **Backend**
```sh
cd backend
npm install
npm run dev
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file inside the `backend/` folder with the following content:

```env
PORT=3000
DATABASE_URL=your_postgresql_database_url
JWT_SECRET=your_secret_key
```

## 📌 Usage
1. **Register an account** or **log in**.
2. **Add new recipes** by filling in the title, ingredients, and instructions.
3. **View saved recipes** in your account.
4. **Edit** or **delete recipes** as needed.

## 📡 API Endpoints
| Method | Endpoint | Description | Authentication |
|--------|---------|-------------|---------------|
| **POST** | `/auth/register` | Register a new user | No |
| **POST** | `/auth/login` | Login and receive JWT token | No |
| **POST** | `/recipes` | Save a new recipe | ✅ |
| **GET** | `/recipes` | Get all saved recipes for the logged-in user | ✅ |
| **PUT** | `/recipes/:id` | Update an existing recipe | ✅ |
| **DELETE** | `/recipes/:id` | Delete a recipe | ✅ |

🔒 **Authentication Required** (`✅`): Must include `Authorization: Bearer <token>` in request headers.

## 🤝 Contributing
Contributions are welcome! If you'd like to contribute:
1. **Fork the repository**
2. **Create a new branch** (`git checkout -b feature-name`)
3. **Make your changes**
4. **Commit your changes** (`git commit -m "Added new feature"`)
5. **Push to your branch** (`git push origin feature-name`)
6. **Open a Pull Request**

## 📜 License
This project is **open-source** and available under the **MIT License**.
