import { BookmarkItem } from "./BookmarkItem";
import { Bookmark as BookmarkIcon } from "lucide-react";
import type { Bookmark } from "@/types/bookmark";
import { Skeleton } from "@/components/ui/skeleton";

interface BookmarkListProps {
  bookmarks: Bookmark[];
  loading: boolean;
  onDelete: (id: string) => void;
}

export function BookmarkList({ bookmarks, loading, onDelete }: BookmarkListProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 py-16 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <BookmarkIcon className="h-7 w-7 text-muted-foreground" />
        </div>
        <h3 className="font-heading text-lg font-semibold text-foreground">
          No bookmarks yet
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Add your first bookmark above to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bookmarks.map((bookmark) => (
        <BookmarkItem key={bookmark.id} bookmark={bookmark} onDelete={onDelete} />
      ))}
    </div>
  );
}
