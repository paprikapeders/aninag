import { Head, Link } from '@inertiajs/react';

export default function GuestLayout({ children, title }) {
    return (
        <>
            <Head title={title} />
            
            <div className="min-h-screen bg-slate-50">
                {/* Navigation */}
                <nav className="bg-white shadow-sm sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            <Link href="/" className="text-2xl font-bold tracking-tight text-purple-700 hover:text-purple-800 transition">
                                ANINAG
                            </Link>
                            
                            <div className="flex space-x-8">
                                <Link 
                                    href="/" 
                                    className="text-sm font-medium text-gray-700 hover:text-purple-700 transition"
                                >
                                    Home
                                </Link>
                                <Link 
                                    href="/catalog" 
                                    className="text-sm font-medium text-gray-700 hover:text-purple-700 transition"
                                >
                                    Collection
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main>
                    {children}
                </main>

                {/* Footer */}
                <footer className="bg-gray-900 text-white mt-32">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div>
                                <h3 className="text-2xl font-bold mb-4 text-amber-400">ANINAG</h3>
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    Your trusted art advisor, connecting discerning collectors with exceptional contemporary artworks.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold tracking-wide mb-4 text-amber-400">EXPLORE</h4>
                                <ul className="space-y-3">
                                    <li>
                                        <Link href="/catalog" className="text-sm text-gray-300 hover:text-white transition">
                                            View Collection
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold tracking-wide mb-4 text-amber-400">CONTACT</h4>
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    For inquiries, please reach out through<br />our artwork inquiry forms.
                                </p>
                            </div>
                        </div>
                        <div className="mt-12 pt-8 border-t border-gray-800">
                            <p className="text-xs text-gray-400 text-center">
                                © {new Date().getFullYear()} Aninag. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
