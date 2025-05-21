'use server';

import { User } from '../context/UserContext';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

// Placeholder for database connection
// In a real app, you'd use a proper DB like Prisma, MongoDB, etc.
let users: User[] = [
  {
    id: 'admin1',
    email: 'admin@davon.com',
    name: 'Admin',
    role: 'admin',
    password: 'admin123' // In production, this would be hashed
  }
];

// Get all users - can be called from server components
export async function getUsers(): Promise<User[]> {
  // In a real app, this would fetch from a database
  return users;
}

// Create a user
export async function createUser(userData: Omit<User, 'id'>): Promise<User> {
  const newUser = {
    ...userData,
    id: uuidv4(), // Generate unique ID
  };
  
  // In a real app, this would insert into a database
  users.push(newUser);
  
  // Return the new user
  return newUser;
}

// Update a user by ID
export async function updateUserById(id: string, userData: Partial<User>): Promise<User> {
  // Find user index
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    throw new Error(`User with ID ${id} not found`);
  }
  
  // Update user
  const updatedUser = {
    ...users[userIndex],
    ...userData
  };
  
  // In a real app, this would update a database record
  users[userIndex] = updatedUser;
  
  return updatedUser;
}

// Delete a user by ID
export async function deleteUserById(id: string): Promise<void> {
  // In a real app, this would delete from a database
  const initialLength = users.length;
  users = users.filter(user => user.id !== id);
  
  if (users.length === initialLength) {
    throw new Error(`User with ID ${id} not found`);
  }
}

// Verify user password
export async function verifyUserPassword(userId: string, password: string): Promise<boolean> {
  // In a real app, this would verify against hashed passwords in DB
  const user = users.find(u => u.id === userId);
  if (!user) return false;
  return user.password === password;
}

// Server-side login
export async function loginUser(email: string, password: string): Promise<User | null> {
  // Find user with matching email and password
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Set a secure cookie with the user ID
    cookies().set('userId', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    
    return user;
  }
  
  return null;
}

// Server-side logout
export async function logoutUser(): Promise<void> {
  // Delete the user cookie
  cookies().delete('userId');
  
  // Redirect to home or login page
  redirect('/');
}

// Get the current logged-in user from server
export async function getCurrentUser(): Promise<User | null> {
  const userId = cookies().get('userId')?.value;
  
  if (!userId) return null;
  
  // Find user by ID
  const user = users.find(u => u.id === userId);
  return user || null;
} 