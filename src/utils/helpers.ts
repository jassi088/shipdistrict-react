/* eslint-disable no-console */

import _ from 'lodash';

export function util(param: any) {
  return {
    isEmpty: function () {
      if (param === undefined || param === null) {
        return true;
      }
      if (_.isNumber(param) && param === 0) {
        return true;
      }
      if (_.isString(param) && (param === '0' || param === '' || param.match(/^ *$/) !== null)) {
        return true;
      }
      if (_.isArray(param) && _.isEmpty(param)) {
        return true;
      }

      return false;
    },
    hasValue: function () {
      return !this.isEmpty();
    },
  };
}

export const strings = {
  capitalize: (text: string) => {
    return text.replace(/\b\w/g, (match) => match.toUpperCase());
  },

  titleCase: (str: string) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  },

  normalizeRoute: (path: string) => {
    return path.startsWith('/') ? path.substring(1) : path;
  },
};

export const storage = {
  get: (key: string) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting value from local storage:', error);
      return null;
    }
  },

  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting value in local storage:', error);
    }
  },

  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing value from local storage:', error);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing local storage:', error);
    }
  },
};
