"use client";

import Link from "next/link";
import Image from "next/image";

function Footer() {
  const socialLinks = [
    {
      href: "https://www.facebook.com/profile.php?id=61575991143624",
      src: "/facebook.svg",
      alt: "Facebook",
    },
    {
      href: "https://www.instagram.com/automate_ideas",
      src: "/instagram.svg",
      alt: "Instagram",
    },
    {
      href: "https://www.linkedin.com/company/automate-ideas/",
      src: "/linkedin.svg",
      alt: "LinkedIn",
    },
    {
      href: "https://x.com/automateideas",
      src: "/x.svg",
      alt: "X (Twitter)",
    },
    {
      href: "https://www.youtube.com/@AutomateIdeas",
      src: "/youtube.svg",
      alt: "YouTube",
    },
    {
      href: "https://wa.me/917210756879?text=I%27m%20interested%20in%20your%20services",
      src: "/whatsapp.svg",
      alt: "Whatapp",
    },
  ];

  const navMenu = ["Home", "Services", "About Us", "Contact Us"];

  return (
    <footer className="container mx-auto my-3 px-7">
      <div className="sm:grid sm:grid-cols-2">
        <div className="flex flex-col gap-3.5 px-8 py-6">
          <div className="slide-in-from-bottom animate-gradient bg-gradient-to-r from-red-600 via-yellow-500 to-green-500 bg-clip-text text-3xl font-bold text-transparent">
            Automate Ideas
          </div>
          <div>
            We empower businesses to optimize their operations by automating key
            processes within Google Workspace, saving time and resources while
            boosting productivity.
          </div>
          <div className="flex gap-6 py-4">
            {socialLinks.map(({ href, src, alt }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={src}
                  width={400}
                  height={400}
                  alt={alt}
                  className="h-9 w-9"
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="mx-auto py-5">
          <div className="px-3 text-lg font-bold">Quick Links</div>
          {
            <div className="flex flex-col p-3">
              {navMenu.map((item, index) => {
                const path =
                  index === 0
                    ? "/"
                    : `/${item.replace(" ", "-").toLowerCase()}`;
                return (
                  <Link
                    key={index}
                    href={path}
                    prefetch={true}
                    className={`text-base font-semibold text-gray-500 hover:text-red-500`}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
          }
        </div>
      </div>

      {/* Nothing for This */}

      <div className="py-4 text-center">
        <p className="font-semibold text-gray-600">
          © 2025 Automate Ideas. All rights reserved.
        </p>
        <Link
          href="/privacy-policy"
          className="font-semibold text-blue-500 hover:underline"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
