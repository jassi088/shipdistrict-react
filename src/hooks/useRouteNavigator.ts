import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Custom hook to extend React Router's useNavigate with additional navigation functions.
 */
const useRouteNavigator = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Navigate to the previous route in history.
   */
  const goToPreviousRoute = () => {
    navigate(-1);
  };

  /**
   * Navigate to the next route in history.
   * Implemented only if you have custom logic for "next" route, otherwise use standard navigation.
   */
  const goToRoute = (nextPath: string) => {
    navigate(nextPath);
  };

  /**
   * Navigate to a specific route with state.
   * @param {string} path - The path to navigate to.
   * @param {object} state - Optional state to pass with navigation.
   */
  const navigateWithState = (path: string, state: object) => {
    navigate(path, { state });
  };

  /**
   * Navigate to a route with query parameters.
   *
   * @param {string} path - The path to navigate to.
   * @param {Record<string, string>} params - An object of query parameters to append to the URL.
   */
  const goToRouteWithQueryParams = (path: string, params: Record<string, string>) => {
    const query = new URLSearchParams(params).toString();
    navigate(`${path}?${query}`);
  };

  /**
   * Add or update query parameters in the current route without changing the path.
   *
   * @param {Record<string, string>} newParams - The new query parameters to add or update.
   */
  const addQueryParams = (newParams: Record<string, string>) => {
    const currentParams = new URLSearchParams(location.search);
    Object.keys(newParams).forEach((key) => {
      currentParams.set(key, newParams[key]);
    });
    navigate(`${location.pathname}?${currentParams.toString()}`, { replace: true });
  };

  return {
    goToRoute,
    goToPreviousRoute,
    navigateWithState,
    goToRouteWithQueryParams,
    addQueryParams,
  };
};

export default useRouteNavigator;
