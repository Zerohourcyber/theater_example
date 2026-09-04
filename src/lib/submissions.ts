export type Submission = {
  receivedAt: string;
  name: string;
  email: string;
  subject: string;
  message: string;
};

/**
 * The single seam where an enquiry gets persisted.
 *
 * INTERIM. This phase of the project has no datastore — the dashboard that
 * introduces Postgres is deferred — so a submission is currently durable in
 * two places: the notification email in the org inbox, and Resend's own record
 * of what it sent. This function writes a structured line to the platform log
 * so nothing is lost in between.
 *
 * That is weaker than the enquiry list deserves. It is the volunteer roster
 * and the donor pipeline, and it is the one asset the site produces that
 * compounds. When the dashboard lands, replace the body of this function with
 * a single insert; every caller already goes through here, so nothing else
 * needs to change.
 */
export async function recordSubmission(submission: Submission): Promise<void> {
  console.info(
    "[enquiry]",
    JSON.stringify({
      receivedAt: submission.receivedAt,
      name: submission.name,
      email: submission.email,
      subject: submission.subject,
      message: submission.message,
    })
  );
}
