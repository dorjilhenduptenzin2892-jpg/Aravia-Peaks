"use client"

export function WhatsAppFloat() {
  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <a
        href="https://wa.me/97517565604"
        target="_blank"
        rel="noopener noreferrer"
        className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform duration-300 hover:scale-105 animate-pulse-ring"
        aria-label="Chat with us on WhatsApp"
      >
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.52 3.48A11.78 11.78 0 0012.06 0C5.45 0 .1 5.35.1 11.96c0 2.1.55 4.15 1.6 5.96L0 24l6.26-1.64a11.87 11.87 0 005.8 1.48h.01c6.61 0 11.96-5.35 11.96-11.96 0-3.2-1.24-6.2-3.51-8.4zm-8.46 18.2a9.86 9.86 0 01-5.02-1.37l-.36-.22-3.7.97.99-3.61-.24-.37a9.82 9.82 0 01-1.52-5.23c0-5.43 4.42-9.85 9.86-9.85 2.63 0 5.1 1.03 6.96 2.89a9.8 9.8 0 012.89 6.96c0 5.43-4.42 9.84-9.86 9.84zm5.4-7.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.5l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.48.71.31 1.26.5 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z" />
        </svg>
      </a>
      <div className="pointer-events-none absolute right-16 top-1/2 hidden -translate-y-1/2 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background shadow-lg group-hover:flex">
        Chat with us on WhatsApp
      </div>
    </div>
  )
}
