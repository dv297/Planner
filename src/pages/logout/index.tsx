import Link from 'next/link';

const Logout = () => {
  return (
    <div className="py-32 flex flex-col justify-center items-center">
      <h1 className="mb-6">Thanks for using Planner!</h1>
      <p className="mb-2">You have been signed out.</p>
      <p className="mb-2">
        Use the link below to go back to the home page or feel free to close
        your browser or tab.
      </p>
      <Link href="/">Home</Link>
    </div>
  );
};

export default Logout;