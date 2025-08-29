import GuidePageLayout from '@/components/GuidePageLayout';

const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'prerequisites', title: 'Prerequisites', level: 1 },
    { id: 'step-1', title: 'Access the IAM Console', level: 1 },
    { id: 'step-2', title: 'Create a New User', level: 1 },
    { id: 'user-details', title: 'Set User Details', level: 2 },
    { id: 'permissions', title: 'Set Permissions', level: 2 },
    { id: 'review', title: 'Review and Create', level: 2 },
    { id: 'step-3', title: 'Set Up Credentials', level: 1 },
    { id: 'password', title: 'Console Password', level: 2 },
    { id: 'next-steps', title: 'Next Steps', level: 1 }
];

export default function CreateUserGuide() {
    return (
        <GuidePageLayout
            title="Create New User"
            description="A guide to creating a new IAM user for daily administrative and programmatic tasks, and assigning them appropriate permissions."
            estimatedTime="10 minutes"
            difficulty="Beginner"
            tableOfContents={tableOfContents}
            previousGuide={{
                title: 'Create New Policy',
                href: '/guides/iam/create-policy'
            }}
            nextGuide={{
                title: 'Creating Access Keys For User',
                href: '/guides/iam/access-keys'
            }}>
            <section id="overview">
                <h2>Overview</h2>
                <p>
                    The AWS root account has unrestricted access to all services and resources. It&apos;s a critical
                    security risk to use it for day-to-day operations. Instead, you should create IAM users and grant
                    them the specific permissions they need. This guide will walk you through creating a new IAM user.
                </p>
            </section>

            <section id="prerequisites">
                <h2>Prerequisites</h2>
                <ul>
                    <li>An active AWS account</li>
                    <li>Access to the IAM Management Console</li>
                    <li>It is helpful to have a policy ready to attach to the user</li>
                </ul>
            </section>

            <section id="step-1">
                <h2>Step 1: Access the IAM Console</h2>
                <p>Navigate to the IAM service in the AWS Management Console.</p>
                <ol>
                    <li>Sign in to the AWS Management Console with your root or IAM admin user</li>
                    <li>In the search bar, type &quot;IAM&quot; and select it from the dropdown</li>
                    <li>In the left-hand navigation pane, click on &quot;Users&quot;</li>
                </ol>
            </section>

            <section id="step-2">
                <h2>Step 2: Create a New User</h2>
                <p>Now, you will use the user creation wizard.</p>
                <ol>
                    <li>Click the &quot;Create user&quot; button</li>
                </ol>

                <div id="user-details">
                    <h3>Set User Details</h3>
                    <ul>
                        <li>
                            <strong>User name:</strong> Enter a descriptive name for the user, e.g.,{' '}
                            <code>developer-james</code> or <code>s3-admin-user</code>
                        </li>
                        <li>
                            Check the box for &quot;Provide user access to the AWS Management Console -{' '}
                            <em>Optional</em>&quot; if you want the user to be able to sign in to the console.
                        </li>
                        <li>If you check the box, select &quot;I want to create an IAM user&quot;</li>
                    </ul>
                </div>

                <div id="permissions">
                    <h3>Set Permissions</h3>
                    <p>This is a crucial step for applying the principle of least privilege.</p>
                    <ul>
                        <li>
                            <strong>Method:</strong> Choose &quot;Attach policies directly&quot;
                        </li>
                        <li>
                            <strong>Policies:</strong> Search for and select the policies you wish to attach to this
                            user. For example, you could attach a custom policy you created earlier (like the S3
                            read-only policy) or a managed policy like <code>AmazonS3FullAccess</code>.
                        </li>
                        <li>
                            <strong>Best Practice:</strong> Attach policies to a group and add the user to that group.
                            This makes management scalable.
                        </li>
                    </ul>
                </div>

                <div id="review">
                    <h3>Review and Create</h3>
                    <ul>
                        <li>Review the user name and the permissions you&apos;ve attached</li>
                        <li>Click &quot;Create user&quot;</li>
                    </ul>
                </div>
            </section>

            <section id="step-3">
                <h2>Step 3: Set Up Credentials</h2>
                <p>After creating the user, you have two credential options.</p>

                <div id="password">
                    <h3>Console Password</h3>
                    <p>
                        If you opted for console access, you will be shown the user&apos;s console password. You have
                        the option to set a custom password or have AWS generate a temporary one. You can also choose to
                        force the user to reset their password on first login.
                    </p>
                    <p>
                        <strong>Important:</strong> Save the password in a secure place or share it with the user
                        immediately. You won&apos;t be able to retrieve it again.
                    </p>
                </div>
            </section>

            <section id="next-steps">
                <h2>Next Steps</h2>
                <p>Your new IAM user is now ready to go!</p>
                <ul>
                    <li>Learn how to create access keys for programmatic access (e.g., for the AWS CLI or SDKs)</li>
                    <li>Use the new IAM user for your daily tasks instead of your root account</li>
                </ul>
            </section>
        </GuidePageLayout>
    );
}
