'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import LoginScreen from '../components/screens/auth/Login';
import RegisterScreen from '../components/screens/auth/Register';
import VerifyOtpScreen from '../components/screens/auth/VerifyOtp';
import ForgotPasswordScreen from '../components/screens/auth/ForgotPassword';
import ClientProviders from '../components/ClientProviders';
import '../styles/index.css';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Load Tawk.to widget script once
  useEffect(() => {
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/668944e4e1e4f70f24ee2290/1i243a8aa";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode.insertBefore(s1, s0);
    return () => {
      s1.remove();
    };
  }, []);

  const hideHeaderFooterRoutes = [
    "/terms-and-conditions",
    "/privacy-policy",
    "/cancellation-policy",
    "/shopping-policy",
    "/faq",
  ];

  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(pathname);

  return (
    <html lang="en">
      <body>
        <ClientProviders>
          {/* Auth Modals */}
          <LoginScreen />
          <RegisterScreen />
          <VerifyOtpScreen />
          <ForgotPasswordScreen />

          {/* Header */}
          {!shouldHideHeaderFooter && <Header />}

          {/* Main Content */}
          <div className="2xl:container mx-auto">
            {children}
          </div>

          {/* Footer */}
          {!shouldHideHeaderFooter && <Footer />}

          {/* WhatsApp Floating Button */}
          <a
            href="https://wa.me/+971547717887"
            target="_blank"
            className="fixed bottom-5 left-7 flex h-16 w-16 cursor-pointer items-center justify-center gap-2 rounded-full shadow-2xl transition-all duration-500 hover:scale-[1.04]"
          >
            <div className="relative h-16 w-16">
              <img
                className="w-full h-full object-contain"
                src="/whatsapp.png"
                alt="go to whatsapp"
              />
            </div>
          </a>
        </ClientProviders>
      </body>
    </html>
  );
}
