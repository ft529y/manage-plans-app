const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <footer className="text-violet-50 bg-slate-700 py-8 flex justify-center fixed bottom-0 w-full">
        <div className="w-1/2">© 2024 Example Inc. All Rights Reserved.</div>
        <div className="w-1/4 flex justify-center">
          <button onClick={scrollToTop}>ページ上部へ戻る</button>
        </div>
      </footer>
    </>
  );
};

export default Footer;
