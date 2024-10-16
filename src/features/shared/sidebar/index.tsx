import { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';
import cn from '@/utils/cn';
import { useSidebarStore } from '@/stores/sidebar';
import { Paths } from '@/constants';
import { useAuthStore } from '@/stores';
import './../shared.scss';
import CustomAccountChangeSelect, { accounts } from '../account-changer';

const SIDEBAR_ITEMS = [
  {
    path: Paths.DASHBOARD,
    title: 'Dashboard',
    extras: false,
    options: [],
    roles: ['SUPER_ADMIN', 'SUB_ADMIN', 'CUSTOMER'],
    account: 'both',
  },
  {
    path: Paths.INBOX,
    title: 'Inbox',
    extras: false,
    options: [],
    roles: ['CUSTOMER'],
    account: 'mailbox',
  },
  {
    path: Paths.ARCHIVE,
    title: 'Archive',
    extras: false,
    options: [],
    roles: ['CUSTOMER'],
    account: 'mailbox',
  },
  {
    path: Paths.TRASH,
    title: 'Trash',
    extras: false,
    options: [],
    roles: ['CUSTOMER'],
    account: 'mailbox',
  },
  {
    path: Paths.CUSTOMER_LIST,
    title: 'Customer List',
    extras: false,
    options: [],
    roles: ['SUPER_ADMIN', 'SUB_ADMIN'],
  },
  {
    path: Paths.SUB_ADMINS,
    title: 'Sub Admins',
    extras: false,
    options: [],
    roles: ['SUPER_ADMIN'],
  },
  {
    path: Paths.SHIPMENTS,
    title: 'Shipments',
    extras: false,
    options: [],
    roles: ['SUPER_ADMIN', 'CUSTOMER'],
    account: 'shipment',
  },
  {
    path: Paths.SHIPPING_REQUESTS,
    title: 'Shipping Requests',
    extras: false,
    options: [],
    roles: ['SUPER_ADMIN'],
  },
  {
    path: Paths.MAILBOX,
    title: 'Mailbox',
    extras: false,
    options: [],
    roles: ['SUPER_ADMIN', 'SUB_ADMIN'],
    account: 'both',
  },
  {
    path: Paths.MAILBOX_REQUESTS,
    title: 'Mailbox Requests',
    extras: false,
    options: [],
    roles: ['SUPER_ADMIN', 'SUB_ADMIN'],
  },
  {
    path: Paths.ADDRESS_LIST,
    title: 'Address List',
    extras: false,
    options: [],
    roles: ['SUPER_ADMIN', 'CUSTOMER'],
    account: 'shipment',
  },
  {
    path: Paths.MANDATORY_INVOICES,
    title: 'Mandatory Invoices',
    extras: false,
    options: [],
    roles: ['SUB_ADMIN'],
  },
  {
    path: Paths.ANALYTICS_REPORTS,
    title: 'Analytics & Reports',
    extras: false,
    options: [],
    roles: ['SUPER_ADMIN'],
  },
  {
    path: Paths.INVOICES_BILLINGS,
    title: 'Invoices & Billing',
    extras: false,
    options: [],
    roles: ['SUPER_ADMIN', 'SUB_ADMIN'],
  },
  {
    path: Paths.SUB_ADMIN_INVOICES,
    title: 'Sub-Admin Invoices',
    extras: false,
    options: [],
    roles: ['SUPER_ADMIN'],
  },
  {
    path: Paths.CONFIGURATION,
    title: 'Configuration',
    extras: true,
    roles: ['SUPER_ADMIN', 'SUB_ADMIN'],
    options: [
      {
        path: Paths.CONFIGURATION + Paths.CARRIER,
        title: 'Carrier',
        extras: false,
        roles: ['SUPER_ADMIN', 'SUB_ADMIN'],
      },
      {
        path: Paths.CONFIGURATION + Paths.PLAN,
        title: 'Plan',
        extras: false,
        roles: ['SUPER_ADMIN', 'SUB_ADMIN'],
      },
      {
        path: Paths.CONFIGURATION + Paths.STORE,
        title: 'Store',
        extras: false,
        roles: ['SUPER_ADMIN', 'SUB_ADMIN'],
      },
      {
        path: Paths.CONFIGURATION + Paths.MARGIN_DISCOUNT,
        title: 'Margin & Discount',
        extras: false,
        roles: ['SUPER_ADMIN'],
      },
      {
        path: Paths.CONFIGURATION + Paths.SETTING,
        title: 'Setting',
        extras: false,
        roles: ['SUPER_ADMIN', 'SUB_ADMIN'],
      },
    ],
  },
  {
    path: Paths.FAQS,
    title: 'FAQs',
    extras: false,
    options: [],
    roles: ['SUPER_ADMIN'],
  },
  {
    path: Paths.PACKAGES,
    title: 'Packages',
    extras: false,
    options: [],
    roles: ['CUSTOMER'],
    account: 'shipment',
  },
  {
    path: Paths.INVOICES,
    title: 'Invoices',
    extras: false,
    options: [],
    roles: ['CUSTOMER'],
    account: 'both',
  },
  {
    path: Paths.ACCOUNT_SETTINGS,
    title: 'Account Settings',
    extras: false,
    options: [],
    roles: ['CUSTOMER'],
    account: 'both',
  },
];

const Sidebar = (): JSX.Element => {
  const { user } = useAuthStore();
  const { expanded, toggleExpanded, expandedMenus, setExpandedMenus } = useSidebarStore();

  const [selectedAccount, setSelectedAccount] = useState(accounts.find((account) => account.value === 'shipment'));

  const tabs = SIDEBAR_ITEMS.filter((item) => {
    const role_code = user?.role?.code;
    const top_level_match = role_code && item.roles.includes(role_code);

    const account_match =
      role_code === 'CUSTOMER' ? item.account === 'both' || item.account === selectedAccount?.value : true;

    if (item.options?.length) {
      const filtered_options = item.options.filter((option) => option.roles.includes(role_code ?? ''));
      return (filtered_options.length > 0 || top_level_match) && account_match;
    }

    return top_level_match && account_match;
  }).map((item) => {
    if (item.options?.length) {
      const role_code = user?.role?.code;
      const filtered_options = item.options.filter((option) => option.roles.includes(role_code ?? ''));
      return {
        ...item,
        options: filtered_options,
      };
    }
    return item;
  });

  return (
    <aside
      className={cn(
        'bg-[#303C42] min-h-screen duration-500 text-primary-foreground overflow-y-scroll no-scrollbar select-none space-y-4 flex-shrink-0',
        expanded ? 'w-60' : 'w-16',
      )}
    >
      <div
        className="py-3 flex justify-end pr-4 bg-cover bg-center"
        style={{ backgroundImage: "url('https://via.placeholder.com/300')" }}
      >
        <Menu size={26} className="cursor-pointer" onClick={toggleExpanded} />
      </div>
      {user?.role.code === 'CUSTOMER' && (
        <div className="flex justify-center items-center">
          <CustomAccountChangeSelect selectedAccount={selectedAccount} setSelectedAccount={setSelectedAccount} />
        </div>
      )}
      <div className="flex flex-col relative">
        {tabs.length > 0 &&
          tabs.map((menu, index) => (
            <Fragment key={index}>
              {menu.extras ? (
                <span
                  onClick={() => setExpandedMenus(index)}
                  className={cn(
                    'cursor-pointer group flex items-center gap-3.5 font-medium py-4 px-5 border-l-2 border-transparent',
                    {
                      'bg-gray-200/20 active': expandedMenus[index],
                      'hover:bg-gray-100/5': !expandedMenus[index],
                    },
                  )}
                >
                  <img
                    src={`/images/sidebar-inactive/${menu.title}.svg`}
                    className="inactive block w-4 flex-shrink-0 group-hover:hidden"
                    alt={menu.title}
                  />
                  <img
                    src={`/images/sidebar-active/${menu.title}.svg`}
                    className="active hidden w-4 flex-shrink-0 group-hover:block"
                    alt={menu.title}
                  />
                  <h2
                    className={cn(
                      'text-sm whitespace-pre duration-500 transition-opacity text-gray-400 group-hover:hidden',
                      !expanded && 'opacity-0 overflow-hidden',
                    )}
                  >
                    {menu?.title}
                  </h2>
                  <h2
                    className={cn(
                      'text-sm hidden whitespace-pre duration-500 transition-opacity text-white group-hover:block',
                      !expanded && 'opacity-0 overflow-hidden',
                    )}
                  >
                    {menu?.title}
                  </h2>
                  <img
                    src="/images/sidebar-inactive/Chevron Right.svg"
                    className={cn(
                      'ml-4 inactive block w-2 flex-shrink-0 group-hover:hidden transition-all duration-100',
                      expandedMenus[index] && 'rotate-90',
                    )}
                    alt="Chevron Right"
                  />
                  <img
                    src="/images/sidebar-active/Chevron Right.svg"
                    className={cn(
                      'ml-4 active hidden w-2 flex-shrink-0 group-hover:block transition-all duration-100',
                      expandedMenus[index] && 'rotate-90',
                    )}
                    alt="Chevron Right"
                  />
                </span>
              ) : (
                <NavLink
                  to={menu.path}
                  className={({ isActive }) =>
                    cn('group flex items-center gap-3.5 font-medium border-l-2 py-4 px-5', {
                      'border-yellow-300 bg-gray-200/20 active': isActive,
                      'border-transparent hover:bg-gray-100/5': !isActive,
                    })
                  }
                >
                  <img
                    src={`/images/sidebar-inactive/${menu.title}.svg`}
                    className="inactive block w-4 flex-shrink-0 group-hover:hidden"
                    alt={menu.title}
                  />
                  <img
                    src={`/images/sidebar-active/${menu.title}.svg`}
                    className="active hidden w-4 flex-shrink-0 group-hover:block"
                    alt={menu.title}
                  />
                  <h2
                    className={cn(
                      'text-sm whitespace-pre duration-500 transition-opacity text-gray-400 group-hover:hidden',
                      !expanded && 'opacity-0 overflow-hidden',
                    )}
                  >
                    {menu?.title}
                  </h2>
                  <h2
                    className={cn(
                      'text-sm hidden whitespace-pre duration-500 transition-opacity text-white group-hover:block',
                      !expanded && 'opacity-0 overflow-hidden',
                    )}
                  >
                    {menu?.title}
                  </h2>
                </NavLink>
              )}

              {expandedMenus[index] &&
                menu.options.length > 0 &&
                menu.options.map((option) => (
                  <NavLink
                    key={option.title}
                    to={option.path}
                    className={({ isActive }) =>
                      cn(
                        'group flex items-center gap-3.5 font-medium py-4 px-5 pl-8 border-l-2 transition-all duration-200',
                        expanded ? 'pl-8' : 'pl-5',
                        {
                          'border-yellow-300 bg-gray-200/20 active': isActive,
                          'border-transparent hover:bg-gray-100/5': !isActive,
                        },
                      )
                    }
                  >
                    <img
                      src={`/images/sidebar-inactive/${option.title}.svg`}
                      className="inactive block w-4 flex-shrink-0 group-hover:hidden"
                      alt={option.title}
                    />
                    <img
                      src={`/images/sidebar-active/${option.title}.svg`}
                      className="active hidden w-4 flex-shrink-0 group-hover:block"
                      alt={option.title}
                    />
                    <h2
                      className={cn(
                        'text-sm whitespace-pre duration-500 transition-opacity text-gray-400 group-hover:hidden',
                        !expanded && 'opacity-0 overflow-hidden',
                      )}
                    >
                      {option?.title}
                    </h2>
                    <h2
                      className={cn(
                        'text-sm hidden whitespace-pre duration-500 transition-opacity text-white group-hover:block',
                        !expanded && 'opacity-0 overflow-hidden',
                      )}
                    >
                      {option?.title}
                    </h2>
                  </NavLink>
                ))}
            </Fragment>
          ))}
      </div>
      {/* <div className="h-60" /> */}
    </aside>
  );
};

export default Sidebar;
