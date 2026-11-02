type Props = {
  rules: string[];
  ageRestriction: string;
};

export default function EventPolicies({ rules, ageRestriction }: Props) {
  return (
    <div className="cc-card p-4 p-lg-5">
      <h2 className="h4 fw-bold mb-4">Rules & Policies</h2>

      <div className="alert cc-alert-soft d-flex align-items-start gap-3 mb-4" role="note">
        <i className="bi bi-person-exclamation fs-5" />
        <div>
          <p className="fw-semibold small mb-0">Age restriction</p>
          <p className="small mb-0">{ageRestriction}</p>
        </div>
      </div>

      <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
        {rules.map((rule) => (
          <li className="d-flex align-items-start gap-3 small text-body-secondary" key={rule}>
            <i className="bi bi-shield-check text-gradient fs-6" />
            {rule}
          </li>
        ))}
      </ul>
    </div>
  );
}
