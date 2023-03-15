type Props = {
  title: string | undefined;
};

function SidebarServerTitle({ title }: Props) {
  return (
    <div className="w-full flex justify-start bg-[#16141f] px-2 py-3 border-b-[1px] border-r-[1px] border-gray-700">
      <span className="text-center text-lg mx-3 font-bold">
        {title || "Unnamed"}
      </span>
    </div>
  );
}

export default SidebarServerTitle;
