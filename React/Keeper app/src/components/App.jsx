import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Note from "./Note";
import notes from "../notes";

export default function App() {
  return (
    <div>
      <Header />
      {notes.map((noteItem) => (
        <Note
          key={noteItem.key}
          title={noteItem.title}
          content={noteItem.content}
        />
      ))}
      <Footer />
    </div>
  );
}
