'use client';

import { useState } from 'react';

type ContactFormValues = {
  fullName: string;
  subject: string;
  email: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validate(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (values.fullName.trim().length < 3) {
    errors.fullName = 'Full name must be at least 3 characters.';
  }

  if (values.subject.trim().length < 3) {
    errors.subject = 'Subject must be at least 3 characters.';
  }

  if (!isValidEmail(values.email.trim())) {
    errors.email = 'Please enter a valid email.';
  }

  if (values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }
  return errors;
}

export default function ContactPage() {
  const [values, setValues] = useState<ContactFormValues>({
    fullName: '',
    subject: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(false);

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
      setValues({ fullName: '', subject: '', email: '', message: '' });
    }
  };
  return (
    <main className="mx-auto max-w-xl p-4">
      <h1 className="text-2xl font-semibold">Contact</h1>
      <p className="mt-1 text-gray-600">Send us a message.</p>
      {submitted && (
        <div className="mt-4 rounded-md border border-green-200 bg-green-50 p-3 text-green-800">
          Message sent.
        </div>
      )}
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium">
            Full name
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            value={values.fullName}
            onChange={onChange}
            className="mt-1 w-full rounded-md border p-2"
            placeholder="Your full name here."
            required
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
          )}
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            name="subject"
            value={values.subject}
            onChange={onChange}
            className="mt-1 w-full rounded-md border p-2"
            placeholder="Subject"
            required
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={values.email}
            onChange={onChange}
            className="mt-1 w-full rounded-md border p-2"
            placeholder="exampleMail@example.com"
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={values.message}
            onChange={onChange}
            className="mt-1 w-full rounded-md border p-2"
            rows={6}
            placeholder="Write your message..."
            required
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 px-4 py-2 font-medium text-white transition duration-200 hover:bg-indigo-700 hover:scale-105 active:scale-95"
        >
          Send message
        </button>
      </form>
    </main>
  );
}
