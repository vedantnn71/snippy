import { ReactNode } from 'react';

export type IAlertDialogProps = {
  title: string;
  description: string;
  trigger: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmLabel?: string;
}
