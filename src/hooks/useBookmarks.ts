import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Bookmark } from "@/types/bookmark";
import { toast } from "sonner";

export function useBookmarks(userId: string | undefined) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load bookmarks");
      console.error(error);
    } else {
      setBookmarks(data ?? []);
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  // Realtime subscription
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel("bookmarks-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setBookmarks((prev) => {
            if (prev.some((b) => b.id === (payload.new as Bookmark).id)) return prev;
            return [payload.new as Bookmark, ...prev];
          });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setBookmarks((prev) =>
            prev.filter((b) => b.id !== (payload.old as Partial<Bookmark>).id)
          );
        }
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR") {
          toast.error("Realtime connection failed. Changes may not sync.");
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const addBookmark = async (title: string, url: string) => {
    if (!userId) return;
    const { error } = await supabase
      .from("bookmarks")
      .insert({ title, url, user_id: userId });

    if (error) {
      toast.error("Failed to add bookmark");
      throw error;
    }
    toast.success("Bookmark added!");
  };

  const deleteBookmark = async (id: string) => {
    // Optimistic update
    const prev = bookmarks;
    setBookmarks((b) => b.filter((bm) => bm.id !== id));

    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", id);

    if (error) {
      setBookmarks(prev);
      toast.error("Failed to delete bookmark");
    } else {
      toast.success("Bookmark deleted");
    }
  };

  return { bookmarks, loading, addBookmark, deleteBookmark };
}
