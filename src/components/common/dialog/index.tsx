import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useDialogStore } from '@/stores/dialog';

interface CustomDialogProps {
  dialogKey: string;
  children: React.ReactNode;
}

const CustomDialog: React.FC<CustomDialogProps> = ({ children, dialogKey }) => {
  const { dialogs, onDialogChange } = useDialogStore();
  return (
    <Dialog open={dialogs[dialogKey]} onOpenChange={(value) => onDialogChange(dialogKey, value)}>
      <DialogHeader>
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
