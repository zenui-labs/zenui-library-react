import {EmailRecipients, type Contact, type RecipientsValue} from "./EmailRecipients";

const contacts: Contact[] = [
    {name: "Maya Chen", email: "maya@northwind.dev"},
    {name: "Diego Ramos", email: "diego@northwind.dev"},
    {name: "Priya Nair", email: "priya@northwind.dev"},
    {name: "Tom Becker", email: "tom.becker@halcyon.io"},
    {name: "Aisha Bello", email: "aisha@northwind.dev"},
    {name: "Lucas Moreau", email: "lucas@moreau.studio"},
];

const initialRecipients: RecipientsValue = {
    to: [
        {email: "maya@northwind.dev", name: "Maya Chen", valid: true},
        {email: "tom.becker@halcyon.io", name: "Tom Becker", valid: true},
        {email: "priya@northwind", valid: false},
    ],
    cc: [],
};

const EmailRecipientsExample = () => (
    <EmailRecipients
        contacts={contacts}
        companyDomain="northwind.dev"
        defaultValue={initialRecipients}
        subject="Launch review on Thursday"
    />
);

export default EmailRecipientsExample;
