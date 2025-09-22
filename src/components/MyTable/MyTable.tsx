import { useMemo, useState } from 'react';
import {
  Badge,
  Center,
  Group,
  ScrollArea,
  Stack,
  Table,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import {
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconSelector,
} from '@tabler/icons-react';
import React from 'react';

/** --- Types ---------------------------------------------------------------- */

export type ColumnKey<T> = keyof T;

export interface BadgeConfig<T> {
  /** Map from normalized value (e.g., role.toLowerCase()) to Mantine color */
  colorMap: Record<string, string>;
  /** Fallback color if the value is not in colorMap (default: 'gray') */
  fallbackColor?: string;
  /**
   * Optional value extractor for color key lookup (defaults to String(row[key]))
   * Return the value that will be lowercased and used to pick a color.
   */
  getColorKey?: (row: T, rowIndex: number) => string | number | null | undefined;
  /**
   * Optional label renderer for the badge content (defaults to row[key])
   */
  renderLabel?: (row: T, rowIndex: number) => React.ReactNode;
  /**
   * Optional Mantine Badge props
   */
  variant?: 'filled' | 'light' | 'outline' | 'dot' | 'transparent' | 'white' | 'default';
  radius?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export interface ColumnDef<T> {
  /** key in data object (used for default rendering & fallback sorting) */
  key: ColumnKey<T>;
  /** optional header label; defaults to String(key).toUpperCase() */
  label?: React.ReactNode;
  /** enable/disable sorting for this column (default: true) */
  sortable?: boolean;
  /** enable/disable searching for this column (default: true) */
  searchable?: boolean;
  /**
   * Custom render for cell value (receives entire row).
   * If omitted, renders `row[key]` as string/number/ReactNode.
   */
  render?: (row: T, rowIndex: number) => React.ReactNode;
  /**
   * Value used for sort/filter (string|number recommended).
   * If omitted, falls back to `row[key]`.
   */
  getValue?: (row: T) => string | number | null | undefined;
  /**
   * Optional: render this column as a Mantine <Badge> with color mapping.
   * If provided, the cell will be rendered as a Badge using the color map.
   */
  badge?: BadgeConfig<T>;
}

type ColumnsProp<T> = Array<ColumnKey<T>> | Array<ColumnDef<T>>;

export interface MyTableProps<T> {
  data: T[];
  columns: ColumnsProp<T>;
  /** show search input (default: true) */
  enableSearch?: boolean;
  /** enable sorting (default: true) */
  enableSort?: boolean;
  /** placeholder for search input */
  searchPlaceholder?: string;

  /**
   * Custom renderer for the trailing "actions" cell.
   * If provided, this content is rendered; otherwise the cell is empty.
   */
  renderActions?: (row: T, rowIndex: number) => React.ReactNode;

  /** Optional header label for the actions column (e.g., "Actions") */
  actionsHeader?: React.ReactNode;

  /** show action column (default: true if renderActions is provided) */
  showActions?: boolean;

  /** initial sort column key (must be one of the provided column keys) */
  initialSortKey?: ColumnKey<T>;
  /** initial sort direction (default: 'asc') */
  initialSortDirection?: 'asc' | 'desc';
  /** table height (ScrollArea) */
  height?: number | string;

  /**
   * Optional: declare a badge for a specific column by index instead of editing the column def.
   * Useful when `columns` is passed as an array of keys only.
   */
  badgeByIndex?: Array<{
    columnIndex: number; // 0-based within provided columns
    config: BadgeConfig<T>;
  }>;
}

/** --- Helpers -------------------------------------------------------------- */

function toColumnDefs<T>(cols: ColumnsProp<T>): ColumnDef<T>[] {
  if (!cols.length) return [];
  const isDef = (c: any): c is ColumnDef<T> => typeof c === 'object' && 'key' in c;
  return (cols as any[]).map((c) =>
    isDef(c)
      ? {
          sortable: true,
          searchable: true,
          ...c,
        }
      : ({
          key: c as ColumnKey<T>,
          label: String(c).toUpperCase(),
          sortable: true,
          searchable: true,
        } as ColumnDef<T>)
  );
}

function getCellValue<T>(col: ColumnDef<T>, row: T): string | number | null | undefined {
  if (col.getValue) return col.getValue(row);
  const v = (row as any)[col.key];
  if (typeof v === 'string' || typeof v === 'number') return v;
  return typeof v === 'boolean' ? Number(v) : undefined;
}

function compare(a: string | number | null | undefined, b: string | number | null | undefined) {
  if (a == null && b == null) return 0;
  if (a == null) return -1;
  if (b == null) return 1;
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b));
}

/** --- Header cell with sort control --------------------------------------- */

interface ThProps {
  children: React.ReactNode;
  sorted: boolean;
  reversed: boolean;
  onSort?: () => void;
  sortable: boolean;
}

