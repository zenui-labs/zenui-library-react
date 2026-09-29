import type {Example} from "../../types.ts";
import IconFileUpload from "./IconFileUpload.example.tsx";
import iconFileUploadSource from "./IconFileUpload.example.tsx?raw";
import iconFileUploadComponentSource from "./IconFileUpload.tsx?raw";
import DropzoneFileUpload from "./DropzoneFileUpload.example.tsx";
import dropzoneFileUploadSource from "./DropzoneFileUpload.example.tsx?raw";
import dropzoneFileUploadComponentSource from "./DropzoneFileUpload.tsx?raw";
import FileUploadPanel from "./FileUploadPanel.example.tsx";
import fileUploadPanelSource from "./FileUploadPanel.example.tsx?raw";
import fileUploadPanelComponentSource from "./FileUploadPanel.tsx?raw";
import AvatarUpload from "./AvatarUpload.example.tsx";
import avatarUploadSource from "./AvatarUpload.example.tsx?raw";
import avatarUploadComponentSource from "./AvatarUpload.tsx?raw";

const examples: Example[] = [
    {
        id: "upload_with_icon",
        title: "Upload with icon",
        description: "A file upload area with an icon that shows where to add a file. The picked image replaces it with a preview.",
        component: IconFileUpload,
        source: iconFileUploadSource,
        files: [{name: "IconFileUpload.tsx", source: iconFileUploadComponentSource}],
        minHeight: 380,
    },
    {
        id: "upload_with_button",
        title: "Upload with button",
        description: "A dashed drop area that takes a dropped file or opens the file picker with a browse button.",
        component: DropzoneFileUpload,
        source: dropzoneFileUploadSource,
        files: [{name: "DropzoneFileUpload.tsx", source: dropzoneFileUploadComponentSource}],
    },
    {
        id: "upload_with_heading",
        title: "Upload with heading",
        description: "A file upload area with a heading and a line about the allowed file types, so users know what to add.",
        component: FileUploadPanel,
        source: fileUploadPanelSource,
        files: [{name: "FileUploadPanel.tsx", source: fileUploadPanelComponentSource}],
    },
    {
        id: "profile_upload",
        title: "Profile upload",
        description: "A round profile picture with a button that replaces it in one step.",
        component: AvatarUpload,
        source: avatarUploadSource,
        files: [{name: "AvatarUpload.tsx", source: avatarUploadComponentSource}],
    },
];

export default examples;
