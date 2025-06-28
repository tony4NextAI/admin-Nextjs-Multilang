# Admin Dashboard

> **Author**: tai.ngotan  
> **Built with**: Cursor AI as coding buddy 🤖

A modern admin dashboard built with Next.js 15, featuring multi-language support (English and Vietnamese) and authentication.

## Features

- 🔐 **Authentication**: NextAuth.js with credentials provider
- 🌍 **Internationalization**: English and Vietnamese language support
- 📱 **Responsive Design**: Modern UI with Tailwind CSS
- 🔄 **Navigation**: Clean sidebar navigation with active states
- 📊 **Data Tables**: User management, transactions, and user history
- 🎥 **Livestream Management**: Placeholder for livestream features

## Tech Stack

- **Next.js 15** - React framework with App Router
- **NextAuth.js** - Authentication
- **next-intl** - Internationalization
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety
- **Day.js** - Date formatting

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   The `.env.local` file is already created with default values:
   ```
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Default Login Credentials

- **Username**: `admin`
- **Password**: `password`

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # Internationalized routes
│   │   ├── dashboard/      # Dashboard pages
│   │   │   ├── users/      # User management
│   │   │   ├── transactions/# Transaction management
│   │   │   ├── livestream/ # Livestream management
│   │   │   └── user-history/# User history (dynamic routes)
│   │   └── login/          # Login page
│   └── api/auth/           # NextAuth API routes
├── components/             # Reusable components
├── i18n.ts                # Internationalization config
├── auth.ts                # NextAuth configuration
└── middleware.ts          # Authentication & i18n middleware
```

## Routes

- `/` - Redirects to `/en`
- `/[locale]/login` - Login page
- `/[locale]/dashboard` - Redirects to users page (default)
- `/[locale]/dashboard/users` - User management table
- `/[locale]/dashboard/transactions` - Transaction management table
- `/[locale]/dashboard/livestream` - Livestream management (placeholder)
- `/[locale]/dashboard/user-history/[account]` - User history for specific account

## Features Overview

### Authentication
- Login with username/password
- Session management with NextAuth.js
- Protected routes with middleware
- Automatic redirect after login/logout

### Multi-language Support
- English (en) and Vietnamese (vi)
- Language switcher in header
- Persistent language selection across routes

### User Management
- Table view with account, bank, amount, and creation date
- Click on any row to view user history
- Currency formatting in Vietnamese Dong (VND)

### Transaction Management
- Comprehensive transaction table
- Status and type indicators with color coding
- Amount formatting with positive/negative indicators

### User History
- Dynamic routing based on account number
- Detailed action history with timestamps
- Back navigation to users page

## Customization

### Adding New Languages
1. Add locale to `src/i18n.ts`
2. Create new translation file in `messages/[locale].json`
3. Update middleware configuration

### Modifying Mock Data
The application uses mock data for demonstration. Replace the mock data in:
- `src/app/[locale]/dashboard/users/page.tsx`
- `src/app/[locale]/dashboard/transactions/page.tsx`
- `src/app/[locale]/dashboard/user-history/[account]/page.tsx`

### Authentication
The default user credentials are defined in `auth.ts`. In production, replace with database integration.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Author & Credits

**Author**: tai.ngotan

This project was developed with the assistance of **Cursor AI** as a coding buddy, providing intelligent code completion, suggestions, and pair programming support throughout the development process.

## License

This project is for demonstration purposes.
