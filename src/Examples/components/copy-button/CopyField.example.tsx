import {CopyField, CopyFieldCard} from "./CopyField";

const CopyFieldExample = () => (
    <CopyFieldCard title="Share Atlas mobile app" description="Anyone with the link can view. Only members can edit.">
        <CopyField label="Invite link" hint="Expires in 7 days." value="https://app.example.com/join/atlas-7Qm2Kx"/>
        <CopyField
            label="Deploy key"
            hint="Store it somewhere safe. You will not be able to see it again after you leave."
            value="dk_prod_6hT9wQ2mZrV4cX8pLs1B"
            secret
        />
    </CopyFieldCard>
);

export default CopyFieldExample;
