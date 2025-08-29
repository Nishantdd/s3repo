import GuidePageLayout from '@/components/GuidePageLayout';

const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'prerequisites', title: 'Prerequisites', level: 1 },
    { id: 'step-1', title: 'Access the IAM User', level: 1 },
    { id: 'step-2', title: 'Create Access Keys', level: 1 },
    { id: 'security-best-practices', title: 'Security Best Practices', level: 2 },
    { id: 'next-steps', title: 'Next Steps', level: 1 }
];

export default function AccessKeysGuide() {
    return (
        <GuidePageLayout
            title="Creating Access Keys For User"
            description="A guide to creating an AWS access key and secret key for an IAM user to enable programmatic access to AWS services."
            estimatedTime="5 minutes"
            difficulty="Intermediate"
            tableOfContents={tableOfContents}
            previousGuide={{
                title: 'Create New User',
                href: '/guides/iam/create-user'
            }}
            nextGuide={{
                title: 'Setup Credentials',
                href: '/guides/s3repo/set-credentials'
            }}>
            <section id="overview">
                <h2>Overview</h2>
                <p>
                    Access keys, consisting of an access key ID and a secret access key, are crucial for programmatic
                    access to AWS. They are used by applications, the AWS Command Line Interface (CLI), and SDKs to
                    authenticate with AWS services. This guide shows you how to securely create and manage access keys
                    for an IAM user.
                </p>
            </section>

            <section id="prerequisites">
                <h2>Prerequisites</h2>
                <ul>
                    <li>An active AWS account</li>
                    <li>An existing IAM user (not the root account)</li>
                    <li>Access to the IAM Management Console</li>
                </ul>
            </section>

            <section id="step-1">
                <h2>Step 1: Access the IAM User</h2>
                <p>Navigate to the user you wish to create access keys for.</p>
                <ol>
                    <li>Sign in to the AWS Management Console</li>
                    <li>In the search bar, type &quot;IAM&quot; and select it from the dropdown</li>
                    <li>In the left-hand navigation pane, click on &quot;Users&quot;</li>
                    <li>Click on the user name from the list</li>
                </ol>
            </section>

            <section id="step-2">
                <h2>Step 2: Create Access Keys</h2>
                <p>From the user&apos;s details page, you can generate new credentials.</p>
                <ol>
                    <li>Click on the &quot;Security credentials&quot; tab</li>
                    <li>Under &quot;Access keys&quot;, click &quot;Create access key&quot;</li>
                    <li>
                        <strong>Use Case:</strong> Select the use case for the access key (e.g., &quot;Local code&quot;,
                        &quot;Third-party service&quot;). This is for documentation purposes only.
                    </li>
                    <li>
                        Click &quot;Create access key&quot;. AWS will generate an access key ID and a secret access key.
                    </li>
                </ol>
                <p>
                    <strong>Important:</strong> This is the only time you can view or download the secret access key.
                    Copy them or download the <code>.csv</code> file immediately and store them securely. If you lose
                    the secret key, you cannot recover it; you must create a new one.
                </p>

                <div id="security-best-practices">
                    <h3>Security Best Practices</h3>
                    <ul>
                        <li>
                            <strong>Do Not Share:</strong> Never share your secret access keys with anyone.
                        </li>
                        <li>
                            <strong>Environment Variables:</strong> Store keys in environment variables, not in your
                            code.
                        </li>
                        <li>
                            <strong>Short-lived Credentials:</strong> Use IAM roles and temporary credentials when
                            possible.
                        </li>
                        <li>
                            <strong>Rotate Keys:</strong> Regularly rotate your access keys to minimize risk.
                        </li>
                        <li>
                            <strong>Deactivate/Delete Keys:</strong> Deactivate or delete keys that are no longer in
                            use.
                        </li>
                    </ul>
                </div>
            </section>

            <section id="next-steps">
                <h2>Next Steps</h2>
                <p>You have successfully created access keys for your IAM user.</p>
                <ul>
                    <li>Configure the AWS CLI or an SDK using your new keys</li>
                    <li>Start making programmatic calls to AWS services</li>
                    <li>Remember to only grant the IAM user the permissions they need</li>
                </ul>
            </section>
        </GuidePageLayout>
    );
}
