# Next.js Better Auth Starter

A complete authentication starter template built with **Next.js 15**, **Better Auth**, **Prisma ORM**, **PostgreSQL**, and **Nodemailer**. This template provides all the essential authentication features you need to get started quickly with your next project.

## 🚀 Features

### 🔐 Authentication Methods

- **Email & Password** - Traditional signup/login with email verification
- **Magic Link** - Passwordless authentication via email
- **OAuth** - Social login with Google and GitHub
- **Admin Panel** - User management with role-based access

### 📧 Email Features

- **Email Verification** - Verify email addresses on signup
- **Password Reset** - Secure password reset flow
- **Magic Link Login** - One-click login via email
- **Custom Email Templates** - Beautiful HTML email templates

### 👤 User Management

- **User Profiles** - Update name, email, and password
- **Role-based Access** - User and Admin roles with permissions
- **Account Linking** - Link multiple OAuth accounts
- **Session Management** - Secure session handling with cookies

### 🛡️ Security Features

- **Password Hashing** - Argon2 encryption for passwords
- **CSRF Protection** - Built-in CSRF protection
- **Secure Cookies** - HTTP-only, secure cookies
- **Email Validation** - Domain-based email validation
- **Name Validation** - Custom name validation rules

### 🎨 UI Components

- **Responsive Design** - Mobile-first responsive design
- **Modern UI** - Built with Tailwind CSS and Radix UI
- **Toast Notifications** - User feedback with Sonner
- **Loading States** - Proper loading indicators
- **Form Validation** - Client-side and server-side validation

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Authentication**: Better Auth
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS + Radix UI
- **Email**: Nodemailer
- **TypeScript**: Full type safety
- **Icons**: Lucide React

## 📦 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- SMTP email service (Gmail, SendGrid, etc.)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/nextjs-better-auth-starter.git
cd nextjs-better-auth-starter
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/your_db_name"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-here"
NEXT_PUBLIC_API_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Email (Nodemailer)
NODEMAILER_HOST="smtp.gmail.com"
NODEMAILER_PORT="587"
NODEMAILER_USER="your-email@gmail.com"
NODEMAILER_PASS="your-app-password"

# Admin Emails (semicolon separated)
ADMIN_EMAILS="admin@example.com;admin2@example.com"
```

4. **Database Setup**

```bash
# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push
```

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── auth/              # Authentication pages
│   ├── admin/             # Admin dashboard
│   ├── profile/           # User profile
│   └── api/auth/          # Better Auth API routes
├── components/            # Reusable components
│   ├── ui/               # UI components (shadcn/ui)
│   ├── *-form.tsx        # Authentication forms
│   └── *.tsx             # Other components
├── actions/               # Server actions
├── lib/                   # Utility functions
│   ├── auth.ts           # Better Auth configuration
│   ├── auth-client.ts    # Client-side auth
│   └── prisma.ts         # Prisma client
└── middleware.ts          # Route protection
```

## 🔧 Configuration

### OAuth Setup

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

#### GitHub OAuth

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

### Email Configuration

The template supports any SMTP provider. For Gmail:

1. Enable 2-Factor Authentication
2. Generate an App Password
3. Use the app password in `NODEMAILER_PASS`

## 🚀 Deployment

### Database

Deploy your PostgreSQL database (recommended: [Neon](https://neon.tech/), [Supabase](https://supabase.com/), or [PlanetScale](https://planetscale.com/))

### Application

Deploy to [Vercel](https://vercel.com/), [Netlify](https://netlify.com/), or any platform supporting Next.js:

```bash
npm run build
npm start
```

Update your environment variables with production values.

## 📖 Usage Examples

### Protecting Routes

```tsx
// middleware.ts
import { auth } from "@/lib/auth";

export default auth((request) => {
  if (!request.auth && request.nextUrl.pathname.startsWith("/profile")) {
    return Response.redirect(new URL("/auth/login", request.url));
  }
});
```

### Using Session Data

```tsx
"use client";
import { useSession } from "@/lib/auth-client";

export function ProfileComponent() {
  const { data: session } = useSession();

  if (!session) return <div>Not logged in</div>;

  return <div>Welcome, {session.user.name}!</div>;
}
```

### Server-side Authentication

```tsx
import { auth } from "@/lib/auth";

export default async function ProtectedPage() {
  const session = await auth.api.getSession({ headers: headers() });

  if (!session) redirect("/auth/login");

  return <div>Protected content</div>;
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Thanks & Acknowledgements

- [Better Auth](https://www.better-auth.com/) - Amazing authentication library
- [Next.js](https://nextjs.org/) - The React framework
- [Prisma](https://prisma.io/) - Next-generation ORM
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://radix-ui.com/) - Low-level UI primitives

##

- Special thanks to Khurram Ali ([GiraffeReact](https://www.youtube.com/@GiraffeReactor)) for his amazing tutorial that helped build this project. His detailed walkthrough and guidance were invaluable.
