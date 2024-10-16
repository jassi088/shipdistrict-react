import { useRef, useState } from 'react';
import { Truck, Mail } from 'lucide-react';
import { Typography } from '@/components/common/typography';
import { useOnClickOutside } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@/constants';
import { useSidebarStore } from '@/stores';
import cn from '@/utils/cn';

export const accounts = [
  {
    name: 'Shipping Account',
    value: 'shipment',
    icon: <Truck size={22} className="text-red-500 mr-2" />,
    small: <Truck size={18} />,
  },
  {
    name: 'Mailbox Account',
    value: 'mailbox',
    icon: <Mail size={20} className="text-red-500 mr-2" />,
    small: <Mail size={18} />,
  },
];

const CustomAccountChangeSelect = ({ selectedAccount, setSelectedAccount }: any) => {
  const route = useNavigate();
  const { expanded } = useSidebarStore();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectAccount = (account: any) => {
    setSelectedAccount(account);
    setIsOpen(false);
    route(Paths.DASHBOARD);
  };

  const getSelectedIcon = () => {
    const selected = accounts.find((account) => account.value === selectedAccount?.value);
    return selected ? selected.icon : null;
  };

  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => {
    if (isOpen) setIsOpen(false);
  });

  return (
    <div className="h-10 relative inline-block" ref={dropdownRef}>
      {expanded ? (
        <button
          className="flex items-center bg-white border border-gray-300 py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none"
          onClick={toggleDropdown}
        >
          {getSelectedIcon()}
          <Typography variant="body-small" className="text-red-500">
            {selectedAccount?.name}
          </Typography>
          <img src="svgs/dropdown.svg" className="ml-2" />
        </button>
      ) : (
        <div className="h-full flex flex-col gap-y-2 items-center">
          {accounts.map((account) => (
            <div
              key={account.value}
              className={cn('cursor-pointer', account.value === selectedAccount?.value ? 'text-white' : 'text-red-500')}
              onClick={() => handleSelectAccount(account)}
            >
              {account.small}
            </div>
          ))}
        </div>
      )}

      {isOpen && expanded && (
        <ul className="absolute bg-white border border-gray-300 rounded-lg shadow-lg mt-2 py-2 w-full z-[9999]">
          {accounts.map((account) => (
            <li
              key={account.name}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectAccount(account)}
            >
              {account.icon}
              <Typography variant="body-small" className="text-black">
                {account.name}
              </Typography>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomAccountChangeSelect;
