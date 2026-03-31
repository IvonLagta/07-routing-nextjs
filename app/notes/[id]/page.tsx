import NoteDetailsClient from "./NoteDetails.client";
import NotePreviewClient from "@/app/@modal/(.)notes/[id]/NotePreview.client";

export default function NoteDetailsPage() {
  return (
    <>
      <NoteDetailsClient />
      <NotePreviewClient />
    </>
  );
}
