import { Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SupportCard() {
  const router = useRouter();
  return (
    <section className="py-8 bg-secondary text-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-black">
            Still Have Questions?
          </h2>
          <p
            className="text-xl font-semibold mb-8"
            style={{ color: "#00986e" }}
          >
            Our knowledgeable support team is here to help with any questions
            about our products, orders, or natural wellness journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              className="flex items-center justify-center space-x-3 bg-white px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border-2 hover:border-gray-300"
              style={{ color: "#00986e", borderColor: "#00986e" }}
            >
              <Mail className="w-5 h-5" />
              <span>Email Support</span>
            </button>
            <button
              onClick={() => router.push("/cta")}
              className="flex items-center justify-center space-x-3 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:opacity-90"
              style={{ backgroundColor: "#00986e" }}
            >
              <Phone className="w-5 h-5" />
              <span>Contact Us</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
