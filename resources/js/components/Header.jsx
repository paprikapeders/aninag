import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function Header({ currentPath = '/' }) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    router.visit('/confirmation', {
      method: 'post',
      data: {
        type: 'contact',
        ...formData,
      },
      onSuccess: () => {
        setIsContactOpen(false);
        setFormData({ name: "", email: "", phone: "", message: "" });
      },
    });
  };

  return (
    <>
      <header className="border-b border-border bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">{/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <span className="text-xl sm:text-2xl tracking-tight font-light group-hover:text-[#0A7A7A] transition-colors">
                Aninag
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className={`text-sm font-medium transition-all hover:text-[#0A7A7A] relative ${
                  currentPath === "/"
                    ? "text-[#0A7A7A] after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-[#0A7A7A]"
                    : "text-foreground/70"
                }`}
              >
                Home
              </Link>
              <Link
                href="/catalog"
                className={`text-sm font-medium transition-all hover:text-[#0A7A7A] relative ${
                  currentPath === "/catalog"
                    ? "text-[#0A7A7A] after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-[#0A7A7A]"
                    : "text-foreground/70"
                }`}
              >
                Collection
              </Link>
              <Link
                href="/about"
                className={`text-sm font-medium transition-all hover:text-[#0A7A7A] relative ${
                  currentPath === "/about"
                    ? "text-[#0A7A7A] after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-[#0A7A7A]"
                    : "text-foreground/70"
                }`}
              >
                About
              </Link>
            </nav>

            {/* CTA Button */}
            <button 
              onClick={() => setIsContactOpen(true)}
              className="hidden md:block px-6 py-2.5 bg-[#0A7A7A] text-white text-sm font-medium rounded-lg hover:bg-[#086060] transition-all hover:shadow-lg hover:-translate-y-0.5"
              data-contact-button
            >
              Get in Touch
            </button>

            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border py-4 space-y-2 animate-in slide-in-from-top-2">
              <Link
                href="/"
                className="block px-4 py-2.5 text-base font-medium rounded-lg transition-colors hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/catalog"
                className="block px-4 py-2.5 text-base font-medium rounded-lg transition-colors hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                Collection
              </Link>
              <Link
                href="/about"
                className="block px-4 py-2.5 text-base font-medium rounded-lg transition-colors hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsContactOpen(true);
                }}
                className="w-full text-left px-4 py-2.5 text-base font-medium bg-[#0A7A7A] text-white rounded-lg transition-all hover:bg-[#086060] mt-2"
              >
                Get in Touch
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Contact Dialog */}
      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Get in Touch</DialogTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Have a question or inquiry? Fill out the form below and we'll respond within 24 hours.
            </p>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Full Name</Label>
              <Input
                id="contact-name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="your@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-phone">Phone (optional)</Label>
              <Input
                id="contact-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+63 9XX-XXX-XXXX"
                pattern="^(\+63|0)?[0-9]{10}$"
              />
              <p className="text-xs text-muted-foreground">
                Format: +63 9XX-XXX-XXXX or 09XX-XXX-XXXX
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-message">Message</Label>
              <Textarea
                id="contact-message"
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Tell us how we can help..."
                rows={4}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsContactOpen(false)}
                className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-[#0A7A7A] text-white rounded-lg hover:bg-[#096565] transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
