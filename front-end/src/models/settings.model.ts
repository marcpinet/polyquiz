export interface Settings {
  id: number;
  user_id: number;
  sound_effect: boolean;
  keyboard_control: boolean;
  mouse_option: "doubleClique" | "pressionLongue" | "aucun";
  mouse_speed: number;
  confirm_answer: boolean;
}

export interface SettingsInit { //initial values for Settings that are set by admin
  id: number;
  user_id: number;
  sound_effect: boolean;
  keyboard_control: boolean;
  mouse_option: "doubleClique" | "pressionLongue" | "aucun";
  mouse_speed: number;
  confirm_answer: boolean;
}

