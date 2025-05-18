import React from 'react';
import { BookOpen, CheckCircle2, AlertTriangle, PlayCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useAuthStore } from '../store/useAuthStore';

function Docs() {

    const { user } = useAuthStore()

    return (
        <div>
            {user ? <>
                <Navbar />
                <Sidebar />
            </> : <Header />}
            <div className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mt-9 mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">Documentation</h1>
                        <p className="text-gray-400">Everything you need to know about Autofill.AI</p>
                    </div>

                    <div className="space-y-8">
                        {/* Video Demo */}
                        <section className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <PlayCircle className="h-6 w-6 text-blue-400" />
                                <h2 className="text-2xl font-semibold">Setup Video Tutorial</h2>
                            </div>
                            <p className="text-gray-300 mb-4">
                                Watch our detailed video tutorial to understand the setup process better. If you're having trouble following the written instructions, this video will guide you through each step.
                            </p>
                            <div className="bg-black/30 rounded-xl p-4 flex items-center justify-center">
                                <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                                    <PlayCircle className="h-5 w-5" />
                                    <span>Watch Demo Video</span>
                                </button>
                            </div>
                        </section>

                        {/* Introduction */}
                        <section className="bg-gray-900/50 rounded-xl p-6">
                            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Autofill.AI helps you automatically fill Google Forms using advanced AI technology
                                powered by Google Gemini. Currently, the service is available for Windows laptops,
                                with plans to expand to Android, Mac, and iPhone in the future.
                            </p>
                        </section>

                        {/* Setup Instructions */}
                        <section className="bg-gray-900/50 rounded-xl p-6">
                            <h2 className="text-2xl font-semibold mb-4">Setup Instructions</h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-500/10 rounded-lg p-2">
                                        <CheckCircle2 className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Step 1: Create Profile Directory</h3>
                                        <p className="text-gray-400 mt-1">Create a folder named 'puppeteer_profile' in:</p>
                                        <code className="block bg-black/30 px-4 py-2 rounded-lg mt-2 text-blue-400">
                                            C:/Users/Your_name/AppData/Local/puppeteer_profile
                                        </code>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-500/10 rounded-lg p-2">
                                        <CheckCircle2 className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Step 2: First-time Login</h3>
                                        <p className="text-gray-400 mt-1">
                                            On your first use, you'll be prompted to log in with Google. This is a one-time setup.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-500/10 rounded-lg p-2">
                                        <CheckCircle2 className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Step 3: Form Filling Process</h3>
                                        <p className="text-gray-400 mt-1">
                                            After login, the AI will begin filling out your form automatically.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Important Notes */}
                        <section className="bg-gray-900/50 rounded-xl p-6">
                            <h2 className="text-2xl font-semibold mb-4">Important Notes</h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="bg-amber-500/10 rounded-lg p-2">
                                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                                    </div>
                                    <div>
                                        <p className="text-gray-300">
                                            Do not interrupt Chrome or close the window while the form is being filled.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-amber-500/10 rounded-lg p-2">
                                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                                    </div>
                                    <div>
                                        <p className="text-gray-300">
                                            You must manually click the submit button after the form is filled.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Future Updates */}
                        <section className="bg-gray-900/50 rounded-xl p-6">
                            <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
                            <p className="text-gray-300 leading-relaxed">
                                We're working on bringing Autofill.AI to more platforms:
                            </p>
                            <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
                                <li>Android support</li>
                                <li>Mac support</li>
                                <li>iPhone support</li>
                            </ul>
                        </section>

                        {/* Feedback */}
                        <section className="bg-gray-900/50 rounded-xl p-6">
                            <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
                            <p className="text-gray-300">
                                We'd love to hear your thoughts! Send your feedback to:{' '}
                                <a href="mailto:nihalpanday2020@gmail.com" className="text-blue-400 hover:text-blue-300">
                                    nihalpanday2020@gmail.com
                                </a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
}

export default Docs;