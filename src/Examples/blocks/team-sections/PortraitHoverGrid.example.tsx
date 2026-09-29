import {PortraitHoverGrid, type Advisor, type PortraitMember} from "./PortraitHoverGrid";

const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=500&h=500&fit=crop&crop=faces&q=75`;

const members: PortraitMember[] = [
    {name: "Zara Ahmed", role: "Founder and CEO", photo: photo("1531123897727-8f129e1688ce"), links: {linkedin: "#", twitter: "#"}},
    {name: "Oscar Lindgren", role: "Founding Engineer", photo: photo("1560250097-0b93528c311a"), links: {github: "#", linkedin: "#"}},
    {name: "Chiara Bianchi", role: "Head of Design", photo: photo("1544005313-94ddf0286df2"), links: {site: "#", twitter: "#"}},
    {name: "Kenji Mori", role: "Machine Learning Lead", photo: photo("1506794778202-cad84cf45f1d"), links: {github: "#", site: "#"}},
    {name: "Amelia Scott", role: "Head of Growth", photo: photo("1580489944761-15a19d654956"), links: {linkedin: "#"}},
    {name: "Theo Laurent", role: "Infrastructure Engineer", photo: photo("1500648767791-00dcc994a43e"), links: {github: "#", twitter: "#"}},
    {name: "Nia Johnson", role: "Customer Lead", photo: photo("1573496359142-b8d87734a5a2"), links: {linkedin: "#"}},
    {name: "Mateus Costa", role: "Full-stack Engineer", photo: photo("1507003211169-0a1dd7228f2d"), links: {github: "#", linkedin: "#"}},
];

const advisors: Advisor[] = [
    {name: "Dr. Helen Park", note: "Former research director, speech recognition"},
    {name: "Rafael Ortiz", note: "Co-founder of two developer tools companies"},
    {name: "Sunita Rao", note: "Partner, Northgate Ventures"},
];

const PortraitHoverGridExample = () => <PortraitHoverGrid members={members} advisors={advisors}/>;

export default PortraitHoverGridExample;
