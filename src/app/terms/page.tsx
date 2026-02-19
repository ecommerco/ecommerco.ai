import { Navbar } from "@/components/Navbar";
import { CallToAction } from "@/components/CallToAction";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary/30 pt-20">
      <Navbar />
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">Service</span>
          </h1>
          <p className="text-gray-400 mb-12">Last updated: February 18, 2026</p>

          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Ecommerco, you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Use of Service</h2>
              <p className="mb-4">You agree to use Ecommerco only for lawful purposes and in accordance with these Terms. You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit harmful or malicious code</li>
                <li>Interfere with the service's operation</li>
                <li>Use the service for illegal activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Account Registration</h2>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Payment Terms</h2>
              <p>
                Subscription fees are billed in advance. You agree to pay all fees associated with your subscription plan. Refunds are subject to our refund policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
              <p>
                All content, features, and functionality of Ecommerco are owned by us and are protected by copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
              <p>
                Ecommerco is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Contact Us</h2>
              <p>
                For questions about these Terms, contact us at{" "}
                <a href="mailto:legal@ecommerco.ai" className="text-primary hover:text-yellow-400">
                  legal@ecommerco.ai
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
      <CallToAction />
    </main>
  );
}
