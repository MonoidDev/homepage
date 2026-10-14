import LeftTriangleMobile from '@/assets/images/LeftTriangleMobile.svg';

export interface GoBackTriangleTitle {
  noIcon?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export const GoBackTriangleTitle: React.FC<GoBackTriangleTitle> = (props) => {
  const { children, onClick, noIcon = false } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-white h-[100px] flex items-center pl-[1rem]"
    >
      <div className="flex items-center text-black leading-none gap-x-[1.25rem]">
        {!noIcon && <LeftTriangleMobile aria-hidden="true" />}
        <div className="text-[45px] font-loose font-bold leading-none pt-[7px]">
          {children}
        </div>
      </div>
    </button>
  );
};
