import { title } from "@/components/primitives";

export default function AboutPage() {
  return (
    <div>
      <h1 className={title()}>About</h1>
      <p className="mt-8 py-4">
        Information about morphemes and Literacy Lab here, along with contact
        details.
      </p>
    </div>
  );
}
