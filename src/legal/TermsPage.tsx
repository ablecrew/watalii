import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Scale, CheckCircle } from "lucide-react";

const termsData = [
  {
    number: "01",
    title: "Acceptance of Terms",
    content: "By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not access or use the Services.",
  },
  {
    number: "02",
    title: "Eligibility",
    content: "You must be at least 18 years old to use our Services. By using the Services, you represent and warrant that you meet this requirement and have the legal capacity to enter into these Terms.",
  },
  {
    number: "03",
    title: "User Accounts",
    content: "When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.",
  },
  {
    number: "04",
    title: "Intellectual Property",
    content: "All content on the Services, including text, graphics, logos, images, audio, video, and software, is the property of WATALII or its content suppliers and is protected by Kenyan and international copyright laws.",
  },
  {
    number: "05",
    title: "User Content",
    content: "By submitting content (including comments, stories, or media) to the Services, you grant WATALII a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute such content in connection with the Services.",
  },
  {
    number: "06",
    title: "Prohibited Conduct",
    content: "You agree not to violate any applicable law, infringe the rights of others, upload viruses, engage in disruptive activity, or impersonate any person or entity.",
  },
  {
    number: "07",
    title: "Limitation of Liability",
    content: "To the maximum extent permitted by Kenyan law, WATALII shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the Services.",
  },
  {
    number: "08",
    title: "Governing Law",
    content: "These Terms shall be governed by and construed in accordance with the laws of the Republic of Kenya. Any dispute arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Kenya.",
  },
  {
    number: "09",
    title: "Changes to Terms",
    content: "We reserve the right to modify these Terms at any time. We will notify users of material changes by posting the new Terms on this page with an updated effective date.",
  },
  {
    number: "10",
    title: "Contact Information",
    content: "For questions regarding these Terms, please contact us at: wataliipodcast01@gmail.com | +254 725 513280 | Westlands, Nairobi, Kenya",
  },
];

export function TermsPage() {
  return (
    <div className="min-h-screen pb-24 pt-24 bg-[#f8f4eb] dark:bg-[#1a1209]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-white/50 px-4 py-2 text-sm font-medium text-warm-800 hover:bg-white/70 dark:bg-white/10 dark:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </motion.div>

        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-primary/10"><Scale className="h-8 w-8 text-primary" /></div>
          </div>
          <h1 className="font-display text-5xl font-bold text-warm-900 dark:text-white">Terms of Service</h1>
          <p className="mt-3 text-warm-600 dark:text-white/60">Effective July 2026 • Governed by Kenyan Law</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {termsData.map((term, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="group rounded-3xl bg-white dark:bg-[#1a1209] border border-warm-200 dark:border-white/10 p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary font-display text-xl font-bold group-hover:bg-primary group-hover:text-white transition-all">
                  {term.number}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-2xl font-bold text-warm-900 dark:text-white mb-4">
                    {term.title}
                  </h3>
                  <p className="text-warm-600 dark:text-white/70 leading-relaxed">
                    {term.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-primary to-secondary text-white text-center">
          <CheckCircle className="mx-auto h-10 w-10 mb-4" />
          <p className="text-lg">These Terms constitute a legally binding agreement between you and WATALII Podcast.</p>
          <p className="mt-2 text-white/80">Questions? Contact us at wataliipodcast01@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
