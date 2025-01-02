const InlineNewsLetter = () => {
  return (
    <>
      <hr className="w-full h-[1px] bg-gray-300 rounded-full my-8" />
      <section className="text-center">
        <p className="text-primary-600 text-sm mb-2">Newsletters</p>
        <h2 className="text-4xl font-bold mb-8">Stories and interviews</h2>
        <p className="text-xl text-typography-secondary max-w-screen-sm mx-auto mb-8">
          Subscribe to learn about new product features, the latest in
          technology, solutions, and updates.
        </p>
        <form action="" className="mb-2 max-w-xl mx-auto">
          <div className="flex gap-4 mx-auto">
            <input
              id="newsletter-email"
              type="email"
              name="newsletter-email"
              placeholder="Enter your email"
              className="relative w-full h-12 px-4 transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-primary-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            />
            <button className="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-primary-500 hover:bg-primary-600 focus:bg-primary-700 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300 disabled:shadow-none">
              <span>Subscribe</span>
            </button>
          </div>
        </form>
        <p className="text-sm text-typography-secondary max-w-screen-sm mx-auto">
          we care about your data in our{" "}
          <a href="#" className="underline">
            Privacy policy
          </a>
        </p>
      </section>
    </>
  );
};

export default InlineNewsLetter;
