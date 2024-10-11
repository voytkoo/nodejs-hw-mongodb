export const serializeUser = (user) => ({
  name: user.name,
  email: user.email,
  password: user.password,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
