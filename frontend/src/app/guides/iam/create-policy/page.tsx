import GuidePageLayout from '@/components/GuidePageLayout';

const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'prerequisites', title: 'Prerequisites', level: 1 },
    { id: 'step-1', title: 'Access the IAM Console', level: 1 },
    { id: 'step-2', title: 'Create a New Policy', level: 1 },
    { id: 'visual-editor', title: 'Use the Visual Editor', level: 2 },
    { id: 'json-editor', title: 'Use the JSON Editor', level: 2 },
    { id: 'policy-details', title: 'Review Policy Details', level: 2 },
    { id: 'step-3', title: 'Attach the Policy', level: 1 },
    { id: 'next-steps', title: 'Next Steps', level: 1 }
];

export default function CreatePolicyGuide() {
    return (
        <GuidePageLayout
            title="Create New Policy"
            description="A step-by-step guide to creating an AWS IAM policy to define permissions for users, groups, and roles."
            estimatedTime="15 minutes"
            difficulty="Intermediate"
            tableOfContents={tableOfContents}
            previousGuide={{
                title: 'Policies and Users Introduction',
                href: '/guides/iam/iam-intro'
            }}
            nextGuide={{
                title: 'Create New User',
                href: '/guides/iam/create-user'
            }}>
            <section id="overview">
                <h2>Overview</h2>
                <p>
                    An IAM policy is a JSON document that defines a set of permissions. Creating a custom policy is a
                    key part of implementing the principle of least privilege, where you grant only the necessary
                    permissions to your users and services. This guide will show you how to create a policy to allow
                    read-only access to a specific S3 bucket.
                </p>
            </section>

            <section id="prerequisites">
                <h2>Prerequisites</h2>
                <ul>
                    <li>An active AWS account</li>
                    <li>Access to the IAM Management Console</li>
                    <li>The name of an S3 bucket you wish to grant access to</li>
                </ul>
            </section>

            <section id="step-1">
                <h2>Step 1: Access the IAM Console</h2>
                <p>Navigate to the IAM service in the AWS Management Console.</p>
                <ol>
                    <li>Sign in to the AWS Management Console</li>
                    <li>In the search bar, type &quot;IAM&quot; and select it from the dropdown</li>
                    <li>In the left-hand navigation pane, click on &quot;Policies&quot;</li>
                </ol>
            </section>

            <section id="step-2">
                <h2>Step 2: Create a New Policy</h2>
                <p>Now, you will use the policy editor to create your new policy.</p>
                <ol>
                    <li>Click the &quot;Create policy&quot; button</li>
                    <li>You will be presented with a choice between the Visual editor and JSON editor</li>
                </ol>

                <div id="visual-editor">
                    <h3>Use the Visual Editor (Recommended for beginners)</h3>
                    <ol>
                        <li>On the &quot;Visual editor&quot; tab, click &quot;Choose a service&quot;</li>
                        <li>Type &quot;S3&quot; and select &quot;S3&quot;</li>
                        <li>
                            Under &quot;Actions&quot;, expand the &quot;Read&quot; section and select the following
                            actions:
                            <ul>
                                <li>
                                    <code>ListBucket</code>: Allows listing the objects in the bucket
                                </li>
                                <li>
                                    <code>GetObject</code>: Allows reading objects in the bucket
                                </li>
                            </ul>
                        </li>
                        <li>
                            Under &quot;Resources&quot;, select &quot;Specific&quot; and click &quot;Add ARN&quot;
                            <ul>
                                <li>
                                    Enter the ARN for your bucket (e.g., <code>arn:aws:s3:::my-example-bucket</code>)
                                </li>
                                <li>
                                    Enter the ARN for all objects in your bucket (e.g.,{' '}
                                    <code>arn:aws:s3:::my-example-bucket/*</code>)
                                </li>
                            </ul>
                        </li>
                    </ol>
                </div>

                <div id="json-editor">
                    <h3>Use the JSON Editor (Advanced)</h3>
                    <p>
                        Alternatively, you can switch to the &quot;JSON&quot; tab and paste the following policy
                        document, replacing <code>my-example-bucket</code> with your bucket&apos;s name.
                    </p>
                    <pre>
                        <code>
                            {`{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::my-example-bucket",
                "arn:aws:s3:::my-example-bucket/*"
            ]
        }
    ]
}`}
                        </code>
                    </pre>
                </div>

                <div id="policy-details">
                    <h3>Review Policy Details</h3>
                    <ol>
                        <li>Click &quot;Next: Tags&quot; (tags are optional)</li>
                        <li>
                            On the &quot;Review&quot; page, give your policy a descriptive name, e.g.,{' '}
                            <code>S3ReadOnlyAccess-my-bucket</code>
                        </li>
                        <li>Add a description for clarity</li>
                        <li>Click &quot;Create policy&quot;</li>
                    </ol>
                </div>
            </section>

            <section id="step-3">
                <h2>Step 3: Attach the Policy</h2>
                <p>Your new policy is now created. You can attach it to an IAM user, group, or role.</p>
                <p>
                    <strong>Example:</strong> To attach it to a user, go to the user&apos;s page in the IAM console,
                    click on &quot;Add permissions&quot;, and attach the policy you just created.
                </p>
            </section>

            <section id="next-steps">
                <h2>Next Steps</h2>
                <p>With your new policy ready, you are prepared for the next step.</p>
                <ul>
                    <li>Learn how to create a new IAM user and attach this policy to them</li>
                    <li>Explore how to create access keys for programmatic access</li>
                </ul>
            </section>
        </GuidePageLayout>
    );
}
