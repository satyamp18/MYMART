# 📚 Library Management System

A robust, console-based library management system built with Java that provides a comprehensive solution for library resource management, featuring distinct interfaces for administrators and users.

![Library Management](https://img.shields.io/badge/Project-Library%20Management-blue)
![Java](https://img.shields.io/badge/Language-Java-orange)
![Version](https://img.shields.io/badge/Version-1.0-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🌟 Key Features

### 👨‍💼 Administrator Features
- **Book Management**
  - Add new books with detailed information
  - Track book inventory
  - Monitor book availability
- **User Management**
  - View all registered users
  - Track user activities
  - Manage user permissions

### 👥 User Features
- **Book Access**
  - Browse complete book catalog
  - Search books by title
  - Check book availability
- **Book Operations**
  - Borrow available books
  - Return borrowed books
  - View personal borrowing history

## 🏗️ System Architecture

```plaintext
mypro/
├── manager/              # Management logic
│   ├── LibraryManager   # Handles book and user operations
│   └── LoginManager     # Manages authentication
├── model/               # Data models
│   ├── Book            # Book entity
│   └── User            # User entity
└── MainApp             # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- ☕ Java JDK 22 or higher
- 💻 Any Java IDE:
  - Eclipse
  - IntelliJ IDEA
  - Visual Studio Code

### 📥 Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/satyamp18/mypro.git
   cd mypro
   ```

2. **Compile the Project**
   ```bash
   javac MainApp.java
   ```

3. **Run the Application**
   ```bash
   java MainApp
   ```

## 🔐 Authentication

### Default Admin Account
```
Username: admin
Password: admin123
```

### Sample User Account
```
Username: abhi
Password: pass123
```

## 📋 Usage Guide

### Administrator Interface
```
1. Add Book    → Add new books to inventory
2. View Books  → Display complete book catalog
3. View Users  → List all registered users
4. Logout      → End admin session
```

### User Interface
```
1. View Books    → Browse available books
2. Search Book   → Find specific books
3. Borrow Book   → Check out books
4. Return Book   → Return borrowed books
5. My Books      → View borrowed books
6. Logout        → End user session
```

## 💡 Technical Features

- **Authentication System**
  - Secure login/logout functionality
  - Role-based access control
  - User session management

- **Book Management**
  - Unique ID generation
  - Inventory tracking
  - Availability status

- **User Management**
  - New user registration
  - User role assignment
  - Activity tracking

## 🛠️ Development

### Building from Source
1. Ensure Java JDK 22+ is installed
2. Clone the repository
3. Compile using your preferred IDE or command line

### Running Tests
```bash
# Coming soon
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Future Enhancements

- [ ] Database integration
- [ ] GUI implementation
- [ ] Email notifications
- [ ] Fine calculation system
- [ ] Book reservation system

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by modern library management systems
- Built with ❤️ using Java

---

**Note:** This is a console-based application designed for educational purposes and can be extended for production use with additional features.

Made with ♥ by [satyamp18](https://github.com/satyamp18)