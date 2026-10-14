import { makeStrings } from '@monoid-dev/use-strings';
import { useForm } from 'react-hook-form';

import type { SkillItem } from './SkillInput';
import { FileItem } from '@/apis/files';

export const recruitFormDefaultValues = {
  name: '',
  email: '',
  github_id: '',
  website: '',
  language_english: 0,
  language_chinese: 0,
  language_japanese: 0,
  technology_skills: [] as SkillItem[],
  resume_urls: [] as FileItem[],
  education_experience: '',
  work_experience: '',
  cover_letter: '',
};

export type RecruitForm = typeof recruitFormDefaultValues;

export const useRecruitForm = () => {
  const strings = useCandidateStrings();
  const form = useForm({
    defaultValues: recruitFormDefaultValues,
    shouldUnregister: false,
    mode: 'onTouched',
  });
  const required = {
    setValueAs: (v: string) => v.trim(),
    validate: (v: string) => !!v.trim() || strings.requiredError,
  };
  const { register } = form;
  return {
    ...form,
    registry: {
      name: () => register('name', required),
      email: () =>
        register('email', {
          ...required,
          validate: (v) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || strings.emailError,
        }),
      github_id: () => register('github_id', required),
      website: () =>
        register('website', {
          ...required,
          validate: (v) => {
            try {
              const url = new URL(v.trim());
              return (
                (['http:', 'https:'].includes(url.protocol) &&
                  !!url.hostname) ||
                strings.urlError
              );
            } catch {
              return strings.urlError;
            }
          },
        }),
      education_experience: () => register('education_experience', required),
      work_experience: () => register('work_experience', required),
      technology_skills: () =>
        register('technology_skills', {
          validate: (v) =>
            v.some((item) => !!item.value.trim() && !item.isEditing) ||
            strings.skillError,
        }),
      cover_letter: () =>
        register('cover_letter', { setValueAs: (v: string) => v.trim() }),
    },
  };
};

// Product Manager is the only role without a required technology-skills field.
export const requiresTechSkills = (slug: string) => slug !== 'PRODUCTMANAGER';

export const educationPlaceholder = `
2015.9 - 2019.6 Monoid University, Bachelor of XX
2019.9 - 2022.6 Monoid University, Master of YY
`.trim();

export const workExperiencePlaceholder = `
2020.1 - 2021.4, XX Internship at Acme Inc.
`.trim();

export const isProgrammer = (name: string) =>
  ['FRONTENDENGINEER', 'BACKENDENGINEER'].includes(name);

export const isDesigner = (name: string) =>
  ['UIUXDESIGNER', 'PRODUCTMANAGER'].includes(name);

