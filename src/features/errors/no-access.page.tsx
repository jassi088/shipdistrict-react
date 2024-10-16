import { Fragment } from 'react';
import SEO from '@/components/common/seo';
import { useNavigate } from 'react-router-dom';

const NoAccessPage = () => {
  const navigate = useNavigate();
  const back = () => navigate(-1);

  return (
    <Fragment>
      <SEO
        title="403 - No Access"
        description="You are not authorized to access this resource"
        name="Shipdistrict"
        type="webapp"
      />
      <div className="flex justify-center items-center h-full">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">403</h1>
          <h3 className="text-2xl font-bold mb-2">Access Denied</h3>
          <p className="text-lg mb-4">Sorry, you do not have the necessary permissions to view this page.</p>
          <button
            onClick={back}
            className="bg-primary text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
          >
            Back To Previous Page
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default NoAccessPage;
