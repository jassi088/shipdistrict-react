import { Fragment } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/routes/guards';
import Layout from '@/features/layouts/main-layout';
import { lazyLoad } from '@/utils/loadable';
import { Paths } from '@/constants';
import { useAuthStore } from '@/stores';
import { strings } from '@/utils/helpers';
import ModuleLoader from '@/components/common/loaders/module-loader';

const DashboardPage = lazyLoad(
  () => import('@/features/base/dashboard/page'),
  (module) => module.default,
);

const InboxPage = lazyLoad(
  () => import('@/features/base/inbox/page'),
  (module) => module.default,
);

const ArchivePage = lazyLoad(
  () => import('@/features/base/archive/page'),
  (module) => module.default,
);

const TrashPage = lazyLoad(
  () => import('@/features/base/trash/page'),
  (module) => module.default,
);

const InvoicesPage = lazyLoad(
  () => import('@/features/base/invoices/page'),
  (module) => module.default,
);

const PackagesPage = lazyLoad(
  () => import('@/features/base/packages/page'),
  (module) => module.default,
);

const AccountSettingPage = lazyLoad(
  () => import('@/features/base/account-setting/page'),
  (module) => module.default,
);

const CustomerListPage = lazyLoad(
  () => import('@/features/base/customer-list/page'),
  (module) => module.default,
  {
    fallback: <ModuleLoader />,
  },
);

const ShipmentsListPage = lazyLoad(
  () => import('@/features/base/shipments/page'),
  (module) => module.default,
);

const SubAdminListPage = lazyLoad(
  () => import('@/features/base/sub-admin-list/page'),
  (module) => module.default,
);

const ShippingRequestsPage = lazyLoad(
  () => import('@/features/base/shipping-requests/page'),
  (module) => module.default,
);

const MailboxPage = lazyLoad(
  () => import('@/features/base/mailbox/page'),
  (module) => module.default,
);

const MailboxRequestPage = lazyLoad(
  () => import('@/features/base/mailbox-request/page'),
  (module) => module.default,
);

const AddressListPage = lazyLoad(
  () => import('@/features/base/address-list/page'),
  (module) => module.default,
);

const AnalyticsReportsPage = lazyLoad(
  () => import('@/features/base/analytics-reports/page'),
  (module) => module.default,
);

const MandatoryInvoicesPage = lazyLoad(
  () => import('@/features/base/mandatory-invoices/page'),
  (module) => module.default,
);

const InvoicesBillingPage = lazyLoad(
  () => import('@/features/base/invoices-billing/page'),
  (module) => module.default,
);

const SubAdminInvoicesPage = lazyLoad(
  () => import('@/features/base/sub-admin-invoices/page'),
  (module) => module.default,
);

const CarrierPage = lazyLoad(
  () => import('@/features/base/configuration/carrier/page'),
  (module) => module.default,
);

const PlansPage = lazyLoad(
  () => import('@/features/base/configuration/plans/page'),
  (module) => module.default,
);

const StorePage = lazyLoad(
  () => import('@/features/base/configuration/store/page'),
  (module) => module.default,
);

const MarginDiscountPage = lazyLoad(
  () => import('@/features/base/configuration/margin-discount/page'),
  (module) => module.default,
);

const SettingPage = lazyLoad(
  () => import('@/features/base/configuration/setting/page'),
  (module) => module.default,
);

const FAQSPage = lazyLoad(
  () => import('@/features/base/faqs/page'),
  (module) => module.default,
);

const AddSubAdminPage = lazyLoad(
  () => import('@/features/base/sub-admin-list/add-sub-admin'),
  (module) => module.default,
);

const AddCustomerPage = lazyLoad(
  () => import('@/features/base/customer-list/add-customer'),
  (module) => module.default,
  {
    fallback: <ModuleLoader size="screen" />,
  },
);

const AddSenderDetailPage = lazyLoad(
  () => import('@/features/base/shipments/create-shipment/add-sender-detail'),
  (module) => module.default,
  {
    fallback: <ModuleLoader size="screen" />,
  },
);

const AddReceiverDetailPage = lazyLoad(
  () => import('@/features/base/shipments/create-shipment/add-receiver-detail'),
  (module) => module.default,
  {
    fallback: <ModuleLoader size="screen" />,
  },
);

