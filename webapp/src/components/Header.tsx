import { useNavigate } from "react-router-dom";
import { Star, User, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface HeaderProps {
  title?: string;
}

export function Header({ title = "Memento Mori" }: HeaderProps) {
  const navigate = useNavigate();

  // Template data - replace with backend data later
  const userData = {
    name: "Alice Johnson",
    email: "alice@example.com",
    avatar: "", // Empty for now, will use fallback
    isVerified: true, // Template verification status
  };

  const menuItems = [
    {
      label: "Manage Trusts",
      onClick: () => navigate("/fundertrusts"),
    },
    {
      label: "Create New Trust",
      onClick: () => navigate("/config"),
    },
    {
      label: "Verify Identity",
      onClick: () => navigate("/zkpassport"),
    },
  ];

  return (
    <div className="flex justify-between items-center mb-8 sticky top-0 z-50 bg-white dark:bg-gray-900 py-4 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {title}
      </h1>

      <div className="flex items-center gap-4">
        {/* Account Section */}
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userData.avatar} alt={userData.name} />
            <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {userData.name}
              </p>
              {userData.isVerified ? (
                <CheckCircle
                  className="h-4 w-4 text-green-500"
                  aria-label="Verified"
                />
              ) : (
                <AlertTriangle
                  className="h-4 w-4 text-yellow-500"
                  aria-label="Not Verified"
                />
              )}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {userData.email}
            </p>
          </div>
        </div>

        {/* Menu Button */}
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-12 w-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Star className="h-8 w-8" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {menuItems.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={item.onClick}
                  className="cursor-pointer"
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default Header;
