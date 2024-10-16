export interface AuthModel {
  id: string;
  email: string;
  fullName?: string;
  isEmailVerified: boolean;
  isPlanPurchasedFirstTime: boolean;
  isPlanPurchased: boolean;
  isPlanExist: boolean;
  status: string;
  loginType?: string;
  isProfileCompleted: boolean;
  customerId: string;
  UniqueId: string;
  isTopUp: boolean;
  addedBy: string;
  userPositionTag?: string;
  isLoginFirstTime: string;
  address1?: string | null;
  state?: string | null;
  country?: string | null;
  zipCode?: string | null;
  parentUser?: string | null;
  stripeCustomAccountId?: string | null;
  accountStatus: string;
  userConfigurationSetting: {
    isSecurityOn: boolean;
    password: string;
  };
  isSuperSubAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
  accessToken: string;
}

interface ProofDocument {
  isVerify: boolean;
  documents: any[];
}

interface User {
  id: string;
  address1: string | null;
  state: string | null;
  country: string | null;
  zipCode: string | null;
  parentUser: string | null;
  stripeCustomAccountId: string | null;
}

export interface Profile {
  id: string;
  uniqueId: string;
  name: string;
  companyName: string;
  autoFillCheckbox: boolean;
  address1: string;
  address2: string;
  city: string;
  state: string;
  phone: string;
  country: string;
  zipCode: string;
  proofDocument: ProofDocument;
  isShipmentAccountVerified: boolean;
  isMailBoxAccountVerified: boolean;
  accountType: string;
  isEmailVerified: boolean;
  isAssigne: string;
  carrier: any[];
  status: string;
  mailBoxMessage: boolean;
  mailBoxMessageX: boolean;
  userLastActionDate: string;
  totalPackageCount: number;
  totalMailCount: number;
  mailBoxNames: any[];
  createdAt: string;
  updatedAt: string;
  user: User;
}

interface UserPlan {
  id: string;
  scanCount: number;
  leftScanCount: number;
  usedScanCount: number;
  status: string;
  startDate: string;
  endDate: string;
  planInfo: {
    additionalFee: {
      packageReceiving: string;
      packageConsolidation: string;
      overWeight: string;
      mailStorage: string;
      palletReceiving: string;
      palletStorage: string;
      packageStorage: string;
    };
    penaltyFee: {
      wrongAddress: string;
      late: string;
      reinstatement: string;
    };
    _id: string;
    planName: string;
    planPrice: number;
    validity: string;
    scanCount: number;
    status: string;
    isPopular: boolean;
    planCreator: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  subscriptionId: string;
  user: User;
  plan: {
    id: string;
  };
}

interface UserMarginAndDiscount {
  id: string;
  defaultMargin: string | null;
  defaultDiscount: string | null;
  isVIP: boolean;
  isPro: boolean;
  specialInvoiceCreatedDate: string;
  specialInvoiceTime: string;
  serviceTypes: any[];
  user: User;
}

interface ParentUser {
  id: string;
  address: string | null;
  state: string | null;
  country: string | null;
  zipCode: string | null;
  parentUser: string | null;
  stripeCustomAccountId: string | null;
  logo: string | null;
}

interface UserConfigurationSetting {
  isSecurityOn: boolean;
}

interface Role {
  id: string;
  name: string;
  code: string;
}

interface CurrentProfile {
  id: string;
  _id: string;
  uniqueId: string;
  name: string;
  companyName: string;
  autoFillCheckbox: boolean;
  address1: string;
  address2: string;
  city: string;
  state: string;
  phone: string;
  country: string;
  zipCode: string;
  proofDocument: ProofDocument;
  isShipmentAccountVerified: boolean;
  isMailBoxAccountVerified: boolean;
  accountType: string;
  isEmailVerified: boolean;
  isAssigne: string;
  carrier: any[];
  status: string;
  virtualId: string;
  mailBoxMessage: boolean;
  mailBoxMessageX: boolean;
  userLastActionDate: string;
  totalPackageCount: number;
  totalMailCount: number;
  mailBoxNames: any[];
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface UserModel {
  id: string;
  _id: string;
  userDId: string;
  fullName: string;
  name: string;
  email: string;
  phone: string;
  accountType: string;
  isEmailVerified: boolean;
  isPlanPurchasedFirstTime: boolean;
  isPlanPurchased: boolean;
  isPlanExist: boolean;
  status: string;
  loginType: string;
  isProfileCompleted: boolean;
  customerId: string;
  UniqueId: string;
  isTopUp: boolean;
  addedBy: string;
  userPositionTag: string;
  isLoginFirstTime: {
    shipmentTour: string;
    mailBoxTour: string;
  };
  address1: string;
  address2: string;
  companyName: string;
  businessAddress1: string | null;
  businessAddress2: string | null;
  businessCity: string | null;
  businessState: string | null;
  businessCountry: string | null;
  businessZipCode: string | null;
  state: string;
  country: string;
  zipCode: string;
  parentUser: ParentUser;
  stripeCustomAccountId: string | null;
  accountStatus: string;
  userConfigurationSetting: UserConfigurationSetting;
  isSuperSubAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  role: Role;
  currentProfile: CurrentProfile;
  profiles: Profile[];
  userPlan: UserPlan;
  userMarginAndDiscount: UserMarginAndDiscount;
}
