export const getSessionProvider = async () => {
  return fetch("/api/auth-provider", { credentials: "include" }).then(
    (response) => response.json()
  );
};

export const getFacebookPermissions = async () => {
  return fetch("/api/facebook/permissions", { credentials: "include" }).then(
    (response) => response.json()
  );
};
