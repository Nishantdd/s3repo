import GuidePageLayout from '@/components/GuidePageLayout';

const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'prerequisites', title: 'Prerequisites', level: 1 },
    { id: 'step-1', title: 'Access CloudFront Console', level: 1 },
    { id: 'step-2', title: 'Create a Distribution', level: 1 },
    { id: 'origin-domain', title: 'Origin Domain', level: 2 },
    { id: 's3-origin-access', title: 'S3 Origin Access', level: 2 },
    { id: 'default-cache-behavior', title: 'Default Cache Behavior', level: 2 },
    { id: 'distribution-settings', title: 'Distribution Settings', level: 2 },
    { id: 'step-3', title: 'Wait for Deployment', level: 1 },
    { id: 'step-4', title: 'Test the CDN URL', level: 1 },
    { id: 'next-steps', title: 'Next Steps', level: 1 }
];

export default function CreateCloudfrontDistributionGuide() {
    return (
        <GuidePageLayout
            title="Create CloudFront Distribution"
            description="A step-by-step guide to setting up your first Amazon CloudFront distribution to serve content from an S3 bucket."
            estimatedTime="15 minutes"
            difficulty="Beginner"
            tableOfContents={tableOfContents}
            previousGuide={{
                title: 'Cloudfront Introduction',
                href: 'cdn-intro'
            }}
            nextGuide={{
                title: 'Policies and Users Introduction',
                href: '/guides/iam/iam-intro'
            }}>
            <section id="overview">
                <h2>Overview</h2>
                <p>
                    A CloudFront distribution is the mechanism that tells CloudFront where to find your content (the
                    &quot;origin&quot;) and how to deliver it to your users. This guide will walk you through creating a
                    distribution that serves content from an Amazon S3 bucket.
                </p>
            </section>

            <section id="prerequisites">
                <h2>Prerequisites</h2>
                <ul>
                    <li>An active AWS account</li>
                    <li>An S3 bucket with some objects (files) in it</li>
                </ul>
            </section>

            <section id="step-1">
                <h2>Step 1: Access CloudFront Console</h2>
                <p>First, navigate to the CloudFront service in the AWS Management Console.</p>
                <ol>
                    <li>Sign in to the AWS Management Console</li>
                    <li>
                        In the search bar, type &quot;CloudFront&quot; and select &quot;CloudFront&quot; from the
                        dropdown
                    </li>
                    <li>Click the &quot;Create a CloudFront distribution&quot; button</li>
                </ol>
            </section>

            <section id="step-2">
                <h2>Step 2: Create a Distribution</h2>
                <p>Now, you&apos;ll configure the settings for your new distribution.</p>

                <div id="origin-domain">
                    <h3>Origin Domain</h3>
                    <p>This is the source of your content.</p>
                    <ul>
                        <li>
                            Under &quot;Origin domain&quot;, click the input field and select your S3 bucket from the
                            list
                        </li>
                    </ul>
                </div>

                <div id="s3-origin-access">
                    <h3>S3 Origin Access</h3>
                    <p>This setting controls how CloudFront accesses your S3 bucket.</p>
                    <ul>
                        <li>Select &quot;Origin access control settings (recommended)&quot;</li>
                        <li>Click &quot;Create new OAC&quot;</li>
                        <li>Give the OAC a name, and leave other settings as default</li>
                        <li>Click &quot;Create&quot;</li>
                    </ul>
                    <p>
                        AWS will generate a bucket policy for you to copy and apply to your S3 bucket. Follow the
                        on-screen instructions to copy the policy and paste it into your S3 bucket&apos;s permissions
                        tab under &quot;Bucket Policy&quot;. This is a critical step for security.
                    </p>
                </div>

                <div id="default-cache-behavior">
                    <h3>Default Cache Behavior</h3>
                    <p>This section defines how CloudFront caches your content.</p>
                    <ul>
                        <li>
                            <strong>Viewer protocol policy:</strong> Select &quot;Redirect HTTP to HTTPS&quot; for
                            secure connections.
                        </li>
                        <li>
                            <strong>Allowed HTTP methods:</strong> Select &quot;GET, HEAD&quot; for most static content.
                        </li>
                        <li>
                            <strong>Caching policy:</strong> Use the default &quot;Managed-CachingOptimized&quot; for a
                            simple setup.
                        </li>
                    </ul>
                </div>

                <div id="distribution-settings">
                    <h3>Distribution Settings</h3>
                    <p>Configure general settings for your distribution.</p>
                    <ul>
                        <li>
                            <strong>Price class:</strong> &quot;Use all edge locations (best performance)&quot; is
                            recommended for global reach, but you can choose a lower-cost option if your users are in a
                            specific region.
                        </li>
                        <li>
                            <strong>Alternate domain name (CNAME):</strong> You can add a custom domain name here (e.g.,
                            cdn.your-domain.com).
                        </li>
                        <li>
                            <strong>Default root object:</strong> If you are hosting a static website, set this to
                            &quot;index.html&quot;.
                        </li>
                    </ul>
                </div>
            </section>

            <section id="step-3">
                <h2>Step 3: Wait for Deployment</h2>
                <p>
                    After creating the distribution, its status will be &quot;Deploying&quot;. This process can take
                    several minutes. You can monitor the status on the CloudFront distributions list.
                </p>
            </section>

            <section id="step-4">
                <h2>Step 4: Test the CDN URL</h2>
                <p>Once the status changes to &quot;Enabled&quot;, your distribution is ready.</p>
                <ol>
                    <li>Click on your distribution ID to view its details</li>
                    <li>Find the &quot;Distribution domain name&quot; (e.g., d12345.cloudfront.net)</li>
                    <li>
                        To test, append the name of a file from your S3 bucket to this domain name (e.g.,
                        d12345.cloudfront.net/your-file.jpg) and visit it in a browser
                    </li>
                </ol>
                <p>
                    If everything is configured correctly, the file will be served from CloudFront&apos;s global
                    network.
                </p>
            </section>

            <section id="next-steps">
                <h2>Next Steps</h2>
                <p>Your content is now being delivered by CloudFront. You can:</p>
                <ul>
                    <li>Set up a custom domain name for your distribution</li>
                    <li>Explore advanced caching and security settings</li>
                    <li>Learn about IAM to manage access to your AWS resources</li>
                </ul>
            </section>
        </GuidePageLayout>
    );
}
