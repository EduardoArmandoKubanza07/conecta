export default function useAuth() {
  const token = "";
  const expiresIn = 3600;

  const user = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    isAdmin: false,
    isPromoter: true,
    isLandLord: false,
    isServiceProvider: false,
  };

  return { user, token, expiresIn };
}
