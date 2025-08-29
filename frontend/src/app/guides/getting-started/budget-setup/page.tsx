import GuidePageLayout from '@/components/GuidePageLayout';

const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'prerequisites', title: 'Prerequisites', level: 1 },
    { id: 'step-1', title: 'Access the Billing Dashboard', level: 1 },
    { id: 'step-2', title: 'Create a Budget', level: 1 },
    { id: 'budget-type', title: 'Choose Budget Type', level: 2 },
    { id: 'budget-details', title: 'Configure Budget Details', level: 2 },
    { id: 'step-3', title: 'Set Up Alerts', level: 1 },
    { id: 'email-sns', title: 'Email and SNS Notifications', level: 2 },
    { id: 'step-4', title: 'Review and Create', level: 1 },
    { id: 'verification', title: 'Verify Budget Creation', level: 1 },
    { id: 'next-steps', title: 'Next Steps', level: 1 }
];

export default function BudgetSetupGuide() {
    return (
        <GuidePageLayout
            title="Setting Up a Budget"
            description="Learn how to create an AWS budget to monitor your costs and receive alerts when your spending exceeds a set threshold."
            estimatedTime="10 minutes"
            difficulty="Beginner"
            tableOfContents={tableOfContents}
            previousGuide={{
                title: 'AWS Services',
                href: '/guides/getting-started/aws-services'
            }}
            nextGuide={{
                title: 'Create S3 Bucket',
                href: '/guides/storage/create-bucket'
            }}>
            <section id="overview">
                <h2>Overview</h2>
                <p>
                    One of the most important things to do after creating your AWS account is to set up a budget. This
                    practice helps you stay in control of your spending and avoid unexpected charges, especially when
                    exploring the AWS Free Tier.
                </p>
                <p>
                    AWS Budgets allows you to set custom budgets to track your cost and usage. It notifies you when you
                    exceed or are forecasted to exceed your budgeted amounts.
                </p>
            </section>

            <section id="prerequisites">
                <h2>Prerequisites</h2>
                <ul>
                    <li>An active AWS account</li>
                    <li>Access to the AWS Management Console</li>
                </ul>
            </section>

            <section id="step-1">
                <h2>Step 1: Access the Billing Dashboard</h2>
                <p>First, navigate to the AWS Billing dashboard.</p>
                <ol>
                    <li>Sign in to the AWS Management Console</li>
                    <li>In the search bar, type &quot;Billing&quot; and select &quot;Billing Dashboard&quot;</li>
                    <li>In the left-hand navigation pane, click on &quot;Budgets&quot;</li>
                </ol>
            </section>

            <section id="step-2">
                <h2>Step 2: Create a Budget</h2>
                <p>From the Budgets dashboard, you&apos;ll create your first budget.</p>
                <ol>
                    <li>Click the &quot;Create budget&quot; button</li>
                    <li>Select &quot;Cost budget&quot; and click &quot;Next&quot;</li>
                </ol>

                <div id="budget-type">
                    <h3>Choose Budget Type</h3>
                    <p>
                        You have several options. For a simple budget to get started, choose &quot;Simplified
                        template&quot; and select &quot;Monthly cost budget&quot;.
                    </p>
                </div>

                <div id="budget-details">
                    <h3>Configure Budget Details</h3>
                    <p>Fill out the following information:</p>
                    <ul>
                        <li>
                            <strong>Budget name:</strong> Choose a descriptive name, e.g., &quot;Monthly Cost
                            Budget&quot;
                        </li>
                        <li>
                            <strong>Period:</strong> Select &quot;Monthly&quot;
                        </li>
                        <li>
                            <strong>Budget amount:</strong> Set a &quot;Fixed&quot; amount. For a free tier account, a
                            small amount like $1 or $5 is a good starting point.
                        </li>
                        <li>
                            <strong>Scope:</strong> &quot;All AWS services&quot; is recommended for a simple budget.
                        </li>
                    </ul>
                </div>
            </section>

            <section id="step-3">
                <h2>Step 3: Set Up Alerts</h2>
                <p>Configure notifications so you&apos;re alerted when your costs approach your budget.</p>
                <ol>
                    <li>Under &quot;Alerts&quot;, click &quot;Add an alert threshold&quot;</li>
                    <li>Set the &quot;Threshold&quot; to 80%</li>
                    <li>Select &quot;Actual&quot; to trigger the alert when your actual spending reaches 80%</li>
                    <li>Add your email address under &quot;Email recipients&quot;</li>
                </ol>

                <div id="email-sns">
                    <h3>Email and SNS Notifications</h3>
                    <p>
                        AWS will send an email notification when the alert is triggered. You can also configure an
                        Amazon SNS topic to send notifications to other endpoints.
                    </p>
                </div>
            </section>

            <section id="step-4">
                <h2>Step 4: Review and Create</h2>
                <p>Before you finalize, review your budget settings.</p>
                <ol>
                    <li>Check the budget name, period, and amount</li>
                    <li>Confirm that the alert threshold and email address are correct</li>
                    <li>Click &quot;Create budget&quot;</li>
                </ol>
            </section>

            <section id="verification">
                <h2>Verify Budget Creation</h2>
                <p>
                    You should now see your new budget listed on the Budgets dashboard. It will show you your current
                    spend against your set budget amount.
                </p>
            </section>

            <section id="next-steps">
                <h2>Next Steps</h2>
                <p>With your budget in place, you are now ready to explore and build on AWS with confidence.</p>
                <ul>
                    <li>You will receive an email confirmation of your budget creation</li>
                    <li>Continue exploring other AWS services in our guides</li>
                </ul>
            </section>
        </GuidePageLayout>
    );
}
