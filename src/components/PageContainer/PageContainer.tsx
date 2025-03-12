import { ReactNode } from "react";
import { useSide } from "../../stores/Sidebar/sidebar";

interface ContainerProps {
  children: ReactNode;
  title: string;
}

export default function PageContainer({ children, title }: ContainerProps) {
  const { expanded } = useSide();
  return (
    <section
      className={`flex flex-col h-screen w-full lg:z-40 text-center absolute transition-all duration-300 top-0 ${
        expanded
          ? "lg:left-64 lg:w-[calc(100%-16rem)]"
          : "lg:left-16 lg:w-[calc(100%-4rem)] z-40"
      }`}
    >
      {title && (
        <div
          className={`py-6 lg:pl-6 text-4xl font-light text-neutral-900 border-b border-red-100 shadow-sm h-fit text-start pl-16`}
        >
          <h1 className="text-lg md:text-xl lg:text-2xl">{title}</h1>
        </div>
      )}

      <div className={`flex-1 min-h-0`}>{children}</div>
    </section>
  );
}
