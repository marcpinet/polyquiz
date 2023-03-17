export interface User {
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  userType: "patient" | "admin" | "superAdmin";
  avatar: string;
}
