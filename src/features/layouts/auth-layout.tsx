const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative w-full h-screen">
      <video autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover -z-10">
        <source
          src="https://shipdistrict-prod.s3.us-west-2.amazonaws.com/shipdistrict/cd411f2114b45ef2c6ceb27290c7d8f54118a615.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="w-full h-full flex justify-center items-center">
        <div className="px-8 py-12 rounded-xl bg-white shadow-md z-10">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
