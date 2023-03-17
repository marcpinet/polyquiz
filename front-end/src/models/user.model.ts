export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  password: string;
  userType: "patient" | "admin" | "superAdmin";
  avatar?: string; //TODO: "?" is necessary?
}
