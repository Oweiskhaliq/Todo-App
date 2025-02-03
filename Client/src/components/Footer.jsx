const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-3 mt-10">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Todo App. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
