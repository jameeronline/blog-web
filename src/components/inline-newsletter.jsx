import { useState } from "react";
import { z } from "zod";

//import supabase
import { supabase } from "@/server/client";

import { ArrowUpRightIcon } from "@heroicons/react/24/solid";

const validateNewsLetterForm = z.object({
  email: z.string().email().nonempty(),
});

const InlineNewsLetter = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewsletterSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = "";

    //data validation
    const isValid = validateNewsLetterForm.safeParse({
      email: email,
    });

    if (!isValid.success) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("newsletter-subscription")
      .insert([{ email, name }]);

    if (error) {
      setError(`Error: ${error.message}`);
      setLoading(false);
    } else {
      setSuccess("Successfully subscribed!");
      setLoading(false);
      setEmail("");
    }

    console.log(isValid.success);
  };

  return (
    <>
      <hr className="w-full h-[1px] bg-gray-300 rounded-full my-8" />
      <section className="text-center">
        <p className="text-primary-600 text-sm mb-2">Newsletters</p>
        <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8">
          Stories and interviews
        </h2>
        <p className="text-base md:text-xl text-typography-secondary max-w-screen-sm mx-auto mb-4 md:mb-8">
          Subscribe to learn about new product features, the latest in
          technology, solutions, and updates.
        </p>
        <form
          action=""
          className="mb-2 max-w-xl mx-auto"
          onSubmit={handleNewsletterSignup}
        >
          <div className="flex flex-col md:flex-row gap-2 mx-auto">
            <input
              id="newsletter-email"
              type="email"
              name="newsletter-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="relative w-full h-12 px-4 transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-primary-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center h-12 gap-2 px-6 text-base font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-primary-600 hover:bg-primary-700 focus:bg-primary-700 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300 disabled:shadow-none"
            >
              <span>{loading && <span>loading...</span>}Subscribe</span>
            </button>
          </div>

          {error && <span>Please enter a valid email</span>}
          {success && <span>{success}</span>}
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
