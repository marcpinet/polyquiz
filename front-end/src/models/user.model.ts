export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  userType: "patient" | "admin" | "superAdmin";
  avatar: File | null;
}
