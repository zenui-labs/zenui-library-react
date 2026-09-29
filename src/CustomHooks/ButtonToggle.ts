import type {Dispatch, SetStateAction} from "react";

type Setter = Dispatch<SetStateAction<boolean>>;

export const useToggleCardView = () => {
    const handleCardViewToggle = (setPreview: Setter, setCode: Setter, isPreview: boolean) => {
        setPreview(isPreview);
        setCode(!isPreview);
    };

    return handleCardViewToggle;
};
