import GuidePageLayout from '@/components/GuidePageLayout';

const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'prerequisites', title: 'Prerequisites', level: 1 },
    { id: 'iam-basics', title: 'IAM and S3 Permissions', level: 1 },
    { id: 'step-1', title: 'Access Bucket Permissions', level: 1 },
    { id: 'step-2', title: 'Public Access Settings', level: 1 },
    { id: 'block-public-access', title: 'Block Public Access', level: 2 },
    { id: 'step-3', title: 'Configure Bucket Policy', level: 1 },
    { id: 'policy-editor', title: 'Using the Policy Editor', level: 2 },
    { id: 'policy-example', title: 'Example Bucket Policy', level: 2 },
    { id: 'step-4', title: 'CORS Configuration', level: 1 },
    { id: 'next-steps', title: 'Next Steps', level: 1 }
];

export default function BucketPermissionsGuide() {
    return (
        <GuidePageLayout
            title="Configure S3 Bucket Permissions"
            description="A guide to setting up secure access policies for your Amazon S3 buckets using bucket policies and IAM."
            estimatedTime="20 minutes"
            difficulty="Intermediate"
            tableOfContents={tableOfContents}
            previousGuide={{
                title: 'Create S3 Bucket',
                href: '/guides/storage/create-bucket'
            }}
            nextGuide={{
                title: 'Upload Files to S3',
                href: '/guides/storage/upload-files'
            }}>
            <section id="overview">
                <h2>Overview</h2>
                <p>
                    Securing your S3 buckets is a critical task. Misconfigured permissions can lead to data breaches.
                    This guide will walk you through the key concepts and steps to properly configure access control for
                    your S3 buckets, ensuring your data is accessible only by authorized users and applications.
                </p>
            </section>

            <section id="prerequisites">
                <h2>Prerequisites</h2>
                <ul>
                    <li>An active AWS account</li>
                    <li>An existing S3 bucket</li>
                    <li>Basic understanding of AWS IAM (Identity and Access Management)</li>
                </ul>
            </section>

            <section id="iam-basics">
                <h2>IAM and S3 Permissions</h2>
                <p>S3 access control is managed by a combination of IAM policies and S3 bucket policies.</p>
                <ul>
                    <li>
                        <strong>IAM Policies:</strong> Attached to users, groups, or roles, granting them permission to
                        access S3 resources (e.g., &quot;user-x can read from bucket-y&quot;).
                    </li>
                    <li>
                        <strong>Bucket Policies:</strong> Attached to the S3 bucket itself, defining who can access the
                        objects in it and what they can do (e.g., &quot;allow everyone to read objects in this
                        bucket&quot;).
                    </li>
                </ul>
                <p>
                    For most use cases, using IAM policies is the recommended best practice. Bucket policies are used
                    for specific scenarios like making a bucket public or granting cross-account access.
                </p>
            </section>

            <section id="step-1">
                <h2>Step 1: Access Bucket Permissions</h2>
                <p>Navigate to your bucket&apos;s permissions settings.</p>
                <ol>
                    <li>Sign in to the AWS Management Console and go to the S3 dashboard</li>
                    <li>Click on the name of the bucket you want to configure</li>
                    <li>Click on the &quot;Permissions&quot; tab</li>
                </ol>
            </section>

            <section id="step-2">
                <h2>Step 2: Public Access Settings</h2>
                <p>
                    AWS provides a &quot;Block Public Access&quot; feature as a security layer to prevent accidental
                    public exposure of your data.
                </p>

                <div id="block-public-access">
                    <h3>Block Public Access</h3>
                    <p>
                        By default, new buckets have &quot;Block all public access&quot; enabled. This is the
                        recommended setting unless you explicitly need to host a static website or make specific objects
                        public.
                    </p>
                    <ul>
                        <li>In the &quot;Permissions&quot; tab, find the &quot;Block Public Access&quot; section</li>
                        <li>Ensure all four settings are checked unless you have a specific reason to uncheck them</li>
                        <li>Click &quot;Edit&quot; to change these settings and save your changes</li>
                    </ul>
                </div>
            </section>

            <section id="step-3">
                <h2>Step 3: Configure Bucket Policy</h2>
                <p>
                    A bucket policy is a JSON document that defines permissions. You can use it to grant permissions to
                    specific users, AWS services, or even the general public.
                </p>
                <ol>
                    <li>In the &quot;Permissions&quot; tab, find the &quot;Bucket Policy&quot; section</li>
                    <li>Click &quot;Edit&quot; to open the policy editor</li>
                </ol>

                <div id="policy-editor">
                    <h3>Using the Policy Editor</h3>
                    <p>
                        You can write your policy from scratch or use the AWS Policy Generator. The Policy Generator
                        helps you create a policy based on your desired actions and principal (the user or account that
                        the policy applies to).
                    </p>
                </div>

                <div id="policy-example">
                    <h3>Example Bucket Policy</h3>
                    <p>
                        This example policy grants read-only access to a specific IAM user named &quot;my-iam-user&quot;
                        to a bucket named &quot;my-example-bucket&quot;.
                    </p>
                    <pre>
                        <code>
                            {`{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowUserReadAccess",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::123456789012:user/my-iam-user"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::my-example-bucket/*"
        }
    ]
}`}
                        </code>
                    </pre>
                    <p>
                        <strong>Note:</strong> Replace the account ID and user name with your own. The{' '}
                        <code>&quot;/*&quot;</code>
                        at the end of the resource ARN means the policy applies to all objects inside the bucket.
                    </p>
                </div>
            </section>

            <section id="step-4">
                <h2>Step 4: CORS Configuration</h2>
                <p>
                    Cross-Origin Resource Sharing (CORS) is a mechanism that allows a web application in one domain to
                    access resources in another domain. This is often necessary for web apps accessing files in an S3
                    bucket.
                </p>
                <ol>
                    <li>
                        In the &quot;Permissions&quot; tab, scroll down to &quot;Cross-origin resource sharing
                        (CORS)&quot;
                    </li>
                    <li>
                        Click &quot;Edit&quot; and enter the following example configuration to allow GET requests from
                        all origins:
                    </li>
                    <pre>
                        <code>
                            {`[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET"],
        "AllowedOrigins": ["*"],
        "ExposeHeaders": [],
        "MaxAgeSeconds": 3000
    }
]`}
                        </code>
                    </pre>
                </ol>
            </section>

            <section id="next-steps">
                <h2>Next Steps</h2>
                <p>With your bucket permissions configured, you can now:</p>
                <ul>
                    <li>Upload files to your S3 bucket</li>
                    <li>Test your permissions to ensure they work as expected</li>
                    <li>Integrate your bucket with other AWS services or applications</li>
                </ul>
            </section>
        </GuidePageLayout>
    );
}
