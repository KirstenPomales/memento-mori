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
import logoImage from "/images/logo.png";

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
    <div className="flex justify-between items-center mb-8 sticky top-0 z-50 py-4 border-b border-border">
      <div className="flex items-center gap-3">
        <img
          src={logoImage}
          alt="Memento Mori Logo"
          className="h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/")}
        />
        <h1
          className="text-3xl font-bold text-foreground font-unifraktur cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/")}
        >
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Account Section */}
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted border border-border">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userData.avatar} alt={userData.name} />
            <AvatarFallback className="bg-primary/10 text-primary">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-foreground">
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
          </div>
        </div>

        {/* Menu Button */}
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-12 w-12 bg-muted border border-border hover:bg-accent"
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
