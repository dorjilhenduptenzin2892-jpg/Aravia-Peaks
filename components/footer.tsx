import Link from "next/link"

export function Footer() {
  return (
    <footer className="relative bg-background border-t overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container px-4 py-16 md:px-6 md:py-20 relative z-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="mb-4 text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-clip-text text-transparent drop-shadow-sm">
              DrukVista
            </h3>
            <p className="text-sm text-gray-700 mb-6 leading-relaxed font-medium">
              Your trusted partner for authentic Bhutanese experiences. Discover the Land of the Thunder Dragon with us.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 flex items-center justify-center transition-all duration-300 hover:scale-125 hover:rotate-12 shadow-lg hover:shadow-blue-500/50"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 hover:from-pink-400 hover:via-rose-400 hover:to-orange-400 flex items-center justify-center transition-all duration-300 hover:scale-125 hover:rotate-12 shadow-lg hover:shadow-pink-500/50"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.69-.07-4.85-.07-3.204 0-3.584-.012-4.849-.07-4.354-2.617-6.78-6.98-6.98-1.281-.057-1.69-.073-4.949-.073zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.013-3.667-.07-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.057-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="w-11 h-11 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 flex items-center justify-center transition-all duration-300 hover:scale-125 hover:rotate-12 shadow-lg hover:shadow-green-500/50"
                aria-label="WhatsApp"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="w-11 h-11 rounded-full bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 flex items-center justify-center transition-all duration-300 hover:scale-125 hover:rotate-12 shadow-lg hover:shadow-red-500/50"
                aria-label="YouTube"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/packages"
                  className="text-gray-700 font-medium hover:text-orange-600 transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"
                >
                  <span className="text-orange-500 group-hover:text-amber-500 transition-colors">→</span>
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-700 font-medium hover:text-orange-600 transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"
                >
                  <span className="text-orange-500 group-hover:text-amber-500 transition-colors">→</span>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/travel-guide"
                  className="text-gray-700 font-medium hover:text-orange-600 transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"
                >
                  <span className="text-orange-500 group-hover:text-amber-500 transition-colors">→</span>
                  Travel Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-700 font-medium hover:text-orange-600 transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"
                >
                  <span className="text-orange-500 group-hover:text-amber-500 transition-colors">→</span>
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/festivals"
                  className="text-gray-700 font-medium hover:text-orange-600 transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"
                >
                  <span className="text-orange-500 group-hover:text-amber-500 transition-colors">→</span>
                  Festival Calendar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              Popular Packages
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/packages/paro-tshechu"
                  className="text-gray-700 font-medium hover:text-orange-600 transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"
                >
                  <span className="text-orange-500 group-hover:text-amber-500 transition-colors">→</span>
                  Paro Tshechu Festival
                </Link>
              </li>
              <li>
                <Link
                  href="/packages/cultural-heritage"
                  className="text-gray-700 font-medium hover:text-orange-600 transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"
                >
                  <span className="text-orange-500 group-hover:text-amber-500 transition-colors">→</span>
                  Cultural Heritage
                </Link>
              </li>
              <li>
                <Link
                  href="/packages/druk-path-trek"
                  className="text-gray-700 font-medium hover:text-orange-600 transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"
                >
                  <span className="text-orange-500 group-hover:text-amber-500 transition-colors">→</span>
                  Druk Path Trek
                </Link>
              </li>
              <li>
                <Link
                  href="/packages/luxury-bhutan"
                  className="text-gray-700 font-medium hover:text-orange-600 transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"
                >
                  <span className="text-orange-500 group-hover:text-amber-500 transition-colors">→</span>
                  Luxury Experiences
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-semibold text-gray-900 block mb-1">Address</span>
                  <span className="font-medium">Thimphu, Bhutan</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-semibold text-gray-900 block mb-1">Phone</span>
                  <span className="font-medium">+975 17565604</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-semibold text-gray-900 block mb-1">Email</span>
                  <span className="font-medium">dorjicrypto1995@gmail.com</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-gray-700 font-medium">
              &copy; {new Date().getFullYear()} DrukVista. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-400/30 backdrop-blur-sm">
                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-semibold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                  Licensed Tour Operator
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
