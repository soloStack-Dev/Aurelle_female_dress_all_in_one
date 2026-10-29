"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiHeart, FiLogOut, FiUser } from "react-icons/fi";
import { useAuth } from "@/lib/store/auth";

export default function AccountMenu() {
  const user = useAuth((state) => state.user);
  const signOut = useAuth((state) => state.signOut);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const closeOnPointer = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", closeOnPointer);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnPointer);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  if (!user) return null;

  const displayName = user.name || user.email.split("@")[0];
  const initial = displayName.trim().charAt(0).toUpperCase() || "A";

  const handleSignOut = () => {
    setOpen(false);
    signOut();
    window.location.replace("/");
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={`Account menu for ${displayName}`}
        aria-haspopup="menu"
        aria-expanded={open}
        className="grid size-8 place-items-center rounded-full border border-ink/15 bg-ink text-[10px] font-semibold text-cream transition-colors hover:bg-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-cream sm:size-10 sm:text-[11px]"
      >
        <span aria-hidden="true">{initial}</span>
      </button>

      {open ? (
        <div
          role="menu"
          aria-label="Account"
          className="absolute right-0 top-12 z-30 w-64 overflow-hidden rounded-2xl border border-ink/10 bg-cream shadow-soft"
        >
          <div className="border-b border-ink/10 px-4 py-4">
            <p className="truncate text-sm font-semibold">{displayName}</p>
            <p className="mt-0.5 truncate text-[11px] text-muted">{user.email}</p>
          </div>
          <div className="p-1.5">
            <Link
              href="/pricing"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs text-ink/75 transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <FiUser className="size-3.5" aria-hidden="true" />
              Membership
            </Link>
            <Link
              href="/collection"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs text-ink/75 transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <FiHeart className="size-3.5" aria-hidden="true" />
              Favorites
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={handleSignOut}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs text-ink/75 transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <FiLogOut className="size-3.5" aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
