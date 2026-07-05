import { Link } from "react-router-dom";
import { Mic, ArrowLeft, Home } from "lucide-react";
import { Button } from "../ui/Button";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f4eb] dark:bg-[#1a1209] px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#C96A2B] to-[#B63A32] text-white">
          <Mic className="h-10 w-10" />
        </div>

        <h1 className="font-display text-7xl font-bold tracking-tight text-warm-900 dark:text-white mb-4">404</h1>
        <h2 className="font-display text-3xl font-bold text-warm-900 dark:text-white mb-4">Page Not Found</h2>

        <p className="text-lg text-warm-600 dark:text-white/70 mb-10">
          The page you're looking for has either been moved, deleted, or never existed.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" variant="primary" className="w-full sm:w-auto">
              <Home className="h-4 w-4 mr-2" />
              Go to Homepage
            </Button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#C96A2B]/40 px-6 py-3 text-sm font-semibold text-[#C96A2B] hover:bg-[#C96A2B]/10 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>

        <div className="mt-12 text-xs text-warm-500 dark:text-white/40">
          WATALII Podcast • Nairobi, Kenya
        </div>
      </div>
    </div>
  );
}
