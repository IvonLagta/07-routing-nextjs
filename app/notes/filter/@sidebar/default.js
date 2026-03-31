import Link from "next/link";
import styles from "./SidebarNotes.module.css";

const tags = [
  { label: "Todo", value: "Todo" },
  { label: "Work", value: "Work" },
  { label: "Personal", value: "Personal" },
  { label: "Meeting", value: "Meeting" },
  { label: "Shopping", value: "Shopping" },
];

export default function SidebarNotes() {
  return (
    <nav>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <Link href="/notes/filter/all">All notes</Link>
        </li>

        {tags.map((tag) => (
          <li key={tag.value} className={styles.menuItem}>
            <Link href={`/notes/filter/${tag.value}`}>{tag.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
