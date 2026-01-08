# Prisma Blog App

A modern, full-stack blog application built with **Node.js**, **Express**, **Prisma ORM**, and **PostgreSQL**. This application features robust authentication using **Better Auth**, email verification, role-based access control, and a comprehensive blog post management system.

## 🚀 Features

### Authentication & Authorization

- **Email/Password Authentication** with email verification
- **Google OAuth** social login integration
- **Role-based Access Control** (USER/ADMIN)
- **Session Management** with Better Auth
- **Email Verification** required for account activation
- **Secure Password Handling** with Better Auth's built-in security

### Blog Management

- **Create, Read Posts** with rich content support
- **Post Filtering** by tags, featured status, author, and status
- **Search Functionality** across titles, content, and tags
- **Pagination & Sorting** for efficient data retrieval
- **Post Status Management** (DRAFT, PUBLISHED, ARCHIVED)
- **Featured Posts** support
- **View Tracking** for posts

### Comment System

- **Nested Comments** with parent-child relationships
- **Comment Moderation** (APPROVED/REJECT status)
- **Author Attribution** for all comments

### User Management

- **User Profiles** with customizable fields
- **User Status Tracking** (ACTIVE/INACTIVE)
- **Phone Number** support
- **Email Verification Status**

## 🛠️ Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Better Auth
- **Email Service**: Nodemailer (Gmail SMTP)
- **Development**: tsx (TypeScript execution)

## 📋 Prerequisites

Before running this application, ensure you have:

- **Node.js** (v18 or higher)
- **PostgreSQL** database
- **Gmail Account** (for email verification)
- **Google OAuth Credentials** (optional, for social login)

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Prisma-Blog-App
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory with the following variables:

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/blog_db"

   # Application
   PORT=5000
   APP_URL="http://localhost:3000"

   # Email Configuration (Gmail)
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASS="your-app-specific-password"

   # Google OAuth (Optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # Better Auth
   BETTER_AUTH_SECRET="your-secret-key"
   BETTER_AUTH_URL="http://localhost:5000"
   ```

4. **Generate Prisma Client**

   ```bash
   npm run generate
   ```

5. **Run database migrations**

   ```bash
   npm run migrate
   ```

6. **Seed admin user (optional)**
   ```bash
   npm run seed:admin
   ```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

The server will start on `http://localhost:5000` (or the PORT specified in `.env`)

### Available Scripts

| Script               | Description                              |
| -------------------- | ---------------------------------------- |
| `npm run dev`        | Start development server with hot reload |
| `npm run migrate`    | Run Prisma migrations                    |
| `npm run generate`   | Generate Prisma Client                   |
| `npm run studio`     | Open Prisma Studio (database GUI)        |
| `npm run seed:admin` | Seed an admin user to the database       |

## 📁 Project Structure

```
Prisma-Blog-App/
├── prisma/
│   ├── migrations/          # Database migration files
│   └── schema.prisma        # Prisma schema definition
├── src/
│   ├── helpers/
│   │   └── paginationSortingHelper.ts
│   ├── lib/
│   │   ├── auth.ts          # Better Auth configuration
│   │   └── prisma.ts        # Prisma client instance
│   ├── middleware/
│   │   └── auth.ts          # Authentication middleware
│   ├── modules/
│   │   ├── post/
│   │   │   ├── post.controller.ts
│   │   │   ├── post.router.ts
│   │   │   └── post.service.ts
│   │   └── user/
│   ├── scripts/
│   │   └── seedAdmin.ts     # Admin seeding script
│   ├── app.ts               # Express app configuration
│   └── server.ts            # Server entry point
├── generated/
│   └── prisma/              # Generated Prisma Client
├── .env                     # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🗄️ Database Schema

### Models

#### User

- Authentication and profile information
- Roles: USER, ADMIN
- Email verification status
- Phone number support

#### Post

- Blog post content with title and rich text
- Thumbnail image support
- Featured posts capability
- Status: DRAFT, PUBLISHED, ARCHIVED
- Tags for categorization
- View count tracking

#### Comment

- Nested comment structure
- Moderation status: APPROVED, REJECT
- Parent-child relationships for replies

#### Session & Account

- Managed by Better Auth
- Session tracking with IP and user agent
- OAuth account linking

#### Verification

- Email verification tokens
- Token expiration handling

## 🔐 API Endpoints

### Authentication

```
POST   /api/auth/sign-up/email      # Register with email/password
POST   /api/auth/sign-in/email      # Login with email/password
GET    /api/auth/session            # Get current session
POST   /api/auth/sign-out           # Logout
GET    /api/auth/google             # Google OAuth login
```

### Posts

```
GET    /posts                       # Get all posts (with filters)
POST   /posts                       # Create a new post (authenticated)
```

### Query Parameters for GET /posts

- `search` - Search in title, content, and tags
- `tags` - Filter by tags (comma-separated)
- `isFeatured` - Filter by featured status (true/false)
- `status` - Filter by status (DRAFT/PUBLISHED/ARCHIVED)
- `authorId` - Filter by author ID
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort order (asc/desc, default: desc)

## 🔒 Authentication Middleware

The application includes role-based authentication middleware:

```typescript
import auth, { UserRole } from "./middleware/auth";

// Protect routes
router.post("/posts", auth(UserRole.USER), createPost);
router.delete("/posts/:id", auth(UserRole.ADMIN), deletePost);
```

## 📧 Email Configuration

The application uses **Nodemailer** with Gmail SMTP for sending verification emails.

### Setting up Gmail App Password:

1. Enable 2-Factor Authentication on your Google Account
2. Go to Google Account > Security > App Passwords
3. Generate a new app password for "Mail"
4. Use this password in `EMAIL_PASS` environment variable

## 🎨 Features in Detail

### Email Verification

- Automatic email sent on sign-up
- Beautiful HTML email templates
- Token-based verification
- Auto sign-in after verification

### Pagination & Sorting

- Configurable page size
- Multiple sort fields
- Ascending/descending order
- Skip-based pagination

### Search & Filtering

- Full-text search across multiple fields
- Tag-based filtering
- Status filtering
- Author filtering
- Featured posts filtering

## 🔄 Database Migrations

To create a new migration:

```bash
npx prisma migrate dev --name migration_name
```

To apply migrations:

```bash
npm run migrate
```

## 🛡️ Security Features

- **Password Hashing** via Better Auth
- **Session Management** with secure tokens
- **Email Verification** required
- **Role-based Access Control**
- **CORS Protection** configured
- **SQL Injection Protection** via Prisma ORM

## 🐛 Troubleshooting

### Database Connection Issues

- Verify `DATABASE_URL` in `.env`
- Ensure PostgreSQL is running
- Check database credentials

### Email Not Sending

- Verify Gmail credentials
- Check if 2FA is enabled
- Ensure app password is correct
- Check firewall settings

### Prisma Client Issues

- Run `npm run generate` to regenerate client
- Delete `node_modules` and reinstall
- Check Prisma schema syntax

## 📝 Development Notes

- The application uses **ESM modules** (`"type": "module"` in package.json)
- TypeScript is configured with **strict mode**
- Prisma Client is generated to `generated/prisma` directory
- Development uses `tsx watch` for hot reloading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

ISC

## 👥 Author

Ishtiaq Robin

---

**Built with ❤️ using Prisma, Express, and Better Auth**
