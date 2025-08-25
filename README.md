# 🎓 KLE Tech Blog Platform

![KLE Tech Blog](https://img.shields.io/badge/KLE%20Tech-Blog%20Platform-blue?style=for-the-badge)
![MERN Stack](https://img.shields.io/badge/MERN-Stack-green?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

## 📌 Overview

**KLE Tech Blog Platform** is a comprehensive, full-stack blogging application specifically designed for **KLE Technological University**. This platform enables students, faculty, and staff to share academic insights, research findings, campus experiences, and technical knowledge through an intuitive and feature-rich interface.

### 🎯 Purpose
- **Academic Collaboration**: Foster knowledge sharing within the KLE Tech community
- **Student Empowerment**: Provide a platform for students to showcase their work and ideas
- **Community Building**: Create connections through shared interests and discussions
- **Knowledge Repository**: Build a comprehensive database of academic and technical content

---

## ✨ Key Features

### 🔐 **Authentication & Authorization**
- **Secure Registration**: Email verification with KLE Tech domain restriction (`@kletech.ac.in`)
- **JWT Authentication**: Stateless authentication with secure token management
- **Password Security**: BCrypt hashing with salt rounds
- **Password Recovery**: Email-based password reset functionality
- **Role-Based Access**: User and admin role management

### 📝 **Content Management**
- **Rich Text Editor**: CKEditor integration for formatted content creation
- **Image Upload**: Support for featured images with preview functionality
- **Story Categories**: Organized content classification (Technology, Science, Engineering, etc.)
- **Tags System**: Enhanced content discoverability
- **Draft Saving**: Auto-save functionality for work-in-progress content
- **Content Preview**: Real-time preview while writing

### 🎨 **User Experience**
- **Responsive Design**: Bootstrap-powered mobile-first design
- **Dark/Light Mode**: Theme switching capability
- **Professional UI**: Modern, clean interface optimized for academic use
- **Reading Lists**: Personal bookmark system for favorite articles
- **Search & Filter**: Advanced content discovery tools
- **Pagination**: Efficient content browsing

### 💬 **Social Features**
- **Interactive Comments**: Rich commenting system with star ratings
- **Like System**: Engagement tracking for stories and comments
- **Author Profiles**: User profile management with photo uploads
- **Read Time Calculation**: Automatic reading time estimation
- **Community Engagement**: Social interaction features

### 📊 **Advanced Functionality**
- **File Management**: Image upload and storage system
- **Email Integration**: Automated email notifications
- **Error Handling**: Comprehensive error management and user feedback
- **Security Middleware**: CORS, input validation, and authorization checks
- **Database Optimization**: Efficient MongoDB queries with population

---

## 🛠️ Technology Stack

### **Backend**
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | Latest | Runtime environment |
| Express.js | ^4.17.2 | Web application framework |
| MongoDB | ^6.1.8 | NoSQL database |
| Mongoose | ^6.1.8 | ODM for MongoDB |
| JWT | ^8.5.1 | Authentication tokens |
| BCryptJS | ^2.4.3 | Password hashing |
| Multer | ^1.4.4 | File upload handling |
| Nodemailer | ^6.7.2 | Email functionality |
| CORS | ^2.8.5 | Cross-origin resource sharing |

### **Frontend**
| Technology | Version | Purpose |
|------------|---------|---------|
| React | ^17.0.2 | Frontend library |
| React Router | ^6.2.1 | Client-side routing |
| Bootstrap | ^5.3.7 | CSS framework |
| React Bootstrap | ^2.10.7 | Bootstrap components for React |
| CKEditor 5 | ^32.0.0 | Rich text editor |
| Axios | ^0.25.0 | HTTP client |
| React Icons | ^4.12.0 | Icon library |

### **Testing**
| Technology | Purpose |
|------------|---------|
| Selenium WebDriver | Automated browser testing |
| Python | Test script development |
| Jest | Unit testing framework |

---

## 🏗️ Project Architecture

### **Backend Structure**
```
Backend/
├── Controllers/          # Business logic handlers
│   ├── auth.js          # Authentication controllers
│   ├── story.js         # Story management
│   ├── user.js          # User operations
│   └── comment.js       # Comment system
├── Models/              # Database schemas
│   ├── user.js          # User model
│   ├── story.js         # Story model
│   └── comment.js       # Comment model
├── Middlewares/         # Custom middleware
│   ├── Authorization/   # Auth middleware
│   ├── database/        # DB middleware
│   └── Errors/          # Error handling
├── Helpers/             # Utility functions
│   ├── auth/           # Auth helpers
│   ├── database/       # DB helpers
│   ├── error/          # Error helpers
│   ├── input/          # Validation helpers
│   ├── Libraries/      # External integrations
│   └── query/          # Query helpers
├── Routers/            # API routes
└── public/             # Static files
    ├── storyImages/    # Story images
    └── userPhotos/     # User avatars
```

### **Frontend Structure**
```
Frontend/
├── src/
│   ├── components/
│   │   ├── AuthScreens/     # Authentication pages
│   │   ├── StoryScreens/    # Story-related components
│   │   ├── CommentScreens/  # Comment system
│   │   ├── ProfileScreens/  # User profile management
│   │   ├── GeneralScreens/  # Common components
│   │   └── Routing/         # Route protection
│   ├── Context/             # React Context API
│   ├── Css/                # Custom styles
│   └── Testing/            # Test components
└── public/                 # Static assets
```

### **Database Schema**

#### User Model
```javascript
{
  username: String (required),
  email: String (required, unique, @kletech.ac.in domain),
  password: String (hashed, min 6 chars),
  photo: String (default: "user.png"),
  role: String (enum: ["user", "admin"]),
  readList: [ObjectId] (references to Story),
  readListLength: Number,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  timestamps: true
}
```

#### Story Model
```javascript
{
  author: ObjectId (reference to User),
  slug: String (auto-generated),
  title: String (required, unique, min 4 chars),
  content: String (required, min 10 chars),
  image: String (default: "default.jpg"),
  readtime: Number (auto-calculated),
  likes: [ObjectId] (references to User),
  likeCount: Number,
  comments: [ObjectId] (references to Comment),
  commentCount: Number,
  timestamps: true
}
```

#### Comment Model
```javascript
{
  story: ObjectId (reference to Story),
  content: String (required, min 3 chars),
  author: ObjectId (reference to User),
  likes: [ObjectId] (references to User),
  likeCount: Number,
  star: Number (rating 0-5),
  timestamps: true
}
```

---

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- Git
- Code editor (VS Code recommended)

### **Backend Setup**
```bash
# 1. Clone the repository
git clone <repository-url>
cd KLE-Tech-Blog

# 2. Install backend dependencies
cd Backend
npm install

# 3. Create environment configuration
# Create Config/config.env file with:
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/kle-tech-blog
JWT_SECRET_KEY=your_jwt_secret_key
JWT_EXPIRE=30d
RESET_PASSWORD_EXPIRE=3600000
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
URI=http://localhost:3000

# 4. Start the backend server
npm start
```

### **Frontend Setup**
```bash
# 1. Navigate to frontend directory
cd ../Frontend

# 2. Install frontend dependencies
npm install

# 3. Start the development server
npm start
```

### **Database Setup**
```bash
# 1. Start MongoDB service
mongod

# 2. Create database (automatic on first connection)
# The application will create collections automatically
```

---

## 🔧 Configuration

### **Environment Variables**
Create a `Config/config.env` file in the Backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/kle-tech-blog

# JWT Configuration
JWT_SECRET_KEY=your_super_secret_jwt_key_here
JWT_EXPIRE=30d

# Password Reset
RESET_PASSWORD_EXPIRE=3600000

# Email Configuration (for password reset)
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
URI=http://localhost:3000

# File Upload Limits
MAX_FILE_SIZE=5242880  # 5MB
```

### **Frontend Proxy Configuration**
The frontend is configured to proxy API requests to `http://localhost:5000/` (see `Frontend/package.json`).

---

## 📱 API Documentation

### **Authentication Endpoints**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | User registration | ❌ |
| POST | `/auth/login` | User login | ❌ |
| POST | `/auth/forgotpassword` | Password reset request | ❌ |
| PUT | `/auth/resetpassword` | Password reset | ❌ |
| GET | `/auth/private` | Get user data | ✅ |

### **Story Endpoints**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/story` | Get all stories | ❌ |
| POST | `/story/addstory` | Create new story | ✅ |
| POST | `/story/:slug` | Get story details | ❌ |
| POST | `/story/:slug/like` | Like/unlike story | ✅ |
| GET | `/story/editStory/:slug` | Get story for editing | ✅ |
| PUT | `/story/:slug/edit` | Update story | ✅ |
| DELETE | `/story/:slug/delete` | Delete story | ✅ |

### **User Endpoints**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/user/profile` | Get user profile | ✅ |
| POST | `/user/editProfile` | Update profile | ✅ |
| PUT | `/user/changePassword` | Change password | ✅ |
| POST | `/user/:slug/addStoryToReadList` | Add to reading list | ✅ |
| GET | `/user/readList` | Get reading list | ✅ |

### **Comment Endpoints**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/comment/:slug/addComment` | Add comment | ✅ |
| GET | `/comment/:slug/getAllComment` | Get story comments | ❌ |
| POST | `/comment/:comment_id/like` | Like/unlike comment | ✅ |
| POST | `/comment/:comment_id/getCommentLikeStatus` | Get like status | ❌ |

---

## 🧪 Testing

### **Automated Testing Suite**

The project includes comprehensive Selenium-based automated tests:

#### **Test Files**
1. **`Sel-Login-Testing.py`** - Login functionality testing
2. **`Sel-Register-Testing.js`** - Registration process testing  
3. **`Sel-AddBlog-Testing.py`** - Blog creation workflow testing
4. **`System-Testing.py`** - End-to-end system testing

#### **Running Tests**
```bash
# Install Selenium and dependencies
pip install selenium webdriver-manager

# Run individual tests
cd Testing
python Sel-Login-Testing.py
python Sel-AddBlog-Testing.py
python System-Testing.py

# Run all tests (create a test runner script)
python run_all_tests.py
```

#### **Test Coverage**
- ✅ User registration with email validation
- ✅ User login/logout functionality
- ✅ Story creation with image upload
- ✅ Story editing and deletion
- ✅ Comment system functionality
- ✅ Like/unlike features
- ✅ Reading list management
- ✅ Profile management
- ✅ Password reset workflow

### **Manual Testing Checklist**
- [ ] User registration with non-KLE email (should fail)
- [ ] Password strength validation
- [ ] Image upload size limits
- [ ] Responsive design on different screen sizes
- [ ] Dark/light theme switching
- [ ] Search and pagination
- [ ] Error handling and user feedback

---

## 🔒 Security Features

### **Authentication Security**
- **JWT Tokens**: Stateless authentication with configurable expiration
- **Password Hashing**: BCrypt with salt rounds for secure password storage
- **Email Domain Restriction**: Only `@kletech.ac.in` emails allowed
- **Token Verification**: Middleware for protected routes

### **Input Validation**
- **Data Sanitization**: Input validation and sanitization
- **File Upload Security**: Type and size restrictions on uploads
- **SQL Injection Prevention**: Mongoose ODM protection
- **XSS Protection**: Content sanitization in rich text editor

### **Application Security**
- **CORS Configuration**: Controlled cross-origin resource sharing
- **Error Handling**: Secure error messages without sensitive data exposure
- **Rate Limiting**: Can be implemented for API endpoints
- **HTTPS Ready**: Production-ready for SSL/TLS encryption

---

## 🌐 Deployment

### **Production Deployment**

#### **Backend Deployment (Node.js)**
```bash
# 1. Set production environment variables
NODE_ENV=production
MONGO_URI=your_production_mongodb_uri
JWT_SECRET_KEY=your_production_jwt_secret

# 2. Install PM2 for process management
npm install -g pm2

# 3. Start application with PM2
pm2 start server.js --name "kle-tech-blog-api"
pm2 startup
pm2 save
```

#### **Frontend Deployment**
```bash
# 1. Build for production
npm run build

# 2. Deploy to hosting service
# (Netlify, Vercel, AWS S3, etc.)
```

#### **Database Deployment**
- **MongoDB Atlas**: Cloud-based MongoDB hosting
- **Local MongoDB**: Self-hosted MongoDB instance
- **Docker**: Containerized deployment option

### **Environment-Specific Configurations**

#### **Development**
```env
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/kle-tech-blog-dev
URI=http://localhost:3000
```

#### **Production**
```env
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/kle-tech-blog
URI=https://your-domain.com
```

---

## 📊 Performance Optimizations

### **Backend Optimizations**
- **Database Indexing**: Optimized queries with proper indexing
- **Image Compression**: File size optimization for uploads
- **Caching**: Implemented caching strategies for frequently accessed data
- **Pagination**: Efficient data loading with pagination
- **Query Optimization**: Mongoose populate and select optimizations

### **Frontend Optimizations**
- **Code Splitting**: React lazy loading for better performance
- **Image Optimization**: Compressed images and lazy loading
- **Bundle Size**: Optimized webpack configuration
- **Caching**: Browser caching strategies
- **Responsive Images**: Multiple image sizes for different devices

---

## 🤝 Contributing

### **Development Workflow**
1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### **Code Standards**
- **ESLint**: JavaScript linting and formatting
- **Prettier**: Code formatting consistency
- **Comment Standards**: Comprehensive code documentation
- **Git Conventions**: Conventional commit messages

### **Feature Requests**
- Create detailed issues with feature descriptions
- Include use cases and potential implementations
- Discuss with maintainers before implementation

---

## 🐛 Troubleshooting

### **Common Issues**

#### **Backend Issues**
```bash
# Database connection issues
Error: Could not connect to MongoDB
Solution: Check MongoDB service and connection string

# JWT token issues
Error: JWT expired
Solution: Check token expiration and refresh mechanism

# File upload issues
Error: File too large
Solution: Check multer configuration and file size limits
```

#### **Frontend Issues**
```bash
# CKEditor loading issues
Error: CKEditor build not found
Solution: npm install @ckeditor/ckeditor5-build-classic

# Bootstrap styling conflicts
Error: CSS styles not applying
Solution: Check Bootstrap import order and custom CSS

# Routing issues
Error: Cannot GET /story/...
Solution: Check React Router configuration and server routing
```

#### **Database Issues**
```bash
# Schema validation errors
Error: ValidationError: Path `email` is required
Solution: Check model schema and data validation

# Duplicate key errors
Error: E11000 duplicate key error
Solution: Check unique constraints and data conflicts
```

### **Debug Mode**
```bash
# Enable debug logging
DEBUG=* npm start  # Backend
REACT_APP_DEBUG=true npm start  # Frontend
```

---

## 📈 Future Enhancements

### **Planned Features**
- [ ] **Real-time Notifications**: WebSocket integration for live updates
- [ ] **Advanced Search**: Elasticsearch integration for better search
- [ ] **Content Moderation**: Admin panel for content management
- [ ] **Mobile App**: React Native mobile application
- [ ] **Analytics Dashboard**: User engagement and content analytics
- [ ] **API Rate Limiting**: Advanced rate limiting and throttling
- [ ] **Content Versioning**: Version control for story edits
- [ ] **Social Sharing**: Integration with social media platforms
- [ ] **Email Newsletters**: Automated email digest system
- [ ] **Advanced SEO**: Meta tags and SEO optimization

### **Technical Improvements**
- [ ] **GraphQL API**: Alternative to REST API
- [ ] **Microservices**: Service-oriented architecture
- [ ] **Redis Caching**: Advanced caching layer
- [ ] **CDN Integration**: Content delivery network for assets
- [ ] **Progressive Web App**: PWA capabilities
- [ ] **TypeScript Migration**: Type safety improvements
- [ ] **Docker Containerization**: Container-based deployment
- [ ] **CI/CD Pipeline**: Automated deployment pipeline

---

## 📄 License

This project is licensed under the **ISC License** - see the LICENSE file for details.

---

## 👥 Team & Contributors

### **Project Team**
- **Lead Developer**: Yuvaraj Panditrathod (@yuvarajpanditrathod)
- **Original Author**: Gilbert Hutapea
- **Institution**: KLE Technological University

### **Acknowledgments**
- KLE Technological University for project support
- Open source community for tools and libraries
- Contributors and testers for feedback and improvements

---

## 📞 Support & Contact

### **Support Channels**
- **GitHub Issues**: For bug reports and feature requests
- **Email**: [Contact via KLE Tech email]
- **Documentation**: Comprehensive README and code comments

### **Resources**
- **GitHub Repository**: [Repository Link]
- **Live Demo**: [Demo Link if available]
- **API Documentation**: [API Docs Link if available]

---

## 📋 Project Status

![Development Status](https://img.shields.io/badge/Status-Active%20Development-green)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![Last Updated](https://img.shields.io/badge/Last%20Updated-January%202025-orange)

### **Current Version**: 1.0.0
### **Release Date**: January 2025
### **Maintenance Status**: Active Development

---

**Made with ❤️ for KLE Technological University**

*This README provides comprehensive documentation for the KLE Tech Blog Platform. For additional information or support, please refer to the project repository or contact the development team.*
