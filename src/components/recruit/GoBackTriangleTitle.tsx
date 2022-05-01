import LeftTriangleMobile from '@/assets/images/LeftTriangleMobile.svg';

export interface GoBackTriangleTitle {
  onClick?: () => void;
}

export const GoBackTriangleTitle: React.FC<GoBackTriangleTitle> = (props) => {
  const { children, onClick } = props;

  return (
    <div
      onClick={onClick}
      className="bg-white h-[100px] flex items-center pl-[1rem]"
    >
      <div className="flex items-center text-black leading-none gap-x-[1.25rem]">
        <LeftTriangleMobile />
        <div className="text-[45px] font-loose font-bold leading-none pt-[7px]">
          {children}
        </div>
      </div>
    </div>
  );
};
