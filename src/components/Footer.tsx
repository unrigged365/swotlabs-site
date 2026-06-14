"use client";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 md:px-12 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight">
            <span className="text-accent">swot</span>labs
          </span>
          <span className="text-xs text-muted">AGI Limited</span>
        </div>

        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} SwotLabs AGI Limited. All rights
          reserved. Registered in Ireland.
        </p>

        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-xs text-muted hover:text-accent transition-colors"
            data-cursor-hover
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="text-xs text-muted hover:text-accent transition-colors"
            data-cursor-hover
          >
            Twitter
          </a>
          <a
            href="#"
            className="text-xs text-muted hover:text-accent transition-colors"
            data-cursor-hover
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
