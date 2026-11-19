'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Mail,
  Send,
  User,
  AtSign,
  MessageSquare,
  FileText,
  CheckCircle,
  AlertCircle,
  Github,
  Linkedin,
  Code,
  MapPin,
  Phone
} from 'lucide-react';
import { ContactMessageSchema } from '@/lib/validations/schemas';
import { z } from 'zod';
import { ProfileData, SiteSettingsData } from '@/types';

type FormData = z.infer<typeof ContactMessageSchema>;

interface ContactSectionProps {
  profile?: ProfileData | null;
  settings?: SiteSettingsData | null;
}

export default function ContactSection({ profile, settings }: ContactSectionProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ContactMessageSchema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Failed to submit message');
      }

      setSubmitted(true);
      reset();
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const email = profile?.email || settings?.primaryEmail || 'prasad14bhumi@gmail.com';
  const phone = profile?.phone || settings?.contactPhone || '+91 62908 15479';
  const location = profile?.location || 'Kolkata, West Bengal, India';
  const github = settings?.githubUrl || 'https://github.com/bhumiprasad14';
  const linkedin = settings?.linkedinUrl || 'https://linkedin.com/in/bhumiprasad';

  return (
    <section id="contact" className="relative py-24 w-full border-t border-slate-900 bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono font-semibold tracking-wider text-violet-300 uppercase px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 mb-3">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-2xl mb-3">
            Let&apos;s Build Something{' '}
            <span className="bg-gradient-to-r from-violet-300 via-purple-200 to-indigo-200 bg-clip-text text-transparent">
              Together.
            </span>
          </h2>
          <p className="text-slate-400 text-sm max-w-xl">
            Open to discussing software engineering opportunities, backend microservices, and technical collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-violet-500/20 space-y-4">
              <h3 className="text-lg font-bold text-white mb-2">Direct Contact</h3>

              <a
                href={`mailto:${email}`}
                className="flex items-center space-x-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-violet-500/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-violet-950/60 border border-violet-500/30 flex items-center justify-center text-violet-300 group-hover:border-violet-400 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Email</span>
                  <span className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-violet-300 transition-colors">
                    {email}
                  </span>
                </div>
              </a>

              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="flex items-center space-x-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-violet-500/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-violet-950/60 border border-violet-500/30 flex items-center justify-center text-violet-300 group-hover:border-violet-400 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Phone</span>
                  <span className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-violet-300 transition-colors">
                    {phone}
                  </span>
                </div>
              </a>

              <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-violet-950/60 border border-violet-500/30 flex items-center justify-center text-violet-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Location</span>
                  <span className="text-xs sm:text-sm font-medium text-slate-200">
                    {location}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Profiles Card */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-violet-500/20">
              <h4 className="text-sm font-bold text-white mb-3">Professional Profiles</h4>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-violet-500/40 text-center text-slate-300 hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5 mx-auto mb-1 text-slate-400" />
                  <span className="text-[11px] font-mono block">GitHub</span>
                </a>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-violet-500/40 text-center text-slate-300 hover:text-violet-300 transition-colors"
                >
                  <Linkedin className="w-5 h-5 mx-auto mb-1 text-violet-400" />
                  <span className="text-[11px] font-mono block">LinkedIn</span>
                </a>
                <a
                  href="https://leetcode.com/u/bhumiprasad14"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-violet-500/40 text-center text-slate-300 hover:text-amber-300 transition-colors"
                >
                  <Code className="w-5 h-5 mx-auto mb-1 text-amber-400" />
                  <span className="text-[11px] font-mono block">LeetCode</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-8 rounded-2xl bg-slate-900/60 border border-violet-500/20">
              <h3 className="text-xl font-bold text-white mb-2">Send an Inquiry</h3>
              <p className="text-xs text-slate-400 mb-6">
                Fill out the form below. Messages are securely stored and forwarded directly.
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-violet-950/40 border border-violet-500/40 text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-violet-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">Message Received!</h4>
                  <p className="text-xs text-slate-300">
                    Thank you for reaching out. I will review your message and reply promptly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 px-4 py-1.5 rounded-lg bg-violet-500 hover:bg-violet-400 text-white font-semibold text-xs transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-red-950/50 border border-red-800/60 text-xs text-red-300 flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Your Name *
                      </label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
                        <input
                          {...register('name')}
                          type="text"
                          placeholder="Jane Doe"
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-violet-500 focus:outline-none text-xs text-white placeholder-slate-600 transition-colors"
                        />
                      </div>
                      {errors.name && (
                        <span className="text-[11px] text-red-400 mt-1 block">
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Your Email *
                      </label>
                      <div className="relative">
                        <AtSign className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
                        <input
                          {...register('email')}
                          type="email"
                          placeholder="jane@company.com"
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-violet-500 focus:outline-none text-xs text-white placeholder-slate-600 transition-colors"
                        />
                      </div>
                      {errors.email && (
                        <span className="text-[11px] text-red-400 mt-1 block">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Subject
                    </label>
                    <div className="relative">
                      <FileText className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
                      <input
                        {...register('subject')}
                        type="text"
                        placeholder="Software Engineering Inquiry"
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-violet-500 focus:outline-none text-xs text-white placeholder-slate-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Message *
                    </label>
                    <div className="relative">
                      <MessageSquare className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
                      <textarea
                        {...register('message')}
                        rows={4}
                        placeholder="Hello Bhumi, I would like to discuss..."
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-violet-500 focus:outline-none text-xs text-white placeholder-slate-600 transition-colors resize-none"
                      />
                    </div>
                    {errors.message && (
                      <span className="text-[11px] text-red-400 mt-1 block">
                        {errors.message.message}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-500 via-purple-500 to-violet-600 hover:from-violet-400 hover:to-purple-500 text-white font-semibold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-violet-500/20 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? 'Sending Transmission...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
