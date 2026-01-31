import { Link } from '@inertiajs/react';
import GuestLayout from '../Layouts/GuestLayout';

export default function InquiryConfirmation({ lead }) {
    return (
        <GuestLayout title="Inquiry Received - Aninag">
            <div className="min-h-[60vh] flex items-center justify-center py-24">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Success Icon */}
                    <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-8">
                        <svg
                            className="w-10 h-10 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>

                    <h1 className="text-4xl font-light tracking-wide text-gray-900 mb-6">
                        Thank You, {lead.buyer_name}
                    </h1>

                    <p className="text-xl text-gray-600 font-light mb-8 leading-relaxed">
                        Your inquiry for <span className="text-gray-900">{lead.artwork_title}</span> by{' '}
                        <span className="text-gray-900">{lead.artist_name}</span> has been received.
                    </p>

                    <div className="bg-gray-50 p-8 mb-8 text-left">
                        <h2 className="text-lg font-light tracking-wide mb-4 text-center">
                            WHAT HAPPENS NEXT
                        </h2>
                        <ul className="space-y-4 text-sm text-gray-600 font-light">
                            <li className="flex items-start">
                                <span className="text-gray-900 font-medium mr-3">1.</span>
                                <span>
                                    Your Art Advisor will review your inquiry and the artwork details
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-gray-900 font-medium mr-3">2.</span>
                                <span>
                                    We will contact you within 24 hours to discuss your interest
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-gray-900 font-medium mr-3">3.</span>
                                <span>
                                    Your advisor will provide detailed information, pricing, and arrange next steps
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <Link
                            href="/catalog"
                            className="inline-block bg-gray-900 text-white px-12 py-4 text-sm tracking-wider font-light hover:bg-gray-800 transition"
                        >
                            CONTINUE BROWSING
                        </Link>
                        <br />
                        <Link
                            href="/"
                            className="inline-block text-gray-600 hover:text-gray-900 text-sm font-light transition"
                        >
                            Return to Home
                        </Link>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <p className="text-sm text-gray-500 font-light">
                            Inquiry Reference: #{lead.id}
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
