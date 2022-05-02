import { useMutation } from 'react-query';

import { PageParams, Paginated } from './utils';
import { invokeHttp } from '@/utils/invokeHttp';

export const mapContactBudgetToLabel = (v: number) => {
  if (v === 0) {
    return 'Budget';
  } else if (v < 2 / 3) {
    return `${Math.floor(v / (1 / 45))}M JPY`;
  } else {
    return `30M JPY~`;
  }
};

export const mapContactDeliveryToLabel = (v: number) => {
  if (v === 0) {
    return 'Delivery';
  } else if (v < 2 / 3) {
    return `${Math.floor(v / (1 / 9))} mo.`;
  } else {
    return `6 mo.~`;
  }
};

export interface NewContact {
  first_name: string;
  last_name: string;
  email: string;
  project_type: string;
  budget: number;
  delivery: number;
  message: string;
}
export interface Contact extends NewContact {
  id: number;
  created_at: string;
  updated_at: string;
}

export const postContacts = async (body: NewContact) => {
  return await invokeHttp('post', '/contacts', undefined, body);
};

export const getContacts = async (params: PageParams) => {
  return await invokeHttp<Paginated<'contacts', Contact>>(
    'get',
    '/contacts',
    params,
  );
};

export const getContactById = async (id: number) => {
  return await invokeHttp<{ contact: Contact }>('get', `/contacts/${id}`);
};

export const usePostContacts = () => useMutation(postContacts);
