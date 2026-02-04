import { Head } from '@inertiajs/react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

export default function Terms() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #F9F8F6 0%, #FDFCFB 100%)' }}>
      <Head title="Terms of Service - Aninag" />
      <Header currentPath="/terms" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-3 sm:mb-4">Terms of Service</h1>
            <div className="h-1 w-20 sm:w-32 bg-gradient-to-r from-[#0A7A7A] to-[#D87456] rounded-full mb-4" />
            <p className="text-muted-foreground">Effective Date: February 4, 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none space-y-8">
            <p className="text-base sm:text-lg leading-relaxed">
              Welcome to Aninag. These Terms of Service ("Terms") govern your access to and use of the Aninag platform at www.aninag.com (the "Platform"). By accessing or using the Platform, you agree to be bound by these Terms.
            </p>

            <div className="bg-[#D87456]/10 border-l-4 border-[#D87456] p-4 sm:p-6 rounded-r-lg">
              <p className="font-medium">Please read these Terms carefully. If you do not agree, you must not use the Platform.</p>
            </div>

            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-4">1. About Aninag</h2>
              <p>Aninag is a marketplace platform that connects art buyers ("Buyers") with Philippine art galleries ("Galleries"). We provide:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Curated listings of Filipino contemporary artworks</li>
                <li>Augmented reality (AR) preview technology to visualize artworks in your space</li>
                <li>A communication channel between Buyers and Galleries</li>
              </ul>
              <div className="bg-[#0A7A7A]/5 border-l-4 border-[#0A7A7A] p-4 rounded-r-lg mt-4">
                <p className="font-medium mb-2">Important:</p>
                <p>Aninag is not a seller or broker of artworks. All transactions, including negotiation, payment, and delivery, occur directly between Buyers and Galleries. We do not handle payments or take custody of artworks.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-4">2. Eligibility</h2>
              <p>To use the Platform, you must:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Be at least 18 years old</li>
                <li>Have the legal capacity to enter into binding agreements</li>
                <li>Provide accurate and truthful information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-4">3. User Responsibilities</h2>
              
              <h3 className="text-xl font-medium mb-3">3.1 For All Users</h3>
              <p>You agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the Platform lawfully and respectfully</li>
                <li>Not impersonate others or misrepresent your identity</li>
                <li>Not attempt to disrupt, hack, or reverse-engineer the Platform</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">3.2 For Buyers</h3>
              <p>When submitting inquiries to Galleries:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate contact information</li>
                <li>Communicate respectfully and in good faith</li>
                <li>Understand that any purchase agreement is solely between you and the Gallery</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">3.3 For Galleries</h3>
              <p>Participating Galleries agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate artwork information, including title, artist, medium, dimensions, and pricing</li>
                <li>Upload high-quality, authentic images of artworks you own or have authorization to sell</li>
                <li>Respond to Buyer inquiries in a timely and professional manner</li>
                <li>Handle all transactions, including payment processing and delivery, directly with Buyers</li>
                <li>Pay agreed-upon commission fees to Aninag only for successful sales resulting from Platform leads</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-4">4. Artwork Listings</h2>
              <p>All artwork listings on the Platform:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Remain the property of the respective Galleries</li>
                <li>Are displayed for informational and promotional purposes only</li>
                <li>Do not constitute an offer to sell by Aninag</li>
              </ul>
              <p className="mt-4">Pricing, availability, and descriptions are provided by Galleries. Aninag does not verify or guarantee the accuracy of this information. Buyers should confirm all details directly with the Gallery before making a purchase.</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-4">5. Transactions and Payments</h2>
              <p className="font-medium mb-4">Aninag does NOT process payments. All financial transactions occur directly between Buyers and Galleries. We are not a party to any purchase agreement.</p>
              <p>This means:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Aninag has no control over payment methods, terms, or timing</li>
                <li>We do not hold, escrow, or transfer funds</li>
                <li>We are not responsible for payment disputes, fraud, or non-payment</li>
                <li>Buyers and Galleries are solely responsible for resolving any payment issues</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-4">6. Commission Structure (For Galleries)</h2>
              <p>Galleries agree to pay Aninag a commission on successful sales generated through the Platform:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Commission applies only to completed sales where the Buyer was referred by Aninag</li>
                <li>The commission rate is agreed upon in writing before the Gallery joins the Platform</li>
                <li>No upfront fees—Galleries only pay for successful outcomes</li>
                <li>Payment of commission is due within 30 days of the sale completion</li>
              </ul>
              <p className="mt-4">Failure to pay agreed-upon commissions may result in suspension or termination of the Gallery's access to the Platform.</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-4">7. Intellectual Property</h2>
              
              <h3 className="text-xl font-medium mb-3">7.1 Platform Content</h3>
              <p>The Platform, including its design, software, logos, and text (excluding artwork images), is owned by Aninag and protected by copyright and trademark laws. You may not copy, modify, distribute, or create derivative works without our written permission.</p>

              <h3 className="text-xl font-medium mb-3 mt-6">7.2 Artwork and Gallery Content</h3>
              <p>Galleries retain all rights to the artwork images and descriptions they upload. By listing artworks, Galleries grant Aninag a limited, non-exclusive license to display, reproduce, and promote their content on the Platform and in marketing materials.</p>
              <p className="mt-4">Copyright in the underlying artworks remains with the respective artists or copyright holders. Buyers who purchase artworks do not acquire reproduction rights unless explicitly granted by the artist or copyright holder.</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-4">8. AR Preview Technology</h2>
              <p>Our augmented reality feature allows you to visualize artworks in your physical space using your device's camera. The AR preview is provided "as is" for informational purposes only.</p>
              <p className="mt-4">Please note:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>AR previews are approximations and may not reflect exact size, color, or lighting</li>
                <li>We do not store or retain camera data—all processing is done in real-time on your device</li>
                <li>AR functionality requires camera access; you may revoke this permission at any time through your device settings</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-4">9. Disclaimers and Limitations of Liability</h2>
              
              <h3 className="text-xl font-medium mb-3">9.1 Platform Provided "As Is"</h3>
              <p>The Platform is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee uninterrupted, error-free, or secure access.</p>

              <h3 className="text-xl font-medium mb-3 mt-6">9.2 No Guarantee of Accuracy</h3>
              <p>Aninag does not verify the accuracy, authenticity, or legality of artwork listings. We are not responsible for misrepresentations, forgeries, incorrect pricing, or any disputes between Buyers and Galleries.</p>

              <h3 className="text-xl font-medium mb-3 mt-6">9.3 No Liability for Transactions</h3>
              <p>Aninag is not a party to any transaction. We are not liable for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Non-payment, fraud, or payment disputes</li>
                <li>Failure to deliver artworks or delivery of damaged/inauthentic works</li>
                <li>Breach of contract by Buyers or Galleries</li>
                <li>Any other issues arising from direct interactions between Buyers and Galleries</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">9.4 Limitation of Liability</h3>
              <p>To the maximum extent permitted by law, Aninag shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform, even if advised of the possibility of such damages. Our total liability shall not exceed the amount of commission fees paid by the relevant Gallery in the 12 months preceding the claim.</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-4">10. Indemnification</h2>
              <p>You agree to indemnify and hold harmless Aninag, its affiliates, and its employees from any claims, damages, losses, or expenses (including legal fees) arising from: (a) your violation of these Terms, (b) your use of the Platform, or (c) your transactions with other users.</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-4">11. Termination</h2>
              <p>We reserve the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Suspend or terminate your access to the Platform at any time for any reason, including violation of these Terms</li>
                <li>Remove artwork listings that violate our policies</li>
                <li>Discontinue the Platform or any features at our discretion</li>
              </ul>
              <p className="mt-4">You may stop using the Platform at any time. Galleries wishing to remove their listings should contact us at <a href="mailto:info@aninag.com" className="text-[#0A7A7A] hover:underline">info@aninag.com</a>.</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-4">12. Dispute Resolution</h2>
              <p><strong>Buyer-Gallery Disputes:</strong> Aninag is not responsible for resolving disputes between Buyers and Galleries. We encourage both parties to communicate directly and in good faith.</p>
              <p className="mt-4"><strong>Disputes with Aninag:</strong> Any disputes arising from these Terms shall be governed by the laws of the Republic of the Philippines and resolved in the courts of Manila, Philippines.</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-4">13. Changes to These Terms</h2>
              <p>We may update these Terms from time to time. Changes will be posted on this page with an updated "Effective Date." Continued use of the Platform after changes are posted constitutes acceptance of the revised Terms.</p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-4">14. Miscellaneous</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Entire Agreement:</strong> These Terms, together with our Privacy Policy, constitute the entire agreement between you and Aninag</li>
                <li><strong>Severability:</strong> If any provision is found invalid, the remaining provisions remain in effect</li>
                <li><strong>Waiver:</strong> Failure to enforce any provision does not waive our right to enforce it later</li>
                <li><strong>Assignment:</strong> You may not assign these Terms without our written consent. We may assign them at our discretion</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-4">15. Contact Us</h2>
              <p>If you have questions about these Terms, please contact us:</p>
              <div className="bg-muted/50 rounded-lg p-6 mt-4">
                <p className="font-medium mb-2">Aninag</p>
                <p>Email: <a href="mailto:info@aninag.com" className="text-[#0A7A7A] hover:underline">info@aninag.com</a></p>
                <p>Website: <a href="/about" className="text-[#0A7A7A] hover:underline">www.aninag.com/contact</a></p>
              </div>
            </section>

            <div className="border-t border-border pt-8 mt-12">
              <p className="text-center text-muted-foreground italic">By using Aninag, you acknowledge that you have read, understood, and agreed to these Terms.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
