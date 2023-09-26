export const paths = {
  home: () => "/",
  register: () => "/register",
  login: () => "/login",
  property: (id: string) => `/properties/${id}`,
  favorites: () => "/favorites",
  user: (id: string) => `/users/${id}`,
  userProperties: (id: string) => `/users/${id}/properties`,
};
