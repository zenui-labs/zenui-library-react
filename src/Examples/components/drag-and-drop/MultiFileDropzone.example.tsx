import {MultiFileDropzone} from "./MultiFileDropzone";

// Uses the built-in simulated upload. Pass `upload` to send files to your own server.
const MultiFileDropzoneExample = () => <MultiFileDropzone accept="image/*" maxFileSize={50 * 1024 * 1024}/>;

export default MultiFileDropzoneExample;
