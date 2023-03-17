export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  password: string;
  userType: "patient" | "admin" | "superAdmin";
  avatar?: string;
}
