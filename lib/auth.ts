import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { supabaseAdmin } from '@/lib/db';

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'Email',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const { data: user } = await supabaseAdmin
                    .from('users')
                    .select('*')
                    .eq('email', credentials.email)
                    .single();

                if (!user) return null;

                // Simple check for now
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    image: user.avatar_url
                };
            }
        })
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === 'google') {
                const { data: existingUser } = await supabaseAdmin
                    .from('users')
                    .select('*')
                    .eq('email', user.email!)
                    .single();

                if (!existingUser) {
                    await supabaseAdmin
                        .from('users')
                        .insert({
                            email: user.email,
                            name: user.name,
                            avatar_url: user.image,
                            role: 'client',
                            verified: true,
                            status: 'active'
                        });
                }
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            } else if (token.email) {
                const { data: dbUser } = await supabaseAdmin
                    .from('users')
                    .select('*')
                    .eq('email', token.email)
                    .single();

                if (dbUser) {
                    token.role = dbUser.role;
                    token.id = dbUser.id;
                    token.status = dbUser.status;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
                (session.user as any).id = token.id;
                (session.user as any).status = token.status;
            }
            return session;
        }
    },
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt'
    }
};
