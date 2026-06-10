export function Card({ className = "", ...props }) {
  return <article className={["card", className].filter(Boolean).join(" ")} {...props} />;
}

export function CardContent({ className = "", ...props }) {
  return <div className={["card-content", className].filter(Boolean).join(" ")} {...props} />;
}
