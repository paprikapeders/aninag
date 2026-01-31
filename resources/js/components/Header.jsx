import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function Header({ currentPath = '/' }) {
  const [isContactOpen, setIsContactOpen] = useState(false);
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
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl tracking-tight">Aninag</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className={`transition-colors hover:text-[#0A7A7A] ${
                  currentPath === "/"
                    ? "text-[#0A7A7A]"
                    : "text-foreground/80"
                }`}
              >
                Home
              </Link>
              <Link
                href="/catalog"
                className={`transition-colors hover:text-[#0A7A7A] ${
                  currentPath === "/catalog"
                    ? "text-[#0A7A7A]"
                    : "text-foreground/80"
                }`}
              >
                Collection
              </Link>
            </nav>

            <button 
              onClick={() => setIsContactOpen(true)}
              className="hidden md:block px-6 py-2.5 bg-[#0A7A7A] text-white rounded-lg hover:bg-[#096565] transition-colors"
            >
              Contact
            </button>

            {/* Mobile menu button */}
            <button className="md:hidden p-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
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
