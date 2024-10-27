import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className="bg-white text-gray-700 dark:text-[#ACACAC] dark:bg-[#010103] min-h-screen">
        {children}
      </div>
    </div>
  );
}
