import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BellIcon, SearchIcon, HelpCircleIcon, ChevronDownIcon, Menu } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HeaderProps {
  user: {
    name?: string;
    username: string;
    email: string;
    companyName: string;
  };
  onOpenMobileMenu: () => void;
}

export function Header({ user, onOpenMobileMenu }: HeaderProps) {
  const { toast } = useToast();
  const { logoutMutation } = useAuth();
  const [, navigate] = useLocation();
  const [notificationCount] = useState(3);

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have 3 unread notifications",
    });
  };
  
  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        toast({
          title: "Logged out successfully",
          description: "You have been logged out of your account",
        });
        navigate("/auth");
      }
    });
  };

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden text-neutral-600"
            onClick={onOpenMobileMenu}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-600">
                <path d="M10.2857 5.14286C10.2857 4.51023 10.5368 3.90315 10.9834 3.45657C11.43 3.00999 12.0371 2.75886 12.6697 2.75886H19.3304C19.963 2.75886 20.5701 3.00999 21.0166 3.45657C21.4632 3.90315 21.7143 4.51023 21.7143 5.14286V8C21.7143 8.21217 21.6291 8.41566 21.4769 8.56569C21.3247 8.71571 21.1183 8.8 20.9036 8.8H19.0964C18.8817 8.8 18.6753 8.71571 18.5231 8.56569C18.3709 8.41566 18.2857 8.21217 18.2857 8V6.10057C18.2857 5.88841 18.2006 5.68491 18.0484 5.53489C17.8961 5.38486 17.6897 5.30057 17.475 5.30057H14.525C14.3103 5.30057 14.1039 5.38486 13.9516 5.53489C13.7994 5.68491 13.7143 5.88841 13.7143 6.10057V8C13.7143 8.21217 13.6291 8.41566 13.4769 8.56569C13.3247 8.71571 13.1183 8.8 12.9036 8.8H11.0964C10.8817 8.8 10.6753 8.71571 10.5231 8.56569C10.3709 8.41566 10.2857 8.21217 10.2857 8V5.14286Z" fill="currentColor"/>
                <path d="M8 10.2857H24V13.7143H8V10.2857Z" fill="currentColor"/>
                <path d="M26.2857 15.4286V23.0171C26.2857 24.3455 25.7594 25.6193 24.8212 26.5575C23.883 27.4957 22.6092 28.022 21.2809 28.022H10.7191C9.39077 28.022 8.11697 27.4957 7.17878 26.5575C6.24059 25.6193 5.71429 24.3455 5.71429 23.0171V15.4286H26.2857Z" fill="currentColor"/>
                <path d="M10.2857 22.8571C10.2857 23.5028 10.5413 24.1219 10.9964 24.5771C11.4515 25.0322 12.0707 25.2878 12.7164 25.2878C13.3621 25.2878 13.9813 25.0322 14.4364 24.5771C14.8915 24.1219 15.1471 23.5028 15.1471 22.8571C15.1471 22.2114 14.8915 21.5923 14.4364 21.1371C13.9813 20.682 13.3621 20.4264 12.7164 20.4264C12.0707 20.4264 11.4515 20.682 10.9964 21.1371C10.5413 21.5923 10.2857 22.2114 10.2857 22.8571Z" fill="currentColor"/>
                <path d="M16.853 22.8571C16.853 23.5028 17.1086 24.1219 17.5637 24.5771C18.0188 25.0322 18.638 25.2878 19.2837 25.2878C19.9294 25.2878 20.5486 25.0322 21.0037 24.5771C21.4588 24.1219 21.7144 23.5028 21.7144 22.8571C21.7144 22.2114 21.4588 21.5923 21.0037 21.1371C20.5486 20.682 19.9294 20.4264 19.2837 20.4264C18.638 20.4264 18.0188 20.682 17.5637 21.1371C17.1086 21.5923 16.853 22.2114 16.853 22.8571Z" fill="currentColor"/>
              </svg>
              <span className="ml-3 text-neutral-900 font-bold text-xl">Exvorta</span>
            </div>
          </Link>
        </div>

        <div className="hidden sm:flex items-center space-x-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search"
              className="bg-neutral-50 border border-neutral-200 rounded-md py-1 px-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-48"
            />
            <SearchIcon className="absolute right-2 top-2.5 text-neutral-400 w-4 h-4" />
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative p-2 bg-neutral-50 rounded-full hover:bg-neutral-100"
                  onClick={handleNotificationClick}
                >
                  <BellIcon className="h-5 w-5 text-neutral-600" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 text-xs px-1.5 py-0.5 rounded-full bg-destructive text-white">
                      {notificationCount}
                    </span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>You have {notificationCount} unread notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="p-2 bg-neutral-50 rounded-full hover:bg-neutral-100"
                >
                  <HelpCircleIcon className="h-5 w-5 text-neutral-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Help Center and Resources</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-emerald-600 text-white">
                    {(user.name || user.companyName || user.username)
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-neutral-800">{user.name || user.companyName}</span>
                  <span className="text-xs text-neutral-500">{user.email}</span>
                </div>
                <ChevronDownIcon className="h-4 w-4 text-neutral-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => navigate("/profile")}>Profile</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => navigate("/settings")}>Settings</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => navigate("/billing")}>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex sm:hidden">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative p-2 hover:bg-neutral-100 rounded-full"
                  onClick={handleNotificationClick}
                >
                  <BellIcon className="h-5 w-5 text-neutral-600" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 text-xs px-1.5 py-0.5 rounded-full bg-destructive text-white">
                      {notificationCount}
                    </span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>You have {notificationCount} unread notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="p-2 hover:bg-neutral-100 rounded-full">
                <Avatar className="h-5 w-5">
                  <AvatarFallback className="bg-emerald-600 text-white text-xs">
                    {(user.name || user.companyName || user.username)
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => navigate("/profile")}>Profile</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => navigate("/settings")}>Settings</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => navigate("/billing")}>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
