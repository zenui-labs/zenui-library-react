import {AppDownload, PhoneStatsMockup, PlaceholderQrCode, type DailyStat} from "./AppDownload";

// Kilometers run each day this week.
const week: DailyStat[] = [
    {day: "M", value: 5.2}, {day: "T", value: 0}, {day: "W", value: 8.4}, {day: "T", value: 3.1},
    {day: "F", value: 0}, {day: "S", value: 12.6}, {day: "S", value: 6.0},
];

// Replace with a request to your SMS provider.
const sendLink = () => new Promise<void>((resolve) => window.setTimeout(resolve, 900));

const AppDownloadExample = () => (
    <AppDownload
        appName="Stride"
        appStoreHref="#"
        playStoreHref="#"
        rating={{score: 4.9, count: 38000}}
        qrCode={<PlaceholderQrCode label="QR code that opens the Stride download page"/>}
        preview={
            <PhoneStatsMockup
                days={week}
                total="35.3 km"
                progress={0.72}
                goalLabel="of 50 km goal"
                achievement={{title: "New 5K best", detail: "24:12, down 41 seconds"}}
            />
        }
        onSendLink={sendLink}
    />
);

export default AppDownloadExample;
