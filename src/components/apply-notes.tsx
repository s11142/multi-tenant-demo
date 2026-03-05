import { Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { ApplyNoteSection } from "@/config/tenants.schema";

type Props = {
  notes: ApplyNoteSection[];
};

export function ApplyNotes({ notes }: Props) {
  if (notes.length === 0) return null;

  return (
    <div className="space-y-3">
      {notes.map((note) => (
        <Alert key={note.heading}>
          <Info />
          <AlertTitle>{note.heading}</AlertTitle>
          <AlertDescription>{note.body}</AlertDescription>
        </Alert>
      ))}
    </div>
  );
}
