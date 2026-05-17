import { UserLibrary } from "@features/user-library/ui/UserLibrary";
import { Metadata } from "next";

export const libraryMetadata: Metadata = {
  title: "Библиотека",
  description: "Список всех ваших книг",
};

export default function LibraryPage() {
  return (
    <div className="flex justify-center py-4 min-w-full max-w-4xl">
      <UserLibrary />
    </div>
  );
}
