export const paths = {
  home: () => "/",
  register: () => "/register",
  login: () => "/login",
  favorites: () => "/favorites",
  user: (id: string) => `/users/${id}`,
  userProperties: (id: string) => `/users/${id}/properties`,
};
