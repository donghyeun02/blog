import { Github, Instagram } from 'lucide-react';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1D1D1F]">
      <main>{children}</main>

      <footer className="border-t border-[#D2D2D7] mt-20">
        <div className="max-w-2xl mx-auto px-6 py-8 flex items-center justify-between">
          <p className="text-xs text-[#6E6E73]">© 2025 donghyeun02</p>
          <div className="flex items-center gap-1">
            <a
              href="https://github.com/donghyeun02"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 text-[#AEAEB2] hover:text-[#1D1D1F] transition-[color] duration-150"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com/donghyeun_02"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 text-[#AEAEB2] hover:text-[#1D1D1F] transition-[color] duration-150"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
