import { UserData } from '@/context/AuthContext';

interface UpdateUserDataProps {
  currentUser: string | undefined;
  updatedUserData: UserData;
}

interface User {
  userName: string;
}

export function updateUserData({ currentUser, updatedUserData }: UpdateUserDataProps) {
  const existingUsers = JSON.parse(localStorage.getItem('userInfo') || '[]');
  const currentUserIndex = existingUsers.findIndex((user: User) => user.userName === currentUser);
  existingUsers[currentUserIndex] = updatedUserData;
  localStorage.setItem('userInfo', JSON.stringify(existingUsers));
}
