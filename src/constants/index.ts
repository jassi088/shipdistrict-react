export const Constants = {
  HOST: process.env.VITE_API_URL,
  API_VERSION: 'api',
};

export const Paths = {
  LOGIN: '/',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  OTP: '/verify',
  RESET_PASSWORD: '/reset-password',

  DASHBOARD: '/dashboard',
  INBOX: '/inbox',
  ARCHIVE: '/archive',
  TRASH: '/trash',
  INVOICES: '/invoices',
  PACKAGES: '/packages',
  ACCOUNT_SETTINGS: '/account-settings',
  CUSTOMER_LIST: '/customer-list',
  SUB_ADMINS: '/sub-admins',
  CREATE: '/create',
  SHIPMENTS: '/shipments',
  SHIPPING_REQUESTS: '/shipping-requests',
  MAILBOX: '/mailbox',
  MAILBOX_REQUESTS: '/mailbox-requests',
  ADDRESS_LIST: '/address-list',
  MANDATORY_INVOICES: '/mandatory-invoices',
  ANALYTICS_REPORTS: '/analytics-reports',
  INVOICES_BILLINGS: '/invoices-billing',
  SUB_ADMIN_INVOICES: '/sub-admin-invoices',
  CONFIGURATION: '/configuration',
  FAQS: '/faqs',
  CARRIER: '/carrier',
  PLAN: '/plans',
  STORE: '/store',
  MARGIN_DISCOUNT: '/margin-discount',
  SETTING: '/setting',

  CREATE_SHIPMENT: '/create-shipment',
  ADD_SENDER_ADDRESS: '/sender-address',
  ADD_RECEIVER_ADDRESS: '/receiver-address',
  PACKAGE_INFORMATION: '/package-information',

  ADD_PLAN: '/add-plan',
  ADD_STORE: '/add-store',

  NOT_FOUND: '*',
};
