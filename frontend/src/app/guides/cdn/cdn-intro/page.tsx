import GuidePageLayout from '@/components/GuidePageLayout';

const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'what-is-cdn', title: 'What is a CDN?', level: 1 },
    { id: 'how-cloudfront-works', title: 'How CloudFront Works', level: 1 },
    { id: 'key-features', title: 'Key Features of CloudFront', level: 1 },
    { id: 'benefits', title: 'Benefits of Using CloudFront', level: 1 },
    { id: 'edge-locations', title: 'Global Edge Locations', level: 2 },
    { id: 'caching', title: 'Caching', level: 2 },
    { id: 'security', title: 'Security', level: 2 },
    { id: 'next-steps', title: 'Next Steps', level: 1 }
];

export default function CloudfrontIntroGuide() {
    return (
        <GuidePageLayout
            title="CloudFront Introduction"
            description="An introduction to Amazon CloudFront, AWS's global Content Delivery Network, and its role in accelerating content delivery and improving website performance."
            estimatedTime="10 minutes"
            difficulty="Beginner"
            tableOfContents={tableOfContents}
            previousGuide={{
                title: 'Upload Files to S3',
                href: '/guides/storage/upload-files'
            }}
            nextGuide={{
                title: 'Create Cloudfront Distribution',
                href: '/guides/cdn/create-cdn'
            }}>
            <section id="overview">
                <h2>Overview</h2>
                <p>
                    Amazon CloudFront is a fast content delivery network (CDN) service that securely delivers data,
                    videos, applications, and APIs to customers globally with low latency, high transfer speeds, and no
                    minimum commitments. This guide will introduce you to the core concepts of CloudFront and why it is
                    an essential service for modern web applications.
                </p>
            </section>

            <section id="what-is-cdn">
                <h2>What is a CDN?</h2>
                <p>
                    A Content Delivery Network (CDN) is a geographically distributed network of proxy servers and their
                    data centers. The goal of a CDN is to distribute service content to end-users with high availability
                    and high performance. When a user requests content from a website that uses a CDN, the CDN serves
                    that content from a server closer to the user, known as an &quot;edge location&quot;, rather than
                    from the origin server.
                </p>
            </section>

            <section id="how-cloudfront-works">
                <h2>How CloudFront Works</h2>
                <ol>
                    <li>
                        A user requests a file (like an image or a JavaScript file) from your website or application.
                    </li>
                    <li>
                        If you have CloudFront configured, the DNS routes the request to the nearest CloudFront edge
                        location.
                    </li>
                    <li>The edge location checks its cache for the requested file.</li>
                    <li>
                        <strong>If the file is in the cache:</strong> The edge location immediately serves the file to
                        the user. This is the fastest path.
                    </li>
                    <li>
                        <strong>If the file is not in the cache:</strong> The edge location forwards the request to your
                        &quot;origin&quot; server (e.g., an S3 bucket or an EC2 instance).
                    </li>
                    <li>The origin server sends the file back to the edge location.</li>
                    <li>The edge location caches the file and then serves it to the user.</li>
                </ol>
            </section>

            <section id="key-features">
                <h2>Key Features of CloudFront</h2>
                <div id="benefits">
                    <p>Using CloudFront can significantly improve your application&apos;s performance and security.</p>
                </div>
                <div id="edge-locations">
                    <h3>Global Edge Locations</h3>
                    <p>
                        CloudFront has a global network of hundreds of points of presence (POPs) that include edge
                        locations and regional edge caches in cities around the world. This ensures that your content is
                        delivered with low latency to your global audience.
                    </p>
                </div>
                <div id="caching">
                    <h3>Caching</h3>
                    <p>
                        CloudFront caches copies of your content at its edge locations. This reduces the load on your
                        origin server and decreases the time it takes for a user to receive the content. You can
                        configure how long your content remains in the cache.
                    </p>
                </div>
                <div id="security">
                    <h3>Security</h3>
                    <p>
                        CloudFront integrates with AWS WAF (Web Application Firewall) to protect your applications from
                        web exploits. It also offers DDoS mitigation and HTTPS support at no additional cost.
                    </p>
                </div>
            </section>

            <section id="next-steps">
                <h2>Next Steps</h2>
                <p>With an understanding of what CloudFront is and how it works, you are ready to set it up.</p>
                <ul>
                    <li>Learn how to create a CloudFront distribution for your S3 bucket</li>
                    <li>Configure caching behaviors and security settings</li>
                </ul>
            </section>
        </GuidePageLayout>
    );
}
