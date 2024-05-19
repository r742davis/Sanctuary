import { useMutation } from "@tanstack/react-query";
import { createNote, deleteNote, updateNote } from "lib/note-api";
import queryClient from "lib/react-query-client";

const useNoteMutations = () => {
  const onSuccess = () => queryClient.invalidateQueries({ queryKey: ["notes"] });

  const { mutate: deleteNoteMutation } = useMutation({
    mutationFn: deleteNote,
    onSuccess,
  });

  const { mutate: updateNoteMutation } = useMutation({
    mutationFn: updateNote,
    onSuccess,
  });

  const { mutate: createNoteMutation } = useMutation({
    mutationFn: createNote,
    onSuccess,
  });

  return { createNoteMutation, deleteNoteMutation, updateNoteMutation };
};

export default useNoteMutations;
