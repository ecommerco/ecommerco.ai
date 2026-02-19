import { Navbar } from "@/components/Navbar";
import { CallToAction } from "@/components/CallToAction";
import { Mail, MessageSquare, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary/30 pt-20">
      <Navbar />
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">Touch</span>
          </h1>
          <p className="text-xl text-gray-400">
            Have a question? We'd love to hear from you.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
          <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <Mail className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Email</h3>
            <p className="text-gray-400 mb-4">Send us an email anytime</p>
            <a href="mailto:support@ecommerco.ai" className="text-primary hover:text-yellow-400">
              support@ecommerco.ai
            </a>
          </div>

          <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <MessageSquare className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Live Chat</h3>
            <p className="text-gray-400 mb-4">Chat with our support team</p>
            <button className="px-4 py-2 rounded-lg bg-primary text-black font-bold hover:bg-yellow-400 transition-colors">
              Start Chat
            </button>
          </div>

          <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <Phone className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
            <p className="text-gray-400 mb-4">Call us during business hours</p>
            <a href="tel:+1234567890" className="text-primary hover:text-yellow-400">
              +1 (234) 567-890
            </a>
          </div>

          <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <MapPin className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Office</h3>
            <p className="text-gray-400">Remote-first company</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:border-primary/50"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:border-primary/50"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your message"
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg bg-primary text-black font-bold hover:bg-yellow-400 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <CallToAction />
    </main>
  );
}
