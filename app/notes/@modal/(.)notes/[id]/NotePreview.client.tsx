"use client";

import Modal from "@/components/Modal/Modal";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";
import { useRouter, usePathname } from "next/navigation";

export default function NotePreviewClient() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClose = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }

    const fallback = pathname.startsWith("/notes/filter")
      ? "/notes/filter/all/1"
      : "/notes?page=1";

    router.push(fallback);
  };

  return (
    <Modal onClose={handleClose}>
      <NoteDetailsClient />
    </Modal>
  );
}
