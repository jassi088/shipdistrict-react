import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Typography } from '@/components/common/typography';
import { useDialogStore } from '@/stores/dialog';
import { useAuthStore } from '@/stores/auth';
import { Paths } from '@/constants';
import Logout from './logout';

const Header = () => {
  const navigate = useNavigate();
  const user = useAuthStore((store) => store.user);
  const onDialogChange = useDialogStore((store) => store.onDialogChange);

  const handleProfileClick = () => {
    navigate(Paths.DASHBOARD);
  };

  const handleLogoutClick = () => {
    onDialogChange('logout', true);
  };
  return (
    <header className="w-full bg-white px-4 py-2 box-shadow border-b">
      <div className="flex justify-end items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={user?.fullName} />
              <AvatarFallback>
                <Typography variant="small">{user?.fullName}</Typography>
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <div className="flex gap-2">
                <Avatar>
                  {/* <AvatarImage src={user?.} /> */}
                  <AvatarFallback>
                    <Typography variant="small">{user?.fullName}</Typography>
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-center">
                  <Typography variant="small">{user?.fullName}</Typography>
                  <Typography variant="small">{user?.email}</Typography>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfileClick}>
              <Typography variant="small">Profile</Typography>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogoutClick}>
              <Typography variant="small">Logout</Typography>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Logout dialogKey="logout" />
    </header>
  );
};

export default Header;
