// components/LoadingScreen.tsx
import { IoIosFitness } from "react-icons/io";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <IoIosFitness className="text-red-600 w-28 h-28 animate-spin" />
    </div>
  );
};

export default LoadingScreen;
