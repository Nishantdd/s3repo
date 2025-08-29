import GuidePageLayout from '@/components/GuidePageLayout';

const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'prerequisites', title: 'Prerequisites', level: 1 },
    { id: 'step-1', title: 'Sign In', level: 1 },
    { id: 'step-2', title: 'Explore the Dashboard', level: 1 },
    { id: 'services-menu', title: 'Services Menu', level: 2 },
    { id: 'search-bar', title: 'Search Bar', level: 2 },
    { id: 'account-menu', title: 'Account Menu', level: 2 },
    { id: 'step-3', title: 'Regions', level: 1 },
    { id: 'step-4', title: 'Managing Resources', level: 1 },
    { id: 'next-steps', title: 'Next Steps', level: 1 }
];

export default function AWSConsoleGuide() {
    return (
        <GuidePageLayout
            title="AWS Management Console"
            description="A beginner's guide to navigating and understanding the AWS Management Console, your central hub for all AWS services."
            estimatedTime="10 minutes"
            difficulty="Beginner"
            tableOfContents={tableOfContents}
            previousGuide={{
                title: 'AWS Account Setup',
                href: '/guides/getting-started/account-setup'
            }}
            nextGuide={{
                title: 'AWS Services',
                href: '/guides/getting-started/aws-services'
            }}>
            <section id="overview">
                <h2>Overview</h2>
                <p>
                    The AWS Management Console is a web-based interface that allows you to manage and interact with your
                    Amazon Web Services. It&apos;s the primary tool for launching services, monitoring your resources,
                    and managing your account settings. This guide will help you get familiar with its key features and
                    layout.
                </p>
                <p>
                    Understanding the console is crucial for anyone working with AWS, whether you&apos;re a developer,
                    system administrator, or a business user.
                </p>
            </section>

            <section id="prerequisites">
                <h2>Prerequisites</h2>
                <p>Before you begin, make sure you have:</p>
                <ul>
                    <li>An active AWS account</li>
                    <li>Your account credentials (email and password)</li>
                </ul>
            </section>

            <section id="step-1">
                <h2>Step 1: Sign In</h2>
                <p>Access the AWS Management Console by signing in with your root or IAM user credentials.</p>
                <ol>
                    <li>
                        Go to{' '}
                        <code>
                            <a href="https://aws.amazon.com/console/" rel="noreferrer" target="_blank">
                                aws.amazon.com/console
                            </a>
                        </code>
                    </li>
                    <li>Enter your email address and password</li>
                    <li>Click &quot;Sign in&quot;</li>
                </ol>
                <p>
                    <strong>Tip:</strong> If you have an IAM user, use your account ID or alias to sign in for a more
                    secure practice.
                </p>
            </section>

            <section id="step-2">
                <h2>Step 2: Explore the Dashboard</h2>
                <p>Once you sign in, you&apos;ll land on the AWS Management Console home dashboard.</p>

                <div id="services-menu">
                    <h3>Services Menu</h3>
                    <p>
                        The &quot;Services&quot; menu at the top left lists all available AWS services, categorized by
                        function (e.g., Compute, Storage, Networking & Content Delivery).
                    </p>
                    <ul>
                        <li>Click on a service name to go to its dashboard</li>
                        <li>Use the search bar within the menu to quickly find a service</li>
                    </ul>
                </div>

                <div id="search-bar">
                    <h3>Search Bar</h3>
                    <p>
                        The search bar at the top of the page is your most powerful tool. You can search for services,
                        features, and even specific resources.
                    </p>
                    <p>
                        <strong>Example:</strong> Type &quot;S3&quot; to quickly find the S3 service or &quot;EC2&quot;
                        to find the EC2 service.
                    </p>
                </div>

                <div id="account-menu">
                    <h3>Account Menu</h3>
                    <p>
                        Your account menu (top right, with your account name) gives you access to important
                        account-level features.
                    </p>
                    <ul>
                        <li>
                            <strong>My Account:</strong> View account details
                        </li>
                        <li>
                            <strong>Security Credentials:</strong> Manage your security credentials (highly important!)
                        </li>
                        <li>
                            <strong>Billing Dashboard:</strong> Monitor your AWS costs and usage
                        </li>
                    </ul>
                </div>
            </section>

            <section id="step-3">
                <h2>Step 3: Regions</h2>
                <p>
                    The region selector, located at the top right of the console, allows you to switch between different
                    AWS geographic regions.
                </p>
                <ul>
                    <li>The console is global, but most resources are region-specific</li>
                    <li>Select the region where your resources are located to manage them</li>
                    <li>
                        <strong>Important:</strong> If you don&apos;t see your resources, you might be in the wrong
                        region.
                    </li>
                </ul>
            </section>

            <section id="step-4">
                <h2>Step 4: Managing Resources</h2>
                <p>
                    The console provides dashboards for each service where you can create, modify, and delete resources.
                </p>
                <p>
                    <strong>Example:</strong> Go to the S3 dashboard to see all your buckets, or the EC2 dashboard to
                    see your running instances.
                </p>
            </section>

            <section id="next-steps">
                <h2>Next Steps</h2>
                <p>Now that you are familiar with the AWS Management Console, you can:</p>
                <ul>
                    <li>Explore the different service dashboards</li>
                    <li>Set up billing alerts to manage costs</li>
                    <li>Learn about essential AWS services like S3 and EC2</li>
                </ul>
                <p>Continue with our next guide to get an overview of the main AWS services.</p>
            </section>
        </GuidePageLayout>
    );
}
