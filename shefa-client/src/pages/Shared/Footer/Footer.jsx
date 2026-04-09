import React from "react";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0b1324] to-[#0e1a33] text-gray-300 h-fit mb-[-30px] ">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 ">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-semibold text-white">
              Shefa
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Shefa is a digital healthcare platform connecting
              patients with verified doctors for secure, reliable, and
              convenient medical consultations anytime, anywhere.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick links
            </h3>
            <ul className="space-y-2 text-sm">
              {["Home", "Services", "Doctors", "Dashboard", "FAQ", "About Us"].map(
                (item) => (
                  <li
                    key={item}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <MdEmail className="text-blue-500 text-lg" />
                support@amaderdoctor.com
              </li>
              <li className="flex items-center gap-3">
                <MdPhone className="text-blue-500 text-lg" />
                +1234-5678-901
              </li>
              <li className="flex items-start gap-3">
                <MdLocationOn className="text-blue-500 text-xl mt-1" />
                <span>KUET, Khulna-9203</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Follow Us
            </h3>
            <div className="flex gap-3 mb-4">
              {[FaLinkedinIn, FaFacebookF, FaInstagram, FaXTwitter].map(
                (Icon, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-lg bg-[#1a2540] flex items-center justify-center hover:bg-blue-600 transition cursor-pointer"
                  >
                    <Icon className="text-white text-lg" />
                  </div>
                )
              )}
            </div>
            <p className="text-sm text-gray-400">
              Stay connected for updates and tips.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
          © 2026 Biomedical Engineering, KUET. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;