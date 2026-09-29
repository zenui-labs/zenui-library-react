import {NoteWithUndo, type NoteContact} from "./NoteWithUndo";

const contact: NoteContact = {name: "Grace Holloway", subtitle: "Head of Operations, Tidewater Freight"};

const note = "Prefers email over calls. Renewal is tied to the Q1 budget review, so follow up in the first week of January.";

const NoteWithUndoExample = () => <NoteWithUndo contact={contact} defaultValue={note} lastEdited="Edited by Dana Ruiz on Sep 12"/>;

export default NoteWithUndoExample;
