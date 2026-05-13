import { UserLibrary } from "@features/user-library/ui/UserLibrary";

export function LibraryPage() {
  return (
    <div className="flex justify-center py-4 min-w-full max-w-4xl">
      <UserLibrary />
    </div>
  );
}
