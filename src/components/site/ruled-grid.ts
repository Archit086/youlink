import { cn } from "@/lib/utils";

interface Columns {
  /** Columns at the sm breakpoint. Defaults to 1 (stacked). */
  sm?: 1 | 2;
  /** Columns at the lg breakpoint. */
  lg?: 1 | 2 | 3 | 4 | 5;
}

/**
 * Border classes for one cell of a ruled grid.
 *
 * Cells touch and share a single hairline, so each cell draws only its own top
 * and left rules, and drops them when it sits in the first row or first column
 * at that breakpoint. Class strings are written out in full so Tailwind can see
 * them.
 */
export function cellRules(index: number, columns: Columns = {}): string {
  const { sm = 1, lg } = columns;
  const classes: (string | false)[] = [];

  // Stacked: every cell but the first carries a top rule.
  classes.push(index > 0 && "border-t");

  if (sm === 2) {
    classes.push(index % 2 === 1 ? "sm:border-l" : "sm:border-l-0");
    classes.push(index < 2 ? "sm:border-t-0" : "sm:border-t");
  }

  if (lg && lg > 1) {
    const firstInRow = index % lg === 0;
    classes.push(firstInRow ? "lg:border-l-0" : "lg:border-l");
    classes.push(index < lg ? "lg:border-t-0" : "lg:border-t");
  }

  return cn(...classes);
}

/** Column-count class for the grid container itself. */
export function gridColumns(columns: Columns = {}): string {
  const { sm = 1, lg } = columns;
  return cn(
    "grid",
    sm === 2 && "sm:grid-cols-2",
    lg === 2 && "lg:grid-cols-2",
    lg === 3 && "lg:grid-cols-3",
    lg === 4 && "lg:grid-cols-4",
    lg === 5 && "lg:grid-cols-5",
  );
}
