// Declare an interface and use it in case components
import { ReactNode } from 'react';

// サンプル
export interface Easy {
  // context: any;
  title: string;
  hello: string;
}

// useContext用
export interface UserProviderProps {
  children: ReactNode;
}

// ユーザー用
export interface User {
  id: string;
  email: string;
}

// ヘッダー用
export interface HeaderInterface {
  linkPair: Array<{ label: string; url: string }>;
}

// ダイアログ用
export interface ModalProps {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  title: string;
  content: string;
}

// チェックボックス用
export interface checkbox {
  checked: boolean;
}

// スケジュールページ用
export interface CalenderEvent {
  id: number;
  start: Date;
  end: Date;
  title: string;
}
export interface Calender {
  start: Date;
  end: Date;
  title: string;
}

// リストページ用
export interface ListData {
  id: string;
  listName: { formData: { text: string } };
  checked: boolean;
}
export interface ListItemProps {
  fetchExe: boolean;
}

// メモページ用
export interface MemoData {
  id: string;
  memoContent: { formData: { memo: string } };
}
