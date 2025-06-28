import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

// Mock user data - in real app this would come from database
const users = [
  {
    id: "1",
    username: "admin",
    password: "admin", // Simple password for demo
  },
]

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const user = users.find(u => u.username === credentials.username)
        
        if (!user) {
          return null
        }

        // Simple password comparison for demo (use bcrypt in production)
        const isPasswordValid = credentials.password === user.password

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          name: user.username,
        }
      },
    }),
  ],
  pages: {
    signIn: "/en/login",
  },
}) 