const PackageInformationPage = lazyLoad(
  () => import('@/features/base/shipments/create-shipment/package-information'),
  (module) => module.default,
  {
    fallback: <ModuleLoader size="screen" />,
  },
);

const AddPlanPage = lazyLoad(
  () => import('@/features/base/configuration/plans/add-plan'),
  (module) => module.default,
  {
    fallback: <ModuleLoader size="screen" />,
  },
);

const AddStorePage = lazyLoad(
  () => import('@/features/base/configuration/store/add-store'),
  (module) => module.default,
  {
    fallback: <ModuleLoader size="screen" />,
  },
);

export const BaseRoutes = () => {
  const { isAuthenticated, user } = useAuthStore();
  return (
    <Fragment>
      <Route
        element={
          <ProtectedRoute
            isRouteAccessible={
              isAuthenticated && ['SUPER_ADMIN', 'SUB_ADMIN', 'CUSTOMER'].includes(user?.role.code ?? '')
            }
            redirectRoute={Paths.LOGIN}
          />
        }
      >
        <Route
          path={Paths.DASHBOARD}
          element={
            <Layout>
              <DashboardPage />
            </Layout>
          }
        />
      </Route>
      <Route
        element={
          <ProtectedRoute
            isRouteAccessible={isAuthenticated && ['CUSTOMER'].includes(user?.role.code ?? '')}
            redirectRoute={Paths.LOGIN}
          />
        }
      >
        <Route
          path={Paths.INBOX}
          element={
            <Layout>
              <InboxPage />
            </Layout>
          }
        />
      </Route>
      <Route
        element={
          <ProtectedRoute
            isRouteAccessible={isAuthenticated && ['CUSTOMER'].includes(user?.role.code ?? '')}
            redirectRoute={Paths.LOGIN}
          />
        }
      >
        <Route
          path={Paths.ARCHIVE}
          element={
            <Layout>
              <ArchivePage />
            </Layout>
          }
        />
      </Route>
      <Route
        element={
          <ProtectedRoute
            isRouteAccessible={isAuthenticated && ['CUSTOMER'].includes(user?.role.code ?? '')}
            redirectRoute={Paths.LOGIN}
          />
        }
      >
        <Route
          path={Paths.TRASH}
          element={
            <Layout>
              <TrashPage />
            </Layout>
          }
        />
      </Route>
      <Route
        element={
          <ProtectedRoute
            isRouteAccessible={isAuthenticated && ['CUSTOMER'].includes(user?.role.code ?? '')}
            redirectRoute={Paths.LOGIN}
          />
        }
      >
        <Route
          path={Paths.INVOICES}
          element={
            <Layout>
              <InvoicesPage />
            </Layout>
          }
        />
      </Route>
      <Route
        element={
          <ProtectedRoute
            isRouteAccessible={isAuthenticated && ['CUSTOMER'].includes(user?.role.code ?? '')}
            redirectRoute={Paths.LOGIN}
          />
        }
      >
        <Route
          path={Paths.PACKAGES}
          element={
            <Layout>
              <PackagesPage />
            </Layout>
          }
        />
      </Route>
      <Route
        element={
          <ProtectedRoute
            isRouteAccessible={isAuthenticated && ['CUSTOMER'].includes(user?.role.code ?? '')}
            redirectRoute={Paths.LOGIN}
          />
        }
      >
        <Route
          path={Paths.ACCOUNT_SETTINGS}
          element={
            <Layout>
              <AccountSettingPage />
            </Layout>
          }
        />
      </Route>
      <Route
        element={
          <ProtectedRoute
            isRouteAccessible={isAuthenticated && ['SUPER_ADMIN', 'SUB_ADMIN'].includes(user?.role.code ?? '')}
            redirectRoute={Paths.LOGIN}
          />
        }
      >
        <Route path={Paths.CUSTOMER_LIST}>
          <Route
            index
            element={
              <Layout>
                <CustomerListPage />
              </Layout>
            }
          />
          <Route path={strings.normalizeRoute(Paths.CREATE)} element={<AddCustomerPage />} />
        </Route>
      </Route>

      <Route
        element={
          <ProtectedRoute
            isRouteAccessible={isAuthenticated && ['SUPER_ADMIN'].includes(user?.role.code ?? '')}
            redirectRoute={Paths.LOGIN}
          />
        }
      >
        <Route path={Paths.SUB_ADMINS}>
          <Route
            index
            element={
              <Layout>
                <SubAdminListPage />
              </Layout>
            }
          />
          <Route path={strings.normalizeRoute(Paths.CREATE)} element={<AddSubAdminPage />} />
        </Route>
      </Route>
      <Route
        element={
          <ProtectedRoute
            isRouteAccessible={isAuthenticated && ['SUPER_ADMIN', 'CUSTOMER'].includes(user?.role.code ?? '')}
            redirectRoute={Paths.LOGIN}
          />
        }
      >
        <Route
          path={Paths.SHIPMENTS}
          element={
            <Layout>
              <ShipmentsListPage />
            </Layout>
          }
        />
      </Route>
      <Route
        element={
          <ProtectedRoute
            isRouteAccessible={isAuthenticated && ['SUPER_ADMIN', 'SUB_ADMIN'].includes(user?.role.code ?? '')}
            redirectRoute={Paths.LOGIN}
          />
        }
      >
        <Route
          path={Paths.MAILBOX}
          element={
            <Layout>
              <MailboxPage />
            </Layout>
          }
        />
      </Route>
      <Route
        element={
          <ProtectedRoute
            isRouteAccessible={isAuthenticated && ['SUPER_ADMIN'].includes(user?.role.code ?? '')}
            redirectRoute={Paths.LOGIN}
          />
        }
      >
        <Route
          path={Paths.SHIPPING_REQUESTS}
          element={
            <Layout>
              <ShippingRequestsPage />
            </Layout>
          }
        />
      </Route>
      <Route
        element={
          <ProtectedRoute
            isRouteAccessible={isAuthenticated && ['SUPER_ADMIN', 'SUB_ADMIN'].includes(user?.role.code ?? '')}
            redirectRoute={Paths.LOGIN}
          />
        }
      >
        <Route
          path={Paths.MAILBOX_REQUESTS}
          element={
            <Layout>
              <MailboxRequestPage />
            </Layout>
          }
        />
      </Route>
      <Route
        element={
          <ProtectedRoute
            isRouteAccessible={isAuthenticated && ['SUPER_ADMIN', 'CUSTOMER'].includes(user?.role.code ?? '')}
            redirectRoute={Paths.LOGIN}
          />
        }
      >
        <Route
          path={Paths.ADDRESS_LIST}
          element={
            <Layout>
              <AddressListPage />
            </Layout>
          }
        />
      </Route>
      <Route
        element={
          <ProtectedRoute
            isRouteAccessible={isAuthenticated && ['SUPER_ADMIN'].includes(user?.role.code ?? '')}
            redirectRoute={Paths.LOGIN}
          />
        }
      >
        <Route
          path={Paths.ANALYTICS_REPORTS}
          element={
            <Layout>
              <AnalyticsReportsPage />
            </Layout>
          }
        />
      </Route>
      <Route
        element={
          <ProtectedRoute
            isRouteAccessible={isAuthenticated && ['SUB_ADMIN'].includes(user?.role.code ?? '')}
            redirectRoute={Paths.LOGIN}
          />
        }
      >
        <Route
          path={Paths.MANDATORY_INVOICES}
          element={
            <Layout>
              <MandatoryInvoicesPage />
            </Layout>
          }
        />
      </Route>
      <Route
        element={
          <ProtectedRoute
            isRouteAccessible={isAuthenticated && ['SUPER_ADMIN', 'SUB_ADMIN'].includes(user?.role.code ?? '')}
            redirectRoute={Paths.LOGIN}
          />
        }
      >
        <Route
          path={Paths.INVOICES_BILLINGS}
          element={
            <Layout>
              <InvoicesBillingPage />
            </Layout>
          }
        />
      </Route>
      <Route
        element={
          <ProtectedRoute
            isRouteAccessible={isAuthenticated && ['SUPER_ADMIN'].includes(user?.role.code ?? '')}
            redirectRoute={Paths.LOGIN}
          />
        }
      >
        <Route
          path={Paths.SUB_ADMIN_INVOICES}
          element={
            <Layout>
              <SubAdminInvoicesPage />
            </Layout>
          }
        />
      </Route>

      <Route path={Paths.CONFIGURATION}>
        <Route
          element={
            <ProtectedRoute
              isRouteAccessible={isAuthenticated && ['SUPER_ADMIN', 'SUB_ADMIN'].includes(user?.role.code ?? '')}
              redirectRoute={Paths.LOGIN}
            />
          }
        >
          <Route
            path={strings.normalizeRoute(Paths.CARRIER)}
            element={
              <Layout>
                <CarrierPage />
              </Layout>
            }
          />
        </Route>

        <Route
          element={
            <ProtectedRoute
              isRouteAccessible={isAuthenticated && ['SUPER_ADMIN', 'SUB_ADMIN'].includes(user?.role.code ?? '')}
              redirectRoute={Paths.LOGIN}
            />
          }
        >
          <Route
            path={strings.normalizeRoute(Paths.PLAN)}
            element={
              <Layout>
                <PlansPage />
              </Layout>
            }
          />
        </Route>

        <Route
          element={
            <ProtectedRoute
              isRouteAccessible={isAuthenticated && ['SUPER_ADMIN', 'SUB_ADMIN'].includes(user?.role.code ?? '')}
              redirectRoute={Paths.LOGIN}
            />
          }
        >
          <Route path={strings.normalizeRoute(Paths.PLAN) + Paths.ADD_PLAN} element={<AddPlanPage />} />
        </Route>

        <Route
          element={
            <ProtectedRoute
              isRouteAccessible={isAuthenticated && ['SUPER_ADMIN', 'SUB_ADMIN'].includes(user?.role.code ?? '')}
              redirectRoute={Paths.LOGIN}
            />
          }
        >
          <Route
            path={strings.normalizeRoute(Paths.STORE)}
            element={
              <Layout>
                <StorePage />
              </Layout>
            }
          />
          <Route path={strings.normalizeRoute(Paths.STORE) + Paths.ADD_STORE} element={<AddStorePage />} />
        </Route>
        <Route
          element={
            <ProtectedRoute
              isRouteAccessible={isAuthenticated && ['SUPER_ADMIN'].includes(user?.role.code ?? '')}
              redirectRoute={Paths.LOGIN}
            />
          }
        >
          <Route
            path={strings.normalizeRoute(Paths.MARGIN_DISCOUNT)}
            element={
              <Layout>
                <MarginDiscountPage />
              </Layout>
            }
          />
        </Route>
        <Route
          element={
            <ProtectedRoute
              isRouteAccessible={isAuthenticated && ['SUPER_ADMIN', 'SUB_ADMIN'].includes(user?.role.code ?? '')}
              redirectRoute={Paths.LOGIN}
            />
          }
        >
          <Route
            path={strings.normalizeRoute(Paths.SETTING)}
            element={
              <Layout>
                <SettingPage />
              </Layout>
            }
          />
        </Route>
      </Route>
      <Route
        element={
          <ProtectedRoute
            isRouteAccessible={isAuthenticated && ['SUPER_ADMIN'].includes(user?.role.code ?? '')}
            redirectRoute={Paths.LOGIN}
          />
        }
      >
        <Route
          path={Paths.FAQS}
          element={
            <Layout>
              <FAQSPage />
            </Layout>
          }
        />

        {/* Create shipment */}
        <Route
          path={Paths.CREATE_SHIPMENT}
          element={
            <ProtectedRoute
              isRouteAccessible={isAuthenticated && ['SUPER_ADMIN', 'CUSTOMER'].includes(user?.role.code ?? '')}
              redirectRoute={Paths.LOGIN}
            />
          }
        >
          <Route index element={<Navigate to={strings.normalizeRoute(Paths.ADD_SENDER_ADDRESS)} replace />} />
          <Route path={strings.normalizeRoute(Paths.ADD_SENDER_ADDRESS)} element={<AddSenderDetailPage />} />
          <Route path={strings.normalizeRoute(Paths.ADD_RECEIVER_ADDRESS)} element={<AddReceiverDetailPage />} />
          <Route path={strings.normalizeRoute(Paths.PACKAGE_INFORMATION)} element={<PackageInformationPage />} />
        </Route>
      </Route>
    </Fragment>
  );
};
