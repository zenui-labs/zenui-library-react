import React from 'react';
import MetricsCard from "@/Components/Home/MetricsCard.jsx";

const PrivacyPolicy = () => {

    const date = new Date();

    return (
        <>
            <section
                className="max-w-[1300px] mx-auto mt-8 px-6 640px:px-8 1024px:px-10 1404px:px-0 w-full pt-[2.5rem] p-6 min-h-screen relative">

                <div
                    className='w-[50px] bg-[#96E8F8] h-[600px] absolute top-[-100px] opacity-50 640px:opacity-100 640px:top-[-150px] right-[250px] rotate-[70deg] dark:blur-[120px] blur-[60px]'></div>

                <div className='max-w-[800px] text-gray-800'>
                    <h1 className="text-3xl 1024px:text-4xl font-bold mb-4 text-[#0FABCA]">Privacy Policy for Zenui
                        Library</h1>
                    <p className="mb-4 text-gray-500 dark:text-darkTextColor">Effective Date: January
                        1, {date.getFullYear()}</p>

                    <p className="mb-4 dark:text-darkSubTextColor text-gray-500">
                        Welcome to Zenui Library. Your privacy is important to us. This Privacy Policy outlines how we
                        collect, use, and protect your personal information when you use our services, including our
                        website, UI components library, and pre-built templates.
                    </p>

                    <h2 className="text-2xl font-semibold dark:text-darkTextColor mb-2 mt-10">1. Information We
                        Collect</h2>
                    <p className="mb-4 dark:text-darkSubTextColor text-gray-500">
                        <strong>Personal Information:</strong> When you register or interact with our services, we may
                        collect personal information such as your name, email address, and payment information.
                    </p>
                    <p className="mb-4 dark:text-darkSubTextColor text-gray-500">
                        <strong>Usage Data:</strong> We collect data on how you use our services, including the pages
                        you
                        visit, the features you use, and the actions you take.
                    </p>
                    <p className="mb-4 dark:text-darkSubTextColor text-gray-500">
                        <strong>Device Information:</strong> We collect information about the device you use to access
                        our
                        services, including IP address, browser type, and operating system.
                    </p>

                    <h2 className="text-2xl font-semibold dark:text-darkTextColor mb-2 mt-10">2. How We Use Your
                        Information</h2>
                    <p className="mb-4 dark:text-darkSubTextColor text-gray-500">
                        <strong>To Provide and Improve Services:</strong> We use your information to deliver, maintain,
                        and
                        improve our services, including customizing your experience and responding to your inquiries.
                    </p>
                    <p className="mb-4 dark:text-darkSubTextColor text-gray-500">
                        <strong>To Communicate with You:</strong> We may use your information to send you updates,
                        newsletters, and other communications related to our services.
                    </p>
                    <p className="mb-4 dark:text-darkSubTextColor text-gray-500">
                        <strong>For Security and Compliance:</strong> We use your information to ensure the security of
                        our
                        services and comply with legal obligations.
                    </p>

                    <h2 className="text-2xl font-semibold dark:text-darkTextColor mb-2 mt-10">3. Sharing Your
                        Information</h2>
                    <p className="mb-4 dark:text-darkSubTextColor text-gray-500">
                        We do not sell or rent your personal information to third parties. We may share your information
                        with:
                    </p>
                    <ul className="list-disc list-inside mb-4 dark:text-darkSubTextColor text-gray-500">
                        <li><strong>Service Providers:</strong> Third parties who provide services on our behalf, such
                            as
                            payment processing and data analysis.
                        </li>
                        <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and the
                            rights of our users.
                        </li>
                    </ul>

                    <h2 className="text-2xl font-semibold dark:text-darkTextColor mb-2 mt-10">4. Data Security</h2>
                    <p className="mb-4 dark:text-darkSubTextColor text-gray-500">
                        We implement appropriate technical and organizational measures to protect your personal
                        information
                        against unauthorized access, alteration, disclosure, or destruction.
                    </p>

                    <h2 className="text-2xl font-semibold mb-2 dark:text-darkTextColor mt-10">5. Your Rights</h2>
                    <p className="mb-4 dark:text-darkSubTextColor text-gray-500">
                        You have the right to access, correct, or delete your personal information. You can also object
                        to
                        the processing of your personal information and withdraw your consent at any time. To exercise
                        these
                        rights, please contact us at the email address provided below.
                    </p>

                    <h2 className="text-2xl font-semibold mb-2 dark:text-darkTextColor mt-10">6. Third-Party Links</h2>
                    <p className="mb-4 dark:text-darkSubTextColor text-gray-500">
                        Our services may contain links to third-party websites. We are not responsible for the privacy
                        practices or content of these sites. We encourage you to read the privacy policies of any linked
                        websites you visit.
                    </p>

                    <h2 className="text-2xl font-semibold mb-2 dark:text-darkTextColor mt-10">7. Changes to This Privacy
                        Policy</h2>
                    <p className="mb-4 dark:text-darkSubTextColor text-gray-500">
                        We may update this Privacy Policy from time to time. We will notify you of any significant
                        changes
                        by posting the new Privacy Policy on our website. Your continued use of our services after any
                        changes constitutes your acceptance of the new Privacy Policy.
                    </p>

                    <h2 className="text-2xl font-semibold mb-2 dark:text-darkTextColor mt-10">8. Contact Us</h2>
                    <p className="mb-4 dark:text-darkSubTextColor text-gray-500">
                        If you have any questions or concerns about this Privacy Policy or our data practices, please
                        contact us at:
                    </p>
                    <p className="mb-4 dark:text-darkSubTextColor text-gray-500">
                        Email: <a href='mailto:zenuilibrary@gmail.com'
                                  className='!text-primary'>zenuilibrary@gmail.com</a>
                    </p>

                    <p className='dark:text-darkSubTextColor '>By using Zenui Library, you agree to the terms outlined
                        in
                        this Privacy Policy. Thank you for
                        trusting Zenui with your personal information.</p>

                </div>
            </section>

            <MetricsCard/>
        </>
    );
}

export default PrivacyPolicy;
