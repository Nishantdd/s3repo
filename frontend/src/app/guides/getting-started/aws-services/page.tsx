import GuidePageLayout from '@/components/GuidePageLayout';

const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'prerequisites', title: 'Prerequisites', level: 1 },
    { id: 'compute', title: 'Compute', level: 1 },
    { id: 'ec2', title: 'EC2', level: 2 },
    { id: 'lambda', title: 'AWS Lambda', level: 2 },
    { id: 'storage', title: 'Storage', level: 1 },
    { id: 's3', title: 'Amazon S3', level: 2 },
    { id: 'database', title: 'Databases', level: 1 },
    { id: 'rds', title: 'Amazon RDS', level: 2 },
    { id: 'dynamodb', title: 'Amazon DynamoDB', level: 2 },
    { id: 'networking', title: 'Networking & Content Delivery', level: 1 },
    { id: 'vpc', title: 'Amazon VPC', level: 2 },
    { id: 'cloudfront', title: 'Amazon CloudFront', level: 2 },
    { id: 'security', title: 'Security, Identity, & Compliance', level: 1 },
    { id: 'iam', title: 'IAM', level: 2 },
    { id: 'next-steps', title: 'Next Steps', level: 1 }
];

export default function AWSServicesGuide() {
    return (
        <GuidePageLayout
            title="Overview of AWS Services"
            description="An introduction to the most common and essential Amazon Web Services categories and their primary functions."
            estimatedTime="15 minutes"
            difficulty="Beginner"
            tableOfContents={tableOfContents}
            previousGuide={{
                title: 'AWS Console',
                href: '/guides/getting-started/aws-console'
            }}
            nextGuide={{
                title: 'Setting Up Budget',
                href: '/guides/getting-started/budget-setup'
            }}>
            <section id="overview">
                <h2>Overview</h2>
                <p>
                    Amazon Web Services (AWS) offers over 200 fully featured services from data centers globally.
                    Navigating this vast landscape can be overwhelming. This guide provides a high-level overview of the
                    most fundamental services you&apos;re likely to encounter as a beginner.
                </p>
            </section>

            <section id="prerequisites">
                <h2>Prerequisites</h2>
                <ul>
                    <li>An active AWS account</li>
                    <li>Familiarity with the AWS Management Console</li>
                </ul>
            </section>

            <section id="compute">
                <h2>Compute</h2>
                <p>Services for running applications and code.</p>
                <div id="ec2">
                    <h3>EC2 (Elastic Compute Cloud)</h3>
                    <p>
                        EC2 provides resizable compute capacity in the cloud. It&apos;s essentially a virtual server
                        where you can run applications, databases, or web servers. You can choose from various instance
                        types and operating systems.
                    </p>
                </div>
                <div id="lambda">
                    <h3>AWS Lambda</h3>
                    <p>
                        A serverless compute service that lets you run code without provisioning or managing servers.
                        You only pay for the compute time you consume, and it automatically scales with demand.
                    </p>
                </div>
            </section>

            <section id="storage">
                <h2>Storage</h2>
                <p>Services for storing your data in the cloud.</p>
                <div id="s3">
                    <h3>Amazon S3 (Simple Storage Service)</h3>
                    <p>
                        An object storage service that provides industry-leading scalability, data availability,
                        security, and performance. S3 is used to store and retrieve any amount of data, from simple
                        files to large data lakes.
                    </p>
                </div>
            </section>

            <section id="database">
                <h2>Databases</h2>
                <p>Services for managing and operating databases.</p>
                <div id="rds">
                    <h3>Amazon RDS (Relational Database Service)</h3>
                    <p>
                        A managed relational database service that makes it easy to set up, operate, and scale a
                        relational database in the cloud. It supports multiple database engines like MySQL, PostgreSQL,
                        and SQL Server.
                    </p>
                </div>
                <div id="dynamodb">
                    <h3>Amazon DynamoDB</h3>
                    <p>
                        A fast and flexible NoSQL database service for all applications that need consistent,
                        single-digit millisecond latency at any scale. It&apos;s a fully managed service, meaning you
                        don&apos;t have to worry about servers.
                    </p>
                </div>
            </section>

            <section id="networking">
                <h2>Networking & Content Delivery</h2>
                <p>Services for connecting and delivering content to users.</p>
                <div id="vpc">
                    <h3>Amazon VPC (Virtual Private Cloud)</h3>
                    <p>
                        VPC lets you provision a logically isolated section of the AWS Cloud where you can launch AWS
                        resources in a virtual network that you define. It gives you full control over your virtual
                        networking environment.
                    </p>
                </div>
                <div id="cloudfront">
                    <h3>Amazon CloudFront</h3>
                    <p>
                        A global content delivery network (CDN) service that securely delivers data, videos,
                        applications, and APIs to customers globally with low latency and high transfer speeds.
                    </p>
                </div>
            </section>

            <section id="security">
                <h2>Security, Identity, & Compliance</h2>
                <p>Services for securing your AWS environment and managing access.</p>
                <div id="iam">
                    <h3>IAM (Identity and Access Management)</h3>
                    <p>
                        IAM enables you to securely control access to AWS services and resources for your users. You can
                        manage who is authenticated (signed in) and authorized (has permissions) to use resources.
                    </p>
                </div>
            </section>

            <section id="next-steps">
                <h2>Next Steps</h2>
                <p>This is just a brief look at some of the core services. As you continue, you will:</p>
                <ul>
                    <li>Learn how to manage your AWS spending with budget alerts</li>
                    <li>Dive deeper into individual services with our detailed guides</li>
                    <li>Start building and deploying your own applications on AWS</li>
                </ul>
            </section>
        </GuidePageLayout>
    );
}
