import GuidePageLayout from '@/components/GuidePageLayout';

const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'prerequisites', title: 'Prerequisites', level: 1 },
    { id: 'step-1', title: 'Access Your S3 Bucket', level: 1 },
    { id: 'step-2', title: 'Upload Files and Folders', level: 1 },
    { id: 'upload-methods', title: 'Different Upload Methods', level: 2 },
    { id: 'file-options', title: 'File Options', level: 2 },
    { id: 'step-3', title: 'View Your Uploaded Objects', level: 1 },
    { id: 'step-4', title: 'Access Your Objects', level: 1 },
    { id: 'public-access', title: 'Making an Object Public', level: 2 },
    { id: 'next-steps', title: 'Next Steps', level: 1 }
];

export default function UploadFilesGuide() {
    return (
        <GuidePageLayout
            title="Upload Files to S3"
            description="Learn how to upload and manage files and folders in your Amazon S3 bucket using the AWS Management Console."
            estimatedTime="10 minutes"
            difficulty="Beginner"
            tableOfContents={tableOfContents}
            previousGuide={{
                title: 'Bucket Permissions',
                href: '/guides/storage/bucket-permissions'
            }}
            nextGuide={{
                title: 'Cloudfront Introduction',
                href: '/guides/cdn/cdn-intro'
            }}>
            <section id="overview">
                <h2>Overview</h2>
                <p>
                    Once you&apos;ve created an Amazon S3 bucket, the next step is to upload your files to it. S3 is a
                    versatile service that can store everything from website assets to application backups. This guide
                    will show you how to easily upload files and folders using the AWS Management Console.
                </p>
            </section>

            <section id="prerequisites">
                <h2>Prerequisites</h2>
                <ul>
                    <li>An active AWS account</li>
                    <li>An existing S3 bucket</li>
                </ul>
            </section>

            <section id="step-1">
                <h2>Step 1: Access Your S3 Bucket</h2>
                <p>Navigate to the S3 bucket where you want to store your files.</p>
                <ol>
                    <li>Sign in to the AWS Management Console</li>
                    <li>Go to the S3 dashboard</li>
                    <li>Click on the name of your S3 bucket from the list</li>
                </ol>
                <p>
                    You will now be inside the bucket&apos;s dashboard, which displays all the objects (files and
                    folders) it contains.
                </p>
            </section>

            <section id="step-2">
                <h2>Step 2: Upload Files and Folders</h2>
                <p>The upload process is straightforward and can be done via drag-and-drop or by selecting files.</p>
                <ol>
                    <li>Click the &quot;Upload&quot; button</li>
                    <li>You will be taken to the upload page</li>
                </ol>

                <div id="upload-methods">
                    <h3>Different Upload Methods</h3>
                    <ul>
                        <li>
                            <strong>Add files:</strong> Click the &quot;Add files&quot; button to open your file browser
                            and select the files you want to upload.
                        </li>
                        <li>
                            <strong>Add folder:</strong> Click the &quot;Add folder&quot; button to select an entire
                            folder from your computer. S3 will maintain the folder structure.
                        </li>
                        <li>
                            <strong>Drag and drop:</strong> You can also drag files and folders directly from your
                            desktop onto the upload page.
                        </li>
                    </ul>
                </div>

                <div id="file-options">
                    <h3>File Options</h3>
                    <p>Before you finalize the upload, you can configure settings for the objects being uploaded:</p>
                    <ul>
                        <li>
                            <strong>Permissions:</strong> You can set access control lists (ACLs) for individual
                            objects, but it&apos;s generally recommended to manage permissions using bucket policies or
                            IAM policies.
                        </li>
                        <li>
                            <strong>Storage Class:</strong> Choose a storage class (e.g., Standard, Intelligent-Tiering,
                            Glacier) based on your access patterns and cost requirements.
                        </li>
                        <li>
                            <strong>Encryption:</strong> Ensure server-side encryption is enabled for data at rest.
                        </li>
                    </ul>
                </div>
                <p>
                    Once your files are added and options are set, click the &quot;Upload&quot; button at the bottom of
                    the page.
                </p>
            </section>

            <section id="step-3">
                <h2>Step 3: View Your Uploaded Objects</h2>
                <p>
                    After the upload is complete, you&apos;ll be redirected to your bucket&apos;s main page. You should
                    now see the files and folders you uploaded listed in the contents panel.
                </p>
                <ul>
                    <li>The &quot;Size&quot; column shows the size of each file</li>
                    <li>The &quot;Last modified&quot; column shows the timestamp of the last upload</li>
                </ul>
            </section>

            <section id="step-4">
                <h2>Step 4: Access Your Objects</h2>
                <p>
                    To access an object, you need its URL. Click on the object name in the list, and you will see its
                    properties, including its &quot;Object URL&quot;.
                </p>

                <div id="public-access">
                    <h3>Making an Object Public</h3>
                    <p>
                        By default, objects in S3 are not publicly accessible. If you need to make a file public (e.g.,
                        for a website image), you must explicitly grant public read access.
                    </p>
                    <ol>
                        <li>Click on the object name in your bucket</li>
                        <li>Go to the &quot;Permissions&quot; tab</li>
                        <li>Under &quot;Object Ownership&quot;, ensure &quot;ACLs enabled&quot; is selected</li>
                        <li>Under &quot;Access Control List (ACL)&quot;, click &quot;Edit&quot;</li>
                        <li>For the &quot;Everyone (public access)&quot; row, check the &quot;Read&quot; checkbox</li>
                        <li>Acknowledge the warning and save changes</li>
                    </ol>
                    <p>Once done, anyone with the object URL can now view the file.</p>
                </div>
            </section>

            <section id="next-steps">
                <h2>Next Steps</h2>
                <p>You have successfully uploaded files to your S3 bucket. You can now:</p>
                <ul>
                    <li>Use S3 as a host for static websites</li>
                    <li>Integrate S3 with a Content Delivery Network (CDN) like Amazon CloudFront</li>
                    <li>Set up lifecycle rules to automatically manage object storage and costs</li>
                </ul>
                <p>Continue with our next guide to learn about CDN services with CloudFront.</p>
            </section>
        </GuidePageLayout>
    );
}
