import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Map form data to EmailJS variables
    const templateParams = {
      from_name: formData.name, // from_name = user's name
      from_email: formData.email, // from_email = user's email
      message: formData.message, // message = the actual message content
      to_name: "Shreeyush Dhungana", // The recipient's name (use the appropriate recipient)
    };

    emailjs
      .send(
        "service_nafblh4", // Replace with your EmailJS service ID
        "template_un4p32d", // Replace with your EmailJS template ID
        templateParams, // Pass the templateParams here
        "HvweXgj1qE55FcIgJ" // Replace with your EmailJS Public API Key
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          setFormData({ name: "", email: "", message: "" });

          // Display success message in toast
          toast.success("Your message was sent successfully! Thank you!");
        },
        (error) => {
          console.error("Email send failed:", error.text);

          // Display error message in toast
          toast.error(
            "There was an error sending your message. Please try again later."
          );
        }
      );
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          aria-describedby="name-description"
        />
        <p id="name-description" className="mt-1 text-sm text-gray-500">
          Enter your full name
        </p>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          aria-describedby="email-description"
        />
        <p id="email-description" className="mt-1 text-sm text-gray-500">
          Well never share your email with anyone else
        </p>
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          aria-describedby="message-description"
        ></textarea>
        <p id="message-description" className="mt-1 text-sm text-gray-500">
          Tell us about your project or inquiry
        </p>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Send Message
      </button>
    </motion.form>
  );
}
