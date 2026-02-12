import { ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Bookmark } from "@/types/bookmark";
import { format } from "date-fns";

interface BookmarkItemProps {
  bookmark: Bookmark;
  onDelete: (id: string) => void;
}

export function BookmarkItem({ bookmark, onDelete }: BookmarkItemProps) {
  return (
    <div className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
        <img
          src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(bookmark.url)}&sz=32`}
          alt=""
          className="h-5 w-5"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-heading text-sm font-semibold text-foreground">
          {bookmark.title}
        </h3>
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link mt-0.5 inline-flex items-center gap-1 truncate text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          <span className="truncate">{bookmark.url}</span>
          <ExternalLink className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover/link:opacity-100" />
        </a>
        <p className="mt-1 text-[10px] text-muted-foreground/60">
          {format(new Date(bookmark.created_at), "MMM d, yyyy")}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(bookmark.id)}
        className="shrink-0 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
        aria-label="Delete bookmark"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
