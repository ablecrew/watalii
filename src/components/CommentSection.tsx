import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send, User, Heart, Loader2 } from "lucide-react";
import { Button } from "./ui/Button";
import { usePodcastComments } from "../hooks/usePodcastComments";
import type { PodcastComment } from "../lib/supabase";

interface CommentSectionProps {
  podcastId: string | undefined;
}

export function CommentSection({ podcastId }: CommentSectionProps) {
  const { comments, loading, addComment } = usePodcastComments(podcastId);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !name.trim()) return;

    setSubmitting(true);
    await addComment(name, email, content);
    setSubmitting(false);
    setContent("");
  };

  return (
    <section className="rounded-3xl glass p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-primary" />
        <h3 className="font-display text-2xl font-bold text-warm-900 dark:text-white">
          Discussion
        </h3>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
          {comments.length}
        </span>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="rounded-xl border border-warm-200 bg-white/50 px-4 py-3 text-warm-900 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email (optional)"
            className="rounded-xl border border-warm-200 bg-white/50 px-4 py-3 text-warm-900 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts on this episode..."
          required
          rows={3}
          className="w-full rounded-xl border border-warm-200 bg-white/50 px-4 py-3 text-warm-900 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
        <Button type="submit" variant="primary" disabled={submitting} glow>
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Posting...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Post Comment
            </>
          )}
        </Button>
      </form>

      {/* Comments List */}
      {loading ? (
        <div className="flex h-32 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : comments.length === 0 ? (
        <div className="rounded-2xl bg-white/30 p-8 text-center dark:bg-white/5">
          <MessageCircle className="mx-auto h-10 w-10 text-primary/50" />
          <p className="mt-3 text-warm-600 dark:text-white/60">
            No comments yet. Be the first to start the discussion!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <CommentItem key={comment.id} comment={comment} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}

function CommentItem({ comment, index }: { comment: PodcastComment; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="rounded-2xl bg-white/40 p-4 dark:bg-white/5"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <User className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-warm-900 dark:text-white">
              {comment.author_name}
            </p>
            <span className="text-xs text-warm-500 dark:text-white/50">
              {new Date(comment.created_at).toLocaleDateString()}
            </span>
          </div>
          <p className="mt-1 text-warm-700 dark:text-white/70">{comment.content}</p>
          <div className="mt-2 flex items-center gap-4">
            <button className="flex items-center gap-1 text-xs text-warm-500 transition-colors hover:text-primary dark:text-white/50">
              <Heart className="h-3.5 w-3.5" />
              {comment.likes_count || 0}
            </button>
            <button className="text-xs text-warm-500 transition-colors hover:text-primary dark:text-white/50">
              Reply
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
