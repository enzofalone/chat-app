type Props = {
  title: string | undefined;
};

function SidebarServerTitle({ title }: Props) {
  return (
    <div className="w-full flex justify-start bg-[#16141f] px-2 py-4 border-b-[1px] border-r-[1px] border-gray-700 min-h-[60px] max-h-[60px]">
      <span className="text-center text-lg mx-3 font-bold py-auto">
        {title || "Unnamed"}
      </span>
    </div>
  );
}

export default SidebarServerTitle;
