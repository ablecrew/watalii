import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";

const privacyPolicies = [
  {
    number: "01",
    title: "Introduction",
    content: "WATALII Podcast respects your privacy and is committed to protecting your personal data in accordance with the Kenya Data Protection Act, 2019. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our website, podcast platform, marketplace, community features, and related services."
  },
  {
    number: "02",
    title: "Data Controller Information",
    content: "WATALII Podcast is the Data Controller responsible for the processing of your personal data. We are registered and operate under the laws of the Republic of Kenya. Our contact details are: wataliipodcast01@gmail.com | +254 725 513280 | Westlands, Nairobi, Kenya."
  },
  {
    number: "03",
    title: "Personal Data We Collect",
    content: "We collect Identity Data (name, username, date of birth), Contact Data (email, phone, address), Technical Data (IP address, browser, device information), Usage Data (how you interact with our Services), Marketing Preferences, Payment Data (securely processed), and Content Data (comments, stories, audio submissions)."
  },
  {
    number: "04",
    title: "Legal Basis for Processing",
    content: "We process your personal data based on your explicit consent, performance of a contract, compliance with legal obligations, protection of vital interests, performance of tasks in public interest, and our legitimate interests where these do not override your fundamental rights under the Kenya Data Protection Act, 2019."
  },
  {
    number: "05",
    title: "Purposes of Processing",
    content: "We use your data to provide and maintain our Services, notify you of changes, allow participation in interactive features, provide customer support, improve our Services through analysis, detect and prevent fraud, send marketing communications (with consent), and comply with legal obligations."
  },
  {
    number: "06",
    title: "Data Sharing and Disclosure",
    content: "We may share your data with service providers under contract, professional advisers, regulatory authorities when required by law, third parties during mergers or acquisitions, and event partners with your consent. We never sell your personal data to third parties for marketing purposes."
  },
  {
    number: "07",
    title: "International Data Transfers",
    content: "Your personal data may be transferred to and processed in countries outside Kenya. When we transfer data internationally, we ensure appropriate safeguards are in place, including standard contractual clauses and adequacy decisions, in full compliance with the Kenya Data Protection Act, 2019."
  },
  {
    number: "08",
    title: "Data Security Measures",
    content: "We implement encryption of sensitive data, regular security audits, access controls, staff training on data protection, incident response protocols, and third-party security assessments to protect your personal data against unauthorized access, alteration, disclosure, or destruction."
  },
  {
    number: "09",
    title: "Data Retention Policy",
    content: "We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including satisfying legal, accounting, or reporting requirements under Kenyan law. When data is no longer required, we securely delete or anonymize it."
  },
  {
    number: "10",
    title: "Your Rights Under the Kenya Data Protection Act, 2019",
    content: "You have the right to access your data, request rectification, request erasure, restrict processing, request data portability, object to processing, withdraw consent, and lodge complaints with the Office of the Data Protection Commissioner."
  },
  {
    number: "11",
    title: "Cookies and Tracking Technologies",
    content: "We use cookies and similar tracking technologies to track activity on our Services. You can instruct your browser to refuse cookies, though some parts of our Services may not function properly without them. We provide clear cookie consent mechanisms."
  },
  {
    number: "12",
    title: "Children's Privacy",
    content: "Our Services are not directed to individuals under 18. We do not knowingly collect personal data from children. If we become aware that we have collected data from a child without parental consent, we will take immediate steps to delete that information."
  },
  {
    number: "13",
    title: "Data Sharing with Third Parties",
    content: "We only share data with third-party processors who provide sufficient guarantees of compliance with the Kenya Data Protection Act, 2019. All processors are bound by strict contractual obligations regarding confidentiality and data protection."
  },
  {
    number: "14",
    title: "How to Exercise Your Rights",
    content: "You may exercise your rights by contacting our Data Protection Officer. We will respond to requests within the timelines required by the Kenya Data Protection Act, 2019. You also have the right to lodge complaints with the Office of the Data Protection Commissioner."
  }
];

export function PrivacyPage() {
  return (
    <div className="min-h-screen pb-24 pt-24 bg-[#f8f4eb] dark:bg-[#1a1209]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-white/50 px-4 py-2 text-sm font-medium text-warm-800 hover:bg-white/70 dark:bg-white/10 dark:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </motion.div>

        <div className="mb-14">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-2xl bg-primary/10"><Shield className="h-8 w-8 text-primary" /></div>
            <h1 className="font-display text-5xl font-bold text-warm-900 dark:text-white">Privacy Policy</h1>
          </div>
          <p className="text-lg text-warm-600 dark:text-white/60">Compliant with the Kenya Data Protection Act, 2019</p>
        </div>

        <div className="space-y-8">
          {privacyPolicies.map((policy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
              className="border-l-4 border-primary pl-8 py-2"
            >
              <div className="flex items-baseline gap-4 mb-3">
                <span className="font-display text-4xl font-bold text-primary/30">{policy.number}</span>
                <h3 className="font-display text-2xl font-bold text-warm-900 dark:text-white">{policy.title}</h3>
              </div>
              <p className="text-warm-700 dark:text-white/80 leading-relaxed text-lg">
                {policy.content}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-primary to-secondary text-white text-center">
          <p className="text-lg">This Privacy Policy is designed to comply with the Kenya Data Protection Act, 2019.</p>
          <p className="mt-2 text-white/80">Contact our Data Protection Officer: wataliipodcast01@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
