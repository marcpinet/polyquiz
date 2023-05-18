export interface Notification {
  senderId: number;
  receiverId: number;
  message: string;
  type: 'settings'; //can add ' | [other types] ' here later
  date: Date;
  seen: boolean;
  id?: number;
}