function Th({ children, sorted, reversed, onSort, sortable }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  if (!sortable) {
    return (
      <Table.Th>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center style={{ width: 16 }} />
        </Group>
      </Table.Th>
    );
  }
  return (
    <Table.Th>
      <UnstyledButton onClick={onSort} style={{ width: '100%' }}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center style={{ width: 16 }}>
            <Icon size={16} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

/** --- Component ------------------------------------------------------------ */

export function MyTable<T>({
  data,
  columns,
  enableSearch = true,
  enableSort = true,
  searchPlaceholder = 'Search by any field',
  renderActions,
  actionsHeader,
  showActions,
  initialSortKey,
  initialSortDirection = 'asc',
  height = '70vh',
  badgeByIndex,
}: MyTableProps<T>) {
  const columnDefs = useMemo(() => toColumnDefs(columns), [columns]);

  // apply badgeByIndex overrides (non-destructive)
  const columnDefsWithBadges = useMemo(() => {
    if (!badgeByIndex?.length) return columnDefs;
    const clone = [...columnDefs];
    for (const b of badgeByIndex) {
      const target = clone[b.columnIndex];
      if (target) clone[b.columnIndex] = { ...target, badge: { ...b.config } };
    }
    return clone;
  }, [badgeByIndex, columnDefs]);

  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<ColumnKey<T> | null>(initialSortKey ?? null);
  const [reverse, setReverse] = useState(initialSortDirection === 'desc');

  const actionsEnabled = showActions ?? Boolean(renderActions);

  const filteredSorted = useMemo(() => {
    // 1) filter
    const lc = search.toLowerCase().trim();
    const searchableCols = columnDefsWithBadges.filter((c) => c.searchable !== false);
    const filtered =
      !enableSearch || lc === ''
        ? data
        : data.filter((row) =>
            searchableCols.some((c) => {
              const v = getCellValue(c, row);
              return v != null && String(v).toLowerCase().includes(lc);
            })
          );

    // 2) sort
    if (!enableSort || !sortKey) return filtered;

    const col = columnDefsWithBadges.find((c) => c.key === sortKey);
    if (!col || col.sortable === false) return filtered;

    const sorted = [...filtered].sort((a, b) => compare(getCellValue(col, a), getCellValue(col, b)));
    return reverse ? sorted.reverse() : sorted;
  }, [data, columnDefsWithBadges, search, enableSearch, sortKey, enableSort, reverse]);

  const handleSort = (key: ColumnKey<T>) => {
    if (!enableSort) return;
    setReverse((prev) => (key === sortKey ? !prev : false));
    setSortKey(key);
  };

  // Utility to render a cell, respecting optional badge config
  const renderCell = (col: ColumnDef<T>, row: T, rowIndex: number) => {
    if (col.badge) {
      const badgeCfg = col.badge;
      const rawForKey = badgeCfg.getColorKey?.(row, rowIndex) ?? (row as any)[col.key];
      const keyStr = rawForKey == null ? '' : String(rawForKey).toLowerCase();
      const color = badgeCfg.colorMap[keyStr] ?? badgeCfg.fallbackColor ?? 'gray';
      const label =
        badgeCfg.renderLabel?.(row, rowIndex) ?? ((row as any)[col.key] as React.ReactNode);
      return (
        <Badge color={color} variant={badgeCfg.variant ?? 'light'} radius={badgeCfg.radius} size={badgeCfg.size}>
          {label}
        </Badge>
      );
    }

    // legacy/custom render path
    return col.render
      ? col.render(row, rowIndex)
      : ((row as any)[col.key] as string | number | React.ReactNode);
  };

  return (
    <Stack>
      {enableSearch && (
        <TextInput
          placeholder={searchPlaceholder}
          mb="md"
          leftSection={<IconSearch size={16} stroke={1.5} />}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      )}

      <ScrollArea h={height}>
        <Table verticalSpacing="sm" horizontalSpacing="xl" striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              {columnDefsWithBadges.map((col) => {
                const label = col.label ?? String(col.key).toUpperCase();
                const sorted = sortKey === col.key;
                return (
                  <Th
                    key={String(col.key)}
                    sorted={sorted}
                    reversed={reverse}
                    onSort={() => handleSort(col.key)}
                    sortable={col.sortable !== false}
                  >
                    {label}
                  </Th>
                );
              })}
              {actionsEnabled && <Table.Th>{actionsHeader ?? null}</Table.Th>}
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {filteredSorted.length > 0 ? (
              filteredSorted.map((row, rowIndex) => (
                <Table.Tr key={rowIndex}>
                  {columnDefsWithBadges.map((col) => (
                    <Table.Td key={`${String(col.key)}-${rowIndex}`}>{renderCell(col, row, rowIndex)}</Table.Td>
                  ))}

                  {actionsEnabled && (
                    <Table.Td>{renderActions ? renderActions(row, rowIndex) : null}</Table.Td>
                  )}
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={columnDefsWithBadges.length + (actionsEnabled ? 1 : 0)}>
                  <Text fw={500} ta="center">
                    Nothing found
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Stack>
  );
}

/** --- Usage examples ------------------------------------------------------- */

// 1) Column-def based badges (preferred)
// const columns: ColumnDef<User>[] = [
//   { key: 'name', label: 'Name' },
//   {
//     key: 'role',
//     label: 'Role',
//     badge: {
//       colorMap: { engineer: 'blue', manager: 'cyan', designer: 'pink' },
//       fallbackColor: 'gray',
//       // (optional) normalize from e.g. "Engineer" to "engineer"
//       getColorKey: (row) => String((row as any).role).toLowerCase(),
//     },
//   },
//   { key: 'email' },
// ];

// 2) Index-based badges if you only pass keys as columns
// const columnsKeys = ['name', 'role', 'email'] as const satisfies Array<keyof User>;
// <MyTable
//   data={users}
//   columns={columnsKeys}
//   badgeByIndex={[{ columnIndex: 1, config: { colorMap: { engineer: 'blue' }, fallbackColor: 'gray' } }]}
// />