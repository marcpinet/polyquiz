export interface Settings {
  id: number;
  user_id: number;
  sound_effect: boolean;
  keyboard_control: boolean;
  mouse_option: 'doubleClique' | 'pressionLongue' | 'aucun';
  microphone: boolean;
  confirm_answer: boolean;
}

export interface InitSettings {
  //initial values for Settings that are set by admin
  id: number;
  user_id: number;
  sound_effect: boolean;
  keyboard_control: boolean;
  mouse_option: 'doubleClique' | 'pressionLongue' | 'aucun';
  microphone: boolean;
  confirm_answer: boolean;
}
