import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { AddBookmarkForm } from "@/components/AddBookmarkForm";
import { BookmarkList } from "@/components/BookmarkList";
import { useAuth } from "@/hooks/useAuth";
import { useBookmarks } from "@/hooks/useBookmarks";

export default function Dashboard() {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { bookmarks, loading: bookmarksLoading, addBookmark, deleteBookmark } = useBookmarks(user?.id);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        onSignOut={signOut}
        userEmail={user.email}
        userAvatar={user.user_metadata?.avatar_url}
      />
      <main className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:px-6">
        <AddBookmarkForm onAdd={addBookmark} />
        <div>
          <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">
            Your Bookmarks
            {!bookmarksLoading && bookmarks.length > 0 && (
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({bookmarks.length})
              </span>
            )}
          </h2>
          <BookmarkList bookmarks={bookmarks} loading={bookmarksLoading} onDelete={deleteBookmark} />
        </div>
      </main>
    </div>
  );
}
