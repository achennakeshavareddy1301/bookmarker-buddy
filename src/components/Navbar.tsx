import { Bookmark, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onSignOut: () => void;
  userEmail?: string;
  userAvatar?: string;
}

export function Navbar({ onSignOut, userEmail, userAvatar }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Bookmark className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold tracking-tight text-foreground">
            Markly
          </span>
        </div>

        <div className="flex items-center gap-3">
          {userAvatar && (
            <img
              src={userAvatar}
              alt="avatar"
              className="h-8 w-8 rounded-full ring-2 ring-border"
              referrerPolicy="no-referrer"
            />
          )}
          {userEmail && (
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {userEmail}
            </span>
          )}
          <Button variant="ghost" size="sm" onClick={onSignOut} className="gap-1.5 text-muted-foreground hover:text-foreground">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sign out</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
