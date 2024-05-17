import axios from "axios";

export type NoteData = {
  title: string;
  content: string;
  date?: Date;
};

export const getNotes = async () => {
  try {
    const { data: notes } = await axios.get<NoteData[]>(process.env.NEXT_PUBLIC_HEROKU_API_URI as string);
    return notes;
  } catch (error) {
    throw new Error("Failed to fetch note data");
  }
};

export const createNote = async (newNote: NoteData) => {
  try {
    const { data: note } = await axios.post<NoteData>(
      `${process.env.NEXT_PUBLIC_HEROKU_API_URI as string}new`,
      newNote
    );
    return note;
  } catch (error) {
    throw new Error("Failed to create note");
  }
};
