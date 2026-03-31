import NotesClient from "@/app/notes/Notes.client";
import NotePreviewClient from "@/app/@modal/(.)notes/[id]/NotePreview.client";

export default function NoteDetailsPage() {
  return (
    <>
      <NotesClient />
      <NotePreviewClient />
    </>
  );
}
