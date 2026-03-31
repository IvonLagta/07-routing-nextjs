"use client";

import { useState } from "react";
import { fetchNotes, createNote, deleteNote } from "@/lib/api";
import css from "./NotesPage.module.css";
import NoteList from "@/components/NoteList/NoteList";
import {
  keepPreviousData,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import NoteForm from "@/components/NoteForm/NoteForm";
import { NoteTag } from "@/types/note";
import { useParams } from "next/navigation";

function NotesClient() {
  const params = useParams();
  const side = params.side as string[];
  const tag = (side[0] === "all" ? undefined : side[0]) as NoteTag | undefined;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["notes", currentPage, query, tag],
    queryFn: () => fetchNotes(query, currentPage, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const createNoteMutation = useMutation({
    mutationFn: (values: { title: string; content: string; tag: NoteTag }) =>
      createNote(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
    onError: () => {
      alert("Ошибка при сохранении заметки, попробуйте снова");
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: () => {
      alert("Ошибка при удалении заметки, попробуйте снова");
    },
  });

  const handleQueryChange = useDebouncedCallback((value: string) => {
    setQuery(value);
    setCurrentPage(1);
  }, 500);

  const onClose = () => {
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const handleCreateNote = async (values: {
    title: string;
    content: string;
    tag: NoteTag;
  }) => {
    await createNoteMutation.mutateAsync(values);
  };

  const handleDeleteNote = async (id: string) => {
    await deleteNoteMutation.mutateAsync(id);
  };

  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={query} onChange={handleQueryChange} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {modalIsOpen && (
        <Modal onClose={onClose}>
          <NoteForm onSubmit={handleCreateNote} onCancel={onClose} />
        </Modal>
      )}
      {data?.notes && data.notes.length > 0 && (
        <NoteList notes={data.notes} onDelete={handleDeleteNote} />
      )}
    </div>
  );
}

export default NotesClient;
