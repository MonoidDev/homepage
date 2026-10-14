import { useMutation } from 'react-query';

import { PageParams, Paginated } from './utils';
import { invokeHttp } from '@/utils/invokeHttp';

// Form values are integer indices; payload labels remain stable across locales.
export const mapContactBudgetToLabel = (
  step: number,
  defaultLabel: string,
  locale = 'en-US',
) => {
  if (!step) return defaultLabel;
  const millions = Math.min(Math.round(step), 10) * 3;
  const unit =
    locale === 'ja-JP'
      ? `${millions * 100}万円`
      : locale === 'zh-CN'
        ? `${millions * 100}万日元`
        : `${millions}M JPY`;
  return step >= 10 ? `${unit}+` : unit;
};

export const mapContactDeliveryToLabel = (
  step: number,
  defaultLabel: string,
  locale = 'en-US',
) => {
  if (!step) return defaultLabel;
  const months = Math.min(Math.round(step), 6);
  const unit =
    locale === 'ja-JP'
      ? `${months}か月`
      : locale === 'zh-CN'
        ? `${months}个月`
        : `${months} mo.`;
  return step >= 6 ? `${unit}+` : unit;
};

export interface NewContact {
  company: string;
  name: string;
  email: string;
  project_type: string[];
  budget: string;
  delivery: string;
  message: string;
  locale: string;
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
