import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { NoteTag } from "@/types/note";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotePage({ params }: Props) {
  const { slug } = await params;

  // Определяем категорию (тег)
  const category = (slug[0] === "all" ? undefined : slug[0]) as
    | NoteTag
    | undefined;

  const currentPage = slug.length > 1 ? parseInt(slug[1], 10) || 1 : 1;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", currentPage, "", category],
    queryFn: () => fetchNotes("", currentPage, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
