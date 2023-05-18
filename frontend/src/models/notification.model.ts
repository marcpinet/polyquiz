export interface Notification {
  sender_id: number;
  user_id: number;
  message: string;
  type: 'settings'; //can add ' | [other types] ' here later
  date: Date;
  seen: boolean;
  id?: number;
}