export const useCandidateStrings = makeStrings({
  'en-US': {
    application: 'APPLICATION',
    submit: 'SUBMIT',
    submitting: 'Sending…',
    apply: 'APPLY',
    applyRole: 'Apply for this role',
    back: 'Back',
    exit: 'Exit',
    next: 'Next',
    jobs: 'Back to jobs',
    home: 'Home',
    contact: 'Contact Details',
    name: 'Name',
    email: 'Email',
    github: 'GitHub ID',
    website: 'Portfolio website',
    languages: 'Language Skills',
    english: 'English',
    chinese: 'Chinese',
    japanese: 'Japanese',
    levels: ['Not specified', 'Beginner', 'Intermediate', 'Advanced', 'Native'],
    experiences: 'Experiences',
    education: 'Education',
    educationExample: educationPlaceholder,
    workExample: workExperiencePlaceholder,
    skills: 'Technology Skills',
    work: 'Work Experience',
    resume: 'Resume / attachments',
    cover: 'Cover letter',
    required: 'Required',
    optional: 'Optional',
    requirements:
      'Fields marked * are required. Languages, attachments and cover letter are optional.',
    requiredError: 'Enter a value; spaces alone are not enough.',
    emailError: 'Enter a valid email address.',
    urlError: 'Enter a full website URL starting with https:// or http://.',
    skillError: 'Add at least one skill.',
    upload: 'Choose PDF files',
    uploadHint: 'PDF only, up to 8 MiB per file. You can also drag files here.',
    fileError: 'Choose PDF files of 8 MiB or less.',
    remove: 'Remove',
    addSkill: 'Add skill',
    editSkill: 'Edit skill',
    skillPlaceholder: 'Skill (e.g. Python)',
    save: 'Save',
    cancel: 'Cancel',
    discard: 'Discard your application and return to the role?',
    step: 'Step',
    failed:
      'Your application was not sent. Please try again. Your entries and uploaded files are kept for this retry.',
    thanks: 'THANK YOU',
    confirmed: 'Your application has been received.',
    confirmationDetail: 'Thank you for your interest in Monoid.',
    notHiring: 'We are not currently hiring for this role.',
    description: 'Job description',
  },
  'ja-JP': {
    application: '応募フォーム',
    submit: '送信',
    submitting: '送信中…',
    apply: '応募',
    applyRole: 'この職種に応募する',
    back: '戻る',
    exit: '終了',
    next: '次へ',
    jobs: '募集職種に戻る',
    home: 'ホーム',
    contact: '連絡先',
    name: '氏名',
    email: 'メールアドレス',
    github: 'GitHub ID',
    website: 'ポートフォリオのURL',
    languages: '語学スキル',
    english: '英語',
    chinese: '中国語',
    japanese: '日本語',
    levels: ['未指定', '初級', '中級', '上級', 'ネイティブ'],
    experiences: '経歴',
    education: '学歴',
    educationExample: '2015年9月〜2019年6月 Monoid大学 XX学部卒業',
    workExample: '2020年1月〜2021年4月 Acme社 開発職',
    skills: '技術スキル',
    work: '職歴',
    resume: '履歴書・添付資料',
    cover: '志望動機',
    required: '必須',
    optional: '任意',
    requirements:
      '* は必須項目です。語学スキル、添付資料、志望動機は任意です。',
    requiredError: '空白以外の内容を入力してください。',
    emailError: '有効なメールアドレスを入力してください。',
    urlError: 'https:// または http:// で始まるURLを入力してください。',
    skillError: 'スキルを1つ以上追加してください。',
    upload: 'PDFを選択',
    uploadHint:
      'PDFのみ、1ファイル8 MiB以下。ここにドラッグして追加することもできます。',
    fileError: '8 MiB以下のPDFを選択してください。',
    remove: '削除',
    addSkill: 'スキルを追加',
    editSkill: 'スキルを編集',
    skillPlaceholder: 'スキル（例：Python）',
    save: '保存',
    cancel: 'キャンセル',
    discard: '入力内容を破棄して募集職種に戻りますか？',
    step: 'ステップ',
    failed:
      '応募を送信できませんでした。再度お試しください。入力内容とアップロード済みのファイルは再試行のために保持されています。',
    thanks: '応募完了',
    confirmed: 'ご応募を受け付けました。',
    confirmationDetail:
      'Monoidにご関心をお寄せいただき、ありがとうございます。',
    notHiring: '現在、この職種の募集は行っておりません。',
    description: '募集要項',
  },
  'zh-CN': {
    application: '申请表',
    submit: '提交',
    submitting: '提交中…',
    apply: '申请',
    applyRole: '申请此职位',
    back: '返回',
    exit: '退出',
    next: '下一步',
    jobs: '返回职位列表',
    home: '首页',
    contact: '联系信息',
    name: '姓名',
    email: '电子邮箱',
    github: 'GitHub ID',
    website: '作品集网址',
    languages: '语言能力',
    english: '英语',
    chinese: '中文',
    japanese: '日语',
    levels: ['未指定', '初级', '中级', '高级', '母语'],
    experiences: '经历',
    education: '教育经历',
    educationExample: '2015年9月—2019年6月 Monoid大学 XX专业学士',
    workExample: '2020年1月—2021年4月 Acme公司 软件开发',
    skills: '技术技能',
    work: '工作经历',
    resume: '简历 / 附件',
    cover: '求职信',
    required: '必填',
    optional: '选填',
    requirements: '* 为必填项。语言能力、附件和求职信为选填项。',
    requiredError: '请输入内容，不能仅包含空格。',
    emailError: '请输入有效的电子邮箱地址。',
    urlError: '请输入以 https:// 或 http:// 开头的完整网址。',
    skillError: '请至少添加一项技能。',
    upload: '选择PDF文件',
    uploadHint: '仅限PDF，每个文件不超过8 MiB。也可将文件拖放到此处。',
    fileError: '请选择不超过8 MiB的PDF文件。',
    remove: '删除',
    addSkill: '添加技能',
    editSkill: '编辑技能',
    skillPlaceholder: '技能（例如Python）',
    save: '保存',
    cancel: '取消',
    discard: '放弃填写的申请并返回职位页面？',
    step: '步骤',
    failed: '申请未发送，请重试。填写的内容和已上传的文件将保留以便重试。',
    thanks: '谢谢',
    confirmed: '已收到您的申请。',
    confirmationDetail: '感谢您对Monoid的关注。',
    notHiring: '目前暂无此职位的招聘计划。',
    description: '职位详情',
  },
});
