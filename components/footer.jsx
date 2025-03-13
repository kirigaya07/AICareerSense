import { FacebookIcon, GithubIcon, InstagramIcon, TwitterIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-muted/50 py-10 mt-12">
            <div className="container mx-auto text-center text-gray-400">
                <p className="text-lg font-semibold flex items-center justify-center space-x-2">
                    Made with{" "}
                    <span className="text-red-500 animate-pulse">❤️</span> by
                    <span className="font-bold text-gray-300">Kirigaya07</span>
                </p>

                <div className="flex justify-center space-x-6 mt-4 text-sm">
                    <Link href="/" className="hover:text-primary transition duration-300">
                        Home
                    </Link>
                    <Link href="/about" className="hover:text-primary transition duration-300">
                        About
                    </Link>
                    <Link href="/contact" className="hover:text-primary transition duration-300">
                        Contact
                    </Link>
                    <Link href="/privacy" className="hover:text-primary transition duration-300">
                        Privacy
                    </Link>
                </div>

                <div className="mt-6 flex justify-center space-x-4">
                    <Link href="#" className="hover:text-blue-500 transition">
                        <FacebookIcon className="h-5 w-5" />
                    </Link>
                    <Link href="#" className="hover:text-blue-400 transition">
                        <TwitterIcon className="h-5 w-5" />
                    </Link>
                    <Link href="#" className="hover:text-gray-500 transition">
                        <GithubIcon className="h-5 w-5" />
                    </Link>
                    <Link href="#" className="hover:text-pink-500 transition">
                        <InstagramIcon className="h-5 w-5" />
                    </Link>
                </div>

                <p className="text-xs text-gray-500 mt-6">
                    © {new Date().getFullYear()} Kirigaya07. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer