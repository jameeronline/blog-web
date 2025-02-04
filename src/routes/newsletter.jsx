import React, { useEffect, useState } from "react";
import { capitalizeString } from "@utilities/functions";

//supabase
import { supabase } from "@/server/client";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let { data, error } = await supabase
        .from("newsletter-subscription")
        .select("*");

      if (error) {
        console.error(error);
      } else {
        console.log(data);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !name) {
      setError("Both fields are required.");
      return;
    }

    const { data, error } = await supabase
      .from("newsletter-subscription")
      .insert([{ email, name }]);

    if (error) {
      setError(`Error: ${error.message}`);
    } else {
      setSuccess("Successfully subscribed!");
      setEmail("");
      setName("");
    }
  };

  return (
    <div>
      <h2>Newsletter</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="text-sm font-semibold flex mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Jhone Deo"
            className="relative w-full h-12 px-4 transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-primary-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold flex mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="example@example.com"
            className="relative w-full h-12 px-4 transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-primary-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center h-12 gap-2 px-6 text-base font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-primary-600 hover:bg-primary-700 focus:bg-primary-700 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300 disabled:shadow-none"
        >
          Subscribe
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default Newsletter;
