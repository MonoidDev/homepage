import { makeStrings } from '@monoid-dev/use-strings';
import { useForm } from 'react-hook-form';

export const useContactStrings = makeStrings({
  'en-US': {
    contactTitle: 'CONTACT SHEET',
    firstName: 'First Name',
    lastName: 'Last Name',
    emailAddress: 'Email Address',
    messageBoard: (
      <>
        MESSAGE
        <br />
        BOARD
      </>
    ),
    budget: 'Budget',
    delivery: 'Delivery',
    send: 'SEND',
  },
  'ja-JP': {
    contactTitle: 'CONTACT SHEET',
    firstName: '姓',
    lastName: '名',
    emailAddress: 'Eメール',
    messageBoard: (
      <>
        お問い合わせ
        <br />
        内容
      </>
    ),
    budget: 'ご予算',
    delivery: '納期',
    send: '送信',
  },
  'zh-CN': {
    contactTitle: '联系我们',
    firstName: '姓',
    lastName: '名',
    emailAddress: '邮箱号',
    messageBoard: (
      <>
        我们可以为您
        <br />
        做些什么？
      </>
    ),
    budget: '预算',
    delivery: '开发周期',
    send: '发送',
  },
});

export const useContactForm = () => {
  return useForm({
    mode: 'onChange',
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      project_type: [] as string[],
      budget: 0,
      delivery: 0,
      message: '',
    },
  });
};
