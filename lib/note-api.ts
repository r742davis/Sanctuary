import axios from "axios";

export type Note = {
  title: string;
  content: string;
  date?: Date;
};

export const getNotes = async () => {
  try {
    const { data: notes } = await axios.get<Note[]>(process.env.NEXT_PUBLIC_HEROKU_API_URI as string);
    return notes;
  } catch (error) {
    throw new Error("Failed to fetch note data");
  }
};

export const createNote = async (newNote: Note) => {
  try {
    const { data: note } = await axios.post<Note>(`${process.env.NEXT_PUBLIC_HEROKU_API_URI as string}new`, newNote);
    return note;
  } catch (error) {
    throw new Error("Failed to create note");
  }
};

export const updateNote = async (updatedNote: Note) => {
  try {
    const { data: note } = await axios.put<Note>(`${process.env.NEXT_PUBLIC_HEROKU_API_URI as string}new`, updatedNote);
    return note;
  } catch (error) {
    throw new Error("Failed to update note");
  }
};
