import { UserProvider } from '@/lib/context/UserContext';
import { getUsers, getCurrentUser } from '@/lib/server/userActions';

export default async function Providers({
  children
}: {
  children: React.ReactNode
}) {
  // Fetch users and current user from the server
  const users = await getUsers();
  const currentUser = await getCurrentUser();
  
  return (
    <UserProvider initialUsers={users}>
      {children}
    </UserProvider>
  );
} 