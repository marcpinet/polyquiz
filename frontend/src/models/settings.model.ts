export interface Settings {
  id: number;
  user_id: number;
  sound_effect: boolean;
  mouse_option:
    | 'doubleClique'
    | 'pressionLongue'
    | 'keyboard_control'
    | 'aucun';
  microphone: 'withAntiBruit' | 'withoutAntiBruit' | 'aucun';
  confirm_answer: boolean;
}

export interface InitSettings {
  //initial values for Settings that are set by admin
  id: number;
  user_id: number;
  sound_effect: boolean;
  mouse_option:
    | 'doubleClique'
    | 'pressionLongue'
    | 'keyboard_control'
    | 'aucun';
  microphone: 'withAntiBruit' | 'withoutAntiBruit' | 'aucun';
  confirm_answer: boolean;
}
