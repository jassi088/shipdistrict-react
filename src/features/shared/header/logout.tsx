import { useAuthStore } from '@/stores/auth';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useDialogStore } from '@/stores/dialog';

interface LogoutProps {
  dialogKey: string;
}

const Logout: React.FC<LogoutProps> = ({ dialogKey }) => {
  const store = useAuthStore();
  const { dialogs, onDialogChange } = useDialogStore();

  const logout = () => {
    store.logout();
    onDialogChange(dialogKey, false);
  };
  return (
    <Dialog open={dialogs[dialogKey]} onOpenChange={(value) => onDialogChange(dialogKey, value)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Logout</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <DialogDescription>Are you sure you really wanna logout ?</DialogDescription>
          <Button onClick={logout}>Yes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Logout;
