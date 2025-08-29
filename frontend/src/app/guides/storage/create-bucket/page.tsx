import GuidePageLayout from '@/components/GuidePageLayout';
import { TableOfContentsItem } from '@/types/tableOfContents';

const tableOfContents: TableOfContentsItem[] = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'prerequisites', title: 'Prerequisites', level: 1 },
    { id: 'step-1', title: 'Access S3 Console', level: 1 },
    { id: 'step-2', title: 'Create New Bucket', level: 1 },
    { id: 'bucket-name', title: 'Choose Bucket Name', level: 2 },
    { id: 'bucket-region', title: 'Select Region', level: 2 },
    { id: 'step-3', title: 'Configure Settings', level: 1 },
    { id: 'versioning', title: 'Enable Versioning', level: 2 },
    { id: 'encryption', title: 'Set Up Encryption', level: 2 },
    { id: 'step-4', title: 'Review and Create', level: 1 },
    { id: 'verification', title: 'Verify Creation', level: 1 },
    { id: 'next-steps', title: 'Next Steps', level: 1 }
];

export default function CreateBucketGuide() {
    return (
        <GuidePageLayout
            title="Create S3 Bucket"
            description="Learn how to create and configure your first Amazon S3 bucket for secure, scalable object storage in the cloud."
            estimatedTime="15 minutes"
            difficulty="Beginner"
            tableOfContents={tableOfContents}
            previousGuide={{
                title: 'Setting Up Budget',
                href: '/guides/getting-started/budget-setup'
            }}
            nextGuide={{
                title: 'Bucket Permissions',
                href: '/guides/storage/bucket-permissions'
            }}>
            <section id="overview">
                <h2>Overview</h2>
                <p>
                    Amazon S3 (Simple Storage Service) is a highly scalable object storage service that allows you to
                    store and retrieve any amount of data from anywhere on the web. In this guide, you&apos;ll learn how
                    to create your first S3 bucket, which serves as a container for your files and data.
                </p>
                <p>
                    S3 buckets are fundamental building blocks of AWS storage infrastructure, offering 99.999999999% (11
                    9&apos;s) of data durability and 99.99% availability of objects over a given year.
                </p>
            </section>

            <section id="prerequisites">
                <h2>Prerequisites</h2>
                <p>Before you begin, make sure you have:</p>
                <ul>
                    <li>An active AWS account with appropriate permissions</li>
                    <li>Access to the AWS Management Console</li>
                    <li>Basic understanding of AWS regions and availability zones</li>
                    <li>Familiarity with AWS IAM (Identity and Access Management) concepts</li>
                </ul>
            </section>

            <section id="step-1">
                <h2>Step 1: Access S3 Console</h2>
                <p>First, you&apos;ll need to navigate to the Amazon S3 service in the AWS Management Console.</p>
                <ol>
                    <li>Sign in to the AWS Management Console</li>
                    <li>In the search bar, type &quot;S3&quot; and select &quot;S3&quot; from the dropdown</li>
                    <li>You&apos;ll be taken to the S3 dashboard where you can see all your existing buckets</li>
                </ol>
                <p>
                    <strong>Tip:</strong> You can also access S3 directly by navigating to{' '}
                    <code>
                        <a href="https://s3.console.aws.amazon.com">https://s3.console.aws.amazon.com/s3/</a>
                    </code>
                </p>
            </section>

            <section id="step-2">
                <h2>Step 2: Create New Bucket</h2>
                <p>Now you&apos;ll create a new S3 bucket with the appropriate configuration for your needs.</p>
                <ol>
                    <li>Click the &quot;Create bucket&quot; button in the S3 console</li>
                    <li>You&apos;ll be taken to the bucket creation wizard</li>
                </ol>

                <div id="bucket-name">
                    <h3>Choose Bucket Name</h3>
                    <p>
                        Your bucket name must be globally unique across all AWS accounts and regions. Consider these
                        requirements:
                    </p>
                    <ul>
                        <li>Must be between 3 and 63 characters long</li>
                        <li>Can contain only lowercase letters, numbers, and hyphens</li>
                        <li>Must start and end with a letter or number</li>
                        <li>Cannot contain spaces or uppercase letters</li>
                        <li>Should not resemble an IP address (e.g., 192.168.1.1)</li>
                    </ul>
                    <p>
                        <strong>Example:</strong> <code>my-company-data-backup-2024</code>
                    </p>
                </div>

                <div id="bucket-region">
                    <h3>Select Region</h3>
                    <p>Choose the AWS region where your bucket will be created. Consider these factors:</p>
                    <ul>
                        <li>
                            <strong>Latency:</strong> Choose a region close to your users
                        </li>
                        <li>
                            <strong>Compliance:</strong> Some data must remain in specific geographic regions
                        </li>
                        <li>
                            <strong>Cost:</strong> Different regions have different pricing
                        </li>
                        <li>
                            <strong>Features:</strong> Some AWS features may not be available in all regions
                        </li>
                    </ul>
                </div>
            </section>

            <section id="step-3">
                <h2>Step 3: Configure Settings</h2>
                <p>Configure important security and management settings for your bucket.</p>

                <div id="versioning">
                    <h3>Enable Versioning</h3>
                    <p>Versioning helps protect against accidental deletion or modification of objects:</p>
                    <ul>
                        <li>Toggle &quot;Bucket Versioning&quot; to &quot;Enable&quot;</li>
                        <li>This allows you to keep multiple versions of the same object</li>
                        <li>You can always disable versioning later if needed</li>
                    </ul>
                </div>

                <div id="encryption">
                    <h3>Set Up Encryption</h3>
                    <p>Enable server-side encryption to protect your data at rest:</p>
                    <ul>
                        <li>Choose &quot;Server-side encryption settings&quot;</li>
                        <li>Select &quot;Amazon S3 managed keys (SSE-S3)&quot; for basic encryption</li>
                        <li>For enhanced security, consider AWS KMS keys (SSE-KMS)</li>
                    </ul>
                </div>
            </section>

            <section id="step-4">
                <h2>Step 4: Review and Create</h2>
                <p>Before creating your bucket, review all the settings you&apos;ve configured:</p>
                <ol>
                    <li>Verify the bucket name is correct and follows naming conventions</li>
                    <li>Confirm the selected region meets your requirements</li>
                    <li>Check that versioning and encryption settings are as desired</li>
                    <li>Click &quot;Create bucket&quot; to finalize the creation</li>
                </ol>
            </section>

            <section id="verification">
                <h2>Verify Creation</h2>
                <p>After successful creation, you should see your new bucket in the S3 console:</p>
                <ul>
                    <li>The bucket appears in your buckets list</li>
                    <li>You can click on the bucket name to explore its contents (initially empty)</li>
                    <li>The bucket properties show your configured settings</li>
                </ul>
            </section>

            <section id="next-steps">
                <h2>Next Steps</h2>
                <p>Now that you have created your S3 bucket, you can:</p>
                <ul>
                    <li>Upload files and folders to your bucket</li>
                    <li>Configure bucket policies for access control</li>
                    <li>Set up lifecycle rules for cost optimization</li>
                    <li>Enable logging and monitoring</li>
                    <li>Configure cross-region replication for disaster recovery</li>
                </ul>
                <p>Continue with our next guide to learn how to upload your first files to S3.</p>
            </section>
        </GuidePageLayout>
    );
}
