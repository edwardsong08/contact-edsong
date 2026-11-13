import Link from "next/link";

export default function ContactActions({ source = "" }: { source?: string }) {
  return (
    <div className="contact-actions">
      <Link className="primary-button" href={source ? `/start?from=${encodeURIComponent(source)}` : "/start"}>
        Start a project <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}
