import type { Organizer } from "@/data/eventDetails";
import { formatCount } from "@/utils/format";

type Props = {
  organizer: Organizer;
};

export default function EventOrganizer({ organizer }: Props) {
  return (
    <div className="cc-card p-4 p-lg-5">
      <h2 className="h4 fw-bold mb-4">Organizer</h2>

      <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-3">
        <span className="cc-avatar flex-shrink-0">{organizer.initials}</span>

        <div className="flex-grow-1">
          <h3 className="h6 fw-semibold mb-1 d-flex align-items-center gap-2">
            {organizer.name}
            {organizer.verified && (
              <i className="bi bi-patch-check-fill text-primary" title="Verified organizer" />
            )}
          </h3>
          <p className="small text-body-secondary mb-0">
            {organizer.eventsHosted} events hosted · {formatCount(organizer.followers)} followers
          </p>
        </div>

        {/* TODO: UI only for now */}
        <button type="button" className="btn btn-outline-cc px-4 align-self-start align-self-sm-center">
          <i className="bi bi-plus-lg me-1" />
          Follow
        </button>
      </div>

      <p className="text-body-secondary small mt-3 mb-0">{organizer.bio}</p>
    </div>
  );
}
