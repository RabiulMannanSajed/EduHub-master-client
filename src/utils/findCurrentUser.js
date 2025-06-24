export const findCurrentUser = (users, userEmail) => {
  if (!userEmail || !users?.length) return null;

  return users.find((user) => user?.email === userEmail) || null;
};
