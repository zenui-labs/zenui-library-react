import {CorkboardWall, type CorkNote} from "./CorkboardWall";

const notes: CorkNote[] = [
    {id: "ines", paper: "index", pin: "red", x: 17, y: 7, tilt: -3, name: "Ines Duarte", role: "Head of Operations, Porto Fresh Co.", quote: "We moved 1,900 pages out of three old wikis over one weekend. On Monday nobody asked where anything was."},
    {id: "kwame", paper: "sticky", pin: "blue", x: 46, y: 6, tilt: 2.5, name: "Kwame Mensah", role: "Engineering manager, Tallyworks", quote: "Our standup is a page now. It saves us 40 minutes a day and I actually read it."},
    {id: "ren", paper: "polaroid", pin: "white", x: 79, y: 5, tilt: 4, name: "Ren Takahashi", role: "Designer, Oda Studio", quote: "Best onboarding doc we've ever had."},
    {id: "marta", paper: "notebook", pin: "green", x: 29, y: 50, tilt: 1.5, name: "Marta Kowalczyk", role: "Security lead, Fennel Bank", quote: "Audit asked for two years of access logs. I exported them before my coffee got cold."},
    {id: "owen", paper: "sticky", color: "mint", pin: "yellow", x: 64, y: 55, tilt: -4, name: "Owen Price", role: "Founder, Lowtide Coffee", quote: "Search finds the thing I half-remember writing in March. That alone pays for it."},
];

const CorkboardWallExample = () => (
    <CorkboardWall
        notes={notes}
        strings={[["ines", "marta"], ["kwame", "owen"]]}
        title="Pinned up by the people who use Halden"
    />
);

export default CorkboardWallExample;
