import { FacebookIcon, GithubIcon, InstagramIcon, LinkedinIcon, MailIcon, TwitterIcon, YoutubeIcon } from 'lucide-react'
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
                    <Link
                        href="https://www.linkedin.com/in/anmol-chandrakar/"
                        className="hover:text-blue-600 transition"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <LinkedinIcon className="h-5 w-5" />
                    </Link>
                    <Link
                        href="https://x.com/kirigya75759"
                        className="hover:text-blue-400 transition"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <TwitterIcon className="h-5 w-5" />
                    </Link>
                    <Link
                        href="https://github.com/kirigaya07"
                        className="hover:text-gray-500 transition"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <GithubIcon className="h-5 w-5" />
                    </Link>
                    <Link
                        href="https://www.youtube.com/@Hunter-h7"
                        className="hover:text-red-500 transition"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <YoutubeIcon className="h-5 w-5" />
                    </Link>
                    <Link
                        href="mailto:contactaspireai@gmail.com"
                        className="hover:text-green-500 transition"
                    >
                        <MailIcon className="h-5 w-5" />
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