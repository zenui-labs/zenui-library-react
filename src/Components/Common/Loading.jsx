import { Helmet } from "react-helmet";

const Loading = () => {
  return (
    <>
      <Helmet>
        <link rel="preload" as="image" href="/free-palestine.png" />
      </Helmet>

      <div
        className="loading-container bg-white dark:bg-[#0f172a] text-black dark:text-white"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          transition: "background-color 0.3s ease",
        }}
      >
        <img
          src="/free-palestine.png"
          alt="Free Palestine"
          style={{ width: "200px", height: "auto" }}
        />
      </div>
    </>
  );
};

export default Loading;
