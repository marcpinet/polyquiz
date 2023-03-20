export interface User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  userType: "patient" | "admin" | "superAdmin";
  //avatar: File | null;
  avatar: string;
}
