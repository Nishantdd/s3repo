import GuidePageLayout from '@/components/GuidePageLayout';

const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'what-is-iam', title: 'What is AWS IAM?', level: 1 },
    { id: 'key-concepts', title: 'Key IAM Concepts', level: 1 },
    { id: 'users', title: 'Users', level: 2 },
    { id: 'groups', title: 'Groups', level: 2 },
    { id: 'policies', title: 'Policies', level: 2 },
    { id: 'roles', title: 'Roles', level: 2 },
    { id: 'best-practices', title: 'IAM Best Practices', level: 1 },
    { id: 'next-steps', title: 'Next Steps', level: 1 }
];

export default function IAMIntroGuide() {
    return (
        <GuidePageLayout
            title="IAM: Policies and Users Introduction"
            description="An introduction to AWS Identity and Access Management (IAM), its core concepts, and why it's crucial for securing your AWS account."
            estimatedTime="15 minutes"
            difficulty="Beginner"
            tableOfContents={tableOfContents}
            previousGuide={{
                title: 'Create Cloudfront Distribution',
                href: '/guides/cdn/create-cdn'
            }}
            nextGuide={{
                title: 'Create New Policy',
                href: '/guides/iam/create-policy'
            }}>
            <section id="overview">
                <h2>Overview</h2>
                <p>
                    AWS Identity and Access Management (IAM) is a service that helps you securely control access to your
                    AWS resources. It enables you to manage who is authenticated (signed in) and authorized (has
                    permissions) to use your AWS services. Using IAM is a fundamental security best practice.
                </p>
            </section>

            <section id="what-is-iam">
                <h2>What is AWS IAM?</h2>
                <p>
                    IAM allows you to create and manage AWS users and groups, and use permissions to allow and deny
                    their access to AWS resources. Without IAM, everyone would have to use the root account, which is
                    highly insecure.
                </p>
                <p>
                    Think of IAM as the gatekeeper for your AWS account. It ensures that only the right people have
                    access to the right services for the right reasons.
                </p>
            </section>

            <section id="key-concepts">
                <h2>Key IAM Concepts</h2>
                <p>Understanding these four components is crucial for working with IAM:</p>
                <div id="users">
                    <h3>Users</h3>
                    <p>
                        An IAM user represents a person or an application that interacts with AWS. Each user can have
                        their own password for signing in to the console and their own access keys for making
                        programmatic calls.
                    </p>
                </div>
                <div id="groups">
                    <h3>Groups</h3>
                    <p>
                        An IAM group is a collection of IAM users. You can assign policies to a group, and all users in
                        the group will inherit the permissions defined in those policies. This makes it easier to manage
                        permissions for multiple users.
                    </p>
                </div>
                <div id="policies">
                    <h3>Policies</h3>
                    <p>
                        An IAM policy is a document that defines permissions. It is a JSON document that specifies what
                        actions are allowed or denied on which resources. Policies can be attached to users, groups, or
                        roles.
                    </p>
                    <p>
                        <strong>Example:</strong> A policy might allow a user to read data from a specific S3 bucket but
                        deny them the ability to delete files.
                    </p>
                </div>
                <div id="roles">
                    <h3>Roles</h3>
                    <p>
                        An IAM role is similar to a user in that it is an identity with permission policies. However, it
                        is not associated with a specific person. Instead, roles are intended to be assumed by AWS
                        services or other users, providing temporary permissions for a specific task.
                    </p>
                </div>
            </section>

            <section id="best-practices">
                <h2>IAM Best Practices</h2>
                <ul>
                    <li>
                        <strong>Root Account Security:</strong> Never use your root account for daily tasks. Use it only
                        for initial setup and then secure it with MFA.
                    </li>
                    <li>
                        <strong>Principle of Least Privilege:</strong> Grant users only the permissions they need to
                        perform their job. Don&apos;t give them more access than is necessary.
                    </li>
                    <li>
                        <strong>Use Groups:</strong> Manage permissions by assigning policies to groups, not individual
                        users. This makes administration much easier.
                    </li>
                    <li>
                        <strong>Enable MFA:</strong> Always enable Multi-Factor Authentication for your root account and
                        all IAM users.
                    </li>
                </ul>
            </section>

            <section id="next-steps">
                <h2>Next Steps</h2>
                <p>Now that you have a high-level understanding of IAM, you can:</p>
                <ul>
                    <li>Learn how to create a new IAM policy</li>
                    <li>Create your first IAM user for daily operations</li>
                    <li>Generate and manage access keys for programmatic access</li>
                </ul>
            </section>
        </GuidePageLayout>
    );
}
