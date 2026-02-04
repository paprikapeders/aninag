import { Head } from '@inertiajs/react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

export default function Privacy() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #F9F8F6 0%, #FDFCFB 100%)' }}>
      <Head title="Privacy Policy - Aninag" />
      <Header currentPath="/privacy" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-3 sm:mb-4">Privacy Policy</h1>
            <div className="h-1 w-20 sm:w-32 bg-gradient-to-r from-[#0A7A7A] to-[#D87456] rounded-full mb-4" />
            <p className="text-muted-foreground">Effective Date: February 4, 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none space-y-8">
            <p className="text-base sm:text-lg leading-relaxed">
              Welcome to Aninag. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our platform at www.aninag.com (the "Platform"). We are committed to protecting your privacy and handling your data transparently.
            </p>

            <div className="bg-[#0A7A7A]/5 border-l-4 border-[#0A7A7A] p-4 sm:p-6 rounded-r-lg">
              <p className="font-medium mb-2">Important:</p>
              <p>Aninag is a marketplace platform that connects art buyers with galleries. We do not process payments or handle financial transactions. All purchases are conducted directly between buyers and galleries.</p>
            </div>

            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-medium mb-3">1.1 Information You Provide</h3>
              <p>When you use our Platform, you may provide:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Contact Information:</strong> Name, email address, phone number when submitting artwork inquiries</li>
                <li><strong>Inquiry Details:</strong> Messages and questions about specific artworks sent to galleries</li>
                <li><strong>Gallery Information:</strong> For partner galleries: business name, contact details, artwork listings, and images</li>
                <li><strong>AR Preview Data:</strong> When using our augmented reality feature, we may temporarily access your camera to display artwork in your space (this data is not stored)</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">1.2 Automatically Collected Information</h3>
              <p>We automatically collect certain technical information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Device Information:</strong> Browser type, operating system, device identifiers</li>
                <li><strong>Usage Data:</strong> Pages viewed, artworks browsed, time spent on the Platform, referring websites</li>
                <li><strong>Location Data:</strong> General location based on IP address (not precise GPS location)</li>
                <li><strong>Cookies and Similar Technologies:</strong> See Section 5 below</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-4">2. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Facilitate Connections:</strong> Forward your inquiries to the appropriate galleries</li>
                <li><strong>Provide AR Features:</strong> Enable you to preview artworks in your space using augmented reality</li>
                <li><strong>Improve the Platform:</strong> Analyze usage patterns, troubleshoot technical issues, enhance user experience</li>
                <li><strong>Communicate:</strong> Send platform updates, respond to inquiries, provide customer support</li>
                <li><strong>Ensure Security:</strong> Detect and prevent fraud, abuse, or security incidents</li>
                <li><strong>Comply with Legal Obligations:</strong> Meet applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-4">3. How We Share Your Information</h2>
              <p>We share your information only in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>With Galleries:</strong> When you submit an inquiry about an artwork, we share your contact information and message with the relevant gallery so they can respond directly to you</li>
                <li><strong>Service Providers:</strong> Third-party vendors who help us operate the Platform (e.g., hosting, analytics, email delivery). These providers are contractually obligated to protect your information</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity</li>
                <li><strong>With Your Consent:</strong> Any other sharing will be done only with your explicit permission</li>
              </ul>
              <p className="font-medium mt-4">We do NOT: sell, rent, or trade your personal information to third parties for marketing purposes.</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-4">4. Data Retention</h2>
              <p>We retain your personal information only as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. Inquiry data sent to galleries is typically retained for up to two years unless you request deletion.</p>
              <p>AR preview data (camera access) is processed in real-time and is not stored on our servers.</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-4">5. Cookies and Tracking Technologies</h2>
              <p>We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Remember your preferences and settings</li>
                <li>Analyze how you use the Platform</li>
                <li>Improve Platform performance and user experience</li>
              </ul>
              <p className="mt-4">You can control cookie preferences through your browser settings. Note that disabling cookies may limit certain Platform functionality.</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-4">6. Your Rights and Choices</h2>
              <p>Depending on your location, you may have the following rights:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
                <li><strong>Objection:</strong> Object to certain processing of your information</li>
                <li><strong>Portability:</strong> Receive your information in a structured, commonly used format</li>
                <li><strong>Withdraw Consent:</strong> Where processing is based on consent, you may withdraw it at any time</li>
              </ul>
              <p className="mt-4">To exercise these rights, contact us at <a href="mailto:privacy@aninag.com" className="text-[#0A7A7A] hover:underline">privacy@aninag.com</a>. We will respond within 30 days.</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-4">7. Data Security</h2>
              <p>We implement reasonable technical and organizational measures to protect your information from unauthorized access, disclosure, alteration, or destruction. These include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure servers and regular security audits</li>
                <li>Access controls limiting who can view your data</li>
              </ul>
              <p className="mt-4">However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-4">8. Children's Privacy</h2>
              <p>The Platform is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will delete it promptly.</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-4">9. International Data Transfers</h2>
              <p>Your information may be transferred to and processed in countries other than the Philippines. We ensure that such transfers comply with applicable data protection laws and that your information receives adequate protection.</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-4">10. Third-Party Links</h2>
              <p>The Platform may contain links to gallery websites or other third-party sites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any information.</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-4">11. Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Effective Date." We encourage you to review this policy periodically. Your continued use of the Platform after changes are posted constitutes acceptance of the updated policy.</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-4">12. Contact Us</h2>
              <p>If you have questions or concerns about this Privacy Policy or our data practices, please contact us:</p>
              <div className="bg-muted/50 rounded-lg p-6 mt-4">
                <p className="font-medium mb-2">Aninag</p>
                <p>Email: <a href="mailto:privacy@aninag.com" className="text-[#0A7A7A] hover:underline">privacy@aninag.com</a></p>
                <p>Website: <a href="/about" className="text-[#0A7A7A] hover:underline">www.aninag.com/contact</a></p>
              </div>
            </section>

            <div className="border-t border-border pt-8 mt-12">
              <p className="text-center text-muted-foreground italic">Thank you for trusting Aninag with your information.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
