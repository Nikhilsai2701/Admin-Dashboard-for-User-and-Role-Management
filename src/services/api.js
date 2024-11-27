import users from '../mock/users.json';
import roles from '../mock/roles.json';

export const fetchUsers = () => Promise.resolve(users);
export const fetchRoles = () => Promise.resolve(roles);
export const addUser = (user) => Promise.resolve([...users, user]);
export const updateUser = (updatedUser) =>
  Promise.resolve(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
