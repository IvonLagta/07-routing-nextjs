import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.clients";
import { NoteTag } from "@/types/note";

type Props = {
  params: Promise<{ side: string[] }>;
};

export default async function NotePage({ params }: Props) {
  const { side } = await params;
  const category = (side[0] === "all" ? undefined : side[0]) as
    | NoteTag
    | undefined;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", category],
    queryFn: () => fetchNotes("", 1, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
