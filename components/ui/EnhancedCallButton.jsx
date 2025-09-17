import { Phone, PhoneCall } from "lucide-react";

// Main enhanced call button with multiple features
export function EnhancedCallButton() {
  return (
    <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
      <div className="group relative">
        <a
          href="tel:+917210756879"
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 text-white shadow-xl transition-all duration-300 ease-out hover:scale-110 hover:shadow-2xl focus:ring-4 focus:ring-green-300 focus:outline-none active:scale-95 sm:h-16 sm:w-16"
          aria-label="+91 721-075-6879"
          title="Click to call"
        >
          {/* Phone icon with animation */}
          <PhoneCall className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12 sm:h-7 sm:w-7" />

          {/* Pulsing ring animation */}
          <div className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-0 group-hover:opacity-30"></div>

          {/* Subtle inner glow */}
          <div className="absolute inset-1 rounded-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
        </a>

        {/* Tooltip with phone number */}
        <div className="pointer-events-none absolute right-0 bottom-full mb-3 translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <div className="relative">
            <div className="rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium whitespace-nowrap text-white shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 721-075-6879</span>
              </div>
              <div className="mt-1 text-xs opacity-75">Tap to call</div>
            </div>
            {/* Tooltip arrow */}
            <div className="absolute top-full right-4 h-2 w-2 rotate-45 transform bg-gray-900"></div>
          </div>
        </div>

        {/* Ripple effect on click */}
        <div className="absolute inset-0 scale-0 rounded-full bg-green-300 opacity-0 transition-all duration-500 group-active:scale-150 group-active:opacity-20"></div>
      </div>
    </div>
  );
}
