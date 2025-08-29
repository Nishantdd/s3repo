import GuidePageLayout from '@/components/GuidePageLayout';

const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'prerequisites', title: 'Prerequisites', level: 1 },
    { id: 'step-1', title: 'Create AWS Account', level: 1 },
    { id: 'email-verification', title: 'Email Verification', level: 2 },
    { id: 'contact-info', title: 'Contact Information', level: 2 },
    { id: 'step-2', title: 'Payment Information', level: 1 },
    { id: 'step-3', title: 'Identity Verification', level: 1 },
    { id: 'step-4', title: 'Support Plan Selection', level: 1 },
    { id: 'step-5', title: 'Account Activation', level: 1 },
    { id: 'security-setup', title: 'Initial Security Setup', level: 1 },
    { id: 'next-steps', title: 'Next Steps', level: 1 }
];

export default function AccountSetupGuide() {
    return (
        <GuidePageLayout
            title="AWS Account Setup"
            description="Complete guide to creating and configuring your first Amazon Web Services account with proper security settings."
            estimatedTime="20 minutes"
            difficulty="Beginner"
            tableOfContents={tableOfContents}
            nextGuide={{
                title: 'AWS Console',
                href: '/guides/getting-started/aws-console'
            }}>
            <section id="overview">
                <h2>Overview</h2>
                <p>
                    Setting up an AWS account is your first step into the world of cloud computing. This guide will walk
                    you through the entire process of creating an AWS account, from initial registration to setting up
                    basic security measures.
                </p>
                <p>
                    AWS offers a Free Tier that includes many services at no cost for the first 12 months, making it
                    perfect for learning and experimentation.
                </p>
            </section>

            <section id="prerequisites">
                <h2>Prerequisites</h2>
                <ul>
                    <li>A valid email address</li>
                    <li>A phone number for verification</li>
                    <li>A valid credit or debit card</li>
                    <li>Government-issued ID for identity verification</li>
                </ul>
            </section>

            <section id="step-1">
                <h2>Step 1: Create AWS Account</h2>
                <p>Navigate to the AWS homepage and begin the account creation process.</p>
                <ol>
                    <li>
                        Go to{' '}
                        <code>
                            <a href="https://aws.amazon.com" rel="noreferrer" target="_blank">
                                aws.amazon.com
                            </a>
                        </code>
                    </li>
                    <li>Click &quot;Create an AWS Account&quot;</li>
                    <li>Enter your email address and choose an account name</li>
                </ol>

                <div id="email-verification">
                    <h3>Email Verification</h3>
                    <p>
                        AWS will send a verification code to your email address. Check your inbox and enter the code to
                        proceed.
                    </p>
                </div>

                <div id="contact-info">
                    <h3>Contact Information</h3>
                    <p>Provide accurate contact information including:</p>
                    <ul>
                        <li>Full name</li>
                        <li>Phone number</li>
                        <li>Address</li>
                        <li>Account type (Personal or Business)</li>
                    </ul>
                </div>
            </section>

            <section id="step-2">
                <h2>Step 2: Payment Information</h2>
                <p>Even though many services are free, AWS requires a valid payment method for account verification.</p>
                <ul>
                    <li>Enter your credit or debit card information</li>
                    <li>AWS will make a small temporary charge for verification</li>
                    <li>This charge will be refunded automatically</li>
                </ul>
            </section>

            <section id="step-3">
                <h2>Step 3: Identity Verification</h2>
                <p>AWS will verify your identity through a phone call or SMS.</p>
                <ol>
                    <li>Choose your preferred verification method</li>
                    <li>Enter the verification code you receive</li>
                    <li>Complete the automated verification process</li>
                </ol>
            </section>

            <section id="step-4">
                <h2>Step 4: Support Plan Selection</h2>
                <p>Choose a support plan that fits your needs:</p>
                <ul>
                    <li>
                        <strong>Basic Support:</strong> Free, includes documentation and forums
                    </li>
                    <li>
                        <strong>Developer Support:</strong> $29/month, includes technical support
                    </li>
                    <li>
                        <strong>Business Support:</strong> $100/month, includes faster response times
                    </li>
                </ul>
                <p>For beginners, Basic Support is sufficient to get started.</p>
            </section>

            <section id="step-5">
                <h2>Step 5: Account Activation</h2>
                <p>
                    Your account activation may take a few minutes to several hours. You&apos;ll receive an email
                    confirmation once complete.
                </p>
            </section>

            <section id="security-setup">
                <h2>Initial Security Setup</h2>
                <p>Immediately after account creation, set up these security measures:</p>
                <ul>
                    <li>Enable Multi-Factor Authentication (MFA) on your root account</li>
                    <li>Create an IAM user for daily operations</li>
                    <li>Set up billing alerts</li>
                    <li>Review and understand the AWS Free Tier limits</li>
                </ul>
            </section>

            <section id="next-steps">
                <h2>Next Steps</h2>
                <p>With your AWS account ready, you can now:</p>
                <ul>
                    <li>Explore the AWS Management Console</li>
                    <li>Learn about IAM (Identity and Access Management)</li>
                    <li>Set up your first AWS services</li>
                    <li>Install and configure the AWS CLI</li>
                </ul>
            </section>
        </GuidePageLayout>
    );
}
