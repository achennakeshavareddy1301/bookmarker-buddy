import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";

const urlSchema = z.string().url("Please enter a valid URL (include https://)");

interface AddBookmarkFormProps {
  onAdd: (title: string, url: string) => Promise<void>;
}

export function AddBookmarkForm({ onAdd }: AddBookmarkFormProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [urlError, setUrlError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUrlError("");

    const result = urlSchema.safeParse(url.trim());
    if (!result.success) {
      setUrlError(result.error.errors[0].message);
      return;
    }

    if (!title.trim()) return;

    setSubmitting(true);
    try {
      await onAdd(title.trim(), url.trim());
      setTitle("");
      setUrl("");
    } catch {
      // error handled in hook
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">Add Bookmark</h2>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={200}
          className="flex-1"
        />
        <div className="flex flex-1 flex-col">
          <Input
            placeholder="https://example.com"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (urlError) setUrlError("");
            }}
            required
            maxLength={2000}
            className={urlError ? "border-destructive" : ""}
          />
          {urlError && (
            <span className="mt-1 text-xs text-destructive">{urlError}</span>
          )}
        </div>
        <Button type="submit" disabled={submitting || !title.trim() || !url.trim()} className="gap-1.5">
          <Plus className="h-4 w-4" />
          {submitting ? "Adding…" : "Add"}
        </Button>
      </div>
    </form>
  );
}